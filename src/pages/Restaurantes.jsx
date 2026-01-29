import { useState, useEffect } from 'react'
import Card from '../components/Card'
import PaymentModal from '../components/PaymentModal'
import './Restaurantes.css'

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [reservar, setReservar] = useState(null)
  const [reservas, setReservas] = useState([])
  const [verReservas, setVerReservas] = useState(false)
  
  // Filtros
  const [filtroUbicacion, setFiltroUbicacion] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroPrecio, setFiltroPrecio] = useState('')
  const [filtroValoracion, setFiltroValoracion] = useState('')

  // Lista de municipios únicos
  const [municipios, setMunicipios] = useState([])

  // Cargar datos de la API
  useEffect(() => {
    fetch('https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Restaurantes.json')
      .then(res => res.json())
      .then(data => {
        // Añadir precio y valoración simulados
        const dataConExtras = data.map(item => ({
          ...item,
          precio: Math.floor(Math.random() * 3) + 1, // 1, 2 o 3 (€, €€, €€€)
          valoracion: (Math.random() * 2 + 3).toFixed(1) // 3.0 a 5.0
        }))
        setRestaurantes(dataConExtras)
        
        // Obtener municipios únicos
        const municipiosUnicos = [...new Set(data.map(r => r.Municipio).filter(m => m))]
        setMunicipios(municipiosUnicos.sort())
      })
  }, [])

  // Cargar reservas guardadas
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(guardadas)
  }, [])

  // Actualizar reservas cuando se hace una nueva
  function actualizarReservas() {
    const guardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(guardadas)
  }

  // Borrar una reserva
  function borrarReserva(id) {
    const nuevas = reservas.filter(r => r.id !== id)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    setReservas(nuevas)
  }

  // Categorías simuladas basadas en nombre
  function obtenerCategoria(nombre) {
    const nombreLower = nombre.toLowerCase()
    if (nombreLower.includes('pizza') || nombreLower.includes('italiano')) return 'Italiano'
    if (nombreLower.includes('chino') || nombreLower.includes('asia')) return 'Asiático'
    if (nombreLower.includes('kebab') || nombreLower.includes('turco')) return 'Turco'
    if (nombreLower.includes('bar') || nombreLower.includes('tapas')) return 'Tapas'
    if (nombreLower.includes('cafe') || nombreLower.includes('cafetería')) return 'Cafetería'
    if (nombreLower.includes('meson') || nombreLower.includes('asador')) return 'Asador'
    return 'Tradicional'
  }

  // Aplicar todos los filtros
  const restaurantesFiltrados = restaurantes.filter(r => {
    // Filtro por nombre
    if (busqueda && !r.Nombre.toLowerCase().includes(busqueda.toLowerCase())) return false
    
    // Filtro por ubicación
    if (filtroUbicacion && r.Municipio !== filtroUbicacion) return false
    
    // Filtro por categoría
    if (filtroCategoria && obtenerCategoria(r.Nombre) !== filtroCategoria) return false
    
    // Filtro por precio
    if (filtroPrecio && r.precio !== parseInt(filtroPrecio)) return false
    
    // Filtro por valoración
    if (filtroValoracion && parseFloat(r.valoracion) < parseFloat(filtroValoracion)) return false
    
    return true
  })

  return (
    <div className="page-container">
      <h1>Restaurantes de Murcia</h1>
      
      {/* Barra de búsqueda y filtros */}
      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        
        <div className="filtros-grid">
          <select 
            value={filtroUbicacion} 
            onChange={(e) => setFiltroUbicacion(e.target.value)}
            className="filtro-select"
          >
            <option value="">📍 Todas las ubicaciones</option>
            {municipios.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          
          <select 
            value={filtroCategoria} 
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="filtro-select"
          >
            <option value="">🍽️ Todas las categorías</option>
            <option value="Tradicional">Tradicional</option>
            <option value="Italiano">Italiano</option>
            <option value="Asiático">Asiático</option>
            <option value="Turco">Turco</option>
            <option value="Tapas">Tapas</option>
            <option value="Cafetería">Cafetería</option>
            <option value="Asador">Asador</option>
          </select>
          
          <select 
            value={filtroPrecio} 
            onChange={(e) => setFiltroPrecio(e.target.value)}
            className="filtro-select"
          >
            <option value="">💰 Todos los precios</option>
            <option value="1">€ - Económico</option>
            <option value="2">€€ - Moderado</option>
            <option value="3">€€€ - Alto</option>
          </select>
          
          <select 
            value={filtroValoracion} 
            onChange={(e) => setFiltroValoracion(e.target.value)}
            className="filtro-select"
          >
            <option value="">⭐ Todas las valoraciones</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4">⭐ 4.0+</option>
            <option value="3.5">⭐ 3.5+</option>
          </select>
        </div>
        
        <button className="btn-reservas" onClick={() => setVerReservas(!verReservas)}>
          {verReservas ? 'Ver restaurantes' : `Mis reservas (${reservas.length})`}
        </button>
      </div>

      {verReservas ? (
        <div className="lista-reservas">
          <h2>Mis Reservas</h2>
          {reservas.length === 0 ? (
            <p>No tienes reservas todavía</p>
          ) : (
            reservas.map(r => (
              <div key={r.id} className="reserva-item">
                <div>
                  <strong>{r.lugar}</strong>
                  <p>{r.fecha} - {r.personas} personas</p>
                  <p>A nombre de: {r.nombre}</p>
                </div>
                <button onClick={() => borrarReserva(r.id)}>Cancelar</button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="cards-grid">
          {restaurantesFiltrados.slice(0, 20).map((item, i) => (
            <Card key={i} item={item} onReserve={() => setReservar(item)} />
          ))}
        </div>
      )}

      {reservar && (
        <PaymentModal 
          item={reservar} 
          onClose={() => setReservar(null)} 
          onReservaHecha={actualizarReservas}
        />
      )}
    </div>
  )
}

export default Restaurantes
