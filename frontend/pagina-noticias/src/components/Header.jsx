import { Sun, Moon, Keyboard, ArrowLeftRight, ArrowBigUp, CornerDownLeft, Space, ArrowDown, ArrowUp, X } from 'lucide-react';
import '../styles/Header.css';
import { useState, useEffect, useRef } from 'react';

export default function Header({
  darkMode,
  onToggleTheme,
  fontSize,
  onAumentarFuente,
  onDisminuirFuente  
}) {

	const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
	const dialogRef = useRef(null);
	const openBtnRef = useRef(null);
	
	useEffect(() => {
		const dialog = dialogRef.current;
		if(showKeyboardHelp && dialog && !dialog.open) {
			dialog.showModal();		
		}
	}, [showKeyboardHelp]);
	
	const handleClose = () => {
		setShowKeyboardHelp(false);
		if(openBtnRef.current) {
			openBtnRef.current.focus();
		}
	};
  
  return (
    <header className="header-container">
		
      {/* Marca / Logo */}
      <div className="header-brand">
        <img 
          src=`${import.meta.env.BASE_URL}brand/logo-noticlara.png`
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
		
		{/* Ayuda de navegación por teclado */}
		<button
			type="button"			
			className="keyboard-help-btn"
			ref={openBtnRef}
			title="Ayuda del teclado"
			onClick={() => setShowKeyboardHelp(true)}
			aria-haspopup="dialog"
			aria-expanded={showKeyboardHelp}
			aria-controls="keyboard-help"
			aria-label="Abrir ayuda de navegación por teclado"
		>
			<Keyboard size={24} aria-hidden="true" />
		</button>
		</div>
		<dialog
			id="keyboard-help"
			className="keyboard-help-section"
			ref={dialogRef}			
			aria-label="Instrucciones de navegación por teclado"			
			aria-labelledby="keyboard-title"
			aria-describedby="keyboard-description"
			onClose={handleClose}
		>
			<button
				type="button"
				className="close-keyboard-help-btn"
				autoFocus						
				onClick={() => dialogRef.current?.close()}
				aria-label="Cerrar ayuda de navegación"
			>
				<X size={24} aria-hidden="true" /> Cerrar
			</button>
			<h4 id="keyboard-title">
				Ayuda de navegación por teclado
			</h4>
			<p id="keyboard-description">
				Puedes utilizar estas teclas para navegar:
			</p>
			<ul>
				<li>
					<p>
						<b>Subir: </b><kbd>Fecha arriba</kbd><ArrowUp size={24} aria-hidden="true" />
					</p>
				</li>
				<li>
					<p>
						<b>Bajar: </b><kbd>Fecha abajo</kbd><ArrowDown size={24} aria-hidden="true" />
					</p>
				</li>
				<li>
					<p>
						<b>Avanzar: </b><kbd>Tab</kbd><ArrowLeftRight size={24} aria-hidden="true" />
					</p>
				</li>
				<li>
					<p>
						<b>Retroceder: </b><kbd>Shift</kbd><ArrowBigUp size={24} aria-hidden="true" />+<kbd>Tab</kbd><ArrowLeftRight size={24} aria-hidden="true" />
					</p>	
				</li>
				<li>
					<p>
						<b>Activar: </b><kbd>Enter</kbd><CornerDownLeft size={24} aria-hidden="true" /> o <kbd>Espacio</kbd><Space size={24} aria-hidden="true" />
					</p>
				</li>			
			</ul>		
		</dialog>
	
    </header>
  );
}