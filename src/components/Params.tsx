import { Component, createSignal, createEffect } from 'solid-js';
import { playersConfig, selectedPlayer, setPlayersConfig } from '../data/signals/player';
import { AvatarConfig } from '../data/types/avatar';

type ParamsProps = {};

const Params: Component<ParamsProps> = () => {
    const [player, setPlayer] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null
    );
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    if (!player()) return null;

    const handleChangeRateMouthOpen = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value) / 100;
        setPlayersConfig(prev => {
            return prev.map(p => p.characterId === player()!.characterId ? { ...p, rateMouthOpen: value } : p);
        });
    };

    const handleChangeRateEyesClosed = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value) / 100;
        setPlayersConfig(prev => {
            return prev.map(p => p.characterId === player()!.characterId ? { ...p, rateEyesClosed: value } : p);
        });
    };

    return (

        <div class="tools-params-container" >
            <div class="tools-params-container-item">
                <div class="tools-params-container-item-label">
                    <label for="rateMouthOpen">Hablar:</label>
                    <input id="rateMouthOpen"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={player()!.rateMouthOpen * 100}

                        onChange={handleChangeRateMouthOpen}
                    />
                    <span>%</span>
                </div>
                <input id="rateMouthOpen"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={player()!.rateMouthOpen * 100}
                    onChange={handleChangeRateMouthOpen}
                />
            </div>
            <div class="tools-params-container-item">
                <div class="tools-params-container-item-label">
                    <label for="rateEyesClosed">Papadear:</label>
                    <input id="rateEyesClosed"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={player()!.rateEyesClosed * 100}
                        onChange={handleChangeRateEyesClosed}
                    />
                    <span>%</span>
                </div>
                <input id="rateEyesClosed"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={player()!.rateEyesClosed * 100}
                    onChange={handleChangeRateEyesClosed}
                />
            </div>
        </div >
    );
};
export default Params;