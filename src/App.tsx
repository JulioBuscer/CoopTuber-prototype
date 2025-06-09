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
import './styles/header.css'
import './styles/markdown.css'

// Importación de componentes
import WebcamViewer from './components/WebcamViewer'
import Footer from './components/Footer'
import { Router, Route } from '@solidjs/router';
import LegalPages from './components/LegalPages'
import Header from './components/Header'
import LandingPage from './components/landing/Landing'
import { onCleanup } from 'solid-js'
import { setShowHeader, showHeader } from './data/signals/utils'

const Layout = (props: { children?: any }) => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowHeader(false);
    } else {
      // Scrolling up
      setShowHeader(true);
    }
    lastScrollY = window.scrollY;
    console.log("showHeader", showHeader());
  };

  window.addEventListener('scroll', handleScroll);
  onCleanup(() => window.removeEventListener('scroll', handleScroll));

  return (
    <div class='app-container'>      
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

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
    <Router root={Layout} base={import.meta.env.BASE_URL}>
      <Route path="/" component={Home} />
      <Route path="/app" component={AppView} />
      <Route path="/terms" component={() => <LegalPages path="/docs/terms.md" />} />
      <Route path="/privacy" component={() => <LegalPages path="/docs/privacy.md" />} />
      <Route path="/cookies" component={() => <LegalPages path="/docs/cookies.md" />} />
    </Router>
  );
}

export default App;