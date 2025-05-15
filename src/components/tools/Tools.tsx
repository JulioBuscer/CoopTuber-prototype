import { HiOutlineAdjustmentsHorizontal, HiOutlinePhoto, HiOutlineSparkles, HiOutlineUser } from "solid-icons/hi";
import { selectedPlayer } from "../../data/signals/player";
import { setSelectedTool, selectedTool } from "../../data/signals/utils";
import Params from "../Params";
import Avatar from "./Avatar";
import Background from "./Background";
const Tools = () => {

    const handleToolClick = (tool: string) => {
        setSelectedTool(tool);
    };

const tools=[
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
        name: "Otros",
        icon: <HiOutlineSparkles />
    }
]

    return (

        <div class="tools">
            <div class="tools-bar">
                {tools.map((tool) => (
                    <button class={selectedTool() === tool.name ? "active" : ""} onClick={() => handleToolClick(tool.name)}>
                        {tool.icon}
                        {tool.name}
                    </button>
                ))}
            </div>
            <div class="tools-config">

                <div class="tools-player-name">
                    {selectedPlayer()?.characterId}
                </div>
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