import Avatar from "./Avatar";
import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";
import Score from "./score/Score";
import { playersConfig, setPlayerState, videoSource, setVideoSource } from "../data/signals/player";
import Tools from "./tools/Tools";
import { debugError, debugLog, sanitizedColor, setColors } from "../utils/utils";
import { HiOutlineFilm, HiOutlinePause, HiOutlinePlay } from "solid-icons/hi";

const WebcamViewer = () => {

    // Estados
    const [isCameraOn, setIsCameraOn] = createSignal(false);
    const [isVideoPlaying, setIsVideoPlaying] = createSignal(false);

    // Referencias a elementos
    let videoRef: HTMLVideoElement | undefined;
    let canvasRef: HTMLCanvasElement | undefined;
    let fileInputRef: HTMLInputElement | undefined;

    // Estado del detector
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);

    // ID para cancelar la animación
    let animationFrameId: number | undefined;

    // Stream de la cámara
    let mediaStream: MediaStream | null = null;

    // Ocultar video en Zindex
    const [isVideoHidden, setIsVideoHidden] = createSignal(false);

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
        if (!videoSource()) {
            debugLog("No hay video cargado");
            return;
        }
        debugLog("Video button clicked - isVideoPlaying:", isVideoPlaying());
        toggleVideo();
    };

    const toggleVideo = () => {
        if (videoRef) {
            debugLog("Video paused:", videoRef.paused);
            if (videoRef.paused) {
                // Si no hay detector o fue destruido, inicializarlo
                if (!detector()) {
                    const canvas = canvasRef!;
                    // Asegurarse de que las dimensiones sean correctas
                    canvas.width = videoRef.videoWidth || 1920;
                    canvas.height = videoRef.videoHeight || 1080;
                    Object.assign(canvas.style, {
                        position: "absolute",
                        top: "0",
                        left: "0",
                    });

                    debugLog("Inicializando nuevo detector...");
                    const landmarkDetector = new FaceLandmarkDetector(canvas);
                    setDetector(landmarkDetector);
                }

                // Reproducir el video
                videoRef.play().catch(error => {
                    debugError(new Error("Error al reproducir el video"), error);
                });

                // Iniciar la detección de landmarks
                processFrame();
            } else {
                videoRef.pause();
                // Detener la detección de landmarks cuando se pausa
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = undefined;
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
            // Agregar estas líneas para limpiar el detector
            if (detector()) {
                detector()?.destroy();
                setDetector(null);
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = undefined;
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
                videoRef.autoplay = false;
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

                if (!detector()) {
                    const landmarkDetector = new FaceLandmarkDetector(canvas);
                    setDetector(landmarkDetector);
                }

                debugLog("Iniciando detección de landmarks...");
                // Iniciar la detección de landmarks
                processFrame();
            } catch (error) {
                debugError(error as Error, "Error al acceder a la cámara");
                setIsCameraOn(false);
            }
        }
    };
    const [currentFPS, setCurrentFPS] = createSignal(0);
    const [frameCount, setFrameCount] = createSignal(0);
    const [lastFPSUpdate, setLastFPSUpdate] = createSignal(Date.now());

    const updateFPS = () => {
        const now = Date.now();
        const timeDiff = now - lastFPSUpdate();
        const frames = frameCount();

        if (timeDiff >= 1000) { // Cada segundo
            setCurrentFPS(frames);
            setFrameCount(0);
            setLastFPSUpdate(now);
        } else {
            setFrameCount(frames + 1);
        }
    };

    const processFrame = async () => {
        const det = detector();
        if (!det) {
            debugError(new Error("Detector no está disponible"));
            return;
        }
        updateFPS();
        //   // Calcular el tiempo mínimo entre frames basado en la tasa de refresco
        //   const minFrameTime = 1000 / frameRate();
        //   const currentTime = Date.now();

        //   // Solo procesar si ha pasado suficiente tiempo
        //   if (currentTime - lastFrameTime() < minFrameTime) {
        //       return;
        //   }

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

                const colors = playersConfig().map(p => sanitizedColor(p.color));
                // Dibujar landmarks en el canvas
                det.drawResults(results, colors);

                // Procesar blendshapes para cada jugador
                const players = playersConfig();
                results.faceBlendshapes.forEach((blendShapes, index) => {
                    if (!blendShapes) return;

                    const player = players[index];
                    if (!player) return;

                    const findScore = (names: string) => blendShapes.categories.find(category => category.categoryName === names)?.score ?? 0;

                    const eyeBlinkLeft = findScore("eyeBlinkLeft");
                    const eyeBlinkRight = findScore("eyeBlinkRight");
                    const jawOpen = findScore("jawOpen");
                    const eyesClosed = ((eyeBlinkLeft + eyeBlinkRight) / 2 > player.rateEyesClosed);
                    const mouthOpen = (jawOpen > player.rateMouthOpen);


                    debugLog(`Player ${player.characterId} scores:`, {
                        eyeBlinkLeft,
                        eyeBlinkRight,
                        jawOpen,
                        eyesClosed,
                        mouthOpen
                    });

                    setPlayerState(player.characterId, {
                        ...player,
                        eyeBlinkLeftScore: eyeBlinkLeft,
                        eyeBlinkRightScore: eyeBlinkRight,
                        jawOpenScore: jawOpen,
                        eyesClosed: eyesClosed,
                        mouthOpen: mouthOpen
                    });
                })
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
        setColors(playersConfig()[0].color);
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
                        src={videoSource()}
                        playsinline
                        loop
                        muted
                    />
                    <canvas
                        ref={el => (canvasRef = el!)}
                        width={1920}
                        height={1080}
                    />
                    <input
                        type="file"
                        accept="video/*"
                        style={{ display: 'none' }}
                        ref={el => (fileInputRef = el!)}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setVideoSource(url);
                                videoRef?.pause();
                            }
                        }}
                    />
                    <div
                        classList={{
                            "video-control-container": true,
                            "playing": isVideoPlaying()
                        }}>
                        <span
                            class="video-control-button"
                            onClick={handleVideoClick}
                            style={{
                                display: isCameraOn() ? "none" : "flex",
                            }}
                        >
                            {isVideoPlaying() ? <HiOutlinePause /> : <HiOutlinePlay />}
                        </span>
                        <span style={{ top: "0.5rem", left: "0.5rem", position: "absolute" }}>
                            {currentFPS()} FPS
                        </span>
                        <button
                            onClick={() => fileInputRef?.click()}
                            class="video-control-button file"
                            style={{
                                display: isCameraOn() ? "none" : "flex",
                                opacity: isVideoPlaying() ? 0 : 1,
                            }}
                            title="Cargar video"
                        >
                            <HiOutlineFilm />
                            <span>
                                Cargar video
                            </span>
                        </button>
                    </div>

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
                            class="switch-button"
                            type="button"
                            role="switch"
                            aria-checked={!isVideoHidden()}
                            onClick={() => { setIsVideoHidden(!isVideoHidden()) }}
                            value="on"
                        >
                            <span class="switch-button-icon" />
                        </button>
                        <label>{isVideoHidden() ? "Mostrar " : "Ocultar "} {isCameraOn() ? "Cámara" : "Video"}</label>

                    </div>
                </div>

                <div>
                    {playersConfig().map(player => <Score characterId={player.characterId} color={player.color} />)}
                </div>
            </div>

            <div class="players">
                <div class="players-container">
                    {playersConfig().map(player => <Avatar characterId={player.characterId} />)}
                </div>
                <Tools />
            </div>
        </div >
    );
};

export default WebcamViewer;