import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import '../styles/DetalleNoticia.css';
import TextToSpeechButton from './TextToSpeechButton';
import { stopSpeaking } from '../services/textToSpeech';
import usePageScrollBoundaries from '../hooks/usePageScrollBoundaries';

export default function DetalleNoticia({ noticia, onVolver }) {
  const detalleContainerRef = useRef(null);
  const textoContainerRef = useRef(null);
  const textoContenidoRef = useRef(null);

  const [textoEnInicio, setTextoEnInicio] = useState(true);
  const [textoEnFinal, setTextoEnFinal] = useState(false);

  const {
    isAtTop: paginaEnInicio,
    isAtBottom: paginaEnFinal
  } = usePageScrollBoundaries(detalleContainerRef);

  const actualizarLimitesTexto = useCallback(() => {
    const contenedor = textoContainerRef.current;

    if (!contenedor) return;

    const maxScroll = Math.max(
      0,
      contenedor.scrollHeight - contenedor.clientHeight
    );

    setTextoEnInicio(contenedor.scrollTop <= 2);
    setTextoEnFinal(
      maxScroll <= 2 || contenedor.scrollTop >= maxScroll - 2
    );
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [noticia]);

  // Recalcula los límites del texto al desplazarse, redimensionar o cambiar
  // el contenido (por ejemplo, al aumentar el tamaño de la letra).
  useEffect(() => {
    const contenedor = textoContainerRef.current;
    const contenido = textoContenidoRef.current;

    if (!contenedor) return undefined;

    const animationFrameId = window.requestAnimationFrame(
      actualizarLimitesTexto
    );

    contenedor.addEventListener('scroll', actualizarLimitesTexto, {
      passive: true
    });
    window.addEventListener('resize', actualizarLimitesTexto);

    let resizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(actualizarLimitesTexto);
      resizeObserver.observe(contenedor);

      if (contenido) {
        resizeObserver.observe(contenido);
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      contenedor.removeEventListener('scroll', actualizarLimitesTexto);
      window.removeEventListener('resize', actualizarLimitesTexto);
      resizeObserver?.disconnect();
    };
  }, [noticia, actualizarLimitesTexto]);

  if (!noticia) return null;

  const textoCompleto = Array.isArray(noticia.contenido)
    ? noticia.contenido.join(' ')
    : noticia.contenido;

  const scrollTextoAbajo = () => {
    if (!textoContainerRef.current || textoEnFinal) return;

    textoContainerRef.current.scrollBy({
      top: 180,
      behavior: 'smooth'
    });
  };

  const scrollTextoArriba = () => {
    if (!textoContainerRef.current || textoEnInicio) return;

    textoContainerRef.current.scrollBy({
      top: -180,
      behavior: 'smooth'
    });
  };

  const scrollPaginaAbajo = () => {
    if (paginaEnFinal) return;
    window.scrollBy({ top: 500, behavior: 'smooth' });
  };

  const scrollPaginaArriba = () => {
    if (paginaEnInicio) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="detalle-noticia-container" ref={detalleContainerRef}>
      {/* Título principal */}
      <h1 className="detalle-titulo">{noticia.nombre}</h1>

      {/* Botones de regreso y lectura */}
      <div className="detalle-actions-bar">
        <button
          type="button"
          className="btn-verde btn-volver"
          onClick={() => {
            stopSpeaking();
            onVolver?.();
          }}
        >
          <ArrowLeft size={24} aria-hidden="true" />
          <span>Volver al Catálogo</span>
        </button>

        <TextToSpeechButton text={`${noticia.nombre}. ${textoCompleto}`} />
      </div>

      {/* Contenido de la noticia y controles de navegación */}
      <div className="detalle-layout-wrapper">
        <div className="detalle-grid">
          <div className="detalle-card-box imagen-box">
            <img
              src={noticia.imagen}
              alt={noticia.nombre}
              className="detalle-imagen"
            />
          </div>

          <div className="texto-box-wrapper">
            <div className="detalle-card-box texto-box" ref={textoContainerRef}>
              <div className="detalle-texto-content" ref={textoContenidoRef}>
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

            {/* Flechas que desplazan únicamente el texto */}
            <div className="texto-nav-arrows">
              <button
                type="button"
                className="btn-arrow-small"
                aria-label="Subir texto"
                title="Subir texto"
                onClick={scrollTextoArriba}
                disabled={textoEnInicio}
              >
                <ChevronUp size={24} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn-arrow-small"
                aria-label="Bajar texto"
                title="Bajar texto"
                onClick={scrollTextoAbajo}
                disabled={textoEnFinal}
              >
                <ChevronDown size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Flechas que desplazan toda la página */}
        <div className="nav-arrows-column">
          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Subir página"
            title="Subir página"
            onClick={scrollPaginaArriba}
            disabled={paginaEnInicio}
          >
            <ArrowUp size={28} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Bajar página"
            title="Bajar página"
            onClick={scrollPaginaAbajo}
            disabled={paginaEnFinal}
          >
            <ArrowDown size={28} aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}
