import { Component } from "solid-js";
import State from "./State";
import { getShowState, setShowState } from "../../data/signals/utils";
import { getBestTextColor, getColorActive, getColorHover } from "../../utils/utils";

interface ScoreProps {
    characterId: string;
    color: string;
}

const Score: Component<ScoreProps> = ({ characterId, color }) => {
    const showState = getShowState(characterId);
    const setShowStateFn = setShowState(characterId);

    const handleShowState = () => {
        setShowStateFn(!showState());
    };

    const colorActive = getColorActive(color);
    const colorHover = getColorHover(color);
    const textColor = getBestTextColor(color);

    return (
        <div class="score-container" 
            style={{
                '--player-color': color,
                '--player-color-active': colorActive,
                '--player-color-hover': colorHover,
                '--player-text-color': textColor
            }}>
            <div class="player-info">
                <div class="player-name">
                    <p>{characterId}</p>
                </div>
                <button
                    class={`${showState() ? 'active' : ''} btn btn-outline btn-primary`}
                    onClick={handleShowState}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sliders-vertical mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4"><line x1="4" x2="4" y1="21" y2="14"></line><line x1="4" x2="4" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="12"></line><line x1="12" x2="12" y1="8" y2="3"></line><line x1="20" x2="20" y1="21" y2="16"></line><line x1="20" x2="20" y1="12" y2="3"></line><line x1="2" x2="6" y1="14" y2="14"></line><line x1="10" x2="14" y1="8" y2="8"></line><line x1="18" x2="22" y1="16" y2="16"></line></svg>
                    {"Estado"}
                </button>
            </div>
            {showState() && (
                <State characterId={characterId} />
            )}
            <hr style={{ width: "100%", display: showState() ? "none" : "block" }} />
        </div>
    );
}

export default Score;