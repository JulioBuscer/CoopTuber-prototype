import Avatar from "./Avatar";
import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";

type BlendshapesCategory = {
    categoryName: string;
    score: number;
};

const WebcamViewer = () => {
    const [eyesClosed, setEyesClosed] = createSignal(false);
    const [mouthOpen, setMouthOpen] = createSignal(false);

    let videoRef: HTMLVideoElement | undefined;
    let canvasRef: HTMLCanvasElement | undefined;
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);
    let animationFrameId: number | undefined;

    // Limpieza de recursos al desmontar el componente
    onCleanup(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        detector()?.destroy();
    });

    onMount(async () => {
        try {
            // Solicitar acceso a la cámara
            /*const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640, //Ancho deseado
                    height: 480, //Alto deseado
                    facingMode: "user" // usar la camara frontal
                }
            });*/
            //Asignar el stream al elemento video
            //videoRef.srcObject = stream;
            //setVideoStream(stream);

            // Usar video estático en lugar de webcam
            const video = videoRef!;
            video.onerror = (e) => console.error("Video error:", e);

            // Forzar tamaño de canvas y video
            video.width = 640;
            video.height = 480;
            const canvas = canvasRef!;
            canvas.width = video.width;
            canvas.height = video.height;
            Object.assign(canvas.style, {
                position: "absolute",
                top: "0",
                left: "0",
            });

            video.src = "/video.mp4";
            video.loop = true;
            video.muted = true;
            await video.play();

            const landmarkDetector = new FaceLandmarkDetector(canvas);
            await landmarkDetector.initialize();
            setDetector(landmarkDetector);

            const processFrame = async () => {
                const det = detector();
                if (!det) return;
                try {
                    const results = await det.detect(video);
                    if (
                        results &&
                        results.faceLandmarks &&
                        results.faceBlendshapes &&
                        results.faceBlendshapes[0]
                    ) {
                        const blendshapes = results.faceBlendshapes[0];
                        const findScore = (name: string) =>
                            blendshapes.categories.find(
                                (c: BlendshapesCategory) => c.categoryName === name
                            )?.score ?? 0;

                        const eyeBlinkLeft = findScore("eyeBlinkLeft");
                        const eyeBlinkRight = findScore("eyeBlinkRight");
                        const jawOpen = findScore("jawOpen");

                        setEyesClosed((eyeBlinkLeft + eyeBlinkRight) / 2 > 0.5);
                        setMouthOpen(jawOpen > 0.3);
                        det.drawResults(results);
                    } else {
                        console.log("No se detectaron landmarks");
                    }
                } catch (error) {
                    console.error("Error al detectar landmarks:", error);
                }
                animationFrameId = requestAnimationFrame(processFrame);
            };

            processFrame();
        } catch (error) {
            console.error("Error al acceder a la camara", error);
            alert("¡Necesitas permitir el acceso a la cámara para usar esta app! 😅");
        }
    });

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                "justify-content": "center",
                "align-items": "center",
                padding: "20px",
            }}
        >
            <div
                class="webcam-container"
                style="position: relative; width: 640px; height: 480px;"
            >
                <video ref={el => (videoRef = el!)} autoplay muted playsinline />
                <canvas
                    ref={el => (canvasRef = el!)}
                    width={640}
                    height={480}
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </div>
            <Avatar
                eyesClosed={eyesClosed()}
                mouthOpen={mouthOpen()}
                characterId="face1"
            />
        </div>
    );
};

export default WebcamViewer;