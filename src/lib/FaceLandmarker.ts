import { FaceLandmarker, DrawingUtils, FilesetResolver } from "@mediapipe/tasks-vision";

type blendshapesCategory = {
    index: number,
    score: number;
    categoryName: string;
    displayName: string
}

export class FaceLandmarkDetector {
    private faceLandmarker: FaceLandmarker | null = null; // Inicializar como null
    private drawingUtils!: DrawingUtils;
    private lastVideoTime = -1;

    constructor(private canvas: HTMLCanvasElement) {
        this.initialize();
    }

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

    async detect(video: HTMLVideoElement) {
        if (!this.faceLandmarker) throw new Error("Detector no inicializado");

        if (video.currentTime === this.lastVideoTime) return null;
        this.lastVideoTime = video.currentTime;

        return this.faceLandmarker.detectForVideo(video, performance.now());
    }

    // Añadir método de limpieza
    destroy() {
        this.faceLandmarker?.close();
        this.faceLandmarker = null;
    }

    drawResults(results: { faceLandmarks?: Array<any>, faceBlendshapes?: Array<any> }) {
        const ctx = this.canvas.getContext('2d')!;
        ctx.save();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (results.faceLandmarks && results.faceBlendshapes) {
            results.faceBlendshapes.forEach((blendshapes, index) => {
                //console.log(blendshapes.categories)
                const eyeBlinkLeft = blendshapes.categories.find((c: blendshapesCategory) => c.categoryName === 'eyeBlinkLeft').score;
                const eyeBlinkRight = blendshapes.categories.find((c: blendshapesCategory) => c.categoryName === 'eyeBlinkRight').score;
                const jawOpen = blendshapes.categories.find((c: blendshapesCategory) => c.categoryName === 'jawOpen').score;

                // const eyesClosed = (eyeBlinkLeft + eyeBlinkRight) / 2 > 0.5;
                // const mouthOpen = jawOpen > 0.3;

                // console.log(`Cara ${index + 1} detectada:`);
                // console.log(`Estado: ${eyesClosed ? 'Ojos Cerrados' : 'Ojos Abiertos'}, ${mouthOpen ? 'Boca Abierta' : 'Boca Cerrada'}`);
            });

            for (const landmarks of results.faceLandmarks) {
                // Dibujar la malla facial
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                    { color: '#C0C0C0', lineWidth: 1 }
                );

                // Dibujar los contornos faciales
                this.drawingUtils.drawConnectors(
                    landmarks,
                    FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
                    { color: '#E0E0E0', lineWidth: 2 }
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
                    { color: '#816AF7', lineWidth: 1 }
                );
            }
        } else {
            console.log("No landmarks");
        }
        ctx.restore();
    }


}