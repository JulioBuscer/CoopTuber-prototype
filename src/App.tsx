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
import './styles/landing/landing.css'
import './styles/score.css'
import './styles/tools.css'
import './styles/tools/avatar.css'
import './styles/tools/background.css'
import './styles/tools/params.css'
import './styles/tools/color.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/markdown.css'

// Importación de componentes
import WebcamViewer from './components/WebcamViewer'
import Footer from './components/Footer'
import { Router, Route } from '@solidjs/router';
import LegalPages from './components/LegalPages'
import Header from './components/Header'
import LandingPage from './components/landing/Landing'


const Layout = (props: { children?: any }) => (
  <div class='app-container'>
    <Header />
    <main>
      {props.children}
    </main>
    <Footer />
  </div>
);

const Home = () => (
    <LandingPage />
);

const AppView = () => (
  <div class='main-content'>
    <WebcamViewer />
  </div>
);

function App() {
  return (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/app" component={AppView} />
      <Route path="/terms" component={() => <LegalPages path="/docs/terms.md" />} />
      <Route path="/privacy" component={() => <LegalPages path="/docs/privacy.md" />} />
      <Route path="/cookies" component={() => <LegalPages path="/docs/cookies.md" />} />
    </Router>
  );
}

export default App;