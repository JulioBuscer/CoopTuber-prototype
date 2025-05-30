/**
 * @file player.ts
 * Signals y funciones para manejar la configuración y estado de los jugadores
 * 
 * Este archivo contiene los signals y funciones necesarios para:
 * - Manejar la configuración de los avatares
 * - Manejar el estado de los avatares
 * - Seleccionar jugadores activos
 * - Manejar la fuente de video
 */

import { createSignal } from "solid-js";
import { AvatarConfig, AvatarState, InitialAvatarConfig, InitialAvatarState } from "../types/avatar";

/**
 * Signal que contiene la configuración de todos los jugadores
 * @type {AvatarConfig[]}
 */
const [playersConfig, setPlayersConfig] = createSignal<AvatarConfig[]>([
    InitialAvatarConfig('P1'),
    InitialAvatarConfig('P2')
]);

/**
 * Signal que contiene el estado de todos los jugadores
 * @type {AvatarState[]}
 */
const [playersStates, setPlayersStates] = createSignal<AvatarState[]>(
    [InitialAvatarState('P1'),
    InitialAvatarState('P2')]
);

/**
 * Signal que contiene el jugador seleccionado
 * @type {AvatarConfig | null}
 */
const [selectedPlayer, setSelectedPlayer] = createSignal<AvatarConfig | null>(
    playersConfig()[0]
);

/**
 * Signal que contiene la fuente de video
 * @type {string}
 */
const [videoSource, setVideoSource] = createSignal<string>("/video.mp4");

/**
 * Hook para acceder a los signals de jugadores
 * @returns {[AvatarConfig[], (config: AvatarConfig[]) => void, AvatarState[], (states: AvatarState[]) => void]}
 */
const usePlayers = () => {
    return [playersConfig, setPlayersConfig, playersStates, setPlayersStates] as const;
};

/**
 * Función para actualizar la configuración de un jugador
 * @param {string} characterId - Identificador del avatar
 * @param {AvatarConfig} player - Nueva configuración del avatar
 */
const setPlayerConfig = (characterId: string, player: AvatarConfig) => {
    setPlayersConfig(prev => {
        return prev.map(p => p.characterId === characterId ? player : p);
    });
    localStorage.setItem(`avatar-${characterId}`, JSON.stringify(player));
};

/**
 * Función para actualizar el estado de un jugador
 * @param {string} characterId - Identificador del avatar
 * @param {AvatarState} state - Nuevo estado del avatar
 */
const setPlayerState = (characterId: string, state: AvatarState) => {
    setPlayersStates(prev => {
        return prev.map(p => p.characterId === characterId ? state : p);
    });
};

export default usePlayers;
export { 
    setPlayerConfig, 
    setPlayerState, 
    playersConfig, 
    setPlayersConfig, 
    playersStates, 
    setPlayersStates, 
    selectedPlayer, 
    setSelectedPlayer, 
    videoSource, 
    setVideoSource 
};