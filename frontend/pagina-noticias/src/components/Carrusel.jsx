import { useState } from 'react';
import { CATEGORIAS } from '../data/categorias';
import '../styles/Carrusel.css'
//import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Carrusel({ onSelectCategoria }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const tarjetasPorPagina = 2;
  
  const totalPaginas = Math.ceil(CATEGORIAS.length / tarjetasPorPagina);
  const inicio = paginaActual * tarjetasPorPagina;
  const tarjetasVisibles = CATEGORIAS.slice(inicio, inicio + tarjetasPorPagina);

  return (
    <main className="carousel-wrapper">
    
      <div className="carousel-cards-container">
        {tarjetasVisibles.map((bloque) => (
          <div 
            key={bloque.id} 
            className="card"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectCategoria && onSelectCategoria(bloque.id)} // <-- 2. Llamar a la función
          >
            <div className="card-title-bar">{bloque.titulo}</div>
            <img src={bloque.imagen} alt={bloque.titulo} className="card-image" />
            <button className="card-button">
              Acceder al contenido
            </button>
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