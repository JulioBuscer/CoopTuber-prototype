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
import { getColorHover } from "../utils/utils";

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
        this.initialize();
    }

    /**
     * Inicializa el detector de puntos faciales
     * @async
     * @throws {Error} Si hay un error durante la inicialización
     */
    async initialize() {
        try {
            if (import.meta.env.PROD) {
                // Use CDN in production
                if (!window.vision) {
                    await new Promise(resolve => {
                        const checkVision = () => {
                            if (window.vision) resolve(true);
                            else setTimeout(checkVision, 100);
                        };
                        checkVision();
                    });
                }
                return this.initWithCDN();
            } else {
                // Use local modules in development
                const vision = await import('@mediapipe/tasks-vision');
                const { DrawingUtils } = vision;
                return this.initWithModules(vision, DrawingUtils);
            }
        } catch (error) {
            console.error('Error initializing detector:', error);
            throw error;
        }
    }

    private async initWithCDN() {
        if (!window.vision) throw new Error("Vision CDN not loaded");

        const vision = window.vision;
        const filesetResolver = await vision.FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm/vision_wasm_internal.js'
        );

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

        // Crear instancia de DrawingUtils
        this.drawingUtils = new vision.DrawingUtils(this.canvas.getContext('2d')!);
    }

    private async initWithModules(
        vision: typeof import('@mediapipe/tasks-vision'),
        DrawingUtils: typeof import('@mediapipe/tasks-vision').DrawingUtils
    ) {
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

        // Crear instancia de DrawingUtils
        this.drawingUtils = new DrawingUtils(this.canvas.getContext('2d')!);
    }

    async detect(video: HTMLVideoElement) {
        if (!this.faceLandmarker) throw new Error("Detector no inicializado");
        if (video.currentTime === this.lastVideoTime) return null;

        this.lastVideoTime = video.currentTime;
        return this.faceLandmarker.detectForVideo(video, performance.now());
    }

    destroy() {
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