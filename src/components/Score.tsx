import { Component } from "solid-js";

interface ScoreProps {
    faceName: string;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
    rateEyesClosed: number;
    rateMouthOpen: number;
}

const Score: Component<ScoreProps> = (props) => {
    //const { faceNumber, eyeBlinkLeftScore, eyeBlinkRightScore, jawOpenScore } = props;
    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <div>
                <h3>{props.faceName}</h3>
                <div style={{ display: "flex", gap: "16px" }}>
                    <div>
                        <h4>Eye Blink Left:</h4>
                        <p>{props.eyeBlinkLeftScore.toFixed(2)}</p>
                        <progress max={props.rateEyesClosed} value={props.eyeBlinkLeftScore} > {props.eyeBlinkLeftScore} </progress>

                    </div>
                    <div>
                        <h4>Eye Blink Right:</h4>
                        <p>{props.eyeBlinkRightScore.toFixed(2)}</p>
                        <progress max={props.rateEyesClosed} value={props.eyeBlinkRightScore} > {props.eyeBlinkRightScore} </progress>
                    </div>
                    <div>
                        <h4>Jaw Open:</h4>
                        <p>{props.jawOpenScore.toFixed(2)}</p>
                        <progress max={props.rateMouthOpen} value={props.jawOpenScore} > {props.jawOpenScore} </progress>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;