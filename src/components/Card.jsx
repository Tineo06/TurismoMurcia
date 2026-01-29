import { useState } from 'react'
import './Card.css'

function Card({ item, onReserve }) {
  const [error, setError] = useState(false)
  
  // Imagen por defecto
  const imgDefecto = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
  
  // Buscar una foto válida
  let foto = item['Foto 1'] || item['Foto 2'] || item['Foto 3'] || imgDefecto

  return (
    <div className="card">
      <img 
        src={error ? imgDefecto : foto} 
        alt={item.Nombre}
        onError={() => setError(true)}
      />
      <div className="card-content">
        <h3>{item.Nombre}</h3>
        <p>{item.Municipio}</p>
        <button onClick={onReserve}>Reservar</button>
      </div>
    </div>
  )
}

export default Card
