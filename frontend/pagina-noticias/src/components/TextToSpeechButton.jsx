import { useState } from 'react';
import { speak, stopSpeaking } from '../services/textToSpeech';
import '../styles/DetalleNoticia.css';
import { Volume2, VolumeX } from 'lucide-react';

export default function TextToSpeechButton({ text }) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	
	const handleSpeak = () => {
		if(!text) {
			return;
		}
		
		stopSpeaking();		
		setIsSpeaking(true);
		speak(text, () => {
			setIsSpeaking(false);
		});
	};
	
	const handleStop = () => {
		stopSpeaking();
		setIsSpeaking(false);
	};
		
	return (
        <button
            type="button"
            className={`btn-escuchar ${isSpeaking ? 'btn-detener-escuchar' : ''}`}
            onClick={isSpeaking ? handleStop : handleSpeak}
        >
            {isSpeaking ? (
                <>
                    <VolumeX size={24} /> Detener Noticia
                </>
            ) : (
                <>
                    <Volume2 size={24} /> Escuchar Noticia
                </>
            )}
        </button>
    );
}