import { useState, useEffect } from 'react'
import { withWidgetCard } from './widgets/withWidgetCard'
import '../styles/date.css'

interface DateWidgetProps {
  type?: 'rect' | 'dual-ring' | 'serif'
  theme?: 'light' | 'dark'
  updateInterval?: number
  className?: string
  showPeel?: boolean
  onPeelClick?: () => void
}

const RING_RADIUS = 25
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const DateWidget: React.FC<DateWidgetProps> = ({
  type = 'rect',
  theme = 'light',
  updateInterval = 60000,
  className,
  showPeel = false,
  onPeelClick
}) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval])

  const day = now.getDate()
  const month = MONTHS[now.getMonth()]
  const weekday = WEEKDAYS[now.getDay()]

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const progress = hours + minutes / 60
  const offset = RING_CIRCUMFERENCE - (progress / 24) * RING_CIRCUMFERENCE

  if (type === 'serif') {
    const classNames = [
      'nothing-date--serif',
      `nothing-date--serif-${theme}`,
      className || ''
    ].filter(Boolean).join(' ')

    return (
      <div className={classNames}>
        <span className="nothing-date__serif-day">{weekday}</span>
        <span className="nothing-date__serif-number">{day}</span>
        {showPeel && (
          <div
            className="nothing-date__peel"
            onClick={onPeelClick}
            role={onPeelClick ? 'button' : undefined}
            tabIndex={onPeelClick ? 0 : undefined}
            onKeyDown={onPeelClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onPeelClick() } : undefined}
          />
        )}
      </div>
    )
  }

  if (type === 'rect') {
    const classNames = [
      'nothing-date-rect',
      `nothing-date-rect--${theme}`,
      className || ''
    ].filter(Boolean).join(' ')

    return (
      <div className={classNames}>
        <div className="nothing-date-rect__ring">
          <svg className="nothing-date-rect__ring-svg" viewBox="0 0 60 60">
            <circle className="nothing-date-rect__ring-bg" cx="30" cy="30" r={RING_RADIUS} />
            <circle
              className="nothing-date-rect__ring-progress"
              cx="30"
              cy="30"
              r={RING_RADIUS}
              style={{
                strokeDasharray: `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`,
                strokeDashoffset: offset
              }}
            />
          </svg>
        </div>
        <div className="nothing-date-rect__info">
          <div className="nothing-date-rect__day">{day}</div>
          <div className="nothing-date-rect__month">{month}</div>
          <div className="nothing-date-rect__weekday">{weekday}</div>
        </div>
      </div>
    )
  }

  const classNames = [
    'nothing-date-dual-ring',
    `nothing-date-dual-ring--${theme}`,
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      <svg className="nothing-date-dual-ring__svg" viewBox="0 0 200 200">
        <circle className="nothing-date-dual-ring__outer" cx="100" cy="100" r="95" />
        <circle className="nothing-date-dual-ring__inner" cx="100" cy="100" r="85" />
      </svg>
      <div className="nothing-date-dual-ring__content">
        <div className="nothing-date-dual-ring__day">{day}</div>
        <div className="nothing-date-dual-ring__weekday">{weekday}</div>
      </div>
    </div>
  )
}

export default withWidgetCard(DateWidget)
