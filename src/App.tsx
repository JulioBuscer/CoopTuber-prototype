/**
 * @file App.tsx
 * Main component of the CoopTuber application
 * 
 * This component:
 * - Sets up the main application structure
 * - Imports necessary styles
 * - Renders the WebcamViewer component
 * - Maintains visual consistency of the application
 * - Integrates i18n for internationalization
 */

// Style imports
import './App.css'
import './styles/score.css'
import './styles/tools.css'
import './styles/tools/avatar.css'
import './styles/tools/background.css'
import './styles/tools/params.css'
import './styles/tools/color.css'
import './styles/header.css'
import './styles/markdown.css'

// Component imports
import WebcamViewer from './components/WebcamViewer'
import Footer from './components/Footer'
import { Router, Route } from '@solidjs/router';
import LegalPages from './components/LegalPages'
import Header from './components/Header'
import LandingPage from './components/landing/Landing'
import { onCleanup } from 'solid-js'
import { setShowHeader } from './data/signals/utils'
import { I18nProvider } from './i18n/context';

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
    <I18nProvider>
      <Router root={Layout} base={import.meta.env.BASE_URL}>
        <Route path="/" component={Home} />
        <Route path="/app" component={AppView} />
        <Route path="/terms" component={() => <LegalPages path="/docs/terms.md" />} />
        <Route path="/privacy" component={() => <LegalPages path="/docs/privacy.md" />} />
        <Route path="/cookies" component={() => <LegalPages path="/docs/cookies.md" />} />
      </Router>
    </I18nProvider>
  );
}

export default App;