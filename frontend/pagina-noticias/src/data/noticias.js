// --- IMPORTACIÓN DE IMÁGENES LOCALES ---
// Fútbol
import imgFutbol1 from '../assets/catalogos/deportes/imagen1.jpg';
import imgFutbol2 from '../assets/noticias/futbol/2.jpg';
import imgFutbol3 from '../assets/noticias/futbol/3.jpg';
import imgFutbol4 from '../assets/noticias/futbol/4.jpg';

// Tenis
import imgTenis1 from '../assets/noticias/tenis/1.jpg';
import imgTenis2 from '../assets/noticias/tenis/2.jpg';
import imgTenis3 from '../assets/noticias/tenis/3.jpg';
import imgTenis4 from '../assets/noticias/tenis/4.jpg';

// Fórmula 1
import imgF11 from '../assets/noticias/formula1/1.jpg';
import imgF12 from '../assets/noticias/formula1/2.jpg';
import imgF13 from '../assets/noticias/formula1/3.jpg';
import imgF14 from '../assets/noticias/formula1/4.jpg';

// Atletismo
import imgAtletismo1 from '../assets/noticias/atletismo/1.jpg';
import imgAtletismo2 from '../assets/noticias/atletismo/2.jpg';
import imgAtletismo3 from '../assets/noticias/atletismo/3.jpg';
import imgAtletismo4 from '../assets/noticias/atletismo/4.jpg';

// Basket
import imgBasket1 from '../assets/noticias/basket/1.jpg';
import imgBasket2 from '../assets/noticias/basket/2.jpg';
import imgBasket3 from '../assets/noticias/basket/3.jpg';
import imgBasket4 from '../assets/noticias/basket/4.jpg';

// Ciclismo
import imgCiclismo1 from '../assets/noticias/ciclismo/1.jpg';
import imgCiclismo2 from '../assets/noticias/ciclismo/2.jpg';
import imgCiclismo3 from '../assets/noticias/ciclismo/3.jpg';
import imgCiclismo4 from '../assets/noticias/ciclismo/4.jpg';


