import { Component, Signal } from "solid-js";
import usePlayers, { players } from "../data/signals/player";

interface ScoreProps {
    faceName: string;
}

const Score: Component<ScoreProps> = (props) => {
    const player = players().find(p => p.characterId === props.faceName);
    if (!player) {
        return <> No se encontro el jugador {props.faceName}</>;
    };

    const { rateEyesClosed, rateMouthOpen, eyeBlinkLeftScore, eyeBlinkRightScore, jawOpenScore } = player;

    return (
        <div >
            <div>
                <h4>Eye Blink Left:</h4>
                <p>{eyeBlinkLeftScore.toFixed(2)}</p>
                <progress max={rateEyesClosed} value={eyeBlinkLeftScore} > {eyeBlinkLeftScore} </progress>

            </div>
            <div>
                <h4>Eye Blink Right:</h4>
                <p>{eyeBlinkRightScore.toFixed(2)}</p>
                <progress max={rateEyesClosed} value={eyeBlinkRightScore} > {eyeBlinkRightScore} </progress>
            </div>
            <div>
                <h4>Jaw Open:</h4>
                <p>{jawOpenScore.toFixed(2)}</p>
                <progress max={rateMouthOpen} value={jawOpenScore} > {jawOpenScore} </progress>
            </div>
        </div>
    );
}

export default Score;