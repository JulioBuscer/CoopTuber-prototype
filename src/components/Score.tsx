import { Component } from "solid-js";

interface ScoreProps {
    faceName: string ;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
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
                    </div>
                    <div>
                        <h4>Eye Blink Right:</h4>
                        <p>{props.eyeBlinkRightScore.toFixed(2)}</p>
                    </div>
                    <div>
                        <h4>Jaw Open:</h4>
                        <p>{props.jawOpenScore.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;