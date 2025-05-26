/**
 * @file Params.tsx
 * Componente que maneja los parámetros de configuración del avatar seleccionado
 * 
 * Este componente permite ajustar los umbrales para la detección de:
 * - Hablar (apertura de boca)
 * - Parpadeo (cierre de ojos)
 */

import { Component, createSignal, createEffect } from 'solid-js';
import { playersConfig, selectedPlayer, setPlayersConfig } from '../data/signals/player';
import { AvatarConfig } from '../data/types/avatar';

/**
 * Props del componente Params
 * @interface ParamsProps
 * No requiere props adicionales
 */
type ParamsProps = {};

/**
 * Componente que maneja los parámetros de configuración del avatar
 * 
 * Este componente:
 * - Muestra controles para ajustar los umbrales de detección
 * - Permite ajustar la sensibilidad de la detección de boca y ojos
 * - Actualiza automáticamente cuando cambia el jugador seleccionado
 * 
 * @param {ParamsProps} props - Props del componente
 * @returns {JSX.Element} Interfaz de parámetros de configuración
 */
const Params: Component<ParamsProps> = () => {
    // Estado local del jugador seleccionado
    const [player, setPlayer] = createSignal<AvatarConfig | null>(
        playersConfig().find(p => p.characterId === selectedPlayer()!.characterId) ?? null
    );

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
     * Manejador para el cambio en el umbral de apertura de boca
     * @param {Event} e - Evento del input
     */
    const handleChangeRateMouthOpen = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value) / 100;
        setPlayersConfig(prev => {
            return prev.map(p => 
                p.characterId === player()!.characterId 
                    ? { ...p, rateMouthOpen: value } 
                    : p
            );
        });
    };

    /**
     * Manejador para el cambio en el umbral de parpadeo
     * @param {Event} e - Evento del input
     */
    const handleChangeRateEyesClosed = (e: Event) => {
        const value = parseFloat((e.target as HTMLInputElement).value) / 100;
        setPlayersConfig(prev => {
            return prev.map(p => 
                p.characterId === player()!.characterId 
                    ? { ...p, rateEyesClosed: value } 
                    : p
            );
        });
    };

    return (
        <div class="tools-params-container">
            {/* Control para ajustar el umbral de habla */}
            <div class="tools-params-container-item">
                <div class="tools-params-container-item-label">
                    <label for="rateMouthOpen">Hablar:</label>
                    <input 
                        id="rateMouthOpen"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={player()!.rateMouthOpen * 100}
                        onChange={handleChangeRateMouthOpen}
                    />
                    <span>%</span>
                </div>
                <input 
                    id="rateMouthOpen"
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={player()!.rateMouthOpen * 100}
                    onChange={handleChangeRateMouthOpen}
                />
            </div>

            {/* Control para ajustar el umbral de parpadeo */}
            <div class="tools-params-container-item">
                <div class="tools-params-container-item-label">
                    <label for="rateEyesClosed">Papadear:</label>
                    <input 
                        id="rateEyesClosed"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={player()!.rateEyesClosed * 100}
                        onChange={handleChangeRateEyesClosed}
                    />
                    <span>%</span>
                </div>
                <input 
                    id="rateEyesClosed"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={player()!.rateEyesClosed * 100}
                    onChange={handleChangeRateEyesClosed}
                />
            </div>
        </div>
    );
};

export default Params;