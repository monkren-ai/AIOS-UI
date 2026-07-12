import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './SunDial.css'

export type SunDialTime = 'day' | 'night'
export type SunDialTheme = 'light' | 'dark'

const sunDialVariants = cva('nothing-sun-dial', {
  variants: {
    time: {
      day: 'nothing-sun-dial--day',
      night: 'nothing-sun-dial--night',
    },
    theme: {
      light: 'nothing-sun-dial--light',
      dark: 'nothing-sun-dial--dark',
    },
  },
  defaultVariants: { time: 'day', theme: 'dark' },
})

export interface SunDialProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof sunDialVariants>, 'time' | 'theme'> {
  latitude?: number
  longitude?: number
  updateInterval?: number
  time?: SunDialTime
  theme?: SunDialTheme
}

interface SunTimes {
  sunrise: number
  sunset: number
  sunriseStr: string
  sunsetStr: string
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function formatHourMinute(h: number): string {
  const hours = Math.floor(h)
  const minutes = Math.round((h - hours) * 60)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function calculateSunTimes(lat: number, lng: number): SunTimes {
  const now = new Date()
  const dayOfYear = getDayOfYear(now)
  const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81))
  const decRad = (declination * Math.PI) / 180
  const latRad = (lat * Math.PI) / 180

  const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad)

  let hourAngle: number
  if (cosHourAngle > 1) {
    hourAngle = 0
  } else if (cosHourAngle < -1) {
    hourAngle = 180
  } else {
    hourAngle = (Math.acos(cosHourAngle) * 180) / Math.PI
  }

  const sunriseHour = 12 - hourAngle / 15 - lng / 15 + now.getTimezoneOffset() / -60
  const sunsetHour = 12 + hourAngle / 15 - lng / 15 + now.getTimezoneOffset() / -60

  return {
    sunrise: sunriseHour * 60,
    sunset: sunsetHour * 60,
    sunriseStr: formatHourMinute(sunriseHour),
    sunsetStr: formatHourMinute(sunsetHour),
  }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startX = cx + r * Math.cos(startAngle)
  const startY = cy - r * Math.sin(startAngle)
  const endX = cx + r * Math.cos(endAngle)
  const endY = cy - r * Math.sin(endAngle)
  const sweep = startAngle > endAngle ? 0 : 1
  return `M ${startX} ${startY} A ${r} ${r} 0 0 ${sweep} ${endX} ${endY}`
}

export const SunDial = React.forwardRef<HTMLDivElement, SunDialProps>(
  (
    {
      className,
      latitude: propLat,
      longitude: propLng,
      updateInterval = 60000,
      time: timeProp,
      theme = 'dark',
      style,
      ...props
    },
    ref
  ) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
    const [now, setNow] = useState(new Date())

    useEffect(() => {
      if (propLat !== undefined && propLng !== undefined) {
        setLocation({ lat: propLat, lng: propLng })
        return
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          () => setLocation({ lat: 39.9042, lng: 116.4074 })
        )
      } else {
        setLocation({ lat: 39.9042, lng: 116.4074 })
      }
    }, [propLat, propLng])

    useEffect(() => {
      const timer = setInterval(() => setNow(new Date()), updateInterval)
      return () => clearInterval(timer)
    }, [updateInterval])

    const sunTimes = location ? calculateSunTimes(location.lat, location.lng) : null

    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const isDay = sunTimes
      ? currentMinutes >= sunTimes.sunrise && currentMinutes <= sunTimes.sunset
      : false

    const time: SunDialTime = timeProp ?? (isDay ? 'day' : 'night')

    const remaining = useMemo(() => {
      if (!sunTimes) return ''
      if (isDay) {
        const rem = sunTimes.sunset - currentMinutes
        const h = Math.floor(rem / 60)
        const m = rem % 60
        return `${h}H ${m}M OF DAYLIGHT REMAINING`
      } else {
        let nextSunrise: number
        if (currentMinutes < sunTimes.sunrise) {
          nextSunrise = sunTimes.sunrise - currentMinutes
        } else {
          nextSunrise = 24 * 60 - currentMinutes + sunTimes.sunrise
        }
        const h = Math.floor(nextSunrise / 60)
        const m = nextSunrise % 60
        return `${h}H ${m}M UNTIL SUNRISE`
      }
    }, [sunTimes, isDay, currentMinutes])

    const sunPosition = useMemo(() => {
      if (!sunTimes || !isDay) return null
      const progress = (currentMinutes - sunTimes.sunrise) / (sunTimes.sunset - sunTimes.sunrise)
      const angle = Math.PI - progress * Math.PI
      const cx = 150
      const cy = 150
      const r = 130
      return {
        x: cx + r * Math.cos(angle),
        y: cy - r * Math.sin(angle),
      }
    }, [sunTimes, isDay, currentMinutes])

    const sunPos = sunPosition

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    const dayArc = describeArc(150, 150, 130, Math.PI, 0)
    const nightArc = describeArc(150, 150, 130, 0, Math.PI)

    return (
      <div
        ref={ref}
        className={cn(sunDialVariants({ time, theme }), className)}
        style={style}
        data-time={dataAttr(time)}
        data-theme={dataAttr(theme)}
        {...props}
      >
        <div className="sundial-header">
          <div className={cn('sundial-status', isDay ? 'day' : 'night')}>
            {sunTimes ? (isDay ? '[DAY]' : '[NIGHT]') : '[--]'}
          </div>
          <div className="sundial-location">
            {location ? `${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°` : 'LOCATING...'}
          </div>
        </div>

        <div className="sundial-arc-container">
          <svg className="sundial-arc-svg" viewBox="0 0 300 170">
            <path className="sundial-arc-night" d={nightArc} />
            <path className="sundial-arc-day" d={dayArc} />
            {sunPos && (
              <g className="sundial-sun-marker">
                <circle className="sundial-sun-glow" cx={sunPos.x} cy={sunPos.y} r="16" />
                <circle className="sundial-sun-core" cx={sunPos.x} cy={sunPos.y} r="7" />
              </g>
            )}
          </svg>
          <div className="sundial-time-block sundial-time-block--sunrise">
            <div className="sundial-time-label">Sunrise</div>
            <div className="sundial-time-value">{sunTimes?.sunriseStr ?? '--:--'}</div>
          </div>
          <div className="sundial-time-block sundial-time-block--sunset">
            <div className="sundial-time-label">Sunset</div>
            <div className="sundial-time-value">{sunTimes?.sunsetStr ?? '--:--'}</div>
          </div>
        </div>

        <div className="sundial-current-time">
          {hours}:{minutes}
        </div>
        <div className="sundial-remaining">{remaining}</div>
      </div>
    )
  }
)
SunDial.displayName = 'SunDial'

export { sunDialVariants }
export default SunDial
