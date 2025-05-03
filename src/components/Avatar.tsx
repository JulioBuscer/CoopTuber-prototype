import { Component } from 'solid-js';
import { players, setSelectedPlayer } from '../data/signals/player';
import ImageAvatar from './ImageAvatar';

interface AvatarProps {
  characterId: string;
}

const Avatar: Component<AvatarProps> = (props) => {

  const player = players().find(p => p.characterId === props.characterId);

  if (!player) return null;


  const handleClick = () => {
    console.log('Selected player:', player.characterId);
    setSelectedPlayer(player);
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
          <ImageAvatar player={player} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;