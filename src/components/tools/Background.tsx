/**
 * @file Background.tsx
 * Componente que maneja la configuración del fondo del avatar
 * 
 * Este componente permite configurar:
 * - Uso de chroma key (fondo verde)
 * - Color de fondo personalizado
 * - Imagen de fondo
 */

import { Component, createEffect, createSignal } from "solid-js";
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";
import { useI18n } from "../../i18n/context";

/**
 * Componente que maneja la configuración del fondo del avatar
 * 
 * Este componente:
 * - Permite alternar entre modo chroma y fondo personalizado
 * - Permite seleccionar un color de fondo
 * - Permite cargar una imagen de fondo
 * - Mantiene la consistencia visual del avatar
 * 
 * @returns {JSX.Element} Interfaz de configuración del fondo
 */
const Background: Component = () => {
    const {t} = useI18n();
    // Estado local del jugador seleccionado
    const [player, setPlayer] = createSignal(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);

    /**
     * Efecto que se ejecuta cuando cambia el jugador seleccionado
     * Actualiza el estado local del jugador
     */
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    // Si no hay jugador seleccionado, retornar null
    if (!player()) return null;

    /**
     * Manejador para alternar el uso de chroma key
     */
    const handleUseChroma = () => {
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, useChroma: !player()?.useChroma })
    };

    /**
     * Manejador para alternar entre color e imagen de fondo
     * @param {boolean} bool - Estado del uso de imagen de fondo
     */
    const handleUseBackgroundImage = (bool: boolean) => {
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, useBackgroundImage: bool })
    };

    /**
     * Manejador para el cambio de imagen de fondo
     * @param {Event} e - Evento del input de archivo
     */
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
            {/* Sección de configuración de chroma key */}
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
                    <label>{t('app.tools.background.useChroma')}</label>
                </div>
            </div>

            {/* Sección de selección de fondo */}
            {!player()!.useChroma && (
                <div class="tools-background-content-selector">
                    {/* Opción de color de fondo */}
                    <div class="tools-background-content-selector-color">
                        <div
                            class={`tools-background-content-selector-color-preview${!player()!.useBackgroundImage ? ' active' : ''}`}
                            onClick={() => handleUseBackgroundImage(false)}
                        >
                            <div
                                class="tools-background-content-selector-color-preview-background"
                                style={{ 'background-color': player()!.backgroundColor }}
                            ></div>
                        </div>
                        <div>
                            <label>{t('app.tools.background.backgroundColor')}</label>
                            <input
                                type="color"
                                value={player()!.backgroundColor}
                                onChange={(e) => setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, backgroundColor: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Opción de imagen de fondo */}
                    <div class="tools-background-content-selector-image">
                        <div
                            class={`tools-background-content-selector-image-preview${player()!.useBackgroundImage ? ' active' : ''}`}
                            onClick={() => handleUseBackgroundImage(true)}
                        >
                            <img
                                src={player()!.imagePaths.backgroundImage}
                                alt="Sube una Imagen"
                            />
                        </div>
                        <div>
                            <div class="avatar-tools-buttons">
                                <label class="upload-button">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                    {t('app.tools.background.uploadImage')}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Background;