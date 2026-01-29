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

  // Cargar datos de la API
  useEffect(() => {
    fetch('https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json')
      .then(res => res.json())
      .then(data => setHoteles(data))
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

  // Filtrar por nombre
  const hotelesFiltrados = hoteles.filter(h => 
    h.Nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="page-container">
      <h1>Alojamientos en Murcia</h1>
      
      <div className="page-actions">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />
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
