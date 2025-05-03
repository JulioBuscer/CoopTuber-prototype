import { Component } from "solid-js";
import { players } from "../data/signals/player";
import { Avatar, imagePaths } from "../data/types/avatar";


interface ImageAvatarProps {
    player: Avatar
}
const ImageAvatar: Component<ImageAvatarProps> = ({ player }) => {

    const getImagePath = () => {
        if (player.eyesClosed && player.mouthOpen) return player.imagePaths?.blinkTalk;
        if (player.eyesClosed) return player.imagePaths?.blink;
        if (player.mouthOpen) return player.imagePaths?.talking;
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