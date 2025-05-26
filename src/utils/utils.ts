/**
 * @file utils.ts
 * Utilidades y funciones auxiliares para el manejo de colores y logs
 * 
 * Este archivo contiene funciones para:
 * - Manejo de logs de depuración
 * - Manejo de colores y contrastes
 * - Estilos dinámicos basados en colores
 */

import { isDebugMode } from "../data/signals/utils";

/**
 * Función para registrar logs de depuración
 * @param {string} message - Mensaje a registrar
 * @param {...any} args - Argumentos adicionales
 */
export const debugLog = (message: string, ...args: any[]) => {
    if (isDebugMode()) {
        console.log(message, ...args);
    }
};

/**
 * Función para registrar errores de depuración
 * @param {Error} error - Error a registrar
 * @param {string} [message] - Mensaje adicional opcional
 */
export const debugError = (error: Error, message?: string) => {
    if (isDebugMode()) {
        console.error(message || "Error:", error);
    }
};

/**
 * Función para sanitizar colores
 * @param {string} color - Color en formato hexadecimal
 * @param {boolean} [isPlain] - Si se debe usar formato simple
 * @returns {string} Color sanitizado
 */
export function sanitizedColor(color: string, isPlain?: boolean) {
    if (isPlain) {
        return color.length < 7 ? color + color.slice(1) : color;
    }
    const return_color =
        color.length < 7 ?
            color + color.slice(1)
            : color.length > 7 ? color.slice(0, 7) : color;
    return return_color;
}

/**
 * Función para obtener el mejor color de texto basado en contraste
 * @param {string} color - Color de fondo
 * @returns {string} Color de texto (#fff o #000)
 */
export function getBestTextColor(color: string) {
    let contrast = 0;
    
    if (color.length === 7) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        contrast = (yiq >= 128) ? 1 : 7.1;
    }
    
    if (color.length > 7) {
        const a = parseInt(color.slice(7, 9), 16) / 255;
        contrast = (a >= 0.5) ? 1 : 7.1;
    }
    
    return (contrast >= 4.5) ? '#fff' : '#000';
}

/**
 * Función para obtener color activo con transparencia
 * @param {string} color - Color base
 * @returns {string} Color con transparencia (alpha: 0.66)
 */
export function getColorActive(color: string) {
    return sanitizedColor(color) + "aa";
}

/**
 * Función para obtener color hover con transparencia
 * @param {string} color - Color base
 * @returns {string} Color con transparencia (alpha: 0.33)
 */
export function getColorHover(color: string) {
    return sanitizedColor(color) + "55";
}

/**
 * Función para establecer variables CSS globales basadas en un color
 * @param {string} player_color - Color del jugador
 */
export function setColors(player_color: string) {
    const color = sanitizedColor(player_color);
    const colorActive = getColorActive(color);
    const colorHover = getColorHover(color);
    const textColor = getBestTextColor(color);
    
    document.documentElement.style.setProperty('--player-color-hover', colorHover);
    document.documentElement.style.setProperty('--player-color-active', colorActive);
    document.documentElement.style.setProperty('--player-color', player_color);
    document.documentElement.style.setProperty('--player-text-color', textColor);
}
