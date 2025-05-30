/**
 * @file utils.ts
 * Signals y funciones utilitarias para el manejo de estados y herramientas
 * 
 * Este archivo contiene los signals y funciones necesarios para:
 * - Manejar estados de visualización por jugador
 * - Manejar la herramienta seleccionada
 * - Manejar el modo de depuración
 */

import { createSignal } from "solid-js";

/**
 * Mapa que almacena los states de visualización por jugador
 * @type {Map<string, [(() => boolean), ((value: boolean) => void)]}
 */
const playerStates = new Map<string, [() => boolean, (value: boolean) => void]>();

/**
 * Función para obtener el state de visualización de un jugador
 * @param {string} characterId - Identificador del avatar
 * @returns {() => boolean} Función getter del state
 */
export const getShowState = (characterId: string) => {
    if (!playerStates.has(characterId)) {
        playerStates.set(characterId, createSignal(false));
    }
    return playerStates.get(characterId)![0];
};

/**
 * Función para obtener el setter del state de visualización de un jugador
 * @param {string} playerId - Identificador del avatar
 * @returns {(value: boolean) => void} Función setter del state
 */
export const setShowState = (playerId: string) => {
    if (!playerStates.has(playerId)) {
        playerStates.set(playerId, createSignal(false));
    }
    return playerStates.get(playerId)![1];
};

/**
 * Signal que contiene la herramienta seleccionada
 * @type {string}
 */
export const [selectedTool, setSelectedTool] = createSignal<string>("");

/**
 * Signal que indica si está activo el modo de depuración
 * @type {boolean}
 */
export const [isDebugMode, setIsDebugMode] = createSignal(true);