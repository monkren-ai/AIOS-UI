import * as React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  sunDialArcDayVariants,
  sunDialArcNightVariants,
  sunDialCurrentTimeVariants,
  sunDialLocationVariants,
  sunDialRemainingVariants,
  sunDialStatusVariants,
  sunDialSunCoreVariants,
  sunDialSunGlowVariants,
  sunDialSunMarkerVariants,
  sunDialTimeBlockVariants,
  sunDialTimeLabelVariants,
  sunDialTimeValueVariants,
  sunDialVariants,
} from './sun-dial-variants'

export type SunDialTime = 'day' | 'night'
export type SunDialTheme = 'light' | 'dark'

export interface SunDialProps
  extends
    Omit<React.ComponentPropsWithRef<'div'>, 'children'>,
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
  const declination = 23.45 * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81))
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

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const startX = cx + r * Math.cos(startAngle)
  const startY = cy - r * Math.sin(startAngle)
  const endX = cx + r * Math.cos(endAngle)
  const endY = cy - r * Math.sin(endAngle)
  const sweep = startAngle > endAngle ? 0 : 1
  return `M ${startX} ${startY} A ${r} ${r} 0 0 ${sweep} ${endX} ${endY}`
}

export function SunDial({
  className,
  latitude: propLat,
  longitude: propLng,
  updateInterval = 60000,
  time: timeProp,
  theme = 'dark',
  style,
  ref,
  ...props
}: SunDialProps) {
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
        () => setLocation({ lat: 39.9042, lng: 116.4074 }),
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
      data-slot="sun-dial"
      data-time={dataAttr(time)}
      data-widget-theme={dataAttr(theme)}
      data-located={dataAttr(location !== null)}
      {...props}
    >
      <div data-slot="sun-dial-header" className="mb-4 flex w-full items-center justify-between">
        <div
          data-slot="sun-dial-status"
          className={cn(sunDialStatusVariants({ time: isDay ? 'day' : 'night' }))}
        >
          {sunTimes ? (isDay ? '[DAY]' : '[NIGHT]') : '[--]'}
        </div>
        <div data-slot="sun-dial-location" className={cn(sunDialLocationVariants())}>
          {location ? `${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°` : 'LOCATING...'}
        </div>
      </div>

      <div data-slot="sun-dial-arc" className="relative mb-18 w-full max-w-80">
        <svg className="block w-full overflow-visible" viewBox="0 0 300 170" aria-hidden="true">
          <path className={cn(sunDialArcNightVariants())} d={nightArc} />
          <path className={cn(sunDialArcDayVariants())} d={dayArc} />
          {sunPos && (
            <g data-slot="sun-dial-sun" className={cn(sunDialSunMarkerVariants())}>
              <circle className={cn(sunDialSunGlowVariants())} cx={sunPos.x} cy={sunPos.y} r="16" />
              <circle className={cn(sunDialSunCoreVariants())} cx={sunPos.x} cy={sunPos.y} r="7" />
            </g>
          )}
        </svg>
        <div
          data-slot="sun-dial-sunrise"
          className={cn(sunDialTimeBlockVariants({ edge: 'sunrise' }))}
        >
          <div className={cn(sunDialTimeLabelVariants())}>Sunrise</div>
          <div className={cn(sunDialTimeValueVariants())}>{sunTimes?.sunriseStr ?? '--:--'}</div>
        </div>
        <div
          data-slot="sun-dial-sunset"
          className={cn(sunDialTimeBlockVariants({ edge: 'sunset' }))}
        >
          <div className={cn(sunDialTimeLabelVariants())}>Sunset</div>
          <div className={cn(sunDialTimeValueVariants())}>{sunTimes?.sunsetStr ?? '--:--'}</div>
        </div>
      </div>

      <div data-slot="sun-dial-current-time" className={cn(sunDialCurrentTimeVariants())}>
        {hours}:{minutes}
      </div>
      <div data-slot="sun-dial-remaining" className={cn(sunDialRemainingVariants())}>
        {remaining}
      </div>
    </div>
  )
}
SunDial.displayName = 'SunDial'

export { sunDialVariants }
export default SunDial
