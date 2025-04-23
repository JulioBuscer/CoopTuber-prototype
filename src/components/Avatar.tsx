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
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '8px',
        'aspect-ratio': '16/9',
        padding: '8px'
      }}
    >
      <h3>{props.characterId =='face1' ? 'P1' : 'P2'}</h3>
      <div
        id={props.characterId == 'face1' ? 'P1' : 'P2'}
        style={{
          overflow: 'hidden',
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
            'background-color': '#00FF00',
            transform: 'scaleX(1)'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', 'flex-direction': 'column', 'align-items': 'start' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label for="rateMouthOpen">Rate Mouth Open:</label>
          <input type="number" id="rateMouthOpen" min="0" max="1" step="0.01" value={rateMouthOpen()} onChange={(e) => setRateMouthOpen(parseFloat(e.target.value))} />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label for="rateEyesClosed">Rate Eyes Closed:</label>
          <input type="number" id="rateEyesClosed" min="0" max="1" step="0.01" value={rateEyesClosed()} onChange={(e) => setRateEyesClosed(parseFloat(e.target.value))} />
        </div>
      </div>

      <Score
        faceName={props.characterId!}
        eyeBlinkLeftScore={props.eyeBlinkLeftScore}
        eyeBlinkRightScore={props.eyeBlinkRightScore}
        jawOpenScore={props.jawOpenScore}
        rateEyesClosed={[rateEyesClosed, setRateEyesClosed]}
        rateMouthOpen={[rateMouthOpen, setRateMouthOpen]}
      />
    </div>
  );
};

export default Avatar;