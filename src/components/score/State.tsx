import { createEffect, createMemo, createSignal } from "solid-js";
import { playersConfig, playersStates } from "../../data/signals/player";
import { AvatarConfig } from "../../data/types/avatar";

interface ScoreProps {
    characterId: string
}
const State = ({ characterId }: ScoreProps) => {

    const state = createMemo(() => {
        return playersStates().find(p => p.characterId === characterId);
    });

    const [playerConfig, setPlayerConfig] = createSignal<AvatarConfig | null>(playersConfig().find(p => p.characterId === characterId)!);

    createEffect(() => {
        setPlayerConfig(playersConfig().find(p => p.characterId === characterId)!);
    });

    /*
    const { rateEyesClosed, rateMouthOpen } = playerConfig()!;

    const getScore = (score: number, rate: number) => {
        if (rate === 0) return 100;
        const percentage = ((score / rate) * 100).toFixed(0);
        return Number(percentage) > 100 ? 100 : Number(percentage);
    };
    */

    const getPercentage = (score: number) => {
        const percentage = ((score * 100)).toFixed(0);
        return Number(percentage);
    };


    return (
        <div class="state-container">
            <div class="state">
                <p>Boca abierta: <span>{state()!.mouthOpen ? "Si" : "No"}</span></p>

                <div class="progress">
                    <p>{getPercentage(state()!.jawOpenScore)}%</p>
                    <progress max={1} value={state()!.jawOpenScore} > {state()!.jawOpenScore} </progress>
                </div>
            </div>
            <div class="state">
                <p>Ojos cerrados: <span>{state()!.eyesClosed ? "Si" : "No"}</span></p>
                <div class="progress-container">
                    <div class="progress">
                        <p> Izquierdo: {getPercentage(state()!.eyeBlinkLeftScore)}% </p>
                        <progress max={1} value={state()!.eyeBlinkLeftScore} > {state()!.eyeBlinkLeftScore} </progress>
                    </div>
                    <div class="progress">
                        <p> Derecho: {getPercentage(state()!.eyeBlinkRightScore)}% </p>
                        <progress max={1} value={state()!.eyeBlinkRightScore} > {state()!.eyeBlinkRightScore} </progress>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default State;