export const NOTICIAS_POR_SUBDISCIPLINA = {
  // --- FÚTBOL ---
  futbol: [
    {
      id: 'fut-1',
      nombre: 'Gran Final del Torneo Local',
      imagen: imgFutbol1,
      contenido: [
        'En un emocionante encuentro disputado este fin de semana, el equipo local se impuso por 2 a 1 en los últimos minutos del tiempo reglamentario.',
        'El primer tiempo estuvo marcado por un juego defensivo muy ordenado. Sin embargo, en el complemento ambos cuadros arriesgaron más, regalando un espectáculo lleno de goles y ocasiones para la afición.'
      ]
    },
    {
      id: 'fut-2',
      nombre: 'Convocatoria Oficial para la Selección',
      imagen: imgFutbol2,
      contenido: [
        'El cuerpo técnico dio a conocer la nómina definitiva de futbolistas citados para los próximos dos compromisos internacionales.',
        'Entre las principales novedades destaca el llamado de tres jóvenes promesas del torneo local, así como el retorno del capitán tras superar su lesión de rodilla.'
      ]
    },
    {
      id: 'fut-3',
      nombre: 'Nuevas Medidas de Seguridad en los Estadios',
      imagen: imgFutbol3,
      contenido: [
        'Las autoridades deportivas anunciaron un nuevo protocolo de ingreso a los recintos para garantizar la tranquilidad de las familias y adultos mayores.',
        'Se implementarán accesos preferenciales, señalética con letras de mayor tamaño e iluminación reforzada en las tribunas y salidas de emergencia.'
      ]
    },
    {
      id: 'fut-4',
      nombre: 'Presentación de la Camiseta Temporada 2026',
      imagen: imgFutbol4,
      contenido: [
        'En una ceremonia emotiva, el club presentó la indumentaria oficial que vestirá durante toda la campaña actual.',
        'El diseño rinde homenaje a la rica historia de la institución, utilizando los colores clásicos y materiales ecológicos de alta durabilidad.'
      ]
    }
  ],

  // --- TENIS ---
  tenis: [
    {
      id: 'ten-1',
      nombre: 'Triunfo Impecable en el Abierto Internacional',
      imagen: imgTenis1,
      contenido: [
        'El tenista número uno del ranking superó a su rival en sets corridos en un partido que duró poco más de dos horas.',
        'Su efectividad en el primer servicio y el control de los puntos largos fueron determinantes para dominar el partido.'
      ]
    },
    {
      id: 'ten-2',
      nombre: 'Nuevas Pistas de Arcilla Inclusivas',
      imagen: imgTenis2,
      contenido: [
        'Inauguraron un complejo deportivo equipado con tecnología avanzada para el entrenamiento de tenis convencional y adaptado.',
        'El centro busca masificar la práctica de este deporte en jóvenes de todas las edades e impulsar semilleros locales.'
      ]
    },
    {
      id: 'ten-3',
      nombre: 'Gran Final del Torneo de Dobles',
      imagen: imgTenis3,
      contenido: [
        'La dupla nacional se coronó campeona tras superar un emocionante tie-break en el tercer set decisivo.',
        'El público asistente celebró la entrega y la excelente coordinación mostrada por ambos jugadores a lo largo de la semana.'
      ]
    },
    {
      id: 'ten-4',
      nombre: 'Clínica Deportiva Abierta a la Comunidad',
      imagen: imgTenis4,
      contenido: [
        'Reconocidos extenistas profesionales brindaron una jornada gratuita de enseñanza básica y ejercicios de acondicionamiento físico.',
        'La actividad estuvo dirigida a familias e incentivó el ejercicio continuo como pilar de una vida saludable.'
      ]
    }
  ],

  // --- FÓRMULA 1 ---
  f1: [
    {
      id: 'f1-1',
      nombre: 'Victoria Histórica en el Gran Premio',
      imagen: imgF11,
      contenido: [
        'Una carrera llena de dramatismo bajo la lluvia terminó con el triunfo sorpresivo del piloto de la escudería italiana.',
        'Gracias a una estrategia de paradas en pits impecable, el equipo logró tomar el liderazgo en la vuelta 42 y mantener la distancia hasta cruzar la bandera a cuadros.'
      ]
    },
    {
      id: 'f1-2',
      nombre: 'Cambios Técnicos para los Monoplazas',
      imagen: imgF12,
      contenido: [
        'La federación internacional aprobó ajustes en la reglamentación técnica que buscan aumentar los adelantamientos en pista.',
        'Los alerones traseros sufrirán modificaciones estéticas y aerodinámicas para reducir la turbulencia cuando los vehículos viajen muy cerca entre sí.'
      ]
    },
    {
      id: 'f1-3',
      nombre: 'Presentación del Circuito Nocturno',
      imagen: imgF13,
      contenido: [
        'Se develó el trazado del nuevo circuito urbano que albergará la última fecha del campeonato bajo un deslumbrante sistema de luces LED.',
        'Los organizadores prometen una experiencia accesible e inclusiva para todos los asistentes, con amplias zonas de asientos y pantallas de alta visibilidad.'
      ]
    },
    {
      id: 'f1-4',
      nombre: 'Renovación de Contrato del Campeón',
      imagen: imgF14,
      contenido: [
        'El vigente campeón del mundo extendió su vínculo contractual por tres temporadas más con su actual equipo.',
        'En rueda de prensa, el piloto declaró sentirse en el mejor momento de su carrera y listo para seguir luchando por podios y campeonatos.'
      ]
    }
  ],

  // --- ATLETISMO ---
  atletismo: [
    {
      id: 'atl-1',
      nombre: 'Gran Maratón de la Ciudad',
      imagen: imgAtletismo1,
      contenido: [
        'Más de cinco mil corredores se congregaron en las principales avenidas para participar en la tradicional carrera de 42 km.',
        'La jornada estuvo acompañada por miles de vecinos que alentaron a los deportistas a lo largo de todo el recorrido.'
      ]
    },
    {
      id: 'atl-2',
      nombre: 'Nuevas Marcas en Salto de Longitud',
      imagen: imgAtletismo2,
      contenido: [
        'Durante la prueba de salto largo se registraron marcas sobresalientes que aseguran clasificaciones a torneos regionales.',
        'Los entrenadores destacaron la preparación técnica y la mejora física mostrada por los atletas esta temporada.'
      ]
    },
    {
      id: 'atl-3',
      nombre: 'Campeonato Nacional de Velocidad y Relevos',
      imagen: imgAtletismo3,
      contenido: [
        'La pista sintética del estadio principal albergó las pruebas de 100, 200 y 400 metros planos en una jornada vibrante.',
        'Los atletas más veloces del país disputaron finales muy ajustadas que se definieron en los últimos metros.'
      ]
    },
    {
      id: 'atl-4',
      nombre: 'Caminata Saludable para Adultos Mayores',
      imagen: imgAtletismo4,
      contenido: [
        'Se realizó una jornada de caminata de bajo impacto de 3 km organizada por el comité deportivo local.',
        'El encuentro contó con puntos de hidratación, control de presión arterial gratuito y guías durante todo el trayecto.'
      ]
    }
  ],

  // --- BASKET ---
  basket: [
    {
      id: 'basq-1',
      nombre: 'Clásico de Infarto en los Minutos Finales',
      imagen: imgBasket1,
      contenido: [
        'Con un triple sobre la bocina, el equipo visitante selló una remontada histórica en el último cuarto del encuentro.',
        'El partido destacó por el alto ritmo ofensivo y un despliegue físico intenso de ambos quintetos desde el silbatazo inicial.'
      ]
    },
    {
      id: 'basq-2',
      nombre: 'Inicio de la Liga Nacional de Básquetbol',
      imagen: imgBasket2,
      contenido: [
        'Arranca una nueva temporada del torneo más importante del país con la participación de 12 clubes en busca del título.',
        'Esta edición contará con transmisiones adaptadas, subtítulos en vivo y accesibilidad mejorada en todos los pabellones deportivos.'
      ]
    },
    {
      id: 'basq-3',
      nombre: 'Taller Comunitario de Básquetbol Inclusivo',
      imagen: imgBasket3,
      contenido: [
        'Se inauguró un programa recreativo gratuito pensado para adultos mayores y personas con movilidad reducida que desean mantenerse activos.',
        'Las sesiones son guiadas por profesionales de la salud y entrenadores deportivos adaptados a las capacidades de cada participante.'
      ]
    },
    {
      id: 'basq-4',
      nombre: 'Convocatoria para el Torneo 3x3 de Verano',
      imagen: imgBasket4,
      contenido: [
        'Abrieron las inscripciones para la modalidad urbana de básquetbol que se disputará en el complejo deportivo municipal.',
        'Habrá categorías desde infantiles hasta veteranos, promoviendo el compañerismo y la integración comunitaria.'
      ]
    }
  ],

  // --- CICLISMO ---
  ciclismo: [
    {
      id: 'cic-1',
      nombre: 'Desafío Extremo en la Montaña',
      imagen: imgCiclismo1,
      contenido: [
        'Ciclistas de todo el país compitieron en un trazado exigente marcado por senderos pedregosos y pronunciados descensos.',
        'El evento puso a prueba la resistencia física y el dominio técnico de las bicicletas de montaña.'
      ]
    },
    {
      id: 'cic-2',
      nombre: 'Inauguración de la Ruta Ciclo-recreativa',
      imagen: imgCiclismo2,
      contenido: [
        'Se habilitó un nuevo circuito natural señalizado para el uso seguro de ciclistas de nivel principiante e intermedio.',
        'La ruta cuenta con áreas de descanso, puntos de hidratación y facilidades de acceso para personas con movilidad reducida.'
      ]
    },
    {
      id: 'cic-3',
      nombre: 'Taller de Mantenimiento y Mecánica Básica',
      imagen: imgCiclismo3,
      contenido: [
        'Especialistas enseñaron técnicas sencillas de reparación de frenos, calibración de cambios y parchado de neumáticos.',
        'El taller busca brindar autonomía y mayor seguridad a los ciclistas que realizan trayectos de distancia media.'
      ]
    },
    {
      id: 'cic-4',
      nombre: 'Travesía Nocturna por Senderos Ecológicos',
      imagen: imgCiclismo4,
      contenido: [
        'Decenas de aficionados disfrutaron de un recorrido guiado en bicicleta equipado con luces de alta intensidad.',
        'La actividad recreativa concluyó con una reunión de integración para promover el ciclismo sustentable.'
      ]
    }
  ]
};