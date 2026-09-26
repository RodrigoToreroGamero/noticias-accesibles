import { useState } from 'react';
import Header from './components/Header';
import BanerBienvenida from './components/BanerBienvenida';
import Carrusel from './components/Carrusel';
import Catalogo from './components/Catalogo';
import DetalleNoticia from './components/DetalleNoticia';
import Footer from './components/Footer';

import { CATALOGOS_DATA } from './data/catalogos';
import { NOTICIAS_POR_SUBDISCIPLINA } from './data/noticias';
import './styles/App.css';

import { stopSpeaking } from './services/textToSpeech';

export default function App() {
  const [categoriaActual, setCategoriaActual] = useState(null);
  const [subcategoriaActual, setSubcategoriaActual] = useState(null);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  // Configuración dinámica según el nivel de navegación
  let tituloVista = '';
  let itemsVista = [];
  let textoBotonVolver = 'Volver al Inicio';
  let accionVolver = () => setCategoriaActual(null);
  
  stopSpeaking();	

  if (subcategoriaActual) {
    tituloVista = `Noticias de ${subcategoriaActual.toUpperCase()}`;
    itemsVista = NOTICIAS_POR_SUBDISCIPLINA[subcategoriaActual] || [];
    textoBotonVolver = `Volver a ${categoriaActual}`;
    accionVolver = () => setSubcategoriaActual(null);
    
  } else if (categoriaActual) {
    tituloVista = CATALOGOS_DATA[categoriaActual]?.titulo || 'Catálogo';
    itemsVista = CATALOGOS_DATA[categoriaActual]?.subcategorias || [];
    textoBotonVolver = 'Volver al Inicio';
    accionVolver = () => setCategoriaActual(null);
  }

  const handleSeleccionarCard = (item) => {
    if (!subcategoriaActual) {
      // Pasamos de Nivel 2 a Nivel 3 (listado de noticias de la subcategoría)
      setSubcategoriaActual(item.id);
    } else {
      // Pasamos de Nivel 3 a la Lectura Detallada de la Noticia
      setNoticiaSeleccionada(item);
    }
  };

  return (
    <div>
      <Header />

      {/* NIVEL 1: INICIO */}
      {!categoriaActual && (
        <>
          <BanerBienvenida />
          <Carrusel onSelectCategoria={(id) => setCategoriaActual(id)} />
        </>
      )}

      {/* NIVEL 2 y 3: CATÁLOGOS */}
      {categoriaActual && !noticiaSeleccionada && (
        <Catalogo
          titulo={tituloVista}
          subcategorias={itemsVista}
          textoBotonVolver={textoBotonVolver}
          onVolver={accionVolver}
          onSelectCard={handleSeleccionarCard}
        />
      )}

      {/* VISTA DETALLE DE NOTICIA */}
      {noticiaSeleccionada && (
        <DetalleNoticia
          noticia={noticiaSeleccionada}
          onVolver={() => setNoticiaSeleccionada(null)}
        />
      )}

      <Footer />
    </div>
  );
}

