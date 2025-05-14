import { createSignal } from "solid-js";

const playerStates = new Map<string, [() => boolean, (value: boolean) => void]>();

export const getShowState = (characterId: string) => {
    if (!playerStates.has(characterId)) {
        playerStates.set(characterId, createSignal(false));
    }
    return playerStates.get(characterId)![0];
};

export const setShowState = (playerId: string) => {
    if (!playerStates.has(playerId)) {
        playerStates.set(playerId, createSignal(false));
    }
    return playerStates.get(playerId)![1];
};

export const [selectedTool, setSelectedTool] = createSignal<string>("");

export const [isDebugMode, setIsDebugMode] = createSignal(true);