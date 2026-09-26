const defaultConfig = {
	lang: "es-ES",
	voice: null
};

var config = { ...defaultConfig };
const synth = window.speechSynthesis;

export function setTextToSpeechConfig(newConfig) {
	try {
		config = { ...config, ...newConfig };
		console.log(config);		
	} catch(ex) {
		console.error(ex.message);
	}
}

export function getTextToSpeechConfig() {
	return config;
}

export function speak(text) {
	try {		
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = config.lang;
		
		if(config.voice) {
			utterance.voice = config.voice;
		}
		
		synth.speak(utterance);
	} catch(ex) {
		console.error(ex.message);
		alert('La síntesis de voz no está soportada en este navegador.');
	}	
}

export function stopSpeaking() {
	synth.cancel();
}

export function getVoices() {
	return window.speechSynthesis.getVoices();
}