import { createStore } from "zustand";
import { combine } from "zustand/middleware";
import { Avatar, InitialAvatar } from "../types/avatar";

type AvatarState = Avatar

type AvatarActions = {
    updateAvatar: <K extends keyof Avatar>(key: K, value: Avatar[K]) => void
}

const useAvatarStore = createStore(
    combine<AvatarState, AvatarActions>(
        InitialAvatar(),
        (set) => ({
            updateAvatar: (key, value) => set({ [key]: value })
        })))

export type { AvatarState, AvatarActions }
export default useAvatarStore
