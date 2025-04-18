import { createSignal, onCleanup, onMount } from "solid-js";
import { FaceLandmarkDetector } from "../lib/FaceLandmarker";

const WebcamViewer = () => {

    // Referencia al elemento <video>
    let videoRef!: HTMLVideoElement;
    let canvasRef!: HTMLCanvasElement;
    const [detector, setDetector] = createSignal<FaceLandmarkDetector | null>(null);
    let animationFrameId: number;

    // Hook de ciclo de vida: cuando el componente se monta
    // Configurar la limpieza fuera del onMount
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

            // Usar Video estatico en lugar de webcam
            const video = videoRef;
            video.onerror = (e) => console.error("Video error:", e);

            // Forzar tamaño de canvas y video
            video.width = 640;
            video.height = 480;
            canvasRef.width = video.width;
            canvasRef.height = video.height;
            canvasRef.style.position = 'absolute';
            canvasRef.style.top = '0';
            canvasRef.style.left = '0';

            video.src = '/video.mp4';
            video.loop = true;
            video.muted = true;
            await video.play();

            const landmarkDetector = new FaceLandmarkDetector(canvasRef);
            await landmarkDetector.initialize();
            setDetector(landmarkDetector);

            const processFrame = async () => {
                if (!detector()) return;
                try {
                    const results = await detector()!.detect(video);
                    if (results && results.faceLandmarks) {
                        console.log(`Se detectaron ${results.faceLandmarks.length} caras`);
                        detector()!.drawResults(results);
                    } else {
                        console.log("No se detectaron landmarks");
                    }
                } catch (error) {
                    console.error("Error al detectar landmarks:", error);
                }
                animationFrameId = requestAnimationFrame(processFrame);
            }

            processFrame();
        } catch (error) {
            console.error("Error al acceder a la camara", error)
            alert("¡Necesitas permitir el acceso a la cama para usar esta app! 📸")
        }
    });
    return (
        <div class="webcam-container" style="position: relative; width: 640px; height: 480px;">
            {/* Elemento <video> para mostrar el stream de video */}
            <video
                ref={videoRef!} //Asignar la referencia al elemento video
                autoplay        //Iniciar la reproducción automáticamente
                muted           //Silenciar para evitar eco
                playsinline     //Mostrar en línea sin controles para iOS
            />
            <canvas
                ref={canvasRef!}
                width={640}
                height={480}
                style="width: 100%; height: 100%; object-fit: cover;"
            />
        </div >
    )
}

export default WebcamViewer;