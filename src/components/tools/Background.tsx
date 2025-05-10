import { Component, createEffect, createSignal } from "solid-js";
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";
const Background: Component = () => {
    const [player, setPlayer] = createSignal(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    if (!player()) return null;

    const handleUseChroma = () => {
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, useChroma: !player()?.useChroma })
    };

    const handleUseBackgroundImage = (bool: boolean) => {
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, useBackgroundImage: bool })
    };

    const handleImageChange = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        if (target.files) {
            const file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && e.target.result) {
                        const url = e.target.result as string;
                        setPlayerConfig(selectedPlayer()!.characterId,
                            {
                                ...player()!,
                                imagePaths: {
                                    ...player()!.imagePaths,
                                    backgroundImage: url
                                }
                            });
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div class="tools-background-content">
            <div class="tools-background-use-chroma-content">
                <div class="tools-background-use-chroma">
                    <button
                        class="switch-button"
                        type="button"
                        role="switch"
                        aria-checked={player()!.useChroma ?? false}
                        onClick={handleUseChroma}
                        value="on"
                    >
                        <span class="switch-button-icon" />
                    </button>
                    <label>Usar Chroma</label>
                </div>
            </div>
            {
                !player()!.useChroma && (
                    <div class="tools-background-content-selector">
                        <div class="tools-background-content-selector-color">
                            <div class={"tools-background-content-selector-color-preview" + (!player()!.useBackgroundImage ? ' active' : '')}
                                onClick={() => handleUseBackgroundImage(false)}>
                                <div
                                    class="tools-background-content-selector-color-preview-background"
                                    style={{ 'background-color': player()!.backgroundColor }}></div>
                            </div>
                            <div>
                                <label>Color de fondo </label>
                                <input 
                                    type="color"
                                    value={player()!.backgroundColor}
                                    onChange={(e) => setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, backgroundColor: e.target.value })} />
                            </div>
                        </div>

                        <div class="tools-background-content-selector-image">
                            <div class={"tools-background-content-selector-image-preview" + (player()!.useBackgroundImage ? ' active' : '')}
                                onClick={() => handleUseBackgroundImage(true)}>
                                <img
                                
                                    src={player()!.imagePaths.backgroundImage}
                                    alt="Sube una Imagen"
                                />
                            </div>
                            <div>
                                <div class="avatar-tools-buttons">
                                    <label class="upload-button">
                                        <input type="file" onChange={handleImageChange} accept="image/*" hidden />
                                        Subir imagen
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Background