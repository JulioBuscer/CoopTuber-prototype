import Avatar from "./Avatar";
import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";

type BlendshapesCategory = {
    categoryName: string;
    score: number;
};

const WebcamViewer = () => {
    const [eyesClosedP1, setEyesClosedP1] = createSignal(false);
    const [mouthOpenP1, setMouthOpenP1] = createSignal(false);

    const [eyesClosedP2, setEyesClosedP2] = createSignal(false);
    const [mouthOpenP2, setMouthOpenP2] = createSignal(false);

    const [eyeBlinkLeftScoreP1, setEyeBlinkLeftScoreP1] = createSignal(0);
    const [eyeBlinkRightScoreP1, setEyeBlinkRightScoreP1] = createSignal(0);
    const [jawOpenScoreP1, setJawOpenScoreP1] = createSignal(0);

    const [eyeBlinkLeftScoreP2, setEyeBlinkLeftScoreP2] = createSignal(0);
    const [eyeBlinkRightScoreP2, setEyeBlinkRightScoreP2] = createSignal(0);
    const [jawOpenScoreP2, setJawOpenScoreP2] = createSignal(0);

    const [rateEyesClosedP1, setRateEyesClosedP1] = createSignal(0.05);
    const [rateEyesClosedP2, setRateEyesClosedP2] = createSignal(0.02);
    const [rateMouthOpenP1, setRateMouthOpenP1] = createSignal(0.07);
    const [rateMouthOpenP2, setRateMouthOpenP2] = createSignal(0.07);

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
            try {
                // Solicitar acceso a la cámara
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 1920, //Ancho deseado
                        height: 1080, //Alto deseado
                        facingMode: "user", // usar la camara frontal
                        aspectRatio: 16 / 9, // Proporcion deseada
                    }
                });
                //Asignar el stream al elemento video
                videoRef!.srcObject = stream;
            } catch (error) {
                console.error("Error al acceder a la cámara", error);
                alert("¡Necesitas permitir el acceso a la cámara para usar esta app! 😅");
            }

            // Usar video estático en lugar de webcam
            const video = videoRef!;
            

            video.onerror = (e) => console.error("Video error:", e);

            // Forzar tamaño de canvas y video
            video.width = 1920;
            video.height = 1080;
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
                        results.faceBlendshapes
                    ) {

                        if (results.faceBlendshapes[0]) {
                            const blendshapes = results.faceBlendshapes[0];
                            const findScore = (name: string) =>
                                blendshapes.categories.find(
                                    (c: BlendshapesCategory) => c.categoryName === name
                                )?.score ?? 0;

                            const eyeBlinkLeft = findScore("eyeBlinkLeft");
                            const eyeBlinkRight = findScore("eyeBlinkRight");
                            const jawOpen = findScore("jawOpen");
                            setEyeBlinkLeftScoreP1(eyeBlinkLeft);
                            setEyeBlinkRightScoreP1(eyeBlinkRight);
                            setJawOpenScoreP1(jawOpen);

                            setEyesClosedP1((eyeBlinkLeft + eyeBlinkRight) / 2 > rateEyesClosedP1());
                            setMouthOpenP1(jawOpen > rateMouthOpenP1());
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
                            setEyeBlinkLeftScoreP2(eyeBlinkLeft);
                            setEyeBlinkRightScoreP2(eyeBlinkRight);
                            setJawOpenScoreP2(jawOpen);

                            setEyesClosedP2((eyeBlinkLeft + eyeBlinkRight) / 2 > rateEyesClosedP2());
                            setMouthOpenP2(jawOpen > rateMouthOpenP2());
                        }

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
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center",
                padding: "20px",
            }}
        >

            <div class="card webcam-container"
            style={{
                display: "flex",
                "aspect-ratio": "16/9",
                padding: "8px",
            }}>
                <video ref={el => (videoRef = el!)} autoplay muted playsinline />
                <canvas
                    ref={el => (canvasRef = el!)}
                    width={1920}
                    height={1080}
                    style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;"
                />
            </div>
            <div
                style={{
                    display: "flex",
                    "flex-direction": "column",
                    gap: "20px",
                    'max-width': '100%',
                    'aspect-ratio': '16/9',
                    //'background-color': '#00FF00',
                    padding: '5px',
                }}>
                <Avatar
                    characterId="P1"
                    eyesClosed={eyesClosedP1()}
                    mouthOpen={mouthOpenP1()}
                    eyeBlinkLeftScore={eyeBlinkLeftScoreP1()}
                    eyeBlinkRightScore={eyeBlinkRightScoreP1()}
                    jawOpenScore={jawOpenScoreP1()}
                    rateEyesClosed={[rateEyesClosedP1, setRateEyesClosedP1]}
                    rateMouthOpen={[rateMouthOpenP1, setRateMouthOpenP1]}
                />

                <Avatar
                    characterId="P2"
                    eyesClosed={eyesClosedP2()}
                    mouthOpen={mouthOpenP2()}
                    eyeBlinkLeftScore={eyeBlinkLeftScoreP2()}
                    eyeBlinkRightScore={eyeBlinkRightScoreP2()}
                    jawOpenScore={jawOpenScoreP2()}
                    rateEyesClosed={[rateEyesClosedP2, setRateEyesClosedP2]}
                    rateMouthOpen={[rateMouthOpenP2, setRateMouthOpenP2]}
                />
            </div>
        </div>
    );
};

export default WebcamViewer;