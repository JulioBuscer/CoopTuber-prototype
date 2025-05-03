import { Component } from 'solid-js';
import { playersConfig, playersStates, setSelectedPlayer } from '../data/signals/player';
import ImageAvatar from './ImageAvatar';

interface AvatarProps {
  characterId: string;
}

const Avatar: Component<AvatarProps> = (props) => {

  const sate = playersStates().find(p => p.characterId === props.characterId);

  if (!sate) return null;


  const handleClick = () => {
    console.log('Selected player:', sate.characterId);
    setSelectedPlayer(playersConfig().find(p => p.characterId === props.characterId) ?? null);
  };
  return (
    <div
      class="player"
      onClick={handleClick}
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
          <ImageAvatar player={playersConfig().find(p => p.characterId === props.characterId)!} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;