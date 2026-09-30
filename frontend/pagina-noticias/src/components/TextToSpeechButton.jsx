import { useState } from 'react';
import { speak, stopSpeaking } from '../services/textToSpeech';
import '../styles/DetalleNoticia.css';
import { Volume2, VolumeX } from 'lucide-react';

export default function TextToSpeechButton({ text }) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	
	const handleSpeak = () => {
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
		isSpeaking ? (
			<button 
				className="btn-escuchar btn-detener-escuchar" 
				onClick={handleStop}					
			>
				<VolumeX size={24} /> Detener Noticia
			</button>
		) : (
			<button 
				className="btn-escuchar" 
				onClick={handleSpeak}					
			>
				<Volume2 size={24} /> Escuchar Noticia
			</button>
		)
	);	
}