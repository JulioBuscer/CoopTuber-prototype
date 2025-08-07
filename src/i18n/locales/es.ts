import { title } from "process";

export default {
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    retry: 'Reintentar',
    close: 'Cerrar',
  },
  
  // Navigation
  nav: {
    home: 'Inicio',
    app: 'Aplicación',
    github: 'GitHub',
    language: 'Idioma',
    languageIcon: '🇲🇽',
    languageCode: 'mx',
    features: 'Características',
    howTo: 'Cómo usar',
    benefits: 'Beneficios',
    tryNow: 'Probar ahora',
  },
  
  // Hero Section
  hero: {
    title: {
      part1: 'Anima tu rostro en ',
      highlight: 'tiempo real',
      part2: ' con tus avatares personalizados',
    },    
    description: 'CoopTuber es una herramienta gratuita y open source para animar tu rostro con avatares animados desde tu navegador. No necesitas instalar nada ni preocuparte por el rendimiento… si tu PC puede con el stream, puede con CoopTuber.',
    tryNow: 'Pruébalo ahora',
    viewOnGithub: 'Ver en GitHub',
    features: {
      noInstallation: 'Sin instalación',
      free: '100% gratuito',
      openSource: 'Open source'
    }
  },
  
  // Meta tags
  meta: {
    title: 'CoopTuber - Anima avatares con tus expresiones faciales',
    description: 'Herramienta de animación facial en tiempo real para dar vida a avatares con tus expresiones faciales.',
    keywords: 'animación facial, avatar, expresiones faciales, tiempo real, cámara web, CoopTuber, animación en vivo',
  },
  
  // Footer
  footer: {
    developBy: 'Desarrollado por',
    madeWith: 'Hecho con ❤️ por el equipo CoopTuber',
    documentation: {
      title: 'Documentación',
      terms: 'Términos de servicio',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      github: 'Repositorio de GitHub',
    },
    contact: {
      title: 'Contacto',
    },
    license: {
      title: 'Licencia',
      description: 'Este proyecto está bajo la',
      license: 'Licencia Apache 2.0'
    }
  },
  
  // App
  app: {
    startCamera: 'Iniciar cámara',
    stopCamera: 'Detener cámara',
    selectAvatar: 'Seleccionar avatar',
    settings: 'Configuración',
    loadingModel: 'Cargando modelo de detección facial...',
    cameraAccessRequired: 'Se requiere acceso a la cámara',
    cameraAccessDenied: 'Acceso a la cámara denegado',
    cameraNotSupported: 'Tu navegador no soporta el acceso a la cámara',
    noVideoLoaded: 'No hay video cargado',
    loadVideo: 'Cargar video',
    switchCameraVideo: 'Cambiar a',
    camera: 'Cámara',
    video: 'Video',
    hide: 'Ocultar',
    show: 'Mostrar',
    yes: 'Si',
    no: 'No',
    state:{
      mouthOpen: 'Boca abierta',
      eyesClosed: 'Ojos cerrados',   
      leftEye: 'Ojo izquierdo',
      rightEye: 'Ojo derecho',   
    },
    score:{
      settings: 'Settings',
    },
    tools:{
      avatar: {
        title: 'Avatar',
        text: 'Sube tu avatar',
        uploadImage:'Cargar imagen'
      },
      background: {
        title: 'Background',
        text: 'Selecciona tu fondo',
        useChroma:'Usar Chroma',
        backgroundColor:'Color de fondo',
        uploadImage: 'Subir imagen',
      },
      params: {
        title: 'Params',
        text: 'Ajusta los parámetros de detección facial',
      },
      effects: {
        title: 'Effects',
        text: 'Configuración de los Efectos',
        placeHolder:'..Proximamente'
      },
      color: {
        title: 'Color',
        text: 'Elige tu color',
        colorOf: 'Color de '
      },
    },
    avatar:{
      imageTypeNames: {
        normal:'Mouth closed, Eyes open',
        blink:'Mouth closed, Eyes closed',
        talking:'Mouth open, Eyes open',
        blinkTalk:'Mouth open, Eyes closed'
      }
    }
  },
  
  // Features Section
  features: {
    title: 'Características principales',
    description: 'Una app web de animación facial en tiempo real para creadores, sin complicaciones.',
    items: [
      {
        title: 'Tiempo real',
        description: 'Anima tu avatar al instante con tu cámara web'
      },
      {
        title: 'Fácil de usar',
        description: 'Configuración sencilla e intuitiva'
      },
      {
        title: 'Personalizable',
        description: 'Añade tus propios avatares y personalízalos'
      },
      {
        title: 'Ligero',
        description: 'Funciona sin problemas en la mayoría de los dispositivos'
      },
      {
        title:'Open Source',
        description:'100% gratuito, libre y open source – contribuye o crea tu propia versión'
      }
    ]
  },
  
  // How To Section
  howTo: {
    title: '¿Cómo usarlo con OBS?',
    description: 'CoopTuber no requiere integración especial con OBS. Solo sigue estos pasos:',
    steps: [
      {
        title: 'Abre CoopTuber en tu navegador',
        description: 'Abre CoopTuber en tu navegador',
      },
      {
        title: 'Configura tu cámara y avatar',
        description: 'Configura tu cámara y avatar',
      },
      {
        title: 'En OBS, añade una nueva fuente "Navegador"',
        description: 'En OBS, añade una nueva fuente "Navegador"',
      },
      {
        title: 'Ingresa la URL de CoopTuber',
        description: 'Ingresa la URL de CoopTuber',
      },
      {
        title: '¡Listo! Tu avatar se animará con tus expresiones faciales',
        description: '¡Listo! Tu avatar se animará con tus expresiones faciales',
      }
    ],
    features: ['Sin plugins', 'Sin instalar nada', 'Sin configuraciones técnicas']
  },
  
  // Benefits Section
  benefits: {
    title: 'Beneficios',
    items: [
      {
        title: 'Sin instalaciones',
        description: 'Sin instalaciones ni dependencias externas'
      },
      {
        title: 'Rápido y fluido',
        description: 'Corre rápido y fluido en cualquier navegador moderno'
      },
      {
        title: 'Código abierto',
        description: 'Mejora, traduce o adapta según tus necesidades'
      },
      {
        title: 'Multiplataforma',
        description: 'Funciona en Windows, macOS, Linux'
      },
      {
        title: 'Para todos',
        description: 'Ideal para streamers, parejas, amigos o equipos creativos'
      }
    ]
  },
  
  // Open Source Section
  openSource: {
    title: '¿Por qué Open Source?',
    description: 'CoopTuber nació como una herramienta para streamers y creadores que quieran stremear con avatares virtuales en un mismo sitio juntos. Creemos en la tecnología libre, transparente y comunitaria.',
    contribute: 'Puedes contribuir en GitHub, proponer mejoras o ayudar a llevar CoopTuber al siguiente nivel.',
    highlight:['👉 ¿Te gustaría una versión en la nube para que no dependa de tu PC?','¡Apóyanos y llegaremos juntos!']
  },
  
  // CTA Section
  cta: {
    title: '¿Listo para comenzar?',
    subtitle: 'sin límites, sin costos, sin complicaciones',
    description: 'Prueba CoopTuber ahora mismo y lleva tus streams al siguiente nivel dando vida a tus propios avatares animados',
    tryNow: 'Pruébalo ahora',
    viewOnGithub: 'Ver en GitHub',
    features: {
      noInstallation: 'Sin instalación',
      free: '100% gratuito',
      openSource: 'Open source'
    }
  }
};
