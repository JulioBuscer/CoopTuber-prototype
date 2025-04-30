export interface Avatar {
    characterId: string;

    eyesClosed: boolean;
    mouthOpen: boolean;


    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;

    rateEyesClosed: number;
    rateMouthOpen: number;
}

export const defaultAvatar: Avatar = {
    characterId: "",
    eyesClosed: false,
    mouthOpen: false,
    eyeBlinkLeftScore: 0,
    eyeBlinkRightScore: 0,
    jawOpenScore: 0,
    rateEyesClosed: 0,
    rateMouthOpen: 0
}

export const InitialAvatar = (idAvatar?: string) => {
    if (!idAvatar) return defaultAvatar;
    try {
        const avatar = localStorage.getItem(`avatar-${idAvatar}`);
        if (avatar) {
            return JSON.parse(avatar);
        }
    } catch (error) {
        console.error("Error al acceder a localStorage", error);
        return defaultAvatar
    }
}