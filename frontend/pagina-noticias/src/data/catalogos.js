export const CATALOGOS_DATA = {
  deportes: {
    titulo: 'Noticias Sobre Deportes',
    subcategorias: [
      { id: 'futbol', nombre: 'Fútbol', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen1.jpg` },
      { id: 'tenis', nombre: 'Tenis', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen2.jpg` },
      { id: 'f1', nombre: 'Fórmula 1', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen3.jpg` },
      { id: 'atletismo', nombre: 'Atletismo', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen4.jpg` },
      { id: 'basket', nombre: 'Basket', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen5.jpg` },
      { id: 'ciclismo', nombre: 'Ciclismo', imagen: `${import.meta.env.BASE_URL}catalogos/deportes/imagen6.jpg` }
    ]
  },
  tramites: {
    titulo: 'Guía de Trámites y Servicios',
    subcategorias: [
      { id: 'dni', nombre: 'Renovación DNI', imagen: `${import.meta.env.BASE_URL}catalogos/tramites/imagen1.jpg` },
      { id: 'pension', nombre: 'Cobro de Pensión', imagen: `${import.meta.env.BASE_URL}catalogos/tramites/imagen2.jpg` },
      { id: 'pasaporte', nombre: 'Pasaporte', imagen: `${import.meta.env.BASE_URL}catalogos/tramites/imagen3.jpg` },
      { id: 'salud-publica', nombre: 'Citas EsSalud', imagen: `${import.meta.env.BASE_URL}catalogos/tramites/imagen4.jpg` }
    ]
  },
  noticias: {
    titulo: 'Noticias Generales',
    subcategorias: [
      { id: 'locales', nombre: 'Locales', imagen: `${import.meta.env.BASE_URL}catalogos/noticias/imagen1.jpg` },
      { id: 'internacionales', nombre: 'Internacionales', imagen: `${import.meta.env.BASE_URL}catalogos/noticias/imagen2.jpg` },
      { id: 'politica', nombre: 'Política', imagen: `${import.meta.env.BASE_URL}catalogos/noticias/imagen3.jpg` },
      { id: 'economia', nombre: 'Economía', imagen: `${import.meta.env.BASE_URL}catalogos/noticias/imagen4.jpg` }
    ]
  },
  salud: {
    titulo: 'Consejos y Noticias de Salud',
    subcategorias: [
      { id: 'nutricion', nombre: 'Nutrición', imagen: `${import.meta.env.BASE_URL}catalogos/salud/imagen1.jpg` },
      { id: 'ejercicios', nombre: 'Ejercicios', imagen: `${import.meta.env.BASE_URL}catalogos/salud/imagen2.jpg` },
      { id: 'prevencion', nombre: 'Prevención', imagen: `${import.meta.env.BASE_URL}catalogos/salud/imagen3.jpg` }
    ]
  }
};