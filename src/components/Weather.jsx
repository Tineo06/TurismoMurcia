import { useState, useEffect } from 'react'
import './Weather.css'

function Weather() {
  const [tiempo, setTiempo] = useState(null)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.99&longitude=-1.13&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Madrid')
      .then(res => res.json())
      .then(data => setTiempo(data))
  }, [])

  function getIcono(code) {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 69) return '🌧️'
    return '🌤️'
  }

  function getDescripcion(code) {
    if (code === 0) return 'Despejado'
    if (code <= 3) return 'Parcialmente nublado'
    if (code <= 48) return 'Niebla'
    if (code <= 69) return 'Lluvia'
    return 'Variable'
  }

  function getDia(fecha) {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    return dias[new Date(fecha).getDay()]
  }

  if (!tiempo) return <div className="weather-widget">Cargando...</div>

  return (
    <div className="weather-widget">
      <div className="weather-actual">
        <span className="weather-icono">{getIcono(tiempo.current.weather_code)}</span>
        <div className="weather-datos">
          <span className="weather-temp">{Math.round(tiempo.current.temperature_2m)}°C</span>
          <span className="weather-desc">{getDescripcion(tiempo.current.weather_code)}</span>
        </div>
      </div>
      
      <div className="weather-detalles">
        <span>💨 {Math.round(tiempo.current.wind_speed_10m)} km/h</span>
        <span>💧 {tiempo.current.relative_humidity_2m}%</span>
      </div>

      <div className="weather-pronostico">
        <p>Próximos días:</p>
        <div className="pronostico-dias">
          {tiempo.daily.time.slice(1, 5).map((dia, i) => (
            <div key={dia} className="pronostico-dia">
              <span className="dia-nombre">{getDia(dia)}</span>
              <span className="dia-icono">{getIcono(tiempo.daily.weather_code[i + 1])}</span>
              <span className="dia-temp">{Math.round(tiempo.daily.temperature_2m_max[i + 1])}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather
