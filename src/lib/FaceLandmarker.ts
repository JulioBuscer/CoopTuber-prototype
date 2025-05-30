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

import { FaceLandmarker, DrawingUtils, FilesetResolver } from "@mediapipe/tasks-vision";
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
    /**
     * Instancia del detector de puntos faciales
     * @type {FaceLandmarker | null}
     */
    private faceLandmarker: FaceLandmarker | null = null;

    /**
     * Utilidad para dibujar los puntos detectados
     * @type {DrawingUtils}
     */
    private drawingUtils!: DrawingUtils;

    /**
     * Tiempo del último frame procesado
     * @type {number}
     */
    private lastVideoTime = -1;

    /**
     * Constructor de la clase FaceLandmarkDetector
     * @param {HTMLCanvasElement} canvas - Canvas donde se dibujarán los puntos
     */
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
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm'
            );

            this.faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                    delegate: 'GPU'
                },
                outputFaceBlendshapes: true,
                numFaces: 2,
                runningMode: 'VIDEO',
                minTrackingConfidence: 0.3
            });

            this.drawingUtils = new DrawingUtils(this.canvas.getContext('2d')!);
        } catch (error) {
            console.error('Error initializing detector:', error);
            throw error;
        }
    }

    /**
     * Detecta puntos faciales en el video
     * @async
     * @param {HTMLVideoElement} video - Elemento de video a procesar
     * @returns {Promise<any | null>} Resultados de la detección o null si no hay cambios
     * @throws {Error} Si el detector no está inicializado
     */
    async detect(video: HTMLVideoElement) {
        if (!this.faceLandmarker) throw new Error("Detector no inicializado");

        if (video.currentTime === this.lastVideoTime) return null;
        this.lastVideoTime = video.currentTime;

        return this.faceLandmarker.detectForVideo(video, performance.now());
    }

    /**
     * Limpia los recursos del detector
     */
    destroy() {
        this.faceLandmarker?.close();
        this.faceLandmarker = null;
    }

    /**
     * Dibuja los resultados de la detección en el canvas
     * @param {Object} results - Resultados de la detección
     * @param {Array<any>} results.faceLandmarks - Puntos de referencia faciales
     * @param {Array<any>} results.faceBlendshapes - Formas de expresión facial
     * @param {Array<string>} [playersColor] - Colores de los jugadores
     */
    drawResults(results: { faceLandmarks?: Array<any>, faceBlendshapes?: Array<any> }, playersColor?: Array<string>) {
        const ctx = this.canvas.getContext('2d')!;
        ctx.save();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (results.faceLandmarks && results.faceBlendshapes) {
            let index = 0;
            for (const landmarks of results.faceLandmarks) {
                // Dibujar la malla facial
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: getColorHover(playersColor?.[index] ??'#C0C0C0'), lineWidth: 1 }
                );

                // Dibujar los contornos faciales
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: playersColor?.[index] ??'#E0E0E0', lineWidth: 4}
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