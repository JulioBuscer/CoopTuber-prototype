import { Component } from 'solid-js';
import { playersConfig, playersStates, selectedPlayer, setSelectedPlayer } from '../data/signals/player';
import ImageAvatar from './ImageAvatar';

interface AvatarProps {
  characterId: string;
}

const Avatar: Component<AvatarProps> = ({ characterId }) => {

  const sate = playersStates().find(p => p.characterId === characterId);
  const player = playersConfig().find(p => p.characterId === characterId);


  if (!sate || !player) return null;


  const handleClick = () => {
    console.log('Selected player:', sate.characterId);
    setSelectedPlayer(player);
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
          'background-color': player.useChroma ?
            '#00FF00'
            : player.backgroundColor ?? '#00FF00',
          'background-image': !player.useChroma && player.useBackgroundImage ?
            `url(${player.imagePaths.backgroundImage})`
            : 'none',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat'
        }}
      />
      <div id={characterId == 'face1' ? 'P1' : 'P2'} class='avatar-display'>
        <div class="avatar">
          <ImageAvatar player={player} />
        </div>
      </div>
    </div>
  );
};

export default Avatar;