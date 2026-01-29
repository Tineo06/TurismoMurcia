import { useState, useEffect } from 'react'
import Card from '../components/Card'
import PaymentModal from '../components/PaymentModal'
import './Restaurantes.css'

function Alojamientos() {
  const [hoteles, setHoteles] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [reservar, setReservar] = useState(null)
  const [reservas, setReservas] = useState([])
  const [verReservas, setVerReservas] = useState(false)
  const [filtroUbicacion, setFiltroUbicacion] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroPrecio, setFiltroPrecio] = useState('')
  const [filtroValoracion, setFiltroValoracion] = useState('')
  const [municipios, setMunicipios] = useState([])

  useEffect(() => {
    fetch('https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json')
      .then(res => res.json())
      .then(data => {
        const dataConExtras = data.map(item => ({
          ...item,
          precio: Math.floor(Math.random() * 3) + 1,
          valoracion: (Math.random() * 2 + 3).toFixed(1)
        }))
        setHoteles(dataConExtras)
        const municipiosUnicos = [...new Set(data.map(h => h.Municipio).filter(m => m))]
        setMunicipios(municipiosUnicos.sort())
      })
  }, [])

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(guardadas)
  }, [])

  function actualizarReservas() {
    const guardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    setReservas(guardadas)
  }

  function borrarReserva(id) {
    const nuevas = reservas.filter(r => r.id !== id)
    localStorage.setItem('reservas', JSON.stringify(nuevas))
    setReservas(nuevas)
  }

  const hotelesFiltrados = hoteles.filter(h => {
    if (busqueda && !h.Nombre.toLowerCase().includes(busqueda.toLowerCase())) return false
    if (filtroUbicacion && h.Municipio !== filtroUbicacion) return false
    if (filtroCategoria && h.Categoria !== filtroCategoria) return false
    if (filtroPrecio && h.precio !== parseInt(filtroPrecio)) return false
    if (filtroValoracion && parseFloat(h.valoracion) < parseFloat(filtroValoracion)) return false
    return true
  })

  return (
    <div className="page-container">
      <h1>Alojamientos en Murcia</h1>
      
      <div className="filtros-container">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
        
        <div className="filtros-grid">
          <select value={filtroUbicacion} onChange={(e) => setFiltroUbicacion(e.target.value)} className="filtro-select">
            <option value="">📍 Todas las ubicaciones</option>
            {municipios.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="filtro-select">
            <option value="">🏨 Todas las categorías</option>
            <option value="Hotel">Hotel</option>
            <option value="Hostal">Hostal</option>
            <option value="Pensión">Pensión</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa Rural">Casa Rural</option>
          </select>
          
          <select value={filtroPrecio} onChange={(e) => setFiltroPrecio(e.target.value)} className="filtro-select">
            <option value="">💰 Todos los precios</option>
            <option value="1">€ - Económico</option>
            <option value="2">€€ - Moderado</option>
            <option value="3">€€€ - Alto</option>
          </select>
          
          <select value={filtroValoracion} onChange={(e) => setFiltroValoracion(e.target.value)} className="filtro-select">
            <option value="">⭐ Todas las valoraciones</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4">⭐ 4.0+</option>
            <option value="3.5">⭐ 3.5+</option>
          </select>
        </div>
        
        <button className="btn-reservas" onClick={() => setVerReservas(!verReservas)}>
          {verReservas ? 'Ver alojamientos' : `Mis reservas (${reservas.length})`}
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
          {hotelesFiltrados.slice(0, 20).map((item, i) => (
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

export default Alojamientos
