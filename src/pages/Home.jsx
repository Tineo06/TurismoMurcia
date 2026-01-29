import { useState, useEffect } from 'react'
import Weather from '../components/Weather'
import './Home.css'

function Home() {
  // Carrusel de imagenes
  const imagenes = [
    { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1280', titulo: 'Descubre Murcia' },
    { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280', titulo: 'Alojamientos' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1280', titulo: 'Restaurantes' },
    { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1280', titulo: 'Turismo' }
  ]

  const [imagenActual, setImagenActual] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((anterior) => (anterior + 1) % imagenes.length)
    }, 4000)
    return () => clearInterval(intervalo)
  }, [])

  const siguienteImagen = () => {
    setImagenActual((anterior) => (anterior + 1) % imagenes.length)
  }

  const anteriorImagen = () => {
    setImagenActual((anterior) => (anterior - 1 + imagenes.length) % imagenes.length)
  }

  return (
    <div className="home">
      <section className="carrusel">
        <button className="carrusel-btn izq" onClick={anteriorImagen}>❮</button>
        <div className="carrusel-imagen">
          <img src={imagenes[imagenActual].url} alt={imagenes[imagenActual].titulo} />
          <div className="carrusel-titulo">{imagenes[imagenActual].titulo}</div>
        </div>
        <button className="carrusel-btn der" onClick={siguienteImagen}>❯</button>
        <div className="carrusel-puntos">
          {imagenes.map((_, i) => (
            <span 
              key={i} 
              className={`punto ${i === imagenActual ? 'activo' : ''}`}
              onClick={() => setImagenActual(i)}
            ></span>
          ))}
        </div>
      </section>

      <section className="hero">
        <h1>Bienvenido a Murcia</h1>
        <p>Descubre los mejores restaurantes y alojamientos de la región</p>
      </section>

      <section className="features">
        <div className="feature">
          <span>🍽️</span>
          <h3>Gastronomía</h3>
          <p>Descubre la cocina murciana</p>
        </div>
        <div className="feature">
          <span>🏛️</span>
          <h3>Historia</h3>
          <p>Monumentos y cultura</p>
        </div>
        <div className="feature">
          <span>🌅</span>
          <h3>Playas</h3>
          <p>Costa Cálida te espera</p>
        </div>
        <div className="feature">
          <span>🏨</span>
          <h3>Alojamientos</h3>
          <p>Hoteles y casas rurales</p>
        </div>
      </section>

      <section className="tiempo-section">
        <h2>🌤️ El Tiempo en Murcia</h2>
        <Weather />
      </section>
    </div>
  )
}

export default Home
