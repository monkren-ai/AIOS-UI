import { useState, useEffect } from 'react'
import '../styles/world-clock.css'

interface CityConfig {
  name: string
  offset: number
}

interface WorldClockProps {
  cities?: CityConfig[]
  updateInterval?: number
}

const defaultCities: CityConfig[] = [
  { name: 'NEW YORK', offset: -5 },
  { name: 'LONDON', offset: 0 },
  { name: 'TOKYO', offset: 9 },
  { name: 'SYDNEY', offset: 11 }
]

const formatOffset = (offset: number): string => {
  if (offset === 0) return 'UTC+0'
  return offset > 0 ? `UTC+${offset}` : `UTC${offset}`
}

const getCityTime = (now: Date, offset: number): Date => {
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  return new Date(utc + offset * 3600000)
}

const isDaytime = (cityDate: Date): boolean => {
  const hours = cityDate.getHours()
  return hours >= 6 && hours < 18
}

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const WorldClock: React.FC<WorldClockProps> = ({
  cities = defaultCities,
  updateInterval = 1000
}) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval])

  return (
    <div className="nothing-world-clock">
      <div className="world-clock-header">World Clock</div>
      <div className="world-clock-grid">
        {cities.map((city) => {
          const cityDate = getCityTime(now, city.offset)
          const isDay = isDaytime(cityDate)

          return (
            <div className="world-clock-city" key={city.name}>
              <div className="world-clock-city-row">
                <div className={`world-clock-day-indicator ${isDay ? 'day' : 'night'}`} />
                <div className="world-clock-city-name">{city.name}</div>
              </div>
              <div className="world-clock-time">{formatTime(cityDate)}</div>
              <div className="world-clock-offset">{formatOffset(city.offset)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WorldClock
