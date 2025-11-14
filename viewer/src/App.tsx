import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ResourceBrowser } from './features/browser/ResourceBrowser'
import { PictureViewer } from './features/viewers/PictureViewer'
import { ViewViewer } from './features/viewers/ViewViewer'
import { SoundViewer } from './features/viewers/SoundViewer'
import { LogicViewer } from './features/viewers/LogicViewer'
import './App.css'

// Import agikit styles
import '@agikit/react-editors/styles/common.css'
import '@agikit/react-editors/styles/piceditor.css'
import '@agikit/react-editors/styles/vieweditor.css'
import '@agikit/react-editors/styles/soundeditor.css'

function Home() {
  return (
    <div className="home">
      <h1>AGI Resource Viewer</h1>
      <p>Space Quest 2: Vohaul's Revenge</p>
      <p>Select a resource from the browser to view it.</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="sidebar">
          <h2>Resources</h2>
          <ResourceBrowser />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pic/:id" element={<PictureViewer />} />
            <Route path="/view/:id" element={<ViewViewer />} />
            <Route path="/sound/:id" element={<SoundViewer />} />
            <Route path="/logic/:id" element={<LogicViewer />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
