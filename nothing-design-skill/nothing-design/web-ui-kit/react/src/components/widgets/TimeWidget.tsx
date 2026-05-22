import { useState, useEffect } from 'react'
import { withWidgetCard } from './withWidgetCard'
import '../../styles/time-widget.css'

// Fallback timer start value when no value is provided for recording variant
const DEFAULT_TIMER_SECONDS = 5

type TimeWidgetVariant = 'over-limit' | 'over-limit-accent' | 'total-time' | 'recording' | 'date'

interface BaseTimeWidgetProps {
  variant?: TimeWidgetVariant
  label?: string
  value?: string
  unit?: string
  subtitle?: string
  className?: string
  style?: React.CSSProperties
}

interface RecordingTimeWidgetProps extends BaseTimeWidgetProps {
  variant: 'recording'
  value?: string
}

interface OtherTimeWidgetProps extends BaseTimeWidgetProps {
  variant?: Exclude<TimeWidgetVariant, 'recording'>
}

type TimeWidgetProps = RecordingTimeWidgetProps | OtherTimeWidgetProps

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
  className,
  style
}) => {
  const [timerSeconds, setTimerSeconds] = useState(() => {
    if (variant === 'recording' && value) return parseTimer(value)
    return DEFAULT_TIMER_SECONDS
  })

  useEffect(() => {
    if (variant !== 'recording') return

    // Reset timer when value changes
    if (value) {
      setTimerSeconds(parseTimer(value))
    }

    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [variant, value])

  const shape = getShape(variant)
  const theme = getTheme(variant)

  const classNames = [
    'nothing-time-widget',
    `nothing-time-widget--${shape}`,
    `nothing-time-widget--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  const content = variant === 'recording' ? (
    <div className={classNames} style={style}>
      <div className="nothing-time-widget__recording-dot" />
      <div className="nothing-time-widget__timer" aria-live="polite" aria-label="Recording">{formatTimer(timerSeconds)}</div>
    </div>
  ) : (
    <div className={classNames} style={style}>
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

  return content
}

export default withWidgetCard(TimeWidget)
