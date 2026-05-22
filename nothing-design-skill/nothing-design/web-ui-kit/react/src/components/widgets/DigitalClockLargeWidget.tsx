import { useState, useEffect } from 'react'
import { withWidgetCard, CardProp } from './withWidgetCard'
import '../../styles/digital-clock-large-widget.css'

interface DigitalClockLargeWidgetProps {
  variant?: 'serif' | 'sharp'
  showSeconds?: boolean
  showDate?: boolean
  theme?: 'light' | 'dark'
  card?: CardProp
  className?: string
  style?: React.CSSProperties
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DigitalClockLargeWidget: React.FC<DigitalClockLargeWidgetProps> = ({
  variant = 'sharp',
  showSeconds = false,
  showDate = true,
  theme = 'dark',
  className,
  style
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')
  const dayName = DAYS[time.getDay()].toUpperCase()

  const timeString = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`

  const classNames = [
    'nothing-digital-clock-large',
    `nothing-digital-clock-large--${variant}`,
    `nothing-digital-clock-large--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classNames}
      style={style}
      role="timer"
      aria-label={`Current time: ${timeString}`}
    >
      <div className="nothing-digital-clock-large__time">{timeString}</div>
      {showDate && (
        <div className="nothing-digital-clock-large__day">{dayName}</div>
      )}
    </div>
  )
}

const WrappedDigitalClockLargeWidget = withWidgetCard(DigitalClockLargeWidget)

export { WrappedDigitalClockLargeWidget as DigitalClockLargeWidget }
export default WrappedDigitalClockLargeWidget
