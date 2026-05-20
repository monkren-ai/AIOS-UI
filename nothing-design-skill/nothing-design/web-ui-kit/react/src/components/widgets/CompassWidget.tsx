import { useState, useEffect } from 'react'
import '../../styles/time-widget.css'

interface TimeWidgetProps {
  variant?: 'over-limit' | 'over-limit-accent' | 'total-time' | 'recording' | 'date'
  label?: string
  value?: string
  unit?: string
  subtitle?: string
  className?: string
}

const getShape = (variant: TimeWidgetProps['variant']) => {
  if (variant === 'recording') return 'circle'
  return 'square'
}

const getTheme = (variant: TimeWidgetProps['variant']) => {
  if (variant === 'over-limit' || variant === 'total-time') return 'dark'
  if (variant === 'over-limit-accent') return 'accent'
  return 'light'
}

const parseTimer = (timerStr: string) => {
  const parts = timerStr.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return parts[0] || 0
}

const formatTimer = (totalSeconds: number) => {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const TimeWidget: React.FC<TimeWidgetProps> = ({
  variant = 'over-limit',
  label,
  value,
  unit,
  subtitle,
  className
}) => {
  const [timerSeconds, setTimerSeconds] = useState(() => {
    if (variant === 'recording' && value) return parseTimer(value)
    return 5
  })

  useEffect(() => {
    if (variant !== 'recording') return

    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [variant])

  const shape = getShape(variant)
  const theme = getTheme(variant)

  const classNames = [
    'nothing-time-widget',
    `nothing-time-widget--${shape}`,
    `nothing-time-widget--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  if (variant === 'recording') {
    return (
      <div className={classNames}>
        <div className="nothing-time-widget__recording-dot" />
        <div className="nothing-time-widget__timer">{formatTimer(timerSeconds)}</div>
      </div>
    )
  }

  return (
    <div className={classNames}>
      {label && (
        <div className="nothing-time-widget__label">{label}</div>
      )}
      <div className="nothing-time-widget__content">
        <span className="nothing-time-widget__value">{value}</span>
        {unit && <span className="nothing-time-widget__unit">{unit}</span>}
      </div>
      {subtitle && (
        <div className="nothing-time-widget__subtitle">{subtitle}</div>
      )}
    </div>
  )
}

export default TimeWidget
