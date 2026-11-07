const defaultConfig = {
  lang: 'es-ES',
  continuous: false,
  interimResults: false
};

let config = { ...defaultConfig };
let activeRecognition = null;

export function setVoiceCommandsConfig(newConfig) {
  try {
    config = { ...config, ...newConfig };
  } catch (error) {
    console.error('No se pudo actualizar la configuración de voz:', error);
  }
}

export function getVoiceCommandsConfig() {
  return { ...config };
}

export function isVoiceRecognitionSupported() {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

export function stopVoiceRecognition() {
  if (!activeRecognition) return;

  const recognition = activeRecognition;
  activeRecognition = null;

  try {
    recognition.stop();
  } catch (error) {
    // Algunos navegadores lanzan un error si el reconocimiento ya terminó.
    console.warn('No se pudo detener el reconocimiento de voz:', error);
  }
}

export function startVoiceRecognition(options = {}) {
  if (typeof window === 'undefined') {
    options.onError?.(new Error('El reconocimiento de voz no está disponible.'));
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    options.onError?.(
      new Error('Tu navegador no soporta el reconocimiento de voz.')
    );
    return null;
  }

  // Evita mantener dos reconocimientos activos al mismo tiempo.
  stopVoiceRecognition();

  let recognition;

  try {
    recognition = new SpeechRecognition();

    recognition.lang = config.lang;
    recognition.continuous = config.continuous;
    recognition.interimResults = config.interimResults;

    recognition.onstart = () => {
      options.onStart?.();
    };

    recognition.onresult = (event) => {
      const resultado = event.results?.[event.resultIndex ?? 0];
      const texto = resultado?.[0]?.transcript?.trim().replace(/[.]$/, '');

      if (texto) {
        options.onResult?.(texto);
      }
    };

    recognition.onerror = (event) => {
      const error = new Error(
        event.error === 'not-allowed'
          ? 'No se concedió permiso para utilizar el micrófono.'
          : 'No se pudo reconocer la voz. Inténtalo nuevamente.'
      );

      error.code = event.error;
      options.onError?.(error);
    };

    recognition.onend = () => {
      if (activeRecognition === recognition) {
        activeRecognition = null;
      }

      options.onEnd?.();
    };

    activeRecognition = recognition;
    recognition.start();

    return recognition;
  } catch (error) {
    if (activeRecognition === recognition) {
      activeRecognition = null;
    }

    options.onError?.(error);
    return null;
  }
}
