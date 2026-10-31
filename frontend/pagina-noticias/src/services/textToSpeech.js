const defaultConfig = {
  lang: 'es-ES',
  voice: null
};

const MAX_CHUNK_LENGTH = 100;

let config = { ...defaultConfig };
let activeSession = null;

export function setTextToSpeechConfig(newConfig) {
  try {
    config = { ...config, ...newConfig };
    console.log(config);
  } catch (error) {
    console.error('Error actualizando la voz:', error);
  }
}

export function getTextToSpeechConfig() {
  return config;
}

function isSpeechSynthesisAvailable() {
  return (
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance === 'function'
  );
}

function createUtterance(text) {
  const utterance = new window.SpeechSynthesisUtterance(text);

  utterance.lang = config.lang || 'es-ES';

  if (config.voice) {
    utterance.voice = config.voice;
  }

  return utterance;
}

function getSentences(text) {
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    try {
      const segmenter = new Intl.Segmenter(config.lang, {
        granularity: 'sentence'
      });

      return Array.from(segmenter.segment(text))
        .map(item => item.segment.trim())
        .filter(Boolean);
    } catch (error) {
      console.warn('Error al dividir las oraciones:', error);
    }
  }

  return (text.match(/[^.!?…]+[.!?…]+["'»”)]*|[^.!?…]+$/gu) || [text])
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

function splitLongSentence(sentence) {
  const chunks = [];
  let currentChunk = '';

  sentence.split(/\s+/).forEach(word => {
    const candidate = currentChunk
      ? `${currentChunk} ${word}`
      : word;

    if (candidate.length > MAX_CHUNK_LENGTH && currentChunk) {
      chunks.push(currentChunk);
      currentChunk = word;
    } else {
      currentChunk = candidate;
    }
  });

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
}

function splitTextIntoChunks(text) {
  const normalizedText = String(text || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalizedText) return [];

  const chunks = [];

  getSentences(normalizedText).forEach(sentence => {
    if (sentence.length <= MAX_CHUNK_LENGTH) {
      chunks.push(sentence);
    } else {
      chunks.push(...splitLongSentence(sentence));
    }
  });

  return chunks;
}

function isCurrentUtterance(session, utterance) {
  return (
    activeSession === session &&
    session.utterance === utterance
  );
}

function getWordStart(text, position) {
  let safePosition = Math.max(
    0,
    Math.min(position, text.length)
  );

  while (
    safePosition < text.length &&
    /\s/.test(text[safePosition])
  ) {
    safePosition++;
  }

  while (
    safePosition > 0 &&
    !/\s/.test(text[safePosition - 1])
  ) {
    safePosition--;
  }

  return safePosition;
}

function finishSession(session, error = null) {
  if (activeSession !== session) return;

  activeSession = null;
  session.status = 'idle';
  session.utterance = null;

  if (error) {
    session.onError?.(error);
  }

  session.onStateChange?.('idle');
  session.onEnd?.();
}

function speakCurrentChunk(session) {
  if (
    activeSession !== session ||
    session.status !== 'speaking'
  ) {
    return;
  }

  if (session.currentIndex >= session.chunks.length) {
    finishSession(session);
    return;
  }

  const currentChunk = session.chunks[session.currentIndex];
  const startOffset = session.currentOffset;

  const remainingText = currentChunk.slice(startOffset);
  const textToSpeak = remainingText.trimStart();

  const leadingWhitespace =
    remainingText.length - textToSpeak.length;

  const utteranceStartOffset = startOffset + leadingWhitespace;

  if (!textToSpeak) {
    session.currentIndex++;
    session.currentOffset = 0;
    speakCurrentChunk(session);
    return;
  }

  let utterance;

  try {
    utterance = createUtterance(textToSpeak);
  } catch (error) {
    finishSession(session, error);
    return;
  }

  session.utterance = utterance;

  // Registrar la posición de lectura cuando el navegador lo permita.
  utterance.onboundary = event => {
    if (!isCurrentUtterance(session, utterance)) return;

    if (!Number.isFinite(event.charIndex)) return;

    const localPosition = Math.max(
      0,
      Math.min(textToSpeak.length, event.charIndex)
    );

    const absolutePosition =
      utteranceStartOffset + localPosition;

    const wordStart = getWordStart(
      currentChunk,
      absolutePosition
    );

    if (wordStart > session.currentOffset) {
      session.currentOffset = wordStart;
    }
  };

  // Continuar automáticamente con el siguiente fragmento.
  utterance.onend = () => {
    if (!isCurrentUtterance(session, utterance)) return;

    session.utterance = null;
    session.currentIndex++;
    session.currentOffset = 0;

    speakCurrentChunk(session);
  };

  utterance.onerror = event => {
    if (!isCurrentUtterance(session, utterance)) return;

    console.error('Error durante la lectura:', event.error);

    finishSession(session, event);
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    finishSession(session, error);
  }
}

function normalizeCallbacks(callbacksOrOnEnd) {
  if (typeof callbacksOrOnEnd === 'function') {
    return { onEnd: callbacksOrOnEnd };
  }

  return callbacksOrOnEnd && typeof callbacksOrOnEnd === 'object'
    ? callbacksOrOnEnd
    : {};
}

// Un único motor de reproducción para computadora y celulares.
export function speak(text, callbacksOrOnEnd = {}) {
  const callbacks = normalizeCallbacks(callbacksOrOnEnd);

  if (!isSpeechSynthesisAvailable()) {
    const error = new Error(
      'La síntesis de voz no está disponible.'
    );

    console.error(error.message);

    callbacks.onError?.(error);
    callbacks.onStateChange?.('idle');
    callbacks.onEnd?.();

    return false;
  }

  const chunks = splitTextIntoChunks(text);

  if (chunks.length === 0) {
    callbacks.onStateChange?.('idle');
    callbacks.onEnd?.();
    return false;
  }

  stopSpeaking();

  const session = {
    chunks,
    currentIndex: 0,
    currentOffset: 0,
    status: 'speaking',
    utterance: null,
    onStateChange: callbacks.onStateChange,
    onEnd: callbacks.onEnd,
    onError: callbacks.onError
  };

  activeSession = session;

  session.onStateChange?.('speaking');

  speakCurrentChunk(session);

  return true;
}

// Pausar conservando la posición disponible.
export function pauseSpeaking() {
  const session = activeSession;

  if (!session || session.status !== 'speaking') {
    return false;
  }

  session.status = 'paused';
  session.utterance = null;

  // Cancelamos la locución actual, pero conservamos la sesión.
  window.speechSynthesis.cancel();

  session.onStateChange?.('paused');

  return true;
}

// Reanudar desde la posición guardada.
export function resumeSpeaking() {
  const session = activeSession;

  if (!session || session.status !== 'paused') {
    return false;
  }

  session.status = 'speaking';

  session.onStateChange?.('speaking');

  speakCurrentChunk(session);

  return true;
}

// Detener definitivamente la lectura.
export function stopSpeaking() {
  if (activeSession) {
    activeSession.status = 'stopped';
    activeSession.utterance = null;
    activeSession = null;
  }

  if (
    typeof window !== 'undefined' &&
    window.speechSynthesis
  ) {
    window.speechSynthesis.cancel();
  }
}

export function getVoices() {
  if (
    typeof window === 'undefined' ||
    !window.speechSynthesis
  ) {
    return [];
  }

  return window.speechSynthesis.getVoices();
}
