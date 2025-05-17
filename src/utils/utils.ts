import { isDebugMode } from "../data/signals/utils";

export const debugLog = (message: string, ...args: any[]) => {
    if (isDebugMode()) {
        console.log(message, ...args);
    }
};

export const debugError = (error: Error, message?: string) => {
    if (isDebugMode()) {
        console.error(message || "Error:", error);
    }
};


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
export function getBestTextColor(color: string) {
    let contrast = 0;
    
    if (color.length < 7) {
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
    return (contrast >= 4.5) ? '#000' : '#fff';
}

export function getColorActive(color: string) {
    return sanitizedColor(color) + "aa";
}

export function getColorHover(color: string) {
    return sanitizedColor(color) + "22";
}

export function setColors(player_color: string) {
    const color = sanitizedColor(player_color);
    const colorActive = getColorActive(color);
    const colorHover = getColorHover(color);
    document.documentElement.style.setProperty('--player-color-hover', colorHover);
    document.documentElement.style.setProperty('--player-color-active', colorActive);
    document.documentElement.style.setProperty('--player-color', player_color);
}
