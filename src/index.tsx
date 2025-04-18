/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'

const root = document.getElementById('root')

// Initialize EventTarget polyfill
if (!window.EventTarget) {
  import('@ungap/event-target').then(module => {
    window.EventTarget = module.default;
  });
}

render(() => <App />, root!)
