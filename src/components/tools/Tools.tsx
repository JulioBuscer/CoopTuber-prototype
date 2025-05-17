import { HiOutlineAdjustmentsHorizontal, HiOutlinePhoto, HiOutlineSparkles, HiOutlineUser } from "solid-icons/hi";
import { selectedPlayer } from "../../data/signals/player";
import { setSelectedTool, selectedTool } from "../../data/signals/utils";
import Params from "../Params";
import Avatar from "./Avatar";
import Background from "./Background";
import { VsSymbolColor } from "solid-icons/vs";
import Color from "./Color";
const Tools = () => {

    const handleToolClick = (tool: string) => {
        setSelectedTool(tool);
    };

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
    ]

    return (

        <div class="tools">
            <div class="tools-bar">
                {tools.map((tool) => (
                    <button
                        classList={{
                            "active": selectedTool() === tool.name
                        }}
                        onClick={() => handleToolClick(tool.name)}>
                        {tool.icon}
                        <span>{tool.name}</span>
                    </button>
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
                    selectedTool() === "Color" && (
                        <div class="tools-color">
                            <Color />
                        </div>
                    )
                }
            </div>
        </div>
    );
};


export default Tools;