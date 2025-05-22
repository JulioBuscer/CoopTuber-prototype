import { createSignal } from "solid-js";
import { AvatarConfig, AvatarState, InitialAvatarConfig, InitialAvatarState } from "../types/avatar";

const [playersConfig, setPlayersConfig] = createSignal<AvatarConfig[]>([
    InitialAvatarConfig('P1'),
    InitialAvatarConfig('P2')
]);

const [playersStates, setPlayersStates] = createSignal<AvatarState[]>(
    [InitialAvatarState('P1'),
    InitialAvatarState('P2')]
);

const [selectedPlayer, setSelectedPlayer] = createSignal<AvatarConfig | null>(
    playersConfig()[0]
);

const [videoSource, setVideoSource] = createSignal<string>();

const usePlayers = () => {
    return [playersConfig, setPlayersConfig, playersStates, setPlayersStates] as const;
};

const setPlayerConfig = (characterId: string, player: AvatarConfig) => {
    setPlayersConfig(prev => {
        return prev.map(p => p.characterId === characterId ? player : p);
    });
    localStorage.setItem(`avatar-${characterId}`, JSON.stringify(player));
};

const setPlayerState = (characterId: string, state: AvatarState) => {
    setPlayersStates(prev => {
        return prev.map(p => p.characterId === characterId ? state : p);
    });
};

export default usePlayers;
export { setPlayerConfig, setPlayerState, playersConfig, setPlayersConfig, playersStates, setPlayersStates, selectedPlayer, setSelectedPlayer, videoSource, setVideoSource };