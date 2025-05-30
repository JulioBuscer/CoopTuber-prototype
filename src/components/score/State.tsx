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

    const [_, setPlayerConfig] = createSignal<AvatarConfig | null>(playersConfig().find(p => p.characterId === characterId)!);

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
                    <div class="custom-progress-container">
                        <div class="custom-progress-bar">
                            <div class="custom-progress-fill"
                                style={{ width: `${getPercentage(state()!.jawOpenScore)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="state">
                <p>Ojos cerrados: <span>{state()!.eyesClosed ? "Si" : "No"}</span></p>
                <div class="progress-container">
                    <div class="progress">
                        <p> Izquierdo: {getPercentage(state()!.eyeBlinkLeftScore)}% </p>
                        <div class="custom-progress-container">
                            <div class="custom-progress-bar">
                                <div class="custom-progress-fill"
                                    style={{ width: `${getPercentage(state()!.eyeBlinkLeftScore)}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <p> Derecho: {getPercentage(state()!.eyeBlinkRightScore)}% </p>
                        <div class="custom-progress-container">
                            <div class="custom-progress-bar">
                                <div class="custom-progress-fill"
                                    style={{ width: `${getPercentage(state()!.eyeBlinkRightScore)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default State;