import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowLeft, Search, Mic } from 'lucide-react';
import '../styles/Catalogo.css';
import { startVoiceRecognition, stopVoiceRecognition } from '../services/voiceCommandsConfig';
import usePageScrollBoundaries from '../hooks/usePageScrollBoundaries';

export default function Catalogo({
  titulo,
  subcategorias = [],
  textoBotonVolver = 'Volver al Inicio',
  onVolver,
  onSelectCard
}) {
  const [busqueda, setBusqueda] = useState('');
  const [escuchando, setEscuchando] = useState(false);
  const [mensajeVoz, setMensajeVoz] = useState('');
  const catalogoContainerRef = useRef(null);

  const { isAtTop, isAtBottom } = usePageScrollBoundaries(
    catalogoContainerRef
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [titulo]);

  // Detiene el micrófono si el usuario abandona el catálogo.
  useEffect(() => {
    return () => stopVoiceRecognition();
  }, []);

  const activarMicrofono = () => {
    if (escuchando) {
      stopVoiceRecognition();
      setEscuchando(false);
      setMensajeVoz('Búsqueda por voz detenida.');
      return;
    }

    // El cambio visual comienza al instante, incluso mientras se activa el micrófono.
    setEscuchando(true);
    setMensajeVoz('Preparando el micrófono...');

    startVoiceRecognition({
      onStart: () => {
        setEscuchando(true);
        setMensajeVoz('Te estamos escuchando. Habla ahora.');
      },
      onResult: (texto) => {
        setBusqueda(texto);
        setEscuchando(false);
        setMensajeVoz('Búsqueda por voz completada.');
      },
      onError: (error) => {
        setEscuchando(false);
        setMensajeVoz(
          error?.message || 'No se pudo utilizar el micrófono. Inténtalo nuevamente.'
        );
      },
      onEnd: () => {
        setEscuchando(false);
        setMensajeVoz((mensajeActual) =>
          mensajeActual === 'Te estamos escuchando. Habla ahora.' ||
          mensajeActual === 'Preparando el micrófono...'
            ? 'No se detectó voz. Inténtalo nuevamente.'
            : mensajeActual
        );
      }
    });
  };

  const elementosFiltrados = (subcategorias || []).filter((item) =>
    (item?.nombre || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const scrollAbajo = () => {
    if (isAtBottom) return;
    window.scrollBy({ top: 500, behavior: 'smooth' });
  };

  const scrollArriba = () => {
    if (isAtTop) return;
    window.scrollBy({ top: -500, behavior: 'smooth' });
  };

  return (
    <main className="catalogo-container" ref={catalogoContainerRef}>
      {/* Barra superior con botón Volver y título centrado */}
      <div className="catalogo-top-bar">
        <button
          type="button"
          className="btn-verde btn-volver"
          onClick={() => {
            onVolver?.();
            setBusqueda('');
            setMensajeVoz('');
          }}
        >
          <ArrowLeft size={24} aria-hidden="true" />
          <span>{textoBotonVolver}</span>
        </button>

        <h1 className="catalogo-titulo">{titulo}</h1>
      </div>

      {/* Buscador escrito con reconocimiento de voz integrado */}
      <div className="search-section-catalogo">
        <label htmlFor="search-input" className="search-label">
          Buscar por nombre
        </label>

        <div className="search-box-group">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={24} aria-hidden="true" />
            <input
              id="search-input"
              type="text"
              value={busqueda}
              placeholder="Escribe para buscar..."
              onChange={(event) => setBusqueda(event.target.value)}
              className="catalogo-input"
              autoComplete="off"
            />
          </div>

          <button
            type="button"
            className={`btn-voice-search ${escuchando ? 'is-listening' : ''}`}
            onClick={activarMicrofono}
            title={escuchando ? 'Detener búsqueda por voz' : 'Buscar por voz'}
            aria-label={escuchando ? 'Detener búsqueda por voz' : 'Buscar por voz'}
            aria-pressed={escuchando}
          >
            <Mic size={24} aria-hidden="true" />
            <span>{escuchando ? 'Escuchando...' : 'Buscar por voz'}</span>
          </button>
        </div>

        {mensajeVoz && (
          <p className="voice-search-status" role="status" aria-live="polite">
            {mensajeVoz}
          </p>
        )}
      </div>

      {/* Tarjetas del catálogo y controles de desplazamiento */}
      <div className="catalogo-grid-wrapper">
        <div className="catalogo-grid">
          {subcategorias.length <= 0 && (
            <p aria-label="Actualmente no hay categorías disponibles">
              Actualmente no hay categorías disponibles
            </p>
          )}

          {subcategorias.length > 0 && elementosFiltrados.length <= 0 && (
            <p aria-label={`No se ha encontrado ${busqueda}`}>
              No se ha encontrado &quot;{busqueda}&quot;
            </p>
          )}

          {elementosFiltrados.map((item) => (
            <div
              key={item.id}
              className="catalogo-card catalogo-card-clickable"
              onClick={() => {
                onSelectCard?.(item);
                setBusqueda('');
              }}
              role="button"
              tabIndex={0}
            >
              <div className="catalogo-card-title-bar">{item.nombre}</div>
              <img
                src={item.imagen}
                alt={item.nombre}
                className="catalogo-card-image"
              />
              <span className="catalogo-card-button">Leer Noticias</span>
            </div>
          ))}
        </div>

        <div className="nav-arrows-column">
          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Subir al inicio"
            onClick={scrollArriba}
            title="Subir"
            disabled={isAtTop}
          >
            <ArrowUp size={28} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="nav-arrow-btn"
            aria-label="Bajar contenido"
            onClick={scrollAbajo}
            title="Bajar"
            disabled={isAtBottom}
          >
            <ArrowDown size={28} aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}
