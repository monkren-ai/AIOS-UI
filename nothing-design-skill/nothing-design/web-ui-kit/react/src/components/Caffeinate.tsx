import { useState, useEffect, useMemo } from 'react'
import '../styles/caffeinate.css'

interface Drink {
  type: string
  mg: number
  time: Date
}

interface CaffeinateProps {
  updateInterval?: number
  totalSegments?: number
  maxCaffeine?: number
  halfLifeMinutes?: number
  thresholdMg?: number
}

const drinkOptions = [
  { type: 'Espresso', mg: 63 },
  { type: 'Coffee', mg: 95 },
  { type: 'Tea', mg: 47 },
  { type: 'Energy', mg: 80 }
]

const Caffeinate: React.FC<CaffeinateProps> = ({
  updateInterval = 60000,
  totalSegments = 10,
  maxCaffeine = 400,
  halfLifeMinutes = 300,
  thresholdMg = 50
}) => {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), updateInterval)
    return () => clearInterval(timer)
  }, [updateInterval])

  const currentCaffeine = useMemo(() => {
    let total = 0
    for (const drink of drinks) {
      const elapsedMinutes = (now - drink.time.getTime()) / 60000
      const remaining = drink.mg * Math.pow(0.5, elapsedMinutes / halfLifeMinutes)
      total += remaining
    }
    return Math.round(total)
  }, [drinks, now, halfLifeMinutes])

  const timeToThreshold = useMemo(() => {
    if (currentCaffeine <= thresholdMg) return null

    let minutes = 0
    let level = currentCaffeine
    while (level > thresholdMg && minutes < 1440) {
      minutes += 1
      level = currentCaffeine * Math.pow(0.5, minutes / halfLifeMinutes)
    }
    return minutes
  }, [currentCaffeine, thresholdMg, halfLifeMinutes])

  const caffeine = currentCaffeine
  const percent = Math.min((caffeine / maxCaffeine) * 100, 100)
  const filledSegments = Math.round((percent / 100) * totalSegments)
  const minutesToThreshold = timeToThreshold

  let statusClass = 'low'
  if (caffeine >= 200) statusClass = 'high'
  else if (caffeine >= 100) statusClass = 'medium'

  const formatMinutes = (mins: number) => {
    if (mins < 60) return `${mins}m`
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return m > 0 ? `${h}h ${m}m` : `${h}h`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleAddDrink = (type: string, mg: number) => {
    setDrinks(prev => [...prev, { type, mg, time: new Date() }])
  }

  return (
    <div className={`nothing-caffeinate ${statusClass}`}>
      <div className="caffeinate-header">
        <div className="caffeinate-level">{caffeine}</div>
        <div className="caffeinate-unit">mg</div>
      </div>
      <div className="caffeinate-decay">
        {minutesToThreshold !== null
          ? `${formatMinutes(minutesToThreshold)} below ${thresholdMg}mg`
          : `Below ${thresholdMg}mg`}
      </div>
      <div className="caffeinate-progress">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`caffeinate-segment ${index < filledSegments ? 'filled' : ''}`}
          />
        ))}
      </div>
      <div className="caffeinate-drinks">
        {drinkOptions.map(opt => (
          <button
            key={opt.type}
            className="caffeinate-drink-btn"
            onClick={() => handleAddDrink(opt.type, opt.mg)}
          >
            {opt.type}<span className="caffeinate-drink-mg">{opt.mg}mg</span>
          </button>
        ))}
      </div>
      <div className="caffeinate-log">
        <div className="caffeinate-log-title">Intake Log</div>
        {drinks.slice(-5).reverse().map((drink, index) => (
          <div key={index} className="caffeinate-log-item">
            <div className="caffeinate-log-info">
              <div className="caffeinate-log-type">{drink.type}</div>
              <div className="caffeinate-log-time">{formatTime(drink.time)}</div>
            </div>
            <div className="caffeinate-log-amount">+{drink.mg}mg</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Caffeinate
