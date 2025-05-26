/**
 * @file avatar.ts
 * Definiciones de tipos y configuraciones para avatares
 * 
 * Este archivo contiene las interfaces y configuraciones base para:
 * - Rutas de imágenes del avatar
 * - Configuración del avatar
 * - Estado del avatar
 * - Valores predeterminados y inicialización
 */

/**
 * Interface que define las rutas de las imágenes del avatar
 * @interface imagePaths
 * @property {string} normal - Ruta de la imagen normal
 * @property {string} blink - Ruta de la imagen de parpadeo
 * @property {string} talking - Ruta de la imagen de hablando
 * @property {string} blinkTalk - Ruta de la imagen de parpadeo y hablando
 * @property {string} backgroundImage - Ruta de la imagen de fondo
 */
export interface imagePaths {
    'normal': string;
    'blink': string;
    'talking': string;
    'blinkTalk': string;
    backgroundImage: string;
}

/**
 * Interface que define la configuración del avatar
 * @interface AvatarConfig
 * @property {string} characterId - Identificador único del avatar
 * @property {number} rateEyesClosed - Umbral para detectar parpadeo
 * @property {number} rateMouthOpen - Umbral para detectar hablando
 * @property {imagePaths} imagePaths - Rutas de las imágenes del avatar
 * @property {boolean} useChroma - Si usar chroma key
 * @property {boolean} useBackgroundImage - Si usar imagen de fondo
 * @property {string} backgroundColor - Color de fondo
 * @property {string} color - Color del avatar
 */
export interface AvatarConfig {
    characterId: string;
    rateEyesClosed: number;
    rateMouthOpen: number;
    imagePaths: imagePaths;
    useChroma: boolean;
    useBackgroundImage: boolean;
    backgroundColor: string;
    color: string;
}

/**
 * Interface que define el estado del avatar
 * @interface AvatarState
 * @property {string} characterId - Identificador único del avatar
 * @property {boolean} eyesClosed - Estado de los ojos (cerrados)
 * @property {boolean} mouthOpen - Estado de la boca (abierta)
 * @property {number} eyeBlinkLeftScore - Puntuación del parpadeo del ojo izquierdo
 * @property {number} eyeBlinkRightScore - Puntuación del parpadeo del ojo derecho
 * @property {number} jawOpenScore - Puntuación de apertura de la boca
 */
export interface AvatarState {
    characterId: string;
    eyesClosed: boolean;
    mouthOpen: boolean;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
}

/**
 * Configuración predeterminada del avatar
 * @type {AvatarConfig}
 * @property {string} characterId - Identificador vacío por defecto
 * @property {number} rateEyesClosed - Umbral de parpadeo (50%)
 * @property {number} rateMouthOpen - Umbral de hablando (50%)
 * @property {boolean} useChroma - Usar chroma key por defecto
 * @property {boolean} useBackgroundImage - No usar imagen de fondo por defecto
 * @property {string} backgroundColor - Color de fondo verde por defecto
 * @property {string} color - Color del avatar por defecto
 * @property {imagePaths} imagePaths - Rutas de las imágenes por defecto
 */
export const defaultAvatarConfig: AvatarConfig = {
    characterId: "",
    rateEyesClosed: 0.5,
    rateMouthOpen: 0.5,
    useChroma: true,
    useBackgroundImage: false,
    backgroundColor: '#00FF00',//'#1a1a1a',
    color: '#646cff',
    imagePaths: {
        'normal': '/avatars/default/normal.png',
        'blink': '/avatars/default/blink.png',
        'talking': '/avatars/default/talking.png',
        'blinkTalk': '/avatars/default/blinkTalk.png',
        'backgroundImage': ''
    }
}

/**
 * Estado predeterminado del avatar
 * @type {AvatarState}
 * @property {string} characterId - Identificador vacío por defecto
 * @property {boolean} eyesClosed - Ojos abiertos por defecto
 * @property {boolean} mouthOpen - Boca cerrada por defecto
 * @property {number} eyeBlinkLeftScore - Puntuación de parpadeo izquierdo (0)
 * @property {number} eyeBlinkRightScore - Puntuación de parpadeo derecho (0)
 * @property {number} jawOpenScore - Puntuación de apertura de boca (0)
 */
export const defaultAvatarState: AvatarState = {
    characterId: "",
    eyesClosed: false,
    mouthOpen: false,
    eyeBlinkLeftScore: 0,
    eyeBlinkRightScore: 0,
    jawOpenScore: 0
}

/**
 * Función para inicializar la configuración del avatar
 * @param {string} [idAvatar] - Identificador del avatar
 * @returns {AvatarConfig} Configuración inicial del avatar
 */
export const InitialAvatarConfig = (idAvatar?: string) => {
    if (!idAvatar) return defaultAvatarConfig;
    try {
        const avatar = localStorage.getItem(`avatar-${idAvatar}`);
        if (avatar) {
            return JSON.parse(avatar);
        } else {
            const defaultAvatarWithId = { ...defaultAvatarConfig, characterId: idAvatar };
            localStorage.setItem(`avatar-${idAvatar}`, JSON.stringify(defaultAvatarWithId));
            return defaultAvatarWithId;
        }
    } catch (error) {
        console.error("Error al acceder a localStorage", error);
        return defaultAvatarConfig;
    }
}

/**
 * Función para inicializar el estado del avatar
 * @param {string} idAvatar - Identificador del avatar
 * @returns {AvatarState} Estado inicial del avatar
 */
export const InitialAvatarState = (idAvatar: string) => ({ ...defaultAvatarState, characterId: idAvatar });