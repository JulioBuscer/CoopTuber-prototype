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
    <div class="avatar-container" style={{
      'background-color': '#00FF00',
      'width': '480px',
      'height': '480px',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    }}>
      <img
        src={getImagePath()}
        alt="Avatar"
        style={{
          'max-width': '100%',
          'max-height': '100%',
          'object-fit': 'contain'
        }}
      />
    </div>
  );
};

export default Avatar;