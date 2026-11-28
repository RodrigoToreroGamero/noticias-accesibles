import { Sun, Moon, Accessibility, ArrowLeftRight, ArrowBigUp, CornerDownLeft, Space, ArrowDown, ArrowUp, X } from 'lucide-react';
import '../styles/Header.css';
import { useState, useEffect, useRef } from 'react';

export default function Header({
  darkMode,
  onToggleTheme,
  fontSize,
  onAumentarFuente,
  onDisminuirFuente  
}) {

	const [showAccessibilityOptions, setShowAccessibilityOptions] = useState(false);
	const dialogRef = useRef(null);
	const openBtnRef = useRef(null);
	
	useEffect(() => {
		const dialog = dialogRef.current;
		if(showAccessibilityOptions && dialog && !dialog.open) {
			dialog.showModal();		
		}
	}, [showAccessibilityOptions]);
	
	const handleClose = () => {
		setShowAccessibilityOptions(false);
		if(openBtnRef.current) {
			openBtnRef.current.focus();
		}
	};
  
  return (
    <header className="header-container">
		
      {/* Marca / Logo */}
      <div className="header-brand">
        <img 
          src={`${import.meta.env.BASE_URL}brand/logo-noticlara.png`}
          alt="NotiClara Logo" 
          className="header-logo-img"
        />
        <span className="header-title">NotiClara</span>
      </div>	  	  
      
      {/* Controles de Accesibilidad */}
      <div className="header-right-actions">
        

        
		
		{/* Ayuda de navegación por teclado */}
		<button
			type="button"			
			className="accessibility-options-btn"
			ref={openBtnRef}
			title="Opciones de accesibilidad"
			onClick={() => setShowAccessibilityOptions(true)}
			aria-haspopup="dialog"
			aria-expanded={showAccessibilityOptions}
			aria-controls="accessibility-options"
			aria-label="Entrar a las opciones de accesibilidad"
		>			
			<Accessibility size={24} aria-hidden="true" />
			Opciones de accesibilidad
		</button>
		</div>
		<dialog
			className="accessibility-options-section"
			ref={dialogRef}			
			aria-label="Opciones de accesibilidad"			
			aria-labelledby="options-title"
			onClose={handleClose}
		>
			<button
				type="button"
				className="close-accessibility-options-btn"
				autoFocus						
				onClick={() => dialogRef.current?.close()}
				aria-label="Cerrar ayuda de navegación"
			>
				<X size={24} aria-hidden="true" /> Cerrar
			</button>
			
			<h4 id="options-title">
				Opciones de accesibilidad
			</h4>
			
			<div className="font-size-controls" title="Ajustar tamaño de texto">
			  <button
				type="button"
				className="btn-font-scale"
				onClick={onDisminuirFuente}
				disabled={fontSize === 'normal'}
				aria-label="Disminuir tamaño de letra"
			  >
				- Disminuir texto
			  </button>
			  <button
				type="button"
				className="btn-font-scale"
				onClick={onAumentarFuente}
				disabled={fontSize === 'extra-grande'}
				aria-label="Aumentar tamaño de letra"
			  >
				+ Aumentar texto
			  </button>
			</div>
			
			<section className="contrast-btn-section">
				Contraste:
				<button
				  type="button"
				  className="header-theme-btn"
				  onClick={onToggleTheme}
				  aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a alto contraste'}
				  title={darkMode ? 'Modo Claro' : 'Alto Contraste'}
				>
				  {darkMode ? <Sun size={26} color="#ffca28" /> : <Moon size={26} color="#111" />}			  
				</button>				
			</section>
			
			
			<section>
				<h4 id="keyboard-title">
					Navegación por teclado
				</h4>				
				<ul>
					<li>
						<p>
							Subir: <kbd>Fecha arriba</kbd><ArrowUp size={24} aria-hidden="true" />
						</p>
					</li>
					<li>
						<p>
							Bajar: <kbd>Fecha abajo</kbd><ArrowDown size={24} aria-hidden="true" />
						</p>
					</li>
					<li>
						<p>
							Avanzar: <kbd>Tab</kbd><ArrowLeftRight size={24} aria-hidden="true" />
						</p>
					</li>
					<li>
						<p>
							Retroceder: <kbd>Shift</kbd><ArrowBigUp size={24} aria-hidden="true" />+<kbd>Tab</kbd><ArrowLeftRight size={24} aria-hidden="true" />
						</p>	
					</li>
					<li>
						<p>
							Activar: <kbd>Enter</kbd><CornerDownLeft size={24} aria-hidden="true" /> o <kbd>Espacio</kbd><Space size={24} aria-hidden="true" />
						</p>
					</li>			
				</ul>
			</section>
		</dialog>
	
    </header>
  );
}