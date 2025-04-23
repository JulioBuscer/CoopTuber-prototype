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
interface AvatarState {
  imagePaths: {
    'normal': string;
    'blink': string;
    'talking': string;
    'blinkTalk': string;
  };
}

const Avatar: Component<AvatarProps> = (props) => {
  const [rateEyesClosed, setRateEyesClosed] = props.rateEyesClosed;
  const [rateMouthOpen, setRateMouthOpen] = props.rateMouthOpen;
  const [imagePaths, setImagePaths] = createSignal<AvatarState['imagePaths'] | null>(null);

  try {
    //Trataremos de obtener de localStorage las 4 imagenes de cada personaje, de lo contrario lo obtenemos de la carpeta public
    setImagePaths(localStorage.getItem(`avatar-${props.characterId}`) ? JSON.parse(localStorage.getItem(`avatar-${props.characterId}`)!) : null);
    if (!imagePaths()) {
      localStorage.setItem(`avatar-${props.characterId}`, JSON.stringify({
        normal: `/avatars/${props.characterId}/normal.png`,
        blink: `/avatars/${props.characterId}/blink.png`,
        talking: `/avatars/${props.characterId}/talking.png`,
        blinkTalk: `/avatars/${props.characterId}/blinkTalk.png`,
      }));
      setImagePaths({
        normal: `/avatars/${props.characterId}/normal.png`,
        blink: `/avatars/${props.characterId}/blink.png`,
        talking: `/avatars/${props.characterId}/talking.png`,
        blinkTalk: `/avatars/${props.characterId}/blinkTalk.png`,
      });
    }
  } catch (error) {
    console.error("Error al acceder a localStorage", error);
  }

  const getImagePath = () => {
    if (props.eyesClosed && props.mouthOpen) return imagePaths()?.blinkTalk;
    if (props.eyesClosed) return imagePaths()?.blink;
    if (props.mouthOpen) return imagePaths()?.talking;
    return imagePaths()?.normal;
  };

  return (
    <div
      class="card avatar-container"
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '8px',
        'aspect-ratio': '16/9',
        padding: '8px'
      }}
    >
      <h3>{props.characterId ?? 'P1'}</h3>
      <div
        id={props.characterId == 'face1' ? 'P1' : 'P2'}
        style={{
          overflow: 'hidden',
          padding: '8px',
          position: 'relative',
          width: '100%'
        }}
        on:mouseover={(e) => {
          const target = e.currentTarget.querySelector(`#avatar-images-${props.characterId}`);
          if (target) {
            target.style.display = 'flex';
            target.style.transition = 'all 0.5s ease-in-out';
            target.style.opacity = '1';
          }
        }}
        on:mouseout={(e) => {
          const target = e.currentTarget.querySelector(`#avatar-images-${props.characterId}`);
          if (target) {
            target.style.display = 'none';
            target.style.transition = 'all 0.5s ease-in-out';
            target.style.opacity = '0';
          }
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

        <div
          id={`avatar-images-${props.characterId}`}
          style={{
            position: 'absolute',
            top: '0',
            left: '-1',
            display: 'none',
            gap: '16px',
            'flex-direction': 'column',
            'justify-content': 'space-evenly',
            'align-items': 'center',
            'width': '100%',
            'z-index': '5',
          }}

        >
          {imagePaths() && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="normal">Normal</label>
              <img
                src={imagePaths()!.normal}
                alt="Avatar"
                style={{
                  'object-fit': 'contain',
                  'max-width': '128px',
                  'max-height': '128px',
                  'width': 'auto',
                  'height': 'auto',
                  'background-color': '#00FF00',
                  transform: 'scaleX(1)'
                }}
              />
            </div>
          )}
          {imagePaths() && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="blink">Blink</label>
              <img
                src={imagePaths()!.blink}
                alt="Avatar"
                style={{
                  'object-fit': 'contain',
                  'max-width': '128px',
                  'max-height': '128px',
                  'width': 'auto',
                  'height': 'auto',
                  'background-color': '#00FF00',
                  transform: 'scaleX(1)'
                }}
              />
            </div>
          )}
          {imagePaths() && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="talking">Talking</label>
              <img
                src={imagePaths()!.talking}
                alt="Avatar"
                style={{
                  'object-fit': 'contain',
                  'max-width': '128px',
                  'max-height': '128px',
                  'width': 'auto',
                  'height': 'auto',
                  'background-color': '#00FF00',
                  transform: 'scaleX(1)'
                }}
              />
            </div>
          )}
          {imagePaths() && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="blinkTalk">Blink Talk</label>
              <img
                src={imagePaths()!.blinkTalk}
                alt="Avatar"
                style={{
                  'object-fit': 'contain',
                  'max-width': '128px',
                  'max-height': '128px',
                  'width': 'auto',
                  'height': 'auto',
                  'background-color': '#00FF00',
                  transform: 'scaleX(1)'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '8px',
        'grid-template-columns': '20ch 10ch',
        'align-items': 'start',
        'justify-content': 'start',
        'width': '100%',
        'text-align': 'end'
      }}>
        <label for="rateMouthOpen">Rate Mouth Open:</label>
        <input id="rateMouthOpen"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={rateMouthOpen()}
          onChange={(e) => setRateMouthOpen(parseFloat(e.target.value))}
        />
        <label for="rateEyesClosed">Rate Eyes Closed:</label>
        <input id="rateEyesClosed"
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={rateEyesClosed()}
          onChange={(e) => setRateEyesClosed(parseFloat(e.target.value))}
        />
      </div>

      <Score
        faceName={props.characterId!}
        eyeBlinkLeftScore={props.eyeBlinkLeftScore}
        eyeBlinkRightScore={props.eyeBlinkRightScore}
        jawOpenScore={props.jawOpenScore}
        rateEyesClosed={[rateEyesClosed, setRateEyesClosed]}
        rateMouthOpen={[rateMouthOpen, setRateMouthOpen]}
      />
    </div >
  );
};

export default Avatar;