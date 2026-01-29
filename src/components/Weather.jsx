import { useState, useEffect } from 'react'
import './Weather.css'

function Weather() {
  const [tiempo, setTiempo] = useState(null)

  useEffect(() => {
    // API del tiempo para Murcia con pronóstico
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.99&longitude=-1.13&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Madrid')
      .then(res => res.json())
      .then(data => setTiempo(data))
  }, [])

  // Icono segun el codigo del tiempo
  function getIcono(code) {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 69) return '🌧️'
    return '🌤️'
  }

  // Descripcion del tiempo
  function getDescripcion(code) {
    if (code === 0) return 'Despejado'
    if (code <= 3) return 'Parcialmente nublado'
    if (code <= 69) return 'Lluvia'
    return 'Variable'
  }

  // Nombre del dia
  function getDia(fecha) {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    return dias[new Date(fecha).getDay()]
  }

  if (!tiempo) return <div className="weather-widget">Cargando...</div>

  return (
    <div className="weather-widget">
      <h3>Tiempo en Murcia</h3>
      <div className="weather-main">
        <span className="weather-icon">{getIcono(tiempo.current.weather_code)}</span>
        <span className="weather-temp">{Math.round(tiempo.current.temperature_2m)}°C</span>
      </div>
      <p className="weather-desc">{getDescripcion(tiempo.current.weather_code)}</p>
      <div className="weather-details">
        <span>💨 {Math.round(tiempo.current.wind_speed_10m)} km/h</span>
        <span>💧 {tiempo.current.relative_humidity_2m}%</span>
      </div>
      
      <div className="weather-forecast">
        <p>Próximos días:</p>
        <div className="forecast-days">
          {tiempo.daily.time.slice(1, 4).map((dia, i) => (
            <div key={dia} className="forecast-day">
              <span>{getDia(dia)}</span>
              <span>{getIcono(tiempo.daily.weather_code[i + 1])}</span>
              <span>{Math.round(tiempo.daily.temperature_2m_max[i + 1])}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Weather
