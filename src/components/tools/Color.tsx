import { Component, createEffect, createSignal } from "solid-js"
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";
import { setColors } from "../../utils/utils";

const Color: Component = () => {

    const [player, setPlayer] = createSignal(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);

    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    if (!player()) return null;

    const handleColorChange = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, color: target.value });
        setColors(target.value);
    };

    return (
        <div class="tools-color-content">
            <label>Color de {selectedPlayer()!.characterId}</label>
            <div class="tools-color-selector">
                
                <div class="tools-color-preview-color"
                    style={{ "background-color": player()!.color }}/>
                
                <input type="color"
                    value={player()!.color}
                    onChange={handleColorChange}
                    color={player()!.color}
                />
            </div>
        </div>
    )
}

export default Color