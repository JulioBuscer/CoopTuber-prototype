/**
 * @file Avatar.tsx
 * Componente que representa un avatar de jugador en la interfaz
 * 
 * Este componente maneja la visualización y animación de los avatares,
 * incluyendo la selección de jugador y la integración con las expresiones faciales
 */

import { Component } from 'solid-js';
import { playersConfig, playersStates, selectedPlayer, setSelectedPlayer } from '../data/signals/player';
import ImageAvatar from './ImageAvatar';
import { getBestTextColor, getColorActive, sanitizedColor, setColors } from '../utils/utils';

/**
 * Propiedades del componente Avatar
 * @interface AvatarProps
 * @property {string} characterId - Identificador único del jugador/character
 */
interface AvatarProps {
  characterId: string;
}

/**
 * Componente que representa un avatar de jugador
 * 
 * Este componente maneja:
 * - Visualización del avatar
 * - Selección de jugador activo
 * - Animación basada en expresiones faciales
 * - Manejo de colores y estilos
 * 
 * @param {AvatarProps} props - Propiedades del componente
 * @returns {JSX.Element} Elemento de avatar con su interfaz y animación
 */
const Avatar: Component<AvatarProps> = ({ characterId }) => {
  // Obtener el estado y configuración del jugador actual
  const state = playersStates().find(p => p.characterId === characterId);
  const player = playersConfig().find(p => p.characterId === characterId);

  // Si no se encuentra el estado o jugador, retornar null
  if (!state || !player) return null;

  /**
   * Manejador para el clic en el avatar
   * Selecciona al jugador y actualiza los colores globales
   */
  const handleClick = () => {
    setSelectedPlayer(player);
    setColors(player.color);
  };

  return (
    <div 
      id={characterId}
      class={`player ${selectedPlayer()!.characterId === characterId ? 'active' : ''}`}
      style={{
        "background-color": getColorActive(player.color),
        "color": getBestTextColor(sanitizedColor(player.color)),
      }}
      onClick={handleClick}
    >
      {/* Contenedor de texto del jugador */}
      <div class="player-text">
        <span >{characterId}</span>
      </div>
      
      {/* Contenedor principal del avatar */}
      <div class="player-container">
        {/* Fondo del avatar */}
        <div 
          class="player-background"
          style={{
            'background-color': player.useChroma 
              ? '#00FF00'
              : player.backgroundColor ?? '#00FF00',
            'background-image': !player.useChroma && player.useBackgroundImage
              ? `url(${player.imagePaths.backgroundImage})`
              : 'none',
            'background-size': 'cover',
            'background-position': 'center',
            'background-repeat': 'no-repeat'
          }}
        />
        
        {/* Contenedor del avatar */}
        <div 
          id={characterId === 'face1' ? 'P1' : 'P2'} 
          class='avatar-display'
        >
          <div class="avatar">
            <ImageAvatar player={player} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;