
import { createWithSignal } from "solid-zustand"
import { Players } from "../types/player"
import { InitialPlayers } from "../types/player"

type PlayersState = Players
type PlayersActions = {
    updatePlayers: (key: keyof Players, value: Players[keyof Players]) => void
}


export const usePlayersStore = createWithSignal<PlayersState & PlayersActions>((set) => ({
    ...InitialPlayers,
    updatePlayers: (key: keyof Players, value: Players[keyof Players]) => set({ [key]: value })
}))

export type { PlayersState, PlayersActions }

