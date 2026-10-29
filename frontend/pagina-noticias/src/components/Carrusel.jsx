import { useState, useEffect } from 'react';
import { CATEGORIAS } from '../data/categorias';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import '../styles/Carrusel.css';

export default function Carrusel({ onSelectCategoria }) {
  const [paginaActual, setPaginaActual] = useState(0);
  const [esCelular, setEsCelular] = useState(false); 

  // Detectar si es vista de celular para mostrar de 1 en 1 tarjeta
  useEffect(() => {
    const handleResize = () => {
      setEsCelular(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tarjetasPorPagina = esCelular ? 1 : 2;
  const totalPaginas = Math.ceil(CATEGORIAS.length / tarjetasPorPagina);
  const inicio = paginaActual * tarjetasPorPagina;
  const tarjetasVisibles = CATEGORIAS.slice(inicio, inicio + tarjetasPorPagina);

  const irAnterior = () => setPaginaActual((p) => Math.max(p - 1, 0));
  const irSiguiente = () => setPaginaActual((p) => Math.min(p + 1, totalPaginas - 1));

  return (
    <main className="carousel-main-wrapper">
      <div className="carousel-content-layout">
        {/* Botón Izquierdo Horizontal (Escritorio) - Cuadrado con bordes redondeados y verde */}
        <button
          type="button"
          className="carousel-nav-btn-desktop carousel-btn-left"
          onClick={irAnterior}
          disabled={paginaActual === 0}
          aria-label="Anterior"
        >
          <ArrowLeft size={28} color="#fff" />
        </button>

        {/* Contenedor de Tarjetas */}
        <div className="carousel-cards-box">
          {tarjetasVisibles.map((bloque) => (
            <div 
              key={bloque.id} 
              className="carousel-card-item"
              onClick={() => onSelectCategoria && onSelectCategoria(bloque.id)}     
              role="button"
              tabIndex={0}
            >
              <div className="carousel-card-title">{bloque.titulo}</div>
              <img src={bloque.imagen} alt={bloque.titulo} className="carousel-card-img" />
              <span className="carousel-card-btn-text">
                Acceder al contenido
              </span>
            </div>
          ))}
        </div>
        
        {/* Botón Derecho Horizontal (Escritorio) - Cuadrado con bordes redondeados y verde */}
        <button
          type="button"
          className="carousel-nav-btn-desktop carousel-btn-right"
          onClick={irSiguiente}
          disabled={paginaActual === totalPaginas - 1}
          aria-label="Siguiente"
        >
          <ArrowRight size={28} color="#fff" />
        </button>

        {/* Botones Verticales (Celular) - Cuadrados, verdes y con flechas arriba/abajo */}
        <div className="carousel-nav-mobile-column">
          <button
            type="button"
            className="carousel-nav-btn-mobile"       
            onClick={irAnterior}
            disabled={paginaActual === 0}
            aria-label="Anterior"
          >
            <ArrowUp size={28} color="#fff" />
          </button>
  
          <button
            type="button"
            className="carousel-nav-btn-mobile"         
            onClick={irSiguiente}
            disabled={paginaActual === totalPaginas - 1}
            aria-label="Siguiente"
          >
            <ArrowDown size={28} color="#fff" />
          </button>
        </div>

      </div>
    </main>
  );
}