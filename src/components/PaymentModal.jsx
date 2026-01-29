import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement } from '@stripe/react-stripe-js'
import './PaymentModal.css'

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

function PaymentModal({ item, onClose, onReservaHecha }) {
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [personas, setPersonas] = useState(1)
  const [confirmado, setConfirmado] = useState(false)
  const [error, setError] = useState('')

  // Fecha de hoy en formato YYYY-MM-DD
  const hoy = new Date().toISOString().split('T')[0]

  // Obtener coordenadas del item
  const latitud = item.Latitud ? parseFloat(item.Latitud) : null
  const longitud = item.Longitud ? parseFloat(item.Longitud) : null
  
  // Verificar si las coordenadas son válidas (formato decimal, no UTM)
  const coordenadasValidas = latitud && longitud && 
    Math.abs(latitud) <= 90 && Math.abs(longitud) <= 180 &&
    latitud !== 0 && longitud !== 0

  // URL del mapa estático de OpenStreetMap
  const mapaUrl = coordenadasValidas 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${longitud-0.01},${latitud-0.01},${longitud+0.01},${latitud+0.01}&layer=mapnik&marker=${latitud},${longitud}`
    : null

  function hacerReserva(e) {
    e.preventDefault()
    
    // Validaciones
    if (!nombre.trim()) {
      setError('Escribe tu nombre')
      return
    }
    if (!fecha) {
      setError('Selecciona una fecha')
      return
    }
    if (fecha < hoy) {
      setError('La fecha no puede ser anterior a hoy')
      return
    }
    
    // Crear la reserva
    const reserva = {
      id: Date.now(),
      lugar: item.Nombre,
      nombre: nombre,
      fecha: fecha,
      personas: personas
    }
    
    // Guardar en localStorage
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas') || '[]')
    reservasGuardadas.push(reserva)
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas))
    
    setConfirmado(true)
    if (onReservaHecha) onReservaHecha()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Reservar en {item.Nombre}</h2>

        {/* Mapa de ubicación */}
        {mapaUrl && (
          <div className="mapa-container">
            <h4>📍 Ubicación</h4>
            <iframe
              src={mapaUrl}
              width="100%"
              height="200"
              style={{ border: 'none', borderRadius: '8px' }}
              title="Ubicación del establecimiento"
            />
            <p className="direccion-texto">
              {item.Dirección && `${item.Dirección}, `}{item.Municipio}
            </p>
          </div>
        )}

        {!confirmado ? (
          <Elements stripe={stripePromise}>
            <form onSubmit={hacerReserva}>
              {error && <p className="form-error">{error}</p>}
              
              <div className="form-group">
                <label>Nombre</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label>Fecha</label>
                <input 
                  type="date" 
                  value={fecha} 
                  onChange={e => setFecha(e.target.value)}
                  min={hoy}
                />
              </div>

              <div className="form-group">
                <label>Personas</label>
                <input 
                  type="number" 
                  value={personas} 
                  onChange={e => setPersonas(e.target.value)}
                  min="1"
                  max="20"
                />
              </div>

              <div className="form-group card-field">
                <label>Tarjeta de pago</label>
                <CardElement />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose}>Cancelar</button>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </Elements>
        ) : (
          <div className="success-message">
            <h2>Reserva Confirmada!</h2>
            <p>Nombre: {nombre}</p>
            <p>Fecha: {fecha}</p>
            <p>Personas: {personas}</p>
            <button onClick={onClose}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal
