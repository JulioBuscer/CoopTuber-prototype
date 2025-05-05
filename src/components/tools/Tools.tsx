import { setSelectedTool, selectedTool } from "../../data/signals/utils";
import Params from "../Params";


const Tools = () => {

    const handleToolClick = (tool: string) => {
        setSelectedTool(tool);
    };


    return (

        <div class="tools">
            <div class="tools-bar">
                {["Personaje", "Fondo", "Parametros", "Efectos", "Otros"].map((text) => (
                    <button class={selectedTool() === text ? "active" : ""} onClick={() => handleToolClick(text)}>{text}</button>
                ))}
            </div>
            <div class="tools-config">
                {
                    selectedTool() === "Personaje" && (
                        <div class="tools-player">
                            <p>Configuración del Avatar</p>
                        </div>
                    )
                }

                {
                    selectedTool() === "Fondo" && (
                        <div class="tools-background">
                            <p>Configuración del Fondo</p>
                        </div>
                    )
                }

                {
                    selectedTool() === "Parametros" && (
                        <div class="tools-params">
                            <Params />
                        </div>
                    )
                }

                {
                    selectedTool() === "Efectos" && (
                        <div class="tools-effects">
                            <p>Configuración de los Efectos</p>
                        </div>
                    )
                }

                {
                    selectedTool() === "Otros" && (
                        <div class="tools-others">
                            <p>Configuración de los Otros</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};


export default Tools;