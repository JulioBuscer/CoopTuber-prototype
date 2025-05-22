# CoopTuber - Streaming en Pareja

[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Estrellas GitHub](https://img.shields.io/github/stars/JulioBuscer/CoopTuber-prototype.svg?style=social)](https://github.com/JulioBuscer/CoopTuber-prototype/stargazers)

CoopTuber es una solución de código abierto que permite a dos personas transmitir en streaming usando una sola cámara web. ¡Perfecto para parejas, amigos o equipos que quieren transmitir juntos sin necesidad de múltiples cámaras!

## Características

- Detección facial en tiempo real
- Avatares personalizables para cada usuario
- Procesamiento acelerado por GPU
- Compatibilidad multiplataforma
- Integración fluida con video
- Soporte para dos usuarios por cámara
- Monitoreo de rendimiento

## ¿Cómo Funciona?

CoopTuber utiliza tecnología avanzada de reconocimiento facial para rastrear múltiples rostros en tiempo real usando una sola cámara web. Cada usuario puede personalizar su propio avatar, y el sistema cambia automáticamente entre ellos según quién esté activo frente a la cámara.

## Empezando

### Requisitos Previos

- Node.js 16+ o superior
- npm o yarn como gestor de paquetes
- Navegador moderno con soporte WebRTC

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JulioBuscer/CoopTuber-prototype.git

cd CoopTuber-prototype

# Instalar dependencias
npm install
# o
yarn install
```

### Ejecutando la Aplicación

```bash
# Modo desarrollo
npm run dev
# o
yarn dev

# Abrir navegador y navegar a http://localhost:5173
```

## Estructura del Proyecto

```
src/
├── components/      # Componentes UI reutilizables
├── lib/            # Funcionalidad principal
├── utils/          # Funciones auxiliares
├── workers/        # Web workers para cálculos pesados
└── data/          # Gestión de estado
```

## Rendimiento

CoopTuber incluye monitoreo de FPS integrado para mantener el mejor rendimiento durante el streaming. El sistema se ajusta automáticamente a las capacidades de tu hardware manteniendo una operación fluida.

## Contribuyendo

¡Bienvenidas las contribuciones de la comunidad! Por favor lee nuestras [Guías de Contribución](CONTRIBUTING.md) antes de enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Agradecimientos

- Agradecimientos especiales al equipo MediaPipe por su tecnología de detección facial
- Inspirado por el amor y la colaboración entre streamers y sus parejas
- Construido con ❤️ por la comunidad CoopTuber

## Soporte

Para soporte:

- Abre un issue en GitHub
- Únete a nuestra comunidad en Discord
- Consulta nuestra documentación

## Documentación

Documentación detallada disponible en nuestro [Wiki](https://github.com/JulioBuscer/CoopTuber-prototype/wiki).

## Personalización

Los usuarios pueden personalizar:
- Colores y estilos de avatares
- Sensibilidad de detección
- Ajustes de video
- Umbral de rendimiento

## Compatibilidad Móvil

CoopTuber está optimizado para dispositivos móviles, permitiendo a los streamers usar sus teléfonos como cámaras web mientras mantienen un rendimiento óptimo.

## Integración con Streaming

Integración fácil con plataformas de streaming populares manteniendo una salida de calidad profesional.

## Desarrollo Futuro

Características planificadas:
- Soporte para más de 2 usuarios
- Personalización avanzada de avatares
- Optimización mejorada del rendimiento
- Características adicionales de reconocimiento facial

## Comunidad

Únete a nuestra comunidad en:
- [Discord](https://discord.com/invite/cooptuber)
- Twitter (@CoopTuber)
- Discusiones de GitHub

## Guías de Contribución

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/amazing-feature`)
3. Comitea tus cambios (`git commit -m 'Añade una característica increíble'`)
4. Sube a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Código de Conducta

Por favor ten en cuenta que este proyecto se publica con un [Código de Conducta para Contribuidores](CODE_OF_CONDUCT.md). Al participar en este proyecto, aceptas cumplir con sus términos.
