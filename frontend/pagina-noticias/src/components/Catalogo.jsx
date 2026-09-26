import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Search, Mic } from 'lucide-react';
import '../styles/Catalogo.css';

export default function Catalogo({
  titulo,
  subcategorias = [],
  textoBotonVolver = 'Volver al Inicio',
  onVolver,
  onSelectCard
}) {
  const [busqueda, setBusqueda] = useState('');

  // Subir automáticamente al tope cuando cambia la vista o título del catálogo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [titulo]);

  const elementosFiltrados = subcategorias.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const scrollAbajo = () => {
    window.scrollBy({ top: 550, behavior: 'smooth' });
  };

  const scrollArriba = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="catalogo-container">
      {/* Barra superior con botón Volver y Título Dinámico */}
      <div className="catalogo-top-bar">
        <button className="btn-verde btn-volver" onClick={onVolver}>
          {textoBotonVolver}
        </button>
        <h1 className="catalogo-titulo">{titulo}</h1>
      </div>

      {/* Buscador general */}
      <div className="search-section-catalogo">
        <label htmlFor="search-input" className="search-label">
          Buscar por nombre
        </label>
        <div className="search-box-group">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={24} color="#555" />
            <input
              id="search-input"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="catalogo-input"
            />
            <Mic className="mic-icon" size={24} color="#000" />
          </div>
          <button className="btn-verde btn-buscar">Buscar</button>
        </div>
      </div>

      {/* Rejilla de Tarjetas + Flechas de Navegación Lateral */}
      <div className="catalogo-grid-wrapper">
        <div className="catalogo-grid">
          {elementosFiltrados.map((item) => (
            <div
              key={item.id}
              className="card card-catalogo-clickable"
              onClick={() => onSelectCard && onSelectCard(item)}
              role="button"
              tabIndex={0}
            >
              <div className="card-title-bar">{item.nombre}</div>
              <img src={item.imagen} alt={item.nombre} className="card-image" />
              <button className="card-button">Leer Noticias</button>
            </div>
          ))}
        </div>

        {/* Columna de Flechas alineada con las filas */}
        <div className="nav-arrows-column">          
          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Subir al inicio"
            onClick={scrollArriba}
            title="Subir"
          >
            <ArrowUp size={28} />
          </button>
		  
		  <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Bajar contenido"
            onClick={scrollAbajo}
            title="Bajar"
          >
            <ArrowDown size={28} />
          </button>		  
        </div>
      </div>
    </main>
  );
}