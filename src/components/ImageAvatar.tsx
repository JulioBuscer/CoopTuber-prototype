import { Component, createSignal, createEffect } from "solid-js";
import { AvatarConfig, AvatarState } from "../data/types/avatar";
import { playersConfig, playersStates } from "../data/signals/player";

interface ImageAvatarProps {
    player: AvatarConfig
}

const ImageAvatar: Component<ImageAvatarProps> = ({ player }) => {

    const [playerState, setPlayerState] = createSignal<AvatarState | null>(
        playersStates().find(p => p.characterId === player.characterId) ??  null
    );

    const [playerConfig, setPlayerConfig] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === player.characterId) ?? null
    );
    createEffect(() => {
        setPlayerConfig(playersConfig().find(p => p.characterId === player.characterId) ?? null);
        setPlayerState(playersStates().find(p => p.characterId === player.characterId) ?? null);
    });

    const getImagePath = () => {
        if (playerState()?.eyesClosed && playerState()?.mouthOpen) return playerConfig()?.imagePaths?.blinkTalk;
        if (playerState()?.eyesClosed) return playerConfig()?.imagePaths?.blink;
        if (playerState()?.mouthOpen) return playerConfig()?.imagePaths?.talking;
        return playerConfig()?.imagePaths?.normal;
    };

    return (
        <img
            src={getImagePath()}
            alt="Avatar"
            width={200}
            height={200}
        />
    );
};

export default ImageAvatar;