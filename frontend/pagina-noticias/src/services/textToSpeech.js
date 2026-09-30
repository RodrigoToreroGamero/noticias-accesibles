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

export function speak(text, onEnd) {
	try {		
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = config.lang;
		
		if(config.voice) {
			utterance.voice = config.voice;
		}
		
		utterance.onend = () => {
			if(onEnd) {
				onEnd();
			}
		};
		
		utterance.onerror = () => {
			if(onEnd) {
				onEnd();
			}
		};
		
		synth.speak(utterance);
	} catch(ex) {
		console.error(ex.message);
		alert('La síntesis de voz no está soportada en este navegador.');
		if(onEnd) {
			onEnd();
		}
	}	
}

export function stopSpeaking() {
	synth.cancel();
}

export function getVoices() {
	return window.speechSynthesis.getVoices();
}