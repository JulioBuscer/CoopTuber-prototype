import { Component } from "solid-js";

interface ScoreProps {
    faceNumber: number;
    eyeBlinkLeftScore: number;
    eyeBlinkRightScore: number;
    jawOpenScore: number;
}

const Score: Component<ScoreProps> = (props) => {
    //const { faceNumber, eyeBlinkLeftScore, eyeBlinkRightScore, jawOpenScore } = props;
    return (
        <div style={{ display: "flex", gap: "2" }}>
            <div>
                <h3>Face {props.faceNumber}</h3>
                <div style={{ display: "flex", gap: "2" }}>
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