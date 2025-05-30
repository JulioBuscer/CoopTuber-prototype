/**
 * @file types.d.ts
 * Declaraciones de tipos globales para el proyecto
 * 
 * Este archivo contiene:
 * - Declaraciones de tipos para HTMLVideoElement
 * - Tipos para categorías de expresiones faciales
 */

/**
 * Declaración de tipos extendida para HTMLVideoElement
 * Agrega el método captureStream para capturar flujos de video
 */
interface HTMLVideoElement {
    /**
     * Captura un flujo de video del elemento
     * @param {number} [frameRate] - Tasa de frames opcional
     * @returns {MediaStream} Flujo de video capturado
     */
    captureStream?(frameRate?: number): MediaStream;
}

/**
 * Tipo que representa una categoría de expresión facial
 * 
 * @interface blendshapesCategory
 * @property {number} index - Índice de la categoría
 * @property {number} score - Puntuación de la expresión
 * @property {string} categoryName - Nombre técnico de la categoría
 * @property {string} displayName - Nombre para mostrar de la categoría
 */
type blendshapesCategory = {
    index: number,
    score: number;
    categoryName: string;
    displayName: string
}
