import Score from './Score';

interface AvatarProps {
  characterId: string;
  eyesClosed: boolean;
  mouthOpen: boolean;
  eyeBlinkLeftScore: number;
  eyeBlinkRightScore: number;
  jawOpenScore: number;
}

const Avatar = (props: AvatarProps) => {
  const getAvatarImage = () => {
    const baseDir = `/avatars/${props.characterId}`;
    if (props.eyesClosed && props.mouthOpen) {
      return `${baseDir}/blinkTalk.png`;
    } else if (props.eyesClosed) {
      return `${baseDir}/blink.png`;
    } else if (props.mouthOpen) {
      return `${baseDir}/talking.png`;
    } else {
      return `${baseDir}/normal.png`;
    }
  };

  return (
    <div
      style={{
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': '#2a2a2a',
        'border-radius': '10px',
        'overflow': 'hidden'
      }}
    >
      <img
        src={getAvatarImage()}
        alt={`Avatar ${props.characterId}`}
        style={{
          'max-width': '100%',
          'max-height': '100%',
          'object-fit': 'contain'
        }}
      />
      <Score
        faceName={props.characterId}
        eyeBlinkLeftScore={props.eyeBlinkLeftScore}
        eyeBlinkRightScore={props.eyeBlinkRightScore}
        jawOpenScore={props.jawOpenScore} 
      />
    </div>
  );
};

export default Avatar;