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
            name: "Avatar",
            icon: <HiOutlineUser />
        },
        {
            name: "Fondo",
            icon: <HiOutlinePhoto />
        },
        {
            name: "Parametros",
            icon: <HiOutlineAdjustmentsHorizontal />
        },
        {
            name: "Efectos",
            icon: <HiOutlineSparkles />
        },
        {
            name: "Color",
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
                {selectedTool() === "Avatar" && (
                    <div class="tools-player">
                        <h3>Sube tu avatar</h3>
                        <Avatar />
                    </div>
                )}

                {/* Configuración del Fondo */}
                {selectedTool() === "Fondo" && (
                    <div class="tools-background">
                        <h3>Selecciona tu fondo</h3>
                        <Background />
                    </div>
                )}

                {/* Configuración de Parámetros */}
                {selectedTool() === "Parametros" && (
                    <div class="tools-params">
                        <h3>Ajusta los parámetros de detección facial</h3>
                        <Params />
                    </div>
                )}

                {/* Configuración de Efectos */}
                {selectedTool() === "Efectos" && (
                    <div class="tools-effects">
                        <h3>Configuración de los Efectos</h3>
                        <h4>...Proximamente</h4>
                    </div>
                )}

                {/* Configuración de Color */}
                {selectedTool() === "Color" && (
                    <div class="tools-color">
                        <h3>Elije tu color</h3>
                        <Color />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tools;