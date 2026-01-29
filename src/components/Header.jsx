import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Murcia Turismo</Link>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/restaurantes">Restaurantes</Link>
        <Link to="/alojamientos">Alojamientos</Link>
      </nav>
    </header>
  )
}

export default Header
