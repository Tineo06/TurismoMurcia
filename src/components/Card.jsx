import './Card.css'

function Card({ item, onReserve }) {
  // Imagen por defecto siempre (las de la API no funcionan)
  const imgDefecto = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'

  return (
    <div className="card">
      <img 
        src={imgDefecto} 
        alt={item.Nombre}
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
