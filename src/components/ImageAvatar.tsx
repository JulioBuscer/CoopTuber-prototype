/**
 * @file ImageAvatar.tsx
 * Componente que maneja la visualización y animación del avatar basado en expresiones faciales
 * 
 * Este componente se encarga de:
 * - Mostrar la imagen del avatar
 * - Animar el avatar basado en los estados de ojos y boca
 * - Manejar la reactividad de los estados del jugador
 */

import { Component, createSignal, createEffect } from "solid-js";
import { AvatarConfig, AvatarState } from "../data/types/avatar";
import { playersConfig, playersStates } from "../data/signals/player";

/**
 * Propiedades del componente ImageAvatar
 * @interface ImageAvatarProps
 * @property {AvatarConfig} player - Configuración del jugador/character
 */
interface ImageAvatarProps {
    player: AvatarConfig
}

/**
 * Componente que maneja la visualización y animación del avatar
 * 
 * Este componente:
 * - Mantiene el estado del jugador
 * - Se actualiza automáticamente cuando cambian los estados
 * - Selecciona la imagen apropiada basado en las expresiones faciales
 * 
 * @param {ImageAvatarProps} props - Propiedades del componente
 * @returns {JSX.Element} Elemento de imagen del avatar con animación
 */
const ImageAvatar: Component<ImageAvatarProps> = ({ player }) => {
    // Estados locales del avatar
    const [playerState, setPlayerState] = createSignal<AvatarState | null>(
        playersStates().find(p => p.characterId === player.characterId) ??  null
    );

    const [playerConfig, setPlayerConfig] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === player.characterId) ?? null
    );

    /**
     * Efecto que se ejecuta cuando cambian los estados globales
     * Actualiza los estados locales del avatar
     */
    createEffect(() => {
        setPlayerConfig(playersConfig().find(p => p.characterId === player.characterId) ?? null);
        setPlayerState(playersStates().find(p => p.characterId === player.characterId) ?? null);
    });

    /**
     * Determina qué imagen mostrar basado en los estados del avatar
     * @returns {string} Ruta de la imagen correspondiente al estado actual
     */
    const getImagePath = () => {
        if (!playerConfig()) return '';
        
        // Prioridad de animaciones:
        // 1. Parpadeo con boca abierta
        // 2. Parpadeo
        // 3. Boca abierta
        // 4. Estado normal
        if (playerState()?.eyesClosed && playerState()?.mouthOpen) 
            return playerConfig()!.imagePaths?.blinkTalk;
        
        if (playerState()?.eyesClosed) 
            return playerConfig()!.imagePaths?.blink;
        
        if (playerState()?.mouthOpen) 
            return playerConfig()!.imagePaths?.talking;
            
        return playerConfig()!.imagePaths?.normal;
    };

    return (
        <img
            src={getImagePath()}
            alt="Avatar"
            width={200}
            height={200}
        />
    );
};

export default ImageAvatar;