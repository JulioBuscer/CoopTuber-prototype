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
        <div class="tools">
            {/* Barra de herramientas con botones de navegación */}
            <div class="tools-bar">
                {tools.map((tool) => (
                    <button
                        classList={{
                            "active": selectedTool() === tool.name
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
                        <Avatar />
                    </div>
                )}

                {/* Configuración del Fondo */}
                {selectedTool() === "Fondo" && (
                    <div class="tools-background">
                        <Background />
                    </div>
                )}

                {/* Configuración de Parámetros */}
                {selectedTool() === "Parametros" && (
                    <div class="tools-params">
                        <Params />
                    </div>
                )}

                {/* Configuración de Efectos */}
                {selectedTool() === "Efectos" && (
                    <div class="tools-effects">
                        <p>Configuración de los Efectos</p>
                    </div>
                )}

                {/* Configuración de Color */}
                {selectedTool() === "Color" && (
                    <div class="tools-color">
                        <Color />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tools;