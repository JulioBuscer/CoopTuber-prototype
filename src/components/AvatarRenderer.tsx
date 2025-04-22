import { createEffect } from "solid-js";

interface AvatarRendererProps {
    characterId: string;
    eyesClosed: boolean;
    mouthOpen: boolean;
    onRender?: (imageData: string) => void;
}

const AvatarRenderer = (props: AvatarRendererProps) => {
    let canvasRef: HTMLCanvasElement | undefined;

    const drawAvatar = () => {
        if (!canvasRef) return;
        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

        // Limpiar el canvas
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

        // Dibujar un círculo como cara base
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(200, 200, 150, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar ojos
        ctx.fillStyle = '#000000';
        if (!props.eyesClosed) {
            // Ojos abiertos
            ctx.beginPath();
            ctx.arc(140, 160, 20, 0, Math.PI * 2);
            ctx.arc(260, 160, 20, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Ojos cerrados
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(120, 160);
            ctx.lineTo(160, 160);
            ctx.moveTo(240, 160);
            ctx.lineTo(280, 160);
            ctx.stroke();
        }

        // Dibujar boca
        ctx.beginPath();
        if (props.mouthOpen) {
            ctx.arc(200, 250, 40, 0, Math.PI);
        } else {
            ctx.moveTo(160, 250);
            ctx.lineTo(240, 250);
        }
        ctx.stroke();

        // Convertir a imagen y enviar
        if (props.onRender) {
            props.onRender(canvasRef.toDataURL('image/png'));
        }
    };

    createEffect(() => {
        // Redibujar cuando cambien las props
        drawAvatar();
    });

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style="display: none;"
        />
    );
};

export default AvatarRenderer;
