import { createEffect, createSignal } from "solid-js";
import { Avatar, InitialAvatar } from "../types/avatar";

const [players, setPlayers] = createSignal<Avatar[]>(
    [InitialAvatar('P1'),
    InitialAvatar('P2')]
);

const [selectedPlayer, setSelectedPlayer] = createSignal<Avatar | null>(null);

// Initialize selected player when players change
createEffect(() => {
    setSelectedPlayer(players()[0]);
});

const usePlayers = () => {
    return [players, setPlayers] as const;
};

const setPlayer = (characterId: string, player: Avatar) => {
    setPlayers(prev => {
        return prev.map(p => p.characterId === characterId ? player : p);
    });
    localStorage.setItem(`avatar-${characterId}`, JSON.stringify(player));
};

export default usePlayers;
export {setPlayer, players, setPlayers, selectedPlayer, setSelectedPlayer };