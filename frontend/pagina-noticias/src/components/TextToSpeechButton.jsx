import { speak } from '../services/textToSpeech';

export default function TextToSpeechButton({ text }) {
	return (
		<button onClick={() => speak(text)}>
			Escuchar Noticia
		</button>	
	);	
}