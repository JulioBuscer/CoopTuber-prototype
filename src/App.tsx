/**
 * @file App.tsx
 * Componente principal de la aplicación CoopTuber
 * 
 * Este componente:
 * - Define la estructura principal de la aplicación
 * - Importa los estilos necesarios
 * - Renderiza el componente WebcamViewer
 * - Mantiene la consistencia visual de la aplicación
 */

// Importaciones de estilos
import './App.css'
import './styles/score.css'
import './styles/tools.css'
import './styles/tools/avatar.css'
import './styles/tools/background.css'
import './styles/tools/params.css'
import './styles/tools/color.css'

// Importación de componentes
import WebcamViewer from './components/WebcamViewer'

/**
 * Componente principal de la aplicación
 * 
 * Este componente:
 * - Muestra el título de la aplicación
 * - Contiene el componente WebcamViewer
 * - Mantiene la estructura visual de la aplicación
 * 
 * @returns {JSX.Element} Interfaz principal de la aplicación
 */
function App() {
  return (
    <div class='app-container'>
      {/* Encabezado de la aplicación */}
      <header>
        <h1>CoopTuber</h1>
      </header>

      {/* Contenido principal */}
      <main>
        <div class='main-content'>
          {/* Componente principal de la webcam */}
          <WebcamViewer />
        </div>
      </main>
    </div>
  )
}

export default App
