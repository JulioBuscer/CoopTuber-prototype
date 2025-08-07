/**
 * @file Tools.tsx
 * Componente principal que maneja la interfaz de herramientas y configuración
 * 
 * Este componente proporciona una interfaz para seleccionar y configurar diferentes
 * aspectos del avatar y la aplicación, incluyendo:
 * - Avatar (configuración del avatar)
 * - Fondo (configuración del fondo)
 * - Parámetros (ajustes de detección facial)
 * - Efectos (efectos visuales)
 * - Color (configuración de colores)
 */

import { HiOutlineAdjustmentsHorizontal, HiOutlinePhoto, HiOutlineSparkles, HiOutlineUser } from "solid-icons/hi";
import { setSelectedTool, selectedTool } from "../../data/signals/utils";
import Params from "../Params";
import Avatar from "./Avatar";
import Background from "./Background";
import { VsSymbolColor } from "solid-icons/vs";
import Color from "./Color";
import { useI18n } from "../../i18n/context";

/**
 * Componente principal de la interfaz de herramientas
 * 
 * Este componente:
 * - Muestra una barra de herramientas con diferentes opciones
 * - Maneja la selección de herramientas activas
 * - Renderiza el componente correspondiente según la herramienta seleccionada
 * 
 * @returns {JSX.Element} Interfaz completa de herramientas y configuración
 */
const Tools = () => {
    const {t} = useI18n();
    /**
     * Manejador para el clic en una herramienta
     * @param {string} tool - Nombre de la herramienta a seleccionar
     */
    const handleToolClick = (tool: string) => {
        setSelectedTool(tool);
    };

    /**
     * Definición de las herramientas disponibles
     * @type {Array<{name: string, icon: JSX.Element}>}
     */
    const tools = [
        {
            name: t('app.tools.avatar.title'),
            icon: <HiOutlineUser />
        },
        {
            name: t('app.tools.background.title'),
            icon: <HiOutlinePhoto />
        },
        {
            name: t('app.tools.params.title'),
            icon: <HiOutlineAdjustmentsHorizontal />
        },
        {
            name: t('app.tools.effects.title'),
            icon: <HiOutlineSparkles />
        },
        {
            name: t('app.tools.color.title'),
            icon: <VsSymbolColor />
        }
    ];

    return (
        <div class="tools-container">
            {/* Barra de herramientas con botones de navegación */}
            <div class="tools-bar">
                {tools.map((tool) => (
                    <button
                        classList={{
                            "active": selectedTool() === tool.name,
                            "btn": true,
                            "btn-outline": true,
                            "btn-primary": selectedTool() === tool.name
                        }}
                        onClick={() => handleToolClick(tool.name)}
                    >
                        {tool.icon}
                        <span>{tool.name}</span>
                    </button>
                ))}
            </div>

            {/* Área de configuración de la herramienta seleccionada */}
            <div class="tools-config">
                {/* Configuración del Avatar */}
                {selectedTool() === t('app.tools.avatar.title') && (
                    <div class="tools-player">
                        <h3>{t('app.tools.avatar.text')}</h3>
                        <Avatar />
                    </div>
                )}

                {/* Configuración del Fondo */}
                {selectedTool() === t('app.tools.background.title') && (
                    <div class="tools-background">
                        <h3>{t('app.tools.background.text')}</h3>
                        <Background />
                    </div>
                )}

                {/* Configuración de Parámetros */}
                {selectedTool() === t('app.tools.params.title') && (
                    <div class="tools-params">
                        <h3>{t('app.tools.params.text')}</h3>
                        <Params />
                    </div>
                )}

                {/* Configuración de Efectos */}
                {selectedTool() === t('app.tools.effects.title') && (
                    <div class="tools-effects">
                        <h3>{t('app.tools.effects.text')}</h3>
                        <h4>{t('app.tools.effects.placeHolder')}</h4>
                    </div>
                )}

                {/* Configuración de Color */}
                {selectedTool() === t('app.tools.color.title') && (
                    <div class="tools-color">
                        <h3>{t('app.tools.color.text')}</h3>
                        <Color />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tools;