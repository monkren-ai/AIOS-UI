import { useState, useEffect } from 'react'
import '../styles/clock.css'

interface ClockProps {
  type?: 'digital' | 'gauge' | 'dual-ring' | 'overlay'
  theme?: 'light' | 'dark'
  updateInterval?: number
  style?: React.CSSProperties
}

const Clock: React.FC<ClockProps> = ({ 
  type = 'digital',
  theme = 'dark',
  updateInterval = 1000,
  style
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval])

  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = days[time.getDay()]

  const secondAngle = (time.getSeconds() / 60) * 360
  const minuteAngle = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360
  const hourAngle = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360

  const getDashArray = () => {
    const circumference = 2 * Math.PI * 90
    return `${circumference} ${circumference}`
  }

  const getDashOffset = (angle: number) => {
    const circumference = 2 * Math.PI * 90
    return circumference - (angle / 360) * circumference
  }

  if (type === 'digital') {
    return (
      <div className="nothing-clock-digital" style={style}>
        <div className="digital-time">{hours}:{minutes}</div>
        <div className="digital-date">{dayName}</div>
      </div>
    )
  }

  if (type === 'dual-ring') {
    return (
      <div className={`nothing-clock-dual-ring nothing-clock-dual-ring--${theme}`} style={style}>
        <svg className="dual-ring-svg" viewBox="0 0 200 200">
          <circle className="dual-ring-outer" cx="100" cy="100" r="95" />
          <circle className="dual-ring-inner" cx="100" cy="100" r="85" />
        </svg>
        <div className="dual-ring-content">
          <div className="dual-ring-hour">{hours}</div>
          <div className="dual-ring-minute">{minutes}</div>
        </div>
      </div>
    )
  }

  if (type === 'overlay') {
    const timeStr = `${hours}:${minutes}`
    return (
      <div className={`nothing-clock-overlay nothing-clock-overlay--${theme}`}>
        <div className="overlay-base">{timeStr}</div>
        <div className="overlay-top">{timeStr}</div>
      </div>
    )
  }

  return (
    <div className="nothing-clock-gauge" style={style}>
      <svg className="gauge-svg" viewBox="0 0 200 200">
        <circle className="gauge-bg" cx="100" cy="100" r="90" />
        <circle className="gauge-track" cx="100" cy="100" r="90" />
        <circle 
          className="gauge-hour" 
          cx="100" 
          cy="100" 
          r="90" 
          style={{
            strokeDasharray: getDashArray(),
            strokeDashoffset: getDashOffset(hourAngle)
          }}
        />
        <circle 
          className="gauge-minute" 
          cx="100" 
          cy="100" 
          r="90" 
          style={{
            strokeDasharray: getDashArray(),
            strokeDashoffset: getDashOffset(minuteAngle)
          }}
        />
        <circle 
          className="gauge-second" 
          cx="100" 
          cy="100" 
          r="90" 
          style={{
            strokeDasharray: getDashArray(),
            strokeDashoffset: getDashOffset(secondAngle)
          }}
        />
        <circle className="gauge-center" cx="100" cy="100" r="8" />
      </svg>
      <div className="gauge-time">{hours}:{minutes}</div>
      <div className="gauge-seconds">{seconds}</div>
    </div>
  )
}

export default Clock
