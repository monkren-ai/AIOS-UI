import { useState, useEffect, useMemo } from 'react'
import '../styles/battery.css'

interface BatteryProps {
  updateInterval?: number
  totalSegments?: number
  percent?: number
  isCharging?: boolean
  variant?: 'segmented' | 'ring'
  theme?: 'light' | 'dark'
}

const CIRCUMFERENCE = 2 * Math.PI * 95

const BatteryIcon = ({ percent, isCharging }: { percent: number; isCharging: boolean }) => {
  if (isCharging) {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (percent <= 30) {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="20" y="10" width="2" height="6" rx="1" fill="currentColor" />
        <rect x="6" y="12" width="4" height="4" rx="1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="10" width="2" height="6" rx="1" fill="currentColor" />
      <rect x="6" y="10" width="8" height="6" rx="1" fill="currentColor" />
    </svg>
  )
}

const Battery: React.FC<BatteryProps> = ({
  updateInterval = 5000,
  totalSegments = 10,
  percent: initialPercent,
  isCharging: initialIsCharging,
  variant = 'segmented',
  theme = 'dark'
}) => {
  const [internalPercent, setInternalPercent] = useState(initialPercent ?? 75)
  const [internalIsCharging, setInternalIsCharging] = useState(initialIsCharging ?? false)

  const percent = initialPercent ?? internalPercent
  const isCharging = initialIsCharging ?? internalIsCharging

  useEffect(() => {
    if (initialPercent !== undefined || initialIsCharging !== undefined) {
      return
    }

    const updateBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery()
          setInternalPercent(Math.round(battery.level * 100))
          setInternalIsCharging(battery.charging)
        }
      } catch {
        const demoPercent = 75
        const demoCharging = Math.random() > 0.5
        setInternalPercent(demoPercent)
        setInternalIsCharging(demoCharging)
      }
    }

    updateBattery()
    const timer = setInterval(updateBattery, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval, initialPercent, initialIsCharging])

  const ringStatusClass = useMemo(() => {
    if (isCharging) return 'charging'
    if (percent <= 30) return 'low'
    if (percent <= 80) return 'mid'
    return 'full'
  }, [percent, isCharging])

  const ringDashOffset = useMemo(() => {
    return CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE
  }, [percent])

  if (variant === 'ring') {
    return (
      <div className={`nothing-battery-ring nothing-battery-ring--${theme} ${ringStatusClass}`}>
        <svg className="nothing-battery-ring__svg" viewBox="0 0 200 200">
          <circle className="nothing-battery-ring__outer" cx="100" cy="100" r="95" />
          <circle className="nothing-battery-ring__inner" cx="100" cy="100" r="85" />
          <circle
            className="nothing-battery-ring__progress"
            cx="100"
            cy="100"
            r="95"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={ringDashOffset}
          />
        </svg>
        <div className="nothing-battery-ring__content">
          <div className="nothing-battery-ring__icon">
            <BatteryIcon percent={percent} isCharging={isCharging} />
          </div>
          <div className="nothing-battery-ring__percent">{percent}%</div>
        </div>
      </div>
    )
  }

  const filledSegments = Math.round((percent / 100) * totalSegments)

  let batteryClass = 'high'
  if (isCharging) {
    batteryClass = 'charging'
  } else if (percent <= 10) {
    batteryClass = 'critical'
  } else if (percent <= 20) {
    batteryClass = 'low'
  } else if (percent <= 50) {
    batteryClass = 'medium'
  }

  return (
    <div className={`nothing-battery ${batteryClass}`}>
      <div className="battery-header">
        <div className="battery-percent">{percent}%</div>
        <div className={`battery-status ${isCharging ? 'charging' : 'discharging'}`}>
          {isCharging ? 'Charging' : 'Discharging'}
        </div>
      </div>
      <div className="battery-progress">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`battery-segment ${index < filledSegments ? 'filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Battery
