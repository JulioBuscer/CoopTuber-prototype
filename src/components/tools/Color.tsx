/**
 * @file Color.tsx
 * Componente que maneja la configuración de colores del avatar
 * 
 * Este componente permite:
 * - Seleccionar el color del avatar
 * - Actualizar los colores globales de la aplicación
 * - Mantener la consistencia visual entre elementos
 */

import { Component, createEffect, createSignal } from "solid-js";
import { playersConfig, selectedPlayer, setPlayerConfig } from "../../data/signals/player";
import { setColors } from "../../utils/utils";

/**
 * Componente que maneja la selección de colores
 * 
 * Este componente:
 * - Muestra una vista previa del color actual
 * - Permite seleccionar un nuevo color
 * - Actualiza los colores globales de la aplicación
 * - Mantiene la consistencia visual del avatar
 * 
 * @returns {JSX.Element} Interfaz de selección de colores
 */
const Color: Component = () => {
    // Estado local del jugador seleccionado
    const [player, setPlayer] = createSignal(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);

    /**
     * Efecto que se ejecuta cuando cambia el jugador seleccionado
     * Actualiza el estado local del jugador
     */
    createEffect(() => {
        setPlayer(playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null);
    });

    // Si no hay jugador seleccionado, retornar null
    if (!player()) return null;

    /**
     * Manejador para el cambio de color
     * @param {Event} e - Evento del input de color
     */
    const handleColorChange = (e: Event) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        setPlayerConfig(selectedPlayer()!.characterId, { ...player()!, color: target.value });
        setColors(target.value);
    };

    return (
        <div class="tools-color-content">
            {/* Etiqueta del selector de color */}
            <label>Color de {selectedPlayer()!.characterId}</label>
            
            {/* Contenedor del selector de color */}
            <div class="tools-color-selector">
                {/* Vista previa del color actual */}
                <div 
                    class="tools-color-preview-color"
                    style={{ "background-color": player()!.color }}
                />
                
                {/* Input de selección de color */}
                <input 
                    type="color"
                    value={player()!.color}
                    onChange={handleColorChange}
                    color={player()!.color}
                />
            </div>
        </div>
    );
};

export default Color;