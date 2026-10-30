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
	if(!synth || !window.SpeechSynthesisUtterance) {
		console.error("Web Speech API no disponible");
		alert("Lector de texto no disponible en este navegador.");
		if(onEnd) {
			onEnd();
		}
		return;
	}
	
	try {
		synth.cancel();
		
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
		
		utterance.onerror = (event) => {
			console.error("Error Text-to-speech: ", event.error);
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
	if(synth) {
		synth.cancel();
	}
}

export function getVoices() {
	return synth ? synth.getVoices() : [];
}