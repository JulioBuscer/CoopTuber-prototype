import { usePlayersStore } from "../data/store/players.store";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";
import Avatar from "./Avatar";
import { createSignal, onCleanup, onMount } from "solid-js";

type BlendshapesCategory = {
    categoryName: string;
    score: number;
};

const WebcamViewer = () => {

    const players = usePlayersStore();

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
                //alert("¡Necesitas permitir el acceso a la cámara para usar esta app! 😅");

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

    const handlePlayVideo = async () => {
        if (!videoRef) return;
        videoRef.src = "/video.mp4";
        videoRef.loop = true;
        videoRef.muted = true;
        await videoRef.play();
    };

    return (
        <div class="layout-panel">
            <div class="webcam">
                <div class="card webcam-container ">
                    <video ref={el => (videoRef = el!)} autoplay muted playsinline />
                    <canvas
                        ref={el => (canvasRef = el!)}
                        width={1920}
                        height={1080}
                        onClick={handlePlayVideo}
                    />
                </div>
            </div>

            <div class="players">
                <div class="players-container">
                    {
                        Object.entries(players).map(([playerId, avatar]) => (
                            <Avatar
                                characterId={playerId}
                                eyesClosed={avatar.eyesClosed}
                                mouthOpen={avatar.mouthOpen}
                                eyeBlinkLeftScore={avatar.eyeBlinkLeftScore}
                                eyeBlinkRightScore={avatar.eyeBlinkRightScore}
                                jawOpenScore={avatar.jawOpenScore}
                                rateEyesClosed={avatar.rateEyesClosed}
                                rateMouthOpen={avatar.rateMouthOpen}
                            />
                        ))
                    }
                </div>
                <div class="tools">
                    <div class="tools-bar">
                        {["Personaje", "Fondo", "Parametros", "Efectos", "Otros"].map((text, index) => (
                            <button>{text}</button>
                        ))}
                    </div>
                    <div class="tools-config">
                        <p>Espacio para las configuraciones</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebcamViewer;