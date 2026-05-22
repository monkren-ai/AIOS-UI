import { useState, useEffect, useCallback } from 'react'
import { withWidgetCard } from './withWidgetCard'
import type { WidgetCardProps } from '../Card'
import '../../styles/analog-clock-widget.css'

interface AnalogClockWidgetProps {
  variant?: 'swiss' | 'minimalist'
  smoothSeconds?: boolean
  theme?: 'light' | 'dark'
  card?: boolean | Omit<WidgetCardProps, 'children'>
  className?: string
  style?: React.CSSProperties
}

interface TimeState {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

function getTimeState(): TimeState {
  const now = new Date()
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds(),
  }
}

function formatTimeLabel(time: TimeState): string {
  const h = time.hours.toString().padStart(2, '0')
  const m = time.minutes.toString().padStart(2, '0')
  const s = time.seconds.toString().padStart(2, '0')
  return `Analog clock showing ${h}:${m}:${s}`
}

/* ── Swiss variant SVG ── */
function SwissClockFace({ time, radius }: { time: TimeState; radius: number }) {
  const cx = radius
  const cy = radius

  const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5
  const minuteAngle = time.minutes * 6 + time.seconds * 0.1
  const secondAngle = time.seconds * 6 + (time.milliseconds / 1000) * 6

  const ticks = []
  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * (Math.PI / 180)
    const isLarge = i % 5 === 0
    const outerR = radius * 0.92
    const innerR = isLarge ? radius * 0.80 : radius * 0.87
    const strokeWidth = isLarge ? radius * 0.026 : radius * 0.008

    const x1 = cx + outerR * Math.cos(angle)
    const y1 = cy + outerR * Math.sin(angle)
    const x2 = cx + innerR * Math.cos(angle)
    const y2 = cy + innerR * Math.sin(angle)

    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={
          isLarge
            ? 'nothing-analog-clock-widget__tick--large'
            : 'nothing-analog-clock-widget__tick--small'
        }
      />
    )
  }

  const hourLen = radius * 0.5
  const hourW = radius * 0.025
  const minLen = radius * 0.675
  const minW = radius * 0.025
  const secLen = radius * 0.80
  const secW = radius * 0.008
  const secDotR = radius * 0.025
  const secDotDist = radius * 0.60
  const pivotR = radius * 0.03

  return (
    <g>
      {/* Ticks */}
      {ticks}

      {/* Hour hand */}
      <rect
        className="nothing-analog-clock-widget__hand--hour"
        x={cx - hourW / 2}
        y={cy - hourLen}
        width={hourW}
        height={hourLen}
        rx={hourW / 2}
        style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Minute hand */}
      <rect
        className="nothing-analog-clock-widget__hand--minute"
        x={cx - minW / 2}
        y={cy - minLen}
        width={minW}
        height={minLen}
        rx={minW / 2}
        style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Second hand */}
      <line
        className="nothing-analog-clock-widget__hand--second"
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - secLen}
        strokeWidth={secW}
        strokeLinecap="round"
        style={{ transform: `rotate(${secondAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Second hand dot at 75% */}
      <circle
        className="nothing-analog-clock-widget__hand--second"
        cx={cx}
        cy={cy - secDotDist}
        r={secDotR}
        style={{ transform: `rotate(${secondAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Center pivot */}
      <circle
        className="nothing-analog-clock-widget__pivot"
        cx={cx}
        cy={cy}
        r={pivotR}
      />
    </g>
  )
}

/* ── Minimalist variant SVG ── */
function MinimalistClockFace({ time, radius }: { time: TimeState; radius: number }) {
  const cx = radius
  const cy = radius

  const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5
  const minuteAngle = time.minutes * 6 + time.seconds * 0.1
  const secondAngle = time.seconds * 6 + (time.milliseconds / 1000) * 6

  const hourW = radius * 0.2
  const hourLen = radius * 0.6
  const minW = radius * 0.055
  const minLen = radius * 0.70
  const secDotR = radius * 0.045
  const secDotDist = radius * 0.88

  const secDotAngle = (secondAngle - 90) * (Math.PI / 180)
  const secDotX = cx + secDotDist * Math.cos(secDotAngle)
  const secDotY = cy + secDotDist * Math.sin(secDotAngle)

  return (
    <g>
      {/* Hour hand (pill) */}
      <rect
        className="nothing-analog-clock-widget__hand--hour"
        x={cx - hourW / 2}
        y={cy - hourLen}
        width={hourW}
        height={hourLen}
        rx={hourW / 2}
        style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Minute hand (pill) */}
      <rect
        className="nothing-analog-clock-widget__hand--minute"
        x={cx - minW / 2}
        y={cy - minLen}
        width={minW}
        height={minLen}
        rx={minW / 2}
        style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Second dot on perimeter */}
      <circle
        className="nothing-analog-clock-widget__second-dot"
        cx={secDotX}
        cy={secDotY}
        r={secDotR}
      />
    </g>
  )
}

const AnalogClockWidget: React.FC<AnalogClockWidgetProps> = ({
  variant = 'swiss',
  smoothSeconds = false,
  theme = 'dark',
  className,
  style,
}) => {
  const [time, setTime] = useState<TimeState>(getTimeState)

  const update = useCallback(() => {
    setTime(getTimeState())
  }, [])

  useEffect(() => {
    const interval = setInterval(update, smoothSeconds ? 50 : 1000)
    return () => clearInterval(interval)
  }, [smoothSeconds, update])

  const size = 152
  const radius = size / 2

  const widgetClassName = [
    'nothing-analog-clock-widget',
    `nothing-analog-clock-widget--${variant}`,
    `nothing-analog-clock-widget--${theme}`,
    smoothSeconds ? 'nothing-analog-clock-widget--smooth' : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={widgetClassName} style={style} role="img" aria-label={formatTimeLabel(time)}>
      <svg
        className="nothing-analog-clock-widget__svg"
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clock face background */}
        <circle
          className="nothing-analog-clock-widget__face"
          cx={radius}
          cy={radius}
          r={radius}
        />

        {variant === 'swiss' ? (
          <SwissClockFace time={time} radius={radius} />
        ) : (
          <MinimalistClockFace time={time} radius={radius} />
        )}
      </svg>
    </div>
  )
}

AnalogClockWidget.displayName = 'AnalogClockWidget'

export { AnalogClockWidget }
export default withWidgetCard(AnalogClockWidget)
