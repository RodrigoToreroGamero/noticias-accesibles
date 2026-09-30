const defaultConfig = {
	lang: "es-ES",
	continuos: false,
	interimResults: false
};

var config = { ...defaultConfig };

export function setVoiceCommandsConfig(newConfig) {
	try {
		config = { ...config, ...newConfig };
		console.log(config);			
	} catch(ex) {
		console.error(ex.message);
	}
}

export function getVoiceCommandsConfig() {
	return config;
}

export function isVoiceRecognitionSupported() {
	return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function startVoiceRecognition(options = {}) {
	try {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		
		if(!SpeechRecognition) {
			alert("Tu navegador no soporta el reconocimiento de voz.");
			return;
		}
		
		const recognition = new SpeechRecognition();
		
		recognition.lang = config.lang;
		recognition.continuos = config.continuos;
		recognition.interimResults = config.interimResults;
		
		recognition.onstart = () => {
			if(options.onStart) {
				options.onStart();
			}
		};

		recognition.onresult = (event) => {
			const texto = event.results[0][0].transcript.replace(/\.$/, "");
				if(options.onResult) {
					options.onResult(texto);
			}
		};
		
		recognition.onerror = () => {
			if(options.onError) {
				options.onError();
			}
		};

		recognition.onend = () => {
			if(options.onend) {
				options.onend();
			}
		};

		recognition.start();
		
	} catch(ex) {
		console.error(ex.message);
	}
}


