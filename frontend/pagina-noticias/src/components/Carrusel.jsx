import { useState } from 'react';
import { CATEGORIAS } from '../data/categorias';
import '../styles/Carrusel.css'

export default function Carrusel({ onSelectCategoria }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const tarjetasPorPagina = 2;
  
  const totalPaginas = Math.ceil(CATEGORIAS.length / tarjetasPorPagina);
  const inicio = paginaActual * tarjetasPorPagina;
  const tarjetasVisibles = CATEGORIAS.slice(inicio, inicio + tarjetasPorPagina);

  return (
    <main className="carousel-wrapper">
      <button 
        className="nav-arrow-btn"
        onClick={() => setPaginaActual(paginaActual - 1)}
        disabled={paginaActual === 0}
        aria-label="Anterior"
      >
        ←
      </button>

      <div className="cards-container">
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

      <button 
        className="nav-arrow-btn"
        onClick={() => setPaginaActual(paginaActual + 1)}
        disabled={paginaActual === totalPaginas - 1}
        aria-label="Siguiente"
      >
        →
      </button>
    </main>
  );
}