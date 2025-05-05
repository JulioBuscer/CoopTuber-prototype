import { Component } from 'solid-js';
import { playersConfig, playersStates, selectedPlayer, setSelectedPlayer } from '../data/signals/player';
import ImageAvatar from './ImageAvatar';

interface AvatarProps {
  characterId: string;
}

const Avatar: Component<AvatarProps> = ({ characterId }) => {

  const sate = playersStates().find(p => p.characterId === characterId);

  if (!sate) return null;


  const handleClick = () => {
    console.log('Selected player:', sate.characterId);
    setSelectedPlayer(playersConfig().find(p => p.characterId === characterId) ?? null);
  };
  return (
    <div
      class={"player" + (selectedPlayer()!.characterId === characterId ? ' active' : '')}
      onClick={handleClick}
    >
      <div class="player-text">
        <span >{characterId ?? 'P1'}</span>
      </div>
      <div class="player-background"
        style={{
          // El background se coloreara segun las preferencias del usuario
          'background-color': '#1a1a1a'
        }}
      />
      <div id={characterId == 'face1' ? 'P1' : 'P2'} class='avatar-display'>
        <div class="avatar">
          <ImageAvatar player={playersConfig().find(p => p.characterId === characterId)!} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;