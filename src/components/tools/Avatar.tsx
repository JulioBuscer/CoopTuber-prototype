import { createEffect, createSignal } from "solid-js";
import { AvatarConfig } from "../../data/types/avatar";
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";

const Avatar = () => {
    const [player, setPlayer] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null
    );
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    const imageTypes: (keyof AvatarConfig['imagePaths'])[] = ['normal', 'blink', 'talking', 'blinkTalk'];

    const [selectedImage, setSelectedImage] = createSignal(0);

    const handleImageClick = (index: number) => {
        console.log('Selected image:', imageTypes[index], " - index:", index);
        setSelectedImage(index);
    };

    const handlePrevImage = () => {
        setSelectedImage(prev => {
            if (prev === 0) return imageTypes.length - 1;
            return Math.max(0, prev - 1);
        });
    };

    const handleNextImage = () => {
        setSelectedImage(prev => {
            if (prev === imageTypes.length - 1) return 0;
            return Math.min(imageTypes.length - 1, prev + 1)
        });
    };

    const handleImageChange = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        if (target.files) {
            const file = target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target && e.target.result) {
                        const url = e.target.result as string;
                        setPlayerConfig(selectedPlayer()!.characterId,
                            {
                                ...player()!,
                                imagePaths: {
                                    ...player()!.imagePaths,
                                    [imageTypes[selectedImage()]]: url
                                }
                            });
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <div class="avatar-tools" >
            seleccion de frames para el avatar {player()?.characterId}

            <div class="avatar-tools-display">
                <img
                    class="avatar-tools-display-image"
                    src={player()!.imagePaths[imageTypes[selectedImage()]]!}
                    alt={imageTypes[selectedImage()]}
                />
            </div>

            <div class="avatars-tools-content">
                <button onClick={handlePrevImage}> {"<"} </button>
                <div class="avatars-tools-container">
                    {imageTypes.map((type, index) => (
                        <div class={"avatar-tool-image-picker" + (index === selectedImage() ? ' active' : '')}>
                            <img
                                class="avatar-tool-image"
                                src={player()!.imagePaths[type]!}
                                alt={type}

                                onClick={() => handleImageClick(index)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleNextImage} > {">"} </button>
            </div>
            <div class="avatar-tools-buttons">
                <label class="upload-button">
                    <input type="file" onChange={handleImageChange} accept="image/*" hidden />
                    Subir imagen
                </label>
            </div>

        </div>
    );
};

export default Avatar;