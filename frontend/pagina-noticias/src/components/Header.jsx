import { User, Sun, Moon } from 'lucide-react';
import '../styles/Header.css';

export default function Header({
  darkMode,
  onToggleTheme,
  fontSize,
  onAumentarFuente,
  onDisminuirFuente  
}) {  
  
  return (
    <header className="header-container">
		
      {/* Marca / Logo */}
      <div className="header-brand">
        <img 
          src="/brand/logo-noticlara.png" 
          alt="NotiClara Logo" 
          className="header-logo-img"
        />
        <span className="header-title">NotiClara</span>
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