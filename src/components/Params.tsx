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
        const value = parseFloat((e.target as HTMLInputElement).value);
        setPlayersConfig(prev => {
            return prev.map(p => p.characterId === player()!.characterId ? { ...p, rateMouthOpen: value } : p);
        });
    };

    const handleChangeRateEyesClosed = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setPlayersConfig(prev => {
            return prev.map(p => p.characterId === player()!.characterId ? { ...p, rateEyesClosed: value } : p);
        });
    };

    return (

        <div style={{ display: 'grid' }} >
            <div style={{
                display: 'grid',
                gap: '8px',
                'grid-template-columns': '20ch 10ch',
                'align-items': 'start',
                'justify-content': 'start',
                'width': '100%',
                'text-align': 'end'
            }}>
                <label for="rateMouthOpen">Rate Mouth Open:</label>
                <input id="rateMouthOpen"
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={player()!.rateMouthOpen}
                    onChange={handleChangeRateMouthOpen}
                />
                <label for="rateEyesClosed">Rate Eyes Closed:</label>
                <input id="rateEyesClosed"
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={player()!.rateEyesClosed}
                    onChange={handleChangeRateEyesClosed}
                />
            </div>
        </div >
    );
};
export default Params;