/**
 * @file Avatar.tsx
 * Componente que maneja la configuración de imágenes del avatar
 * 
 * Este componente permite:
 * - Seleccionar diferentes estados de animación del avatar
 * - Cargar nuevas imágenes para cada estado
 * - Previsualizar los cambios antes de aplicarlos
 */

import { createEffect, createSignal } from "solid-js";
import { AvatarConfig } from "../../data/types/avatar";
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";
import { debugLog } from "../../utils/utils";

/**
 * Componente que maneja la configuración de imágenes del avatar
 * 
 * Este componente:
 * - Muestra las diferentes imágenes del avatar
 * - Permite navegar entre los estados de animación
 * - Permite cargar nuevas imágenes para cada estado
 * - Muestra una vista previa de los cambios
 * 
 * @returns {JSX.Element} Interfaz de configuración de imágenes del avatar
 */
const Avatar = () => {
    // Estado local del jugador seleccionado
    const [player, setPlayer] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null
    );

    /**
     * Efecto que se ejecuta cuando cambia el jugador seleccionado
     * Actualiza el estado local del jugador
     */
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    // Tipos de imágenes disponibles para el avatar
    const imageTypes: (keyof AvatarConfig['imagePaths'])[] = ['normal', 'blink', 'talking', 'blinkTalk'];
    const imageTypeNames = ['Boca cerrada, Ojos abiertos', 'Boca cerrada, Ojos cerrados', 'Boca abierta, Ojos abiertos', 'Boca abierta, Ojos cerrados'];
    // Estado para la imagen seleccionada
    const [selectedImage, setSelectedImage] = createSignal(0);

    /**
     * Manejador para el clic en una imagen
     * @param {number} index - Índice de la imagen seleccionada
     */
    const handleImageClick = (index: number) => {
        debugLog('Selected image:', imageTypeNames[index], " - index:", index);
        setSelectedImage(index);
    };

    /**
     * Manejador para la imagen anterior
     */
    const handlePrevImage = () => {
        setSelectedImage(prev => {
            if (prev === 0) return imageTypes.length - 1;
            return Math.max(0, prev - 1);
        });
    };

    /**
     * Manejador para la imagen siguiente
     */
    const handleNextImage = () => {
        setSelectedImage(prev => {
            if (prev === imageTypes.length - 1) return 0;
            return Math.min(imageTypes.length - 1, prev + 1);
        });
    };

    /**
     * Manejador para el cambio de imagen
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
                                    [imageTypes[selectedImage()]]: url
                                }
                            });
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div class="avatar-tools">
            {/* Contenedor de la vista previa */}
            <div class="avatar-tools-display"
                style={{
                    'background-color': player()!.useChroma ?
                        '#00FF00'
                        : player()!.backgroundColor ?? '#00FF00',
                    'background-image': !player()!.useChroma && player()!.useBackgroundImage ?
                        `url(${player()!.imagePaths.backgroundImage})`
                        : 'none',
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat'
                }}>
                <img
                    class="avatar-tools-display-image"
                    src={player()!.imagePaths[imageTypes[selectedImage()]]!}
                    alt={imageTypes[selectedImage()]}
                />
            </div>

            <span>{imageTypeNames[selectedImage()]}</span>

            {/* Contenedor de selección de imágenes */}
            <div class="avatars-tools-content">
                <button  onClick={handlePrevImage}> {"<"} </button>
                <div class="avatars-tools-container">
                    {imageTypes.map((type, index) => (
                        <div class={`avatar-tool-image-picker${index === selectedImage() ? ' active' : ''}`}>
                            <img
                                class="avatar-tool-image"
                                src={player()!.imagePaths[type]!}
                                alt={imageTypeNames[index]}
                                onClick={() => handleImageClick(index)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleNextImage}> {">"} </button>
            </div>

            {/* Botones de carga de imágenes */}
            <div class="avatar-tools-buttons">
                <label class="upload-button">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    Cargar imagen
                </label>
            </div>
        </div>
    );
};

export default Avatar;