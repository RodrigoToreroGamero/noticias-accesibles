import { useState } from 'react';
import { Search, Mic, User, Sun, Moon } from 'lucide-react';
import '../styles/Header.css';

export default function Header({
  darkMode,
  onToggleTheme,
  fontSize,
  onAumentarFuente,
  onDisminuirFuente,
  busqueda,
  setBusqueda
}) {
  const [escuchando, setEscuchando] = useState(false);

  // Reconocimiento de voz nativo en el Header
  const activarMicrofonoHeader = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta el reconocimiento de voz.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setEscuchando(true);
    };

    recognition.onresult = (event) => {
      const textoDictado = event.results[0][0].transcript;
      const textoLimpio = textoDictado.replace(/\.$/, '');
      if (setBusqueda) setBusqueda(textoLimpio);
      setEscuchando(false);
    };

    recognition.onerror = () => {
      setEscuchando(false);
    };

    recognition.onend = () => {
      setEscuchando(false);
    };

    recognition.start();
  };

  return (
    <header className="header-container">
      {/* Marca / Logo */}
      <div className="header-brand">
        <div className="header-logo-placeholder">[Logo]</div>
        <span className="header-title">Nombre de la Página</span>
      </div>

      {/* Barra de Búsqueda Global */}
      <div className="header-search-box">
        <Search className="header-icon-search" size={22} color="#555" />
        <input
          type="text"
          value={busqueda || ''}
          placeholder={escuchando ? 'Escuchando tu voz...' : 'Buscar...'}
          onChange={(e) => setBusqueda && setBusqueda(e.target.value)}
          className="header-search-input"
          aria-label="Buscar"
        />
        <button
          type="button"
          className={`header-mic-btn ${escuchando ? 'escuchando-anim' : ''}`}
          onClick={activarMicrofonoHeader}
          aria-label="Activar micrófono para buscar por voz"
          title="Buscar por voz"
        >
          <Mic size={22} color={escuchando ? '#ff0000' : '#0088ff'} />
        </button>
      </div>

      {/* Controles de Accesibilidad */}
      <div className="header-right-actions">
        <div className="font-size-controls" title="Ajustar tamaño de texto">
          <button
            type="button"
            className="btn-font-scale"
            onClick={onDisminuirFuente}
            disabled={fontSize === 'normal'}
            aria-label="Disminuir tamaño de letra"
          >
            A-
          </button>
          <button
            type="button"
            className="btn-font-scale"
            onClick={onAumentarFuente}
            disabled={fontSize === 'extra-grande'}
            aria-label="Aumentar tamaño de letra"
          >
            A+
          </button>
        </div>

        <button
          type="button"
          className="header-theme-btn"
          onClick={onToggleTheme}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a alto contraste'}
          title={darkMode ? 'Modo Claro' : 'Alto Contraste'}
        >
          {darkMode ? <Sun size={26} color="#ffca28" /> : <Moon size={26} color="#111" />}
        </button>

        <button
          type="button"
          className="header-user-btn"
          aria-label="Perfil de usuario"
        >
          <User size={26} color="#000" />
        </button>
      </div>
    </header>
  );
}