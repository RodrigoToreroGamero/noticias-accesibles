const defaultConfig = {
	lang: "es-ES",
	continuos: false,
	interimResults: false
};

var config = { ...defaultConfig };
const recognition = new window.webkitSpeechRecognition();

export function setSpeechCommandsConfig(newConfig) {
	try {
		config = { ...config, ...newConfig };
		console.log(config);
		recognition.lang = config.lang;
		recognition.continuos = config.continuos;
		recognition.interimResults = config.interimResults;		
	} catch(ex) {
		console.error(ex.message);
	}
}

recognition.lang = config.lang;
recognition.continuos = config.continuos;
recognition.interimResults = config.interimResults;

export function transcribeText(event) {
	recognition.onresult = (event) => {
		return event.results[0][0].transcript;
	};
}

