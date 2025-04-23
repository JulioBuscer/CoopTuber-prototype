import { Component, Signal } from "solid-js";

interface ScoreProps {
    faceName: string;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
    rateEyesClosed: Signal<number>;
    rateMouthOpen: Signal<number>;
}

const Score: Component<ScoreProps> = (props) => {
    //const { faceNumber, eyeBlinkLeftScore, eyeBlinkRightScore, jawOpenScore } = props;

    const [rateEyesClosed, setRateEyesClosed] = props.rateEyesClosed;
    const [rateMouthOpen, setRateMouthOpen] = props.rateMouthOpen;
    return (
        <div style={{ display: "flex", gap: "16px", width: "100%", "align-content": "center", "justify-content": "center"}}>
                    <div>
                        <h4>Eye Blink Left:</h4>
                        <p>{props.eyeBlinkLeftScore.toFixed(2)}</p>
                        <progress max={rateEyesClosed()} value={props.eyeBlinkLeftScore} > {props.eyeBlinkLeftScore} </progress>

                    </div>
                    <div>
                        <h4>Eye Blink Right:</h4>
                        <p>{props.eyeBlinkRightScore.toFixed(2)}</p>
                        <progress max={rateEyesClosed()} value={props.eyeBlinkRightScore} > {props.eyeBlinkRightScore} </progress>
                    </div>
                    <div>
                        <h4>Jaw Open:</h4>
                        <p>{props.jawOpenScore.toFixed(2)}</p>
                        <progress max={rateMouthOpen()} value={props.jawOpenScore} > {props.jawOpenScore} </progress>
                    </div>
        </div>
    );
}

export default Score;