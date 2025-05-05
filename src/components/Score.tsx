import { Component, createMemo } from "solid-js";
import { AvatarConfig } from "../data/types/avatar";
import { playersConfig, playersStates } from "../data/signals/player";

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

    const playerConfig = playersConfig().find(p => p.characterId === player.characterId);

    const { rateEyesClosed, rateMouthOpen } = playerConfig!;

    const getPercentage = (score: number, rate: number) => {
        if (rate === 0) return 100;
        const percentage = ((score / rate) * 100).toFixed(0);
        return Number(percentage) > 100 ? 100 : Number(percentage);
    };

    return (
        <div class="score-container" >
            <div class="player-name">
                <p>{player.characterId}</p>
            </div>
            <div class="state">
                <p>Boca abierta: <span>{state()!.mouthOpen ? "Si" : "No"}</span></p>

                <div class="progress">
                    <p>{getPercentage(state()!.jawOpenScore, rateMouthOpen)}%</p>
                    <progress max={rateMouthOpen} value={state()!.jawOpenScore} > {state()!.jawOpenScore} </progress>
                </div>
            </div>

            <div class="state">
                <p>Ojos cerrados: <span>{state()!.eyesClosed ? "Si" : "No"}</span></p>
                <div class="progress-container">
                    <div class="progress">
                        <p> Izquierdo: {getPercentage(state()!.eyeBlinkLeftScore, rateEyesClosed)}% </p>
                        <progress max={rateEyesClosed} value={state()!.eyeBlinkLeftScore} > {state()!.eyeBlinkLeftScore} </progress>
                    </div>
                    <div class="progress">
                        <p> Derecho: {getPercentage(state()!.eyeBlinkRightScore, rateEyesClosed)}% </p>
                        <progress max={rateEyesClosed} value={state()!.eyeBlinkRightScore} > {state()!.eyeBlinkRightScore} </progress>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;