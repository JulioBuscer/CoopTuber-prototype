import { Component, createSignal } from 'solid-js';

interface AvatarProps {
  eyesClosed: boolean;
  mouthOpen: boolean;
  characterId?: string;
}

const Avatar: Component<AvatarProps> = (props) => {
  const [currentImage, setCurrentImage] = createSignal('normal');

  const getImagePath = () => {
    const folder = props.characterId || 'face1';
    if (props.eyesClosed && props.mouthOpen) return `/avatars/${folder}/blinkTalk.png`;
    if (props.eyesClosed) return `/avatars/${folder}/blink.png`;
    if (props.mouthOpen) return `/avatars/${folder}/talking.png`;
    return `/avatars/${folder}/normal.png`;
  };

  return (
    <div
      style={{
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'overflow': 'hidden',

      }}
    >
      <img
        src={getImagePath()}
        alt="Avatar"
        style={{
          'object-fit': 'contain',
          'max-width': '100%',
          'max-height': '100%',
          'width': 'auto',
          'height': 'auto',
          transform: 'scaleX(1)'
        }}
      />
    </div>
  );
};

export default Avatar;