import { selectedPlayer } from "../../data/signals/player";
import { setSelectedTool, selectedTool } from "../../data/signals/utils";
import Params from "../Params";
import Avatar from "./Avatar";
import Background from "./Background";
const Tools = () => {

    const handleToolClick = (tool: string) => {
        setSelectedTool(tool);
    };



    return (

        <div class="tools">
            <div class="tools-bar">
                {["Avatar", "Fondo", "Parametros", "Efectos", "Otros"].map((text) => (
                    <button class={selectedTool() === text ? "active" : ""} onClick={() => handleToolClick(text)}>{text}: {selectedPlayer()?.characterId}</button>
                ))}
            </div>
            <div class="tools-config">
                {
                    selectedTool() === "Avatar" && (
                        <div class="tools-player">
                            <Avatar />
                        </div>
                    )
                }

                {
                    selectedTool() === "Fondo" && (
                        <div class="tools-background">
                            <Background />
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