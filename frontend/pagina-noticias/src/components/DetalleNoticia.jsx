import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import '../styles/DetalleNoticia.css';

export default function DetalleNoticia({ noticia, onVolver }) {
  const textoContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [noticia]);

  if (!noticia) return null;

  const textoCompleto = Array.isArray(noticia.contenido)
    ? noticia.contenido.join(' ')
    : noticia.contenido;

  const handleEscucharNoticia = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const mensaje = new SpeechSynthesisUtterance(`${noticia.nombre}. ${textoCompleto}`);
      mensaje.lang = 'es-ES';
      mensaje.rate = 0.9;
      window.speechSynthesis.speak(mensaje);
    } else {
      alert('La síntesis de voz no está soportada en este navegador.');
    }
  };

  const scrollTextoAbajo = () => {
    if (textoContainerRef.current) {
      textoContainerRef.current.scrollBy({ top: 180, behavior: 'smooth' });
    }
  };

  const scrollTextoArriba = () => {
    if (textoContainerRef.current) {
      textoContainerRef.current.scrollBy({ top: -180, behavior: 'smooth' });
    }
  };

  const scrollPaginaAbajo = () => {
    window.scrollBy({ top: 500, behavior: 'smooth' });
  };

  const scrollPaginaArriba = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="detalle-noticia-container">
      {/* Título Principal */}
      <h1 className="detalle-titulo">{noticia.nombre}</h1>

      {/* Barra de Acciones Superior (Botonera alineada según boceto) */}
      <div className="detalle-actions-bar">
        <button className="btn-verde btn-volver" onClick={onVolver}>
          Volver al Catálogo
        </button>

        <button className="btn-verde btn-escuchar" onClick={handleEscucharNoticia}>
          <Volume2 size={24} /> Escuchar Noticia
        </button>
      </div>

      {/* Grid Principal con Flechas Globales al Costado */}
      <div className="detalle-layout-wrapper">
        <div className="detalle-grid">
          {/* Columna Izquierda: Imagen */}
          <div className="detalle-card-box imagen-box">
            <img
              src={noticia.imagen}
              alt={noticia.nombre}
              className="detalle-imagen"
            />
          </div>

          {/* Columna Derecha: Cuadro de Texto + Flechas del Texto */}
          <div className="texto-box-wrapper">
            <div className="detalle-card-box texto-box" ref={textoContainerRef}>
              <div className="detalle-texto-content">
                {Array.isArray(noticia.contenido) ? (
                  noticia.contenido.map((parrafo, index) => (
                    <p key={index} className="detalle-parrafo">
                      {parrafo}
                    </p>
                  ))
                ) : (
                  <p className="detalle-parrafo">{noticia.contenido}</p>
                )}
              </div>
            </div>

            {/* Flechas pequeñas para mover el texto interno */}
            <div className="texto-nav-arrows">
              <button
                type="button"
                className="btn-arrow-small"
                aria-label="Subir texto"
                onClick={scrollTextoArriba}
              >
                <ChevronUp size={24} />
              </button>
              <button
                type="button"
                className="btn-arrow-small"
                aria-label="Bajar texto"
                onClick={scrollTextoAbajo}
              >
                <ChevronDown size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Flechas grandes laterales para mover toda la página */}
        <div className="nav-arrows-column">
          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Subir página"
            onClick={scrollPaginaArriba}
          >
            <ArrowUp size={28} />
          </button>
          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Bajar página"
            onClick={scrollPaginaAbajo}
          >
            <ArrowDown size={28} />
          </button>
        </div>
      </div>
    </main>
  );
}