/**
 * @file FaceLandmarker.ts
 * Clase que maneja la detección de puntos de referencia faciales usando MediaPipe
 * 
 * Esta clase:
 * - Inicializa el detector de puntos faciales de MediaPipe
 * - Dibuja los puntos de referencia faciales en el canvas
 * - Maneja la detección de múltiples caras
 * - Implementa limpieza de recursos
 */

// Importamos los tipos pero no la implementación
type FaceLandmarkerInstance = import('@mediapipe/tasks-vision').FaceLandmarker;
type DrawingUtilsInstance = import('@mediapipe/tasks-vision').DrawingUtils;
type FilesetResolverType = typeof import('@mediapipe/tasks-vision').FilesetResolver;

// Declaraciones globales para CDN

//const { FaceLandmarker, DrawingUtils, FilesetResolver } = await import('@mediapipe/tasks-vision');
declare global {
    interface Window {
        vision?: {
            FaceLandmarker: typeof import('@mediapipe/tasks-vision').FaceLandmarker;
            DrawingUtils: typeof import('@mediapipe/tasks-vision').DrawingUtils;
            FilesetResolver: FilesetResolverType;
        };
    }
}

import { FaceLandmarker } from "@mediapipe/tasks-vision";
import { debugLog, getColorHover } from "../utils/utils";

/**
 * Clase que implementa la detección de puntos de referencia faciales
 * 
 * Esta clase proporciona métodos para:
 * - Inicializar el detector de puntos faciales
 * - Detectar puntos faciales en video en tiempo real
 * - Dibujar los puntos detectados en el canvas
 * - Manejar la limpieza de recursos
 */
export class FaceLandmarkDetector {
    // Usamos tipos de instancia
    private faceLandmarker: FaceLandmarkerInstance | null = null;
    private drawingUtils: DrawingUtilsInstance | null = null;
    private lastVideoTime = -1;


    constructor(private canvas: HTMLCanvasElement) {
        if (!canvas) throw new Error("Canvas no proporcionado");
        debugLog('FaceLandmarkDetector initialized con canvas:', canvas);
    }

    /**
     * Inicializa el detector de puntos faciales
     * @async
     * @throws {Error} Si hay un error durante la inicialización
     */
    async initialize() {
        try {
            if (import.meta.env.PROD) {
                // Usar CDN in production
                debugLog('Inicializando FaceLandmarker en producción');
                // Verificar si la variable global 'vision' está disponible
                if (!window.vision) {
                    debugLog('Cargando Vision CDN...');
                    await new Promise(resolve => {
                        const checkVision = () => {
                            if (window.vision) resolve(true);
                            else setTimeout(checkVision, 100);

                        };
                        checkVision();
                    });
                    debugLog('Vision CDN cargado');
                } else {
                    debugLog('Vision CDN ya cargado');
                    // Si ya está cargado, no hacemos nada
                }
                return this.initWithCDN();
            } else {
                // Usar local modules en desarrollo
                debugLog('Inicializando FaceLandmarker en desarrollo');
                const vision = await import('@mediapipe/tasks-vision');
                const { DrawingUtils } = vision;
                debugLog('Vision modulos cargados:', vision, DrawingUtils);
                return this.initWithModules(vision, DrawingUtils);
            }
        } catch (error) {
            throw new Error(`Error initializing detector: ${error}`);
        }
    }

    private async initWithCDN() {
        debugLog('Initializing FaceLandmarker con CDN');
        if (!window.vision) throw new Error("Vision CDN no cargado")

        const vision = window.vision;
        debugLog('Vision CDN cargado:', vision);
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm'
        );
        debugLog('FilesetResolver:', filesetResolver);

        // Crear instancia de FaceLandmarker

        this.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                delegate: 'GPU'
            },
            outputFaceBlendshapes: true,
            numFaces: 2,
            runningMode: 'VIDEO',
            minTrackingConfidence: 0.3
        });
        debugLog('FaceLandmarker instancia creada:', this.faceLandmarker);

        // Crear instancia de DrawingUtils
        this.drawingUtils = new vision.DrawingUtils(this.canvas.getContext('2d')!);
        debugLog('DrawingUtils instancia creada:', this.drawingUtils);
    }

    private async initWithModules(
        vision: typeof import('@mediapipe/tasks-vision'),
        DrawingUtils: typeof import('@mediapipe/tasks-vision').DrawingUtils
    ) {
        debugLog('Initializing FaceLandmarker con modulos locales');
        // Verificar si la variable global 'vision' está disponible
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
            import.meta.env.PROD
                ? '/CoopTuber-prototype/wasm'
                : '/node_modules/@mediapipe/tasks-vision/wasm'
        );

        // Crear instancia
        this.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                delegate: 'GPU'
            },
            outputFaceBlendshapes: true,
            numFaces: 2,
            runningMode: 'VIDEO',
            minTrackingConfidence: 0.3
        });
        debugLog('FaceLandmarker instancia creada:', this.faceLandmarker);

        // Crear instancia de DrawingUtils
        this.drawingUtils = new DrawingUtils(this.canvas.getContext('2d')!);
        debugLog('DrawingUtils instancia creada:', this.drawingUtils);
    }

    async detect(video: HTMLVideoElement) {
        // Verificar si el detector está inicializado y si el tiempo del video ha cambiado
        debugLog('Detectando face landmarks para video en tiempo: ', video.currentTime);
        if (!this.faceLandmarker) throw new Error("Detector no inicializado");
        if (video.currentTime === this.lastVideoTime) return null;

        this.lastVideoTime = video.currentTime;
        return this.faceLandmarker.detectForVideo(video, performance.now());
    }

    destroy() {
        debugLog('Destruyendo instancia FaceLandmarker');
        this.faceLandmarker?.close();
        this.faceLandmarker = null;
    }

    drawResults(
        results: { faceLandmarks?: any[], faceBlendshapes?: any[] },
        playersColor?: string[]
    ) {
        const ctx = this.canvas.getContext('2d')!;
        ctx.save();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (results.faceLandmarks && results.faceBlendshapes && this.faceLandmarker && this.drawingUtils) {
            let index = 0;
            for (const landmarks of results.faceLandmarks) {
                // Dibujar la malla facial
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: getColorHover(playersColor?.[index] ?? '#C0C0C0'), lineWidth: 1 }
                );
                // Dibujar los contornos faciales
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: playersColor?.[index] ?? '#E0E0E0', lineWidth: 4 }
                );

                // Dibujar los puntos de los ojos
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                    { color: '#30FF30', lineWidth: 1 }
                );
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                    { color: '#30FF30', lineWidth: 1 }
                );

                // Dibujar los puntos de los labios
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LIPS,
                    { color: '#30FF30', lineWidth: 1 }
                );

                // Dibujar los puntos de la mandíbula
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
                    { color: '#30FF30', lineWidth: 1 }
                );
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
                    { color: '#30FF30', lineWidth: 1 }
                );
                index++;
            }
        }
        ctx.restore();
    }
}