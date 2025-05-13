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