

export interface imagePaths {
    'normal': string;
    'blink': string;
    'talking': string;
    'blinkTalk': string;
}

export interface AvatarConfig {
    characterId: string;
    rateEyesClosed: number;
    rateMouthOpen: number;
    imagePaths: imagePaths;
}

export interface AvatarState {
    characterId: string;
    eyesClosed: boolean;
    mouthOpen: boolean;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
}

export const defaultAvatarConfig: AvatarConfig = {
    characterId: "",
    rateEyesClosed: 0.5,
    rateMouthOpen: 0.5,
    imagePaths: {
        'normal': '/avatars/default/normal.png',
        'blink': '/avatars/default/blink.png',
        'talking': '/avatars/default/talking.png',
        'blinkTalk': '/avatars/default/blinkTalk.png'
    }
}

export const defaultAvatarState: AvatarState = {
    characterId: "",
    eyesClosed: false,
    mouthOpen: false,
    eyeBlinkLeftScore: 0,
    eyeBlinkRightScore: 0,
    jawOpenScore: 0
}

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
        return defaultAvatarConfig
    }
}

export const InitialAvatarState = (idAvatar: string) => ({ ...defaultAvatarState, characterId: idAvatar });

