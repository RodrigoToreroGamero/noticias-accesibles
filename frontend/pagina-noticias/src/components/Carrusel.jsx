import { useState, useRef } from 'react';
import { CATEGORIAS } from '../data/categorias';
import '../styles/Carrusel.css'
//import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Carrusel({ onSelectCategoria }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const touchStart = useRef(null);
  const tarjetasPorPagina = 2;
  
  const totalPaginas = Math.ceil(CATEGORIAS.length / tarjetasPorPagina);
  const inicio = paginaActual * tarjetasPorPagina;
  const tarjetasVisibles = CATEGORIAS.slice(inicio, inicio + tarjetasPorPagina);
  
  const touchSpeedToIgnoreThreshold = 100;
  
  const handleTouchStart = (e) => {
	  touchStart.current = {
		  x: e.touches[0].clientX,
		  y: e.touches[0].clientY
	  };
  };
  
  const handleTouchEnd = (e) => {
	  if(!touchStart.current) {
		  return;
	  }
	  
	  const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
	  const deltaY = e.changedTouches[0].clientY - touchStart.current.y;
	  
	  touchStart.current = null;
	  
	  if(Math.abs(deltaX) < touchSpeedToIgnoreThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
		  return;
	  }
	  
	  if(deltaX < 0) {
		  // Deslizar hacia la izquierda para ir a la siguiente página del carrusel:
		  setPaginaActual((pagina) => Math.min(pagina + 1, totalPaginas - 1));
	  } else {
		  // Deslizar hacia la derecha para regresar a la página anterior del carrusel:
		  setPaginaActual((pagina) => Math.max(pagina - 1, 0));
	  }
  };

  return (
    <main className="carousel-wrapper">
    
      <div className="carousel-cards-container"
		onTouchStart={handleTouchStart}
		onTouchEnd={handleTouchEnd}
	  >

        {tarjetasVisibles.map((bloque) => (
          <div 
            key={bloque.id} 
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectCategoria && onSelectCategoria(bloque.id)} // <-- 2. Llamar a la función			
          >
            <div className="card-title-bar">{bloque.titulo}</div>
            <img src={bloque.imagen} alt={bloque.titulo} className="card-image" />
            <span className="card-button">
              Acceder al contenido
            </span>
          </div>
        ))}
      </div>
      
	  
	  
        <div className="nav-carousel-column">
		
		  <button
            type="button"
            className="nav-carousel-btn"            		
			onClick={() => setPaginaActual(paginaActual - 1)}
            title="Anterior"						
			disabled={paginaActual === 0}
			aria-label="Anterior"
          >
			Anterior            
          </button>
		
          <button
            type="button"
            className="nav-carousel-btn"            
            onClick={() => setPaginaActual(paginaActual + 1)}
            title="Siguiente"
			disabled={paginaActual === totalPaginas - 1}
			aria-label="Siguiente"
          >
			Siguiente            
          </button>


        </div>
	  
    </main>
  );
}