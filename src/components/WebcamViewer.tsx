/**
 * @file WebcamViewer.tsx
 * Componente principal que maneja la detección facial y animación de avatares
 * 
 * Este componente es el corazón de la aplicación CoopTuber, encargándose de:
 * - Gestión de la cámara web
 * - Detección de puntos de referencia faciales
 * - Animación de avatares basada en expresiones faciales
 * - Control de video y FPS
 * - Interfaz de usuario para configuración
 */

import Avatar from "./Avatar";
import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";
import Score from "./score/Score";
import { playersConfig, setPlayerState, videoSource, setVideoSource } from "../data/signals/player";
import Tools from "./tools/Tools";
import { debugError, debugLog, sanitizedColor, setColors } from "../utils/utils";
import { HiOutlineFilm, HiOutlinePause, HiOutlinePlay } from "solid-icons/hi";

/**
 * Componente principal que maneja la detección facial y animación de avatares
 * @returns {JSX.Element} Componente de React con la interfaz de la cámara y control de avatares
 */
const WebcamViewer = () => {
    // Estados para control de cámara y video
    const [isCameraOn, setIsCameraOn] = createSignal(false);
    const [isVideoPlaying, setIsVideoPlaying] = createSignal(false);
    const [isVideoHidden, setIsVideoHidden] = createSignal(false);

    // Referencias a elementos del DOM
    let videoRef: HTMLVideoElement | undefined;
    let canvasRef: HTMLCanvasElement | undefined;
    let fileInputRef: HTMLInputElement | undefined;

    // Estado del detector facial y animación
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);
    let animationFrameId: number | undefined;
    let mediaStream: MediaStream | null = null;

    // Estados para medición de FPS
    const [currentFPS, setCurrentFPS] = createSignal(0);
    const [frameCount, setFrameCount] = createSignal(0);
    const [lastFPSUpdate, setLastFPSUpdate] = createSignal(Date.now());

    /**
     * Limpieza de recursos cuando el componente se desmonta
     */
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

    /**
     * Manejador para el botón de cámara
     */
    const handleCameraClick = () => {
        debugLog("Camera button clicked - isCameraOn:", isCameraOn());
        toggleCamera();
    };

    /**
     * Manejador para el botón de video
     */
    const handleVideoClick = () => {
        if (!videoSource()) {
            debugLog("No hay video cargado");
            return;
        }
        debugLog("Video button clicked - isVideoPlaying:", isVideoPlaying());
        toggleVideo();
    };

    /**
     * Alternar estado del video
     */
    const toggleVideo = () => {
        if (videoRef) {
            debugLog("Video paused:", videoRef.paused);
            if (videoRef.paused) {
                initializeDetectorAndPlay();
            } else {
                pauseVideo();
            }
            setIsVideoPlaying(!videoRef.paused);
        } else {
            debugError(new Error("No se encontró el elemento video"));
        }
    };

    /**
     * Inicializar detector y reproducir video
     */
    const initializeDetectorAndPlay = () => {
        if (!detector()) {
            const canvas = canvasRef!;
            canvas.width = videoRef!.videoWidth || 1920;
            canvas.height = videoRef!.videoHeight || 1080;
            setupCanvasStyle(canvas);
            
            debugLog("Inicializando nuevo detector...");
            const landmarkDetector = new FaceLandmarkDetector(canvas);
            setDetector(landmarkDetector);
        }
        
        videoRef!.play().catch(error => {
            debugError(new Error("Error al reproducir el video"), error);
        });
        processFrame();
    };

    /**
     * Configurar el estilo del canvas
     * @param {HTMLCanvasElement} canvas - Elemento canvas a configurar
     */
    const setupCanvasStyle = (canvas: HTMLCanvasElement) => {
        Object.assign(canvas.style, {
            position: "absolute",
            top: "0",
            left: "0",
        });
    };

    /**
     * Pausar video y detener detección
     */
    const pauseVideo = () => {
        videoRef!.pause();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = undefined;
        }
    };

    /**
     * Alternar estado de la cámara
     */
    const toggleCamera = async () => {
        if (isCameraOn()) {
            stopCamera();
        } else {
            await startCamera();
        }
    };

    /**
     * Detener la cámara y limpiar recursos
     */
    const stopCamera = () => {
        debugLog("Deteniendo la cámara...");
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        if (videoRef) {
            videoRef.srcObject = null;
            videoRef.pause();
        }
        cleanupDetector();
        setIsVideoPlaying(false);
        setIsCameraOn(false);
    };

    /**
     * Limpiar recursos del detector
     */
    const cleanupDetector = () => {
        if (detector()) {
            detector()?.destroy();
            setDetector(null);
        }
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = undefined;
        }
    };

    /**
     * Iniciar la cámara
     */
    const startCamera = async () => {
        debugLog("Iniciando la cámara...");
        try {
            if (!videoRef) {
                debugError(new Error("Video element no está disponible"));
                return;
            }

            setupVideoConfig();
            await setupCameraStream();
            await setupVideoPlayback();
            initializeDetector();
        } catch (error) {
            debugError(error as Error, "Error al acceder a la cámara");
            setIsCameraOn(false);
        }
    };

    /**
     * Configurar opciones del video
     */
    const setupVideoConfig = () => {
        videoRef!.autoplay = false;
        videoRef!.muted = true;
        videoRef!.playsInline = true;
        videoRef!.src="/video.mp4";
    };
    
    /**
     * Obtener stream de la cámara
 */
    const setupCameraStream = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 1920,
                height: 1080,
                facingMode: "user",
                aspectRatio: 16 / 9,
            }
        });
        videoRef!.srcObject = mediaStream;
    };

    /**
     * Configurar reproducción del video
     */
    const setupVideoPlayback = async () => {
        await waitForVideoMetadata();
        await videoRef!.play().catch(error => {
            debugError(new Error("Error al reproducir el video"), error);
            setIsVideoPlaying(false);
        });
    };

    /**
     * Esperar a que el video cargue sus metadatos
     */
    const waitForVideoMetadata = () => {
        return new Promise((resolve) => {
            videoRef!.onloadedmetadata = () => {
                debugLog("Video metadata cargado");
                resolve(true);
            };
        });
    };

    /**
     * Inicializar detector de puntos de referencia faciales
     */
    const initializeDetector = () => {
        const canvas = canvasRef!;
        canvas.width = videoRef?.videoWidth ?? 1920;
        canvas.height = videoRef?.videoHeight ?? 1080;
        setupCanvasStyle(canvas);

        if (!detector()) {
            const landmarkDetector = new FaceLandmarkDetector(canvas);
            setDetector(landmarkDetector);
        }
        processFrame();
    };

    /**
     * Actualizar contador de FPS
     */
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

    /**
     * Procesar el frame actual y detectar puntos de referencia faciales
     */
    const processFrame = async () => {
        const det = detector();
        if (!det) {
            debugError(new Error("Detector no está disponible"));
            return;
        }

        try {
            updateFPS();
            const results = await det.detect(videoRef!);
            debugLog("Resultados de detección:", results);

            if (results?.faceLandmarks && results.faceBlendshapes) {
                debugLog("Landmarks detectados!");
                processDetectionResults(det, results);
            } else {
                debugLog("No se detectaron landmarks en este frame");
            }
        } catch (error) {
            debugError(error as Error, "Error al detectar landmarks");
        }

        animationFrameId = requestAnimationFrame(processFrame);
    };

    /**
     * Procesar los resultados de la detección facial
     * @param {FaceLandmarkDetector} detector - Detector de landmarks
     * @param {any} results - Resultados de la detección facial
     */
    const processDetectionResults = (detector: FaceLandmarkDetector, results: any) => {
        const colors = playersConfig().map(p => sanitizedColor(p.color));
        detector.drawResults(results, colors);

        processBlendshapes(results.faceBlendshapes);
    };

    /**
     * Procesar los blendshapes para cada jugador
     * @param {any[]} blendshapes - Arreglo de blendshapes detectados
     */
    const processBlendshapes = (blendshapes: any[]) => {
        const players = playersConfig();
        blendshapes.forEach((blendShapes, index) => {
            if (!blendShapes) return;

            const player = players[index];
            if (!player) return;

            const findScore = (names: string) => blendShapes.categories.find((category: any) => category.categoryName === names)?.score ?? 0;
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

            updatePlayerState(player, {
                eyeBlinkLeftScore: eyeBlinkLeft,
                eyeBlinkRightScore: eyeBlinkRight,
                jawOpenScore: jawOpen,
                eyesClosed,
                mouthOpen
            });
        });
    };

    /**
     * Actualizar el estado de un jugador
     * @param {any} player - Configuración del jugador
     * @param {any} state - Nuevo estado del jugador
     */
    const updatePlayerState = (player: any, state: any) => {
        setPlayerState(player.characterId, {
            ...player,
            ...state
        });
    };

    // Inicializar la cámara cuando el componente se monta
    onMount(async () => {
        toggleCamera();
        setColors(playersConfig()[0].color);
    });

    return (
        <div class="layout-panel">
            <div class="webcam">
                <div class="card webcam-container">
                    <video
                        style={{
                            "z-index": isVideoHidden() ? -1 : 0
                        }}
                        ref={el => {
                            videoRef = el!;
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
                    <div classList={{
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
                            <span>Cargar video</span>
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
        </div>
    );
};

export default WebcamViewer;