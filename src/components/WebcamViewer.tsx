import Avatar from "./Avatar";
import AvatarRenderer from "./AvatarRenderer";
import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";

declare global {
    interface HTMLVideoElement {
        requestVideoFrameCallback(callback: (now: number, metadata: VideoFrameCallbackMetadata) => void): number;
        cancelVideoFrameCallback(handle: number): void;
    }

    interface VideoFrameCallbackMetadata {
        presentationTime: number;
        expectedDisplayTime: number;
        width: number;
        height: number;
        mediaTime: number;
        presentedFrames: number;
        processingDuration?: number;
        captureTime?: number;
        receiveTime?: number;
        rtpTimestamp?: number;
    }
}

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

    let videoRef: HTMLVideoElement | undefined;
    let canvasRef: HTMLCanvasElement | undefined;
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);
    let frameCallbackId: number | undefined;
    let isRunning = true;
    let lastVideoTime = 0;

    const handleVisibilityChange = () => {
        if (!videoRef) return;

        if (document.hidden) {
            // Cuando la página está oculta, seguimos reproduciendo pero ocultamos el video
            videoRef.style.display = 'none';
            if (videoRef.paused) {
                videoRef.play().catch(console.error);
            }
        } else {
            // Cuando la página es visible, mostramos el video
            videoRef.style.display = 'block';
        }
    };

    const handleAvatarRender = async (characterId: string, imageData: string) => {
        try {
            // Convertir la imagen base64 a Blob
            const response = await fetch(imageData);
            const blob = await response.blob();
            
            // Crear un archivo
            const file = new File([blob], `${characterId}.png`, { type: 'image/png' });
            
            // Crear un FormData y añadir el archivo
            const formData = new FormData();
            formData.append('avatar', file);
            
            // Guardar en la carpeta public/avatars
            await fetch(`http://localhost:3001/save-avatar/${characterId}`, {
                method: 'POST',
                body: formData
            });
        } catch (error) {
            console.error('Error guardando avatar:', error);
        }
    };

    const sendAvatarState = async () => {
        const avatarState = {
            eyesClosedP1: eyesClosedP1(),
            mouthOpenP1: mouthOpenP1(),
            eyeBlinkLeftScoreP1: eyeBlinkLeftScoreP1(),
            eyeBlinkRightScoreP1: eyeBlinkRightScoreP1(),
            jawOpenScoreP1: jawOpenScoreP1(),
            eyesClosedP2: eyesClosedP2(),
            mouthOpenP2: mouthOpenP2(),
            eyeBlinkLeftScoreP2: eyeBlinkLeftScoreP2(),
            eyeBlinkRightScoreP2: eyeBlinkRightScoreP2(),
            jawOpenScoreP2: jawOpenScoreP2()
        };

        try {
            await fetch('http://localhost:3001/avatar-state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(avatarState),
                keepalive: true
            });
        } catch (error) {
            console.error('Error sending avatar state:', error);
        }
    };

    const processVideoFrame = async () => {
        if (!videoRef || !canvasRef || !detector() || !isRunning) return;

        try {
            if (videoRef.currentTime === lastVideoTime) {
                if (videoRef.paused) {
                    await videoRef.play();
                }
                frameCallbackId = videoRef.requestVideoFrameCallback(processVideoFrame);
                return;
            }

            lastVideoTime = videoRef.currentTime;

            const results = await detector()!.detect(videoRef);
            
            if (results && results.faceBlendshapes && results.faceBlendshapes.length > 0) {
                if (results.faceBlendshapes[0]) {
                    const blendshapes = results.faceBlendshapes[0];
                    const findScore = (name: string) =>
                        blendshapes.categories.find(
                            (c: { categoryName: string; score: number }) => c.categoryName === name
                        )?.score ?? 0;

                    const eyeBlinkLeft = findScore("eyeBlinkLeft");
                    const eyeBlinkRight = findScore("eyeBlinkRight");
                    const jawOpen = findScore("jawOpen");
                    
                    setEyeBlinkLeftScoreP1(eyeBlinkLeft);
                    setEyeBlinkRightScoreP1(eyeBlinkRight);
                    setJawOpenScoreP1(jawOpen);

                    setEyesClosedP1((eyeBlinkLeft + eyeBlinkRight) / 2 > 0.4);
                    setMouthOpenP1(jawOpen > 0.09);
                }
                
                detector()!.drawResults(results);
                
                sendAvatarState();
            }
        } catch (error) {
            console.error('Error processing video frame:', error);
        }

        if (isRunning && videoRef) {
            frameCallbackId = videoRef.requestVideoFrameCallback(processVideoFrame);
        }
    };

    onCleanup(() => {
        isRunning = false;
        if (frameCallbackId && videoRef) {
            videoRef.cancelVideoFrameCallback(frameCallbackId);
        }
        detector()?.destroy();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    });

    onMount(async () => {
        try {
            document.addEventListener('visibilitychange', handleVisibilityChange);

            videoRef!.width = 1920;
            videoRef!.height = 1080;
            
            const canvas = canvasRef!;
            canvas.width = videoRef!.width;
            canvas.height = videoRef!.height;

            videoRef!.src = "/video.mp4";
            videoRef!.loop = true;
            videoRef!.muted = true;
            videoRef!.playsInline = true;
            videoRef!.autoplay = true;
            
            videoRef!.onloadedmetadata = () => {
                videoRef!.play().catch(console.error);
            };

            videoRef!.addEventListener('pause', () => {
                if (isRunning) {
                    videoRef!.play().catch(console.error);
                }
            });

            const faceLandmarker = new FaceLandmarkDetector(canvasRef!);
            await faceLandmarker.initialize();
            setDetector(faceLandmarker);

            frameCallbackId = videoRef!.requestVideoFrameCallback(processVideoFrame);
        } catch (error) {
            console.error("Error al inicializar:", error);
        }
    });

    return (
        <div style={{
            display: "flex",
            gap: "20px",
            "flex-direction": "column",
            "justify-content": "center",
            "align-items": "center",
            padding: "20px",
        }}>
            <div style={{
                display: "flex",
                gap: "20px",
                'width': '1920px',
                'height': 'auto',
                'max-width': '100%',
                'aspect-ratio': '16/9',
                padding: '5px',
            }}>
                <Avatar
                    characterId="face1"
                    eyesClosed={eyesClosedP1()}
                    mouthOpen={mouthOpenP1()}
                    eyeBlinkLeftScore={eyeBlinkLeftScoreP1()}
                    eyeBlinkRightScore={eyeBlinkRightScoreP1()}
                    jawOpenScore={jawOpenScoreP1()}
                />
                <Avatar
                    characterId="face2"
                    eyesClosed={eyesClosedP2()}
                    mouthOpen={mouthOpenP2()}
                    eyeBlinkLeftScore={eyeBlinkLeftScoreP2()}
                    eyeBlinkRightScore={eyeBlinkRightScoreP2()}
                    jawOpenScore={jawOpenScoreP2()}
                />
            </div>

            <div class="webcam-container" style="position: relative; width: 640px; height: 480px;">
                <video ref={el => (videoRef = el!)} autoplay muted playsinline />
                <canvas
                    ref={el => (canvasRef = el!)}
                    width={1920}
                    height={1080}
                    style="width: 100%; height: 100%; object-fit: cover;"
                />
            </div>

            {/* Renderizadores de avatar ocultos */}
            <AvatarRenderer
                characterId="face1"
                eyesClosed={eyesClosedP1()}
                mouthOpen={mouthOpenP1()}
                onRender={(imageData) => handleAvatarRender('face1', imageData)}
            />
            <AvatarRenderer
                characterId="face2"
                eyesClosed={eyesClosedP2()}
                mouthOpen={mouthOpenP2()}
                onRender={(imageData) => handleAvatarRender('face2', imageData)}
            />
        </div>
    );
};

export default WebcamViewer;