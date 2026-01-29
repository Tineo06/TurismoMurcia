import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Restaurantes from './pages/Restaurantes'
import Alojamientos from './pages/Alojamientos'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/alojamientos" element={<Alojamientos />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
