import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🌴 Murcia Turismo</h3>
          <p>Descubre los mejores restaurantes y alojamientos de la Región de Murcia.</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/restaurantes">Restaurantes</a></li>
            <li><a href="/alojamientos">Alojamientos</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📍 Murcia, España</p>
          <p>📧 info@murciaturismo.es</p>
          <p>📞 +34 968 000 000</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Murcia Turismo. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
