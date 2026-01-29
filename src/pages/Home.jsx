import { Link } from 'react-router-dom'
import Weather from '../components/Weather'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenido a Murcia</h1>
        <p>Descubre restaurantes y alojamientos de la región</p>
        <div className="hero-buttons">
          <Link to="/restaurantes" className="hero-btn">Restaurantes</Link>
          <Link to="/alojamientos" className="hero-btn">Alojamientos</Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span>🍽️</span>
          <h3>Restaurantes</h3>
          <p>Encuentra los mejores sitios para comer</p>
        </div>
        <div className="feature">
          <span>🏨</span>
          <h3>Alojamientos</h3>
          <p>Hoteles y casas rurales</p>
        </div>
        <div className="feature">
          <span>📅</span>
          <h3>Reservas</h3>
          <p>Reserva online fácilmente</p>
        </div>
      </section>

      <section className="info-section">
        <h2>Planifica tu visita</h2>
        <p>Consulta el tiempo antes de salir</p>
        <Weather />
      </section>
    </div>
  )
}

export default Home
