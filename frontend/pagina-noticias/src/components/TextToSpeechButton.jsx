import { useEffect, useState } from 'react';
import { speak, pauseSpeaking, resumeSpeaking, stopSpeaking } from '../services/textToSpeech';
import '../styles/DetalleNoticia.css';
import { Volume2, Pause, Play } from 'lucide-react';

export default function TextToSpeechButton({ text }) {
  const [playbackState, setPlaybackState] = useState('idle');
  // Detener la lectura al abandonar el detalle.
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleStart = () => {
    if (typeof text !== 'string' || !text.trim()) return;
    speak(text, {
      onStateChange: setPlaybackState,
      onEnd: () => {
        setPlaybackState('idle');
      },
      onError: error => {
        console.error('Error durante la lectura:', error);
        setPlaybackState('idle');
      }
    });
  };

  const handleClick = () => {
    if (playbackState === 'speaking') {
      pauseSpeaking();
      return;
    }
    if (playbackState === 'paused') {
      resumeSpeaking();
      return;
    }
    handleStart();
  };

  let buttonLabel = 'Escuchar Noticia';
  let ButtonIcon = Volume2;

  if (playbackState === 'speaking') {
    buttonLabel = 'Pausar Noticia';
    ButtonIcon = Pause;
  } else if (playbackState === 'paused') {
    buttonLabel = 'Reanudar Noticia';
    ButtonIcon = Play;
  }

  return (
    <button
      type="button"
      className={`btn-escuchar ${
		playbackState === 'speaking'
		? 'btn-detener-escuchar'
		: playbackState === 'paused'
		? 'btn-reanudar-escuchar'
		: ''
	}`}
      onClick={handleClick}
      aria-label={buttonLabel}
    >
      <ButtonIcon size={24} />
      {buttonLabel}
    </button>
  );
}