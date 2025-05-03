import { Component, createMemo } from "solid-js";
import { AvatarConfig, AvatarState } from "../data/types/avatar";
import { playersStates } from "../data/signals/player";

interface ImageAvatarProps {
    player: AvatarConfig
}

const ImageAvatar: Component<ImageAvatarProps> = ({ player }) => {
    const state = createMemo(() => {
        return playersStates().find(p => p.characterId === player.characterId);
    });

    const getImagePath = () => {
        if (state()?.eyesClosed && state()?.mouthOpen) return player.imagePaths?.blinkTalk;
        if (state()?.eyesClosed) return player.imagePaths?.blink;
        if (state()?.mouthOpen) return player.imagePaths?.talking;
        return player.imagePaths?.normal;
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