import { Search, Mic, User, Sun, Moon } from 'lucide-react';
import '../styles/Header.css';

export default function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="header-container">
      {/* Marca / Logo */}
      <div className="header-brand">
        <div className="header-logo-placeholder">[Logo]</div>
        <span className="header-title">Nombre de la Página</span>
      </div>

      {/* Barra de Búsqueda Superior */}
      <div className="header-search-box">
        <Search className="header-icon-search" size={22} color="#555" />
        <input
          type="text"
          placeholder="Buscar..."
          className="header-search-input"
          aria-label="Buscar"
        />
        <button
          type="button"
          className="header-mic-btn"
          aria-label="Activar micrófono"
        >
          <Mic size={22} color="#0088ff" />
        </button>
      </div>

      {/* Controles de la Derecha: Alto Contraste y Usuario */}
      <div className="header-right-actions">
        {/* Botón Cambiar Contraste */}
        <button
          type="button"
          className="header-theme-btn"
          onClick={onToggleTheme}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a alto contraste'}
          title={darkMode ? 'Modo Claro' : 'Alto Contraste'}
        >
          {darkMode ? <Sun size={26} color="#ffca28" /> : <Moon size={26} color="#111" />}
        </button>

        {/* Perfil de Usuario */}
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