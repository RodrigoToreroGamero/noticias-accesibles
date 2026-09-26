const defaultConfig = {
	lang: "es-ES",
	voice: null
};

var config = { ...defaultConfig };

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
		
		window.speechSynthesis.speak(utterance);
	} catch(ex) {
		console.error(ex.message);
	}	
}

export function getVoices() {
	return window.speechSynthesis.getVoices();
}