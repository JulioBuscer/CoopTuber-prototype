import { Component, createMemo } from "solid-js";
import { AvatarConfig, AvatarState } from "../data/types/avatar";
import { playersStates } from "../data/signals/player";

interface ScoreProps {
    player: AvatarConfig
}

const Score: Component<ScoreProps> = ({ player }) => {
    const state = createMemo(() => {
        return playersStates().find(p => p.characterId === player.characterId);
    });

    if (!state()) {
        return <> Cargando estado para {player.characterId}...</>;
    };

    const { rateEyesClosed, rateMouthOpen } = player;

    return (
        <div >
            <div>
                <h4>Eye Blink Left:</h4>
                <p>{state()!.eyeBlinkLeftScore.toFixed(2)}</p>
                <progress max={rateEyesClosed} value={state()!.eyeBlinkLeftScore} > {state()!.eyeBlinkLeftScore} </progress>

            </div>
            <div>
                <h4>Eye Blink Right:</h4>
                <p>{state()!.eyeBlinkRightScore.toFixed(2)}</p>
                <progress max={rateEyesClosed} value={state()!.eyeBlinkRightScore} > {state()!.eyeBlinkRightScore} </progress>
            </div>
            <div>
                <h4>Jaw Open:</h4>
                <p>{state()!.jawOpenScore.toFixed(2)}</p>
                <progress max={rateMouthOpen} value={state()!.jawOpenScore} > {state()!.jawOpenScore} </progress>
            </div>
        </div>
    );
}

export default Score;