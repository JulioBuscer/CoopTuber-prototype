import { Component } from 'solid-js';
import Score from './Score';
import { PlayersActions, PlayersState, usePlayersStore } from '../data/store/players.store';

interface AvatarProps {
  eyesClosed: boolean;
  mouthOpen: boolean;
  characterId?: string;

  eyeBlinkLeftScore: number;
  eyeBlinkRightScore: number;
  jawOpenScore: number;

  rateEyesClosed: number;
  rateMouthOpen: number;
}
const Avatar: Component<AvatarProps> = (props) => {
  const key: keyof PlayersState = props.characterId === 'P1' ? 'P1' : 'P2';

  const player = usePlayersStore((s: PlayersState) => s[key]);

  const playerActions = usePlayersStore((s: PlayersActions) => s);

  if (!player) return null;

  const getImagePath = () => {
    if (props.eyesClosed && props.mouthOpen) return player.imagePaths?.blinkTalk;
    if (props.eyesClosed) return player.imagePaths?.blink;
    if (props.mouthOpen) return player.imagePaths?.talking;
    return player.imagePaths?.normal;
  };

  return (
    <div
      class="player"
    >
      <div class="player-text">
        <span >{props.characterId ?? 'P1'}</span>
      </div>
      <div class="player-background"
        style={{
          // El background se coloreara segun las preferencias del usuario
          'background-color': '#1a1a1a'
        }}
      />
      <div id={props.characterId == 'face1' ? 'P1' : 'P2'} class='avatar-display'>
        <div class="avatar">
          <img
            src={getImagePath()}
            alt="Avatar"
            width={200}
            height={200}
          />
        </div>

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
            'z-index': '5',
          }}

        >
          {player.imagePaths && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="normal">Normal</label>
              <img
                src={player.imagePaths!.normal}
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
          {player.imagePaths && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="blink">Blink</label>
              <img
                src={player.imagePaths!.blink}
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
          {player.imagePaths && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="talking">Talking</label>
              <img
                src={player.imagePaths!.talking}
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
          {player.imagePaths && (
            <div style={{
              display: 'flex',
              gap: '8px',
              'flex-direction': 'column',
              'align-items': 'center',
            }}>
              <label for="blinkTalk">Blink Talk</label>
              <img
                src={player.imagePaths!.blinkTalk}
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

      <div style={{ display: 'none' }} >
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
            value={player.rateMouthOpen}
            onChange={(e) => playerActions.updatePlayers(key, { ...player, rateMouthOpen: parseFloat(e.target.value) })}
          />
          <label for="rateEyesClosed">Rate Eyes Closed:</label>
          <input id="rateEyesClosed"
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={player.rateEyesClosed}
            onChange={(e) => playerActions.updatePlayers(key, { ...player, rateEyesClosed: parseFloat(e.target.value) })}
          />
        </div>

      </div >
    </div>
  );
};

export default Avatar;