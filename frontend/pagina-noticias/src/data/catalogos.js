import imgFutbol from '../assets/catalogos/deportes/imagen1.jpg';
import imgTenis from '../assets/catalogos/deportes/imagen2.jpg';
import imgF1 from '../assets/catalogos/deportes/imagen3.jpg';
import imgAtletismo from '../assets/catalogos/deportes/imagen4.jpg';
import imgBasket from '../assets/catalogos/deportes/imagen5.jpg';
import imgCiclismo from '../assets/catalogos/deportes/imagen6.jpg';

import imgP1 from '../assets/catalogos/noticias/imagen1.jpg';
import imgP2 from '../assets/catalogos/noticias/imagen2.jpg';
import imgP3 from '../assets/catalogos/noticias/imagen3.jpg';
import imgP4 from '../assets/catalogos/noticias/imagen4.jpg';

import imgS1 from '../assets/catalogos/salud/imagen1.jpg';
import imgS2 from '../assets/catalogos/salud/imagen2.jpg';
import imgS3 from '../assets/catalogos/salud/imagen3.jpg';

import imgT1 from '../assets/catalogos/tramites/imagen1.jpg';
import imgT2 from '../assets/catalogos/tramites/imagen2.jpg';
import imgT3 from '../assets/catalogos/tramites/imagen3.jpg';
import imgT4 from '../assets/catalogos/tramites/imagen4.jpg';

export const CATALOGOS_DATA = {
  deportes: {
    titulo: 'Noticias Sobre Deportes',
    subcategorias: [
      { id: 'futbol', nombre: 'Fútbol', imagen: imgFutbol},
      { id: 'tenis', nombre: 'Tenis', imagen: imgTenis},
      { id: 'f1', nombre: 'Fórmula 1', imagen: imgF1},
      { id: 'atletismo', nombre: 'Atletismo', imagen: imgAtletismo},
      { id: 'basket', nombre: 'Basket', imagen: imgBasket},
      { id: 'ciclismo', nombre: 'Ciclismo', imagen: imgCiclismo}
    ]
  },
  tramites: {
    titulo: 'Guía de Trámites y Servicios',
    subcategorias: [
      { id: 'dni', nombre: 'Renovación DNI', imagen: imgT1 },
      { id: 'pension', nombre: 'Cobro de Pensión', imagen: imgT2 },
      { id: 'pasaporte', nombre: 'Pasaporte', imagen: imgT3 },
      { id: 'salud-publica', nombre: 'Citas EsSalud', imagen: imgT4 }
    ]
  },
  noticias: {
    titulo: 'Noticias Generales',
    subcategorias: [
      { id: 'locales', nombre: 'Locales', imagen: imgP1 },
      { id: 'internacionales', nombre: 'Internacionales', imagen: imgP2 },
      { id: 'politica', nombre: 'Política', imagen: imgP3 },
      { id: 'economia', nombre: 'Economía', imagen: imgP4 }
    ]
  },
  salud: {
    titulo: 'Consejos y Noticias de Salud',
    subcategorias: [
      { id: 'nutricion', nombre: 'Nutrición', imagen: imgS1 },
      { id: 'ejercicios', nombre: 'Ejercicios', imagen: imgS2 },
      { id: 'prevencion', nombre: 'Prevención', imagen: imgS3 }
    ]
  }
};