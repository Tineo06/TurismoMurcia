import { useState } from 'react'
import './Card.css'

function Card({ item, onReserve }) {
  const [imgError, setImgError] = useState(false)
  
  // Imagenes por defecto segun tipo
  const imgRestaurante = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
  const imgHotel = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'
  
  // Elegir imagen por defecto segun el tipo de item
  const imgDefecto = item.Categoria ? imgHotel : imgRestaurante
  
  // Buscar foto de la API (intentar varios campos)
  let fotoAPI = item['Foto 1'] || item['Foto 2'] || item['Foto 3'] || item.Foto || item.Imagen || null
  
  // Convertir http a https para evitar problemas de mixed content
  if (fotoAPI && fotoAPI.startsWith('http://')) {
    fotoAPI = fotoAPI.replace('http://', 'https://')
  }
  
  // Si hay foto de API y no ha dado error, usarla. Si no, usar default
  const imagenFinal = (!fotoAPI || imgError) ? imgDefecto : fotoAPI

  // Mostrar precio con euros
  const mostrarPrecio = (precio) => {
    if (!precio) return null
    return '€'.repeat(precio)
  }

  return (
    <div className="card">
      <img 
        src={imagenFinal} 
        alt={item.Nombre}
        onError={() => setImgError(true)}
      />
      <div className="card-content">
        <h3>{item.Nombre}</h3>
        <p className="card-ubicacion">📍 {item.Municipio}</p>
        
        {(item.precio || item.valoracion) && (
          <div className="card-extras">
            {item.precio && <span className="card-precio">{mostrarPrecio(item.precio)}</span>}
            {item.valoracion && <span className="card-valoracion">⭐ {item.valoracion}</span>}
          </div>
        )}
        
        <button onClick={onReserve}>Reservar</button>
      </div>
    </div>
  )
}

export default Card
