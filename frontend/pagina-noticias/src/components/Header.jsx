import { Search, Mic, User } from 'lucide-react';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header-container">
      {/* Marca / Logo */}
      <div className="header-brand">
        <div className="header-logo-placeholder">[Logo]</div>
        <span className="header-title">Noticias Accesibles</span>
      </div>

      {/* Barra de Búsqueda Superior */}
      <div className="header-search-box">
        <Search className="header-icon-search" size={22} color="#555" />
        <input
          type="text"
          placeholder=""
          className="header-search-input"
          aria-label="Buscar"
        />
        <button
          type="button"
          className="header-mic-btn"
          aria-label="Activar micrófono"
        >
          <Mic size={22} color="#0088ff" /> {/* Azul azul uniforme */}
        </button>
      </div>

      {/* Perfil de Usuario */}
      <button
        type="button"
        className="header-user-btn"
        aria-label="Perfil de usuario"
      >
        <User size={26} color="#000" />
      </button>
    </header>
  );
}