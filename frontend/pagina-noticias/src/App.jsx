import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TextToSpeechButton from './components/TextToSpeechButton';
import { setTextToSpeechConfig, getVoices } from './services/textToSpeech';



function App() {
	
	const testTTSText = "Este es un texto para que el lector de texto lo lea en voz alta.";	
	
	setTextToSpeechConfig({
		lang: "es-ES",
		voice: "Pablo"
	});
	
	
	const voices = getVoices();
	voices.forEach(voice => {
		console.log(voice.name, voice.lang);
	});
  
  return (
    <>     
		<TextToSpeechButton text={testTTSText}/>
    </>
  )
}

export default App;
