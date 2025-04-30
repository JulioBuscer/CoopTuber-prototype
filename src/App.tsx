import './App.css'
import WebcamViewer from './components/WebcamViewer'

function App() {

  return (
    <div class='app-container'>
      <header>
        <h1 >CoopTuber</h1>
      </header>
      <main>
        <div class='main-content'>
        <WebcamViewer />
        </div>
      </main>
    </div>
  )
}

export default App
