import { Component, createSignal, Signal } from 'solid-js';
import Score from './Score';

interface AvatarProps {
  eyesClosed: boolean;
  mouthOpen: boolean;
  characterId?: string;

  eyeBlinkLeftScore: number;
  eyeBlinkRightScore: number;
  jawOpenScore: number;

  rateEyesClosed: Signal<number>;
  rateMouthOpen: Signal<number>;
}

const Avatar: Component<AvatarProps> = (props) => {
  const [currentImage, setCurrentImage] = createSignal('normal');
  const [rateEyesClosed, setRateEyesClosed] = props.rateEyesClosed;
  const [rateMouthOpen, setRateMouthOpen] = props.rateMouthOpen;

  const getImagePath = () => {
    const folder = props.characterId || 'face1';
    if (props.eyesClosed && props.mouthOpen) return `/avatars/${folder}/blinkTalk.png`;
    if (props.eyesClosed) return `/avatars/${folder}/blink.png`;
    if (props.mouthOpen) return `/avatars/${folder}/talking.png`;
    return `/avatars/${folder}/normal.png`;
  };

  return (
    <div
      style={{ display: 'flex', 'flex-direction': 'column', gap: '8px', width: '100%', height: '100%', padding: '8px' }}
    >
      <div
        style={{
          'width': '100%',
          'height': '100%',
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'overflow': 'hidden',
          'background-color': '#00FF00',
          padding: '8px',
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
      <div>
      </div>

      <Score
        faceName={props.characterId!}
        eyeBlinkLeftScore={props.eyeBlinkLeftScore}
        eyeBlinkRightScore={props.eyeBlinkRightScore}
        jawOpenScore={props.jawOpenScore}
        rateEyesClosed={rateEyesClosed()}
        rateMouthOpen={rateMouthOpen()}
      />
    </div>
  );
};

export default Avatar;