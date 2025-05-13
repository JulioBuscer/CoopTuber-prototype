import Avatar from "./Avatar";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";
import Score from "./score/Score";
import { playersConfig, setPlayerState } from "../data/signals/player";
import Tools from "./tools/Tools";
import { debuglog } from "util";
import { debugError, debugLog } from "../utils/utils";

type BlendshapesCategory = {
    categoryName: string;
    score: number;
};

const WebcamViewer = () => {

    const [player1, setPlayer1] = createSignal(playersConfig()[0]);
    const [player2, setPlayer2] = createSignal(playersConfig()[1]);

    createEffect(() => {
        setPlayer1(playersConfig()[0]);
        setPlayer2(playersConfig()[1]);
    });
    // Estados
    const [isCameraOn, setIsCameraOn] = createSignal(false);
    const [isVideoPlaying, setIsVideoPlaying] = createSignal(false);

    // Referencias a elementos
    let videoRef: HTMLVideoElement | undefined;
    let canvasRef: HTMLCanvasElement | undefined;

    // Estado del detector
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);

    // ID para cancelar la animación
    let animationFrameId: number | undefined;

    // Stream de la cámara
    let mediaStream: MediaStream | null = null;

    // Ocultar video en Zindex
    const [isVideoHidden, setIsVideoHidden] = createSignal(true);

    // Limpieza de recursos
    onCleanup(() => {
        // Cancelar animación
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // Detener tracks de la cámara
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }

        // Destruir detector
        detector()?.destroy();

        // Limpiar referencias
        videoRef = undefined;
        canvasRef = undefined;
        mediaStream = null;
    });

    const handleCameraClick = () => {
        debugLog("Camera button clicked - isCameraOn:", isCameraOn());
        toggleCamera();
    };

    const handleVideoClick = () => {
        debugLog("Video button clicked - isVideoPlaying:", isVideoPlaying());
        toggleVideo();
    };

    const toggleVideo = () => {
        if (videoRef) {
            debugLog("Video paused:", videoRef.paused);
            if (videoRef.paused) {
                if (!detector()) {
                    // Si no hay detector, inicializarlo
                    const canvas = canvasRef!;
                    canvas.width = videoRef.videoWidth;
                    canvas.height = videoRef.videoHeight;
                    Object.assign(canvas.style, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                    });

                    const landmarkDetector = new FaceLandmarkDetector(canvas);
                    landmarkDetector.initialize().then(() => {
                        setDetector(landmarkDetector);
                        videoRef!.play().catch(error => {
                            debugError(new Error("Error al reproducir el video"), error);
                        });
                        // Iniciar la detección de landmarks
                        processFrame();
                    }).catch(error => {
                        debugError(new Error("Error al inicializar el detector"), error);
                    });
                } else {
                    // Si ya hay detector, solo reproducir el video
                    videoRef.play().catch(error => {
                        debugError(new Error("Error al reproducir el video"), error);
                    });
                    // Iniciar la detección de landmarks
                    processFrame();
                }
            } else {
                videoRef.pause();
                // Detener la detección de landmarks cuando se pausa
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            }
            setIsVideoPlaying(!videoRef.paused);
        } else {
            debugError(new Error("No se encontró el elemento video"));
        }
    };
    const toggleCamera = async () => {
        if (isCameraOn()) {
            debugLog("Deteniendo la cámara...");
            // Detener la cámara
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                mediaStream = null;
            }
            if (videoRef) {
                videoRef.srcObject = null;
                videoRef.pause();
            }
            setIsVideoPlaying(false);
            setIsCameraOn(false);
        } else {
            debugLog("Iniciando la cámara...");
            try {
                if (!videoRef) {
                    debugError(new Error("Video element no está disponible"));
                    return;
                }

                // Configurar el video
                videoRef.autoplay = true;
                videoRef.muted = true;
                videoRef.playsInline = true;

                mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 1920,
                        height: 1080,
                        facingMode: "user",
                        aspectRatio: 16 / 9,
                    }
                });
                videoRef.srcObject = mediaStream;
                setIsCameraOn(true);
                setIsVideoPlaying(true);

                debugLog("Esperando que el video esté listo...");
                // Esperar a que el video esté listo
                await new Promise((resolve) => {
                    videoRef!.onloadedmetadata = () => {
                        debugLog("Video metadata cargado");
                        resolve(true);
                    };
                });

                debugLog("Reproduciendo video...");
                // Reproducir el video
                await videoRef.play().catch(error => {
                    debugError(new Error("Error al reproducir el video"), error);
                    setIsVideoPlaying(false);
                });

                debugLog("Inicializando detector...");
                // Inicializar el detector después de que el video esté listo
                const canvas = canvasRef!;
                canvas.width = videoRef.videoWidth;
                canvas.height = videoRef.videoHeight;
                Object.assign(canvas.style, {
                    position: "absolute",
                    top: "0",
                    left: "0",
                });

                const landmarkDetector = new FaceLandmarkDetector(canvas);
                await landmarkDetector.initialize();
                setDetector(landmarkDetector);

                debugLog("Iniciando detección de landmarks...");
                // Iniciar la detección de landmarks
                const processFrame = async () => {
                    const det = detector();
                    if (!det) {
                        debugError(new Error("Detector no está disponible"));
                        return;
                    }
                    try {
                        debugLog("Detectando landmarks...");
                        const results = await det.detect(videoRef!);
                        debugLog("Resultados de detección:", results);

                        if (
                            results &&
                            results.faceLandmarks &&
                            results.faceBlendshapes
                        ) {
                            debugLog("Landmarks detectados!");
                            det.drawResults(results);

                            // Procesar blendshapes para cada jugador
                            if (results.faceBlendshapes[0]) {
                                const blendshapes = results.faceBlendshapes[0];
                                const findScore = (name: string) =>
                                    blendshapes.categories.find(
                                        (c: BlendshapesCategory) => c.categoryName === name
                                    )?.score ?? 0;

                                const eyeBlinkLeft = findScore("eyeBlinkLeft");
                                const eyeBlinkRight = findScore("eyeBlinkRight");
                                const jawOpen = findScore("jawOpen");

                                const eyesClosed = ((eyeBlinkLeft + eyeBlinkRight) / 2 > player1().rateEyesClosed);
                                const mouthOpen = (jawOpen > player1().rateMouthOpen);
                                debugLog("Player 1 scores:", {
                                    eyeBlinkLeft,
                                    eyeBlinkRight,
                                    jawOpen,
                                    eyesClosed,
                                    mouthOpen
                                });

                                setPlayerState(player1().characterId, {
                                    ...player1(),
                                    eyeBlinkLeftScore: eyeBlinkLeft,
                                    eyeBlinkRightScore: eyeBlinkRight,
                                    jawOpenScore: jawOpen,
                                    eyesClosed: eyesClosed,
                                    mouthOpen: mouthOpen
                                });
                            }
                            if (results.faceBlendshapes[1]) {
                                const blendshapes = results.faceBlendshapes[1];
                                const findScore = (name: string) =>
                                    blendshapes.categories.find(
                                        (c: BlendshapesCategory) => c.categoryName === name
                                    )?.score ?? 0;

                                const eyeBlinkLeft = findScore("eyeBlinkLeft");
                                const eyeBlinkRight = findScore("eyeBlinkRight");
                                const jawOpen = findScore("jawOpen");
                                const eyesClosed = ((eyeBlinkLeft + eyeBlinkRight) / 2 > player2().rateEyesClosed);
                                const mouthOpen = (jawOpen > player2().rateMouthOpen);
                                debugLog("Player 2 scores:", {
                                    eyeBlinkLeft,
                                    eyeBlinkRight,
                                    jawOpen,
                                    eyesClosed,
                                    mouthOpen
                                });

                                setPlayerState(player2().characterId, {
                                    ...player2(),
                                    eyeBlinkLeftScore: eyeBlinkLeft,
                                    eyeBlinkRightScore: eyeBlinkRight,
                                    jawOpenScore: jawOpen,
                                    eyesClosed,
                                    mouthOpen
                                });
                            }
                        } else {
                            debugLog("No se detectaron landmarks en este frame");
                        }
                    } catch (error) {
                        debugError(error as Error, "Error al detectar landmarks");
                    }
                    animationFrameId = requestAnimationFrame(processFrame);
                };

                processFrame();

            } catch (error) {
                debugError(error as Error, "Error al acceder a la cámara");
                setIsCameraOn(false);
            }
        }
    };
    const processFrame = async () => {
        const det = detector();
        if (!det) {
            debugError(new Error("Detector no está disponible"));
            return;
        }
        try {
            debugLog("Detectando landmarks...");
            const results = await det.detect(videoRef!);
            debugLog("Resultados de detección:", results);

            if (
                results &&
                results.faceLandmarks &&
                results.faceBlendshapes
            ) {
                debugLog("Landmarks detectados!");

                // Dibujar landmarks en el canvas
                det.drawResults(results);

                // Procesar blendshapes para cada jugador
                if (results.faceBlendshapes[0]) {
                    const blendshapes = results.faceBlendshapes[0];
                    const findScore = (name: string) =>
                        blendshapes.categories.find(
                            (c: BlendshapesCategory) => c.categoryName === name
                        )?.score ?? 0;

                    const eyeBlinkLeft = findScore("eyeBlinkLeft");
                    const eyeBlinkRight = findScore("eyeBlinkRight");
                    const jawOpen = findScore("jawOpen");

                    const eyesClosed = ((eyeBlinkLeft + eyeBlinkRight) / 2 > player1().rateEyesClosed);
                    const mouthOpen = (jawOpen > player1().rateMouthOpen);
                    debugLog("Player 1 scores:", {
                        eyeBlinkLeft,
                        eyeBlinkRight,
                        jawOpen,
                        eyesClosed,
                        mouthOpen
                    });

                    setPlayerState(player1().characterId, {
                        ...player1(),
                        eyeBlinkLeftScore: eyeBlinkLeft,
                        eyeBlinkRightScore: eyeBlinkRight,
                        jawOpenScore: jawOpen,
                        eyesClosed: eyesClosed,
                        mouthOpen: mouthOpen
                    });
                }
                if (results.faceBlendshapes[1]) {
                    const blendshapes = results.faceBlendshapes[1];
                    const findScore = (name: string) =>
                        blendshapes.categories.find(
                            (c: BlendshapesCategory) => c.categoryName === name
                        )?.score ?? 0;

                    const eyeBlinkLeft = findScore("eyeBlinkLeft");
                    const eyeBlinkRight = findScore("eyeBlinkRight");
                    const jawOpen = findScore("jawOpen");
                    const eyesClosed = ((eyeBlinkLeft + eyeBlinkRight) / 2 > player2().rateEyesClosed);
                    const mouthOpen = (jawOpen > player2().rateMouthOpen);
                    debugLog("Player 2 scores:", {
                        eyeBlinkLeft,
                        eyeBlinkRight,
                        jawOpen,
                        eyesClosed,
                        mouthOpen
                    });

                    setPlayerState(player2().characterId, {
                        ...player2(),
                        eyeBlinkLeftScore: eyeBlinkLeft,
                        eyeBlinkRightScore: eyeBlinkRight,
                        jawOpenScore: jawOpen,
                        eyesClosed,
                        mouthOpen
                    });
                }
            } else {
                debugLog("No se detectaron landmarks en este frame");
            }
        } catch (error) {
            debugError(error as Error, "Error al detectar landmarks");
        }
        animationFrameId = requestAnimationFrame(processFrame);
    };
    onMount(async () => {
        // Inicializar la cámara cuando el componente se monta
        toggleCamera();
    });

    return (
        <div class="layout-panel">
            <div class="webcam">
                <div class="card webcam-container ">
                    <video
                        style={{
                            "z-index": isVideoHidden() ? -1 : 0
                        }}
                        ref={el => {
                            console.log("Video ref set");
                            videoRef = el!;
                            // Controlar la reproducción basado en el estado
                            if (isVideoPlaying()) {
                                el.play().catch(error => {
                                    debugError(error as Error, "Error al reproducir video");
                                });
                            } else {
                                el.pause();
                            }
                        }}
                        width={1920}
                        height={1080}
                        src="/video.mp4"
                        autoplay={false}
                        muted
                        playsinline
                    />
                    <canvas
                        ref={el => (canvasRef = el!)}
                        width={1920}
                        height={1080}
                    />
                </div>
                <div class="content-flex">
                    <div class="flex-item">
                        <button
                            class="switch-button"
                            type="button"
                            role="switch"
                            aria-checked={isCameraOn()}
                            onClick={handleCameraClick}
                            value="on"
                        >
                            <span class="switch-button-icon" />
                        </button>
                        <label>{isCameraOn() ? "Desactivar Cámara" : "Activar Cámara"}</label>

                        <button
                            type="button"
                            aria-checked={isVideoPlaying()}
                            onClick={handleVideoClick}
                            disabled={isCameraOn()}
                            value="on"
                        >
                            <label>{isVideoPlaying() ? "⏸️ Pausar Video" : "▶️ Reproducir Video"} </label>
                        </button>
                        <button
                            type="button"
                            aria-checked={isVideoHidden()}
                            onClick={() => { setIsVideoHidden(!isVideoHidden()) }}
                            disabled={isCameraOn()}
                            value="on"
                        >
                            <label>{isVideoHidden() ? "Mostrar Video" : "Ocultar Video"} </label>
                        </button>

                    </div>
                </div>

                <div>
                    {playersConfig().map(player => <Score characterId={player.characterId} />)}
                </div>
            </div>

            <div class="players">
                <div class="players-container">
                    {playersConfig().map(player => <Avatar characterId={player.characterId} />)}
                </div>
                <Tools />
            </div>
        </div>
    );
};

export default WebcamViewer;