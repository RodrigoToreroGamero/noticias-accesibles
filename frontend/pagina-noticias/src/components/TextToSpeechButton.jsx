import { useState } from 'react';
import { speak, stopSpeaking } from '../services/textToSpeech';
import '../styles/DetalleNoticia.css';
import { Volume2 } from 'lucide-react';

export default function TextToSpeechButton({ text }) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	
		
	return (
		isSpeaking ? (
			<button 
				className="btn-verde btn-escuchar" 
				onClick={() => {
					stopSpeaking();
					setIsSpeaking(false);
				}}
			>
				<Volume2 size={24} /> Detener Noticia
			</button>
		) : (
			<button 
				className="btn-verde btn-escuchar" 
				onClick={() => {
					speak(text);
					setIsSpeaking(true);
				}}
			>
				<Volume2 size={24} /> Escuchar Noticia
			</button>
		)
	);	
}