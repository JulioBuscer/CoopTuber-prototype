import { Component, createSignal, createEffect } from 'solid-js';
import { selectedPlayer, setPlayer } from '../data/signals/player';

type ParamsProps = {};

const Params: Component<ParamsProps> = () => {
    const [player, setPlayerState] = createSignal(selectedPlayer());
    
    createEffect(() => {
        setPlayerState(selectedPlayer());
    });

    if (!player() ) return null;

    const handleChangeRateMouthOpen = (e: Event) => {
        console.log('Rate Mouth Open:', (e.target as HTMLInputElement).value);

        const value = parseFloat((e.target as HTMLInputElement).value);
        setPlayer(player()!.characterId, { ...player()!, rateMouthOpen: value });

    };

    const handleChangeRateEyesClosed = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        setPlayer(player()!.characterId, { ...player()!, rateEyesClosed: value });
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