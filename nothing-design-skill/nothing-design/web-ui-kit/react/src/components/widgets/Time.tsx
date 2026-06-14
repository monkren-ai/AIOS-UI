/**
 * Time — 统一时间展示入口 (合并自 Clock / WorldClock / TimeWidget /
 * AnalogClockWidget / DigitalClockLargeWidget / sub/Time / sub/TotalTime)
 *
 * variant:
 *   - 'digital-compact'  原 Clock type='digital' (HH:MM + day name)
 *   - 'dial'             原 Clock type='gauge'   (gauge ring + center time)
 *   - 'dual-ring'        原 Clock type='dual-ring'
 *   - 'overlay'          原 Clock type='overlay'
 *   - 'analog'           原 AnalogClockWidget (dial='swiss'|'minimalist', smoothSeconds)
 *   - 'digital-large'    原 DigitalClockLargeWidget (font='sharp'|'serif', showSeconds)
 *   - 'world'            原 WorldClock (cities=...)
 *   - 'compact'          原 sub/Time (HH + MM 静态数字块)
 *   - 'total'            原 sub/TotalTime (6H 20M + dot pattern)
 *   - 'hero'             原 TimeWidget / ClockHeroBody
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { withWidgetCard, type CardProp } from './withWidgetCard'
import { cn, dataAttr } from '../../lib/utils'
import { pad2, stamp } from '../../system/time'
import { useNow } from '../../system/hooks'
import '../../styles/clock.css'
import '../../styles/world-clock.css'
import '../../styles/analog-clock-widget.css'
import '../../styles/digital-clock-large-widget.css'
import '../../styles/time-widget.css'

export type TimeVariant =
  | 'digital-compact'
  | 'dial'
  | 'dual-ring'
  | 'overlay'
  | 'analog'
  | 'digital-large'
  | 'world'
  | 'compact'
  | 'total'
  | 'hero'

export type TimeDial = 'swiss' | 'minimalist'
export type TimeFont = 'sharp' | 'serif'

export interface WorldClockCity {
  name: string
  offset: number
}

interface WorldCityResult {
  cities: WorldClockCity[]
  real: boolean
}

const timeVariants = cva('nothing-time', {
  variants: {
    variant: {
      'digital-compact': 'nothing-clock-digital',
      dial: 'nothing-clock-gauge',
      'dual-ring': 'nothing-clock-dual-ring',
      overlay: 'nothing-clock-overlay',
      analog: 'nothing-analog-clock-widget',
      'digital-large': 'nothing-digital-clock-large',
      world: 'nothing-world-clock',
      compact: 'nothing-time-compact',
      total: 'nothing-time-total',
      hero: 'nothing-time-widget',
    },
  },
  defaultVariants: { variant: 'digital-compact' },
})

export interface TimeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof timeVariants>, 'variant'> {
  variant?: TimeVariant
  theme?: 'light' | 'dark' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  /** variant='analog' 时使用 */
  dial?: TimeDial
  smoothSeconds?: boolean
  /** variant='digital-large' 时使用 */
  font?: TimeFont
  showSeconds?: boolean
  /** variant='world' 时使用 */
  cities?: WorldClockCity[]
  /** variant='world' 时启用 Intl.supportedValuesOf 提取真实城市. 默认 true. */
  useBrowserTimezones?: boolean
  /** variant='hero' 时使用 */
  label?: string
  value?: string
  unit?: string
  subtitle?: string
  format?: '12h' | '24h'
  /** wrap in WidgetCard (原 withWidgetCard 行为) */
  card?: CardProp
  /** 兼容原 Clock updateInterval */
  updateInterval?: number
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ---- sub-components ----

function DigitalCompact({ now }: { now: Date }) {
  const hours = pad2(now.getHours())
  const minutes = pad2(now.getMinutes())
  const dayName = DAYS[now.getDay()]
  return (
    <>
      <div className="digital-time">{hours}:{minutes}</div>
      <div className="digital-date">{dayName}</div>
    </>
  )
}

function Dial({ now }: { now: Date }) {
  const hours = pad2(now.getHours())
  const minutes = pad2(now.getMinutes())
  const seconds = pad2(now.getSeconds())
  const secondAngle = (now.getSeconds() / 60) * 360
  const minuteAngle = ((now.getMinutes() + now.getSeconds() / 60) / 60) * 360
  const hourAngle = ((now.getHours() % 12 + now.getMinutes() / 60) / 12) * 360
  const circumference = 2 * Math.PI * 90
  const getDashOffset = (angle: number) => circumference - (angle / 360) * circumference
  return (
    <>
      <svg className="gauge-svg" viewBox="0 0 200 200">
        <circle className="gauge-bg" cx="100" cy="100" r="90" />
        <circle className="gauge-track" cx="100" cy="100" r="90" />
        <circle className="gauge-hour" cx="100" cy="100" r="90" style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: getDashOffset(hourAngle) }} />
        <circle className="gauge-minute" cx="100" cy="100" r="90" style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: getDashOffset(minuteAngle) }} />
        <circle className="gauge-second" cx="100" cy="100" r="90" style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: getDashOffset(secondAngle) }} />
        <circle className="gauge-center" cx="100" cy="100" r="8" />
      </svg>
      <div className="gauge-time">{hours}:{minutes}</div>
      <div className="gauge-seconds">{seconds}</div>
    </>
  )
}

function DualRing({ now }: { now: Date }) {
  const hours = pad2(now.getHours())
  const minutes = pad2(now.getMinutes())
  return (
    <>
      <svg className="dual-ring-svg" viewBox="0 0 200 200">
        <circle className="dual-ring-outer" cx="100" cy="100" r="95" />
        <circle className="dual-ring-inner" cx="100" cy="100" r="85" />
      </svg>
      <div className="dual-ring-content">
        <div className="dual-ring-hour">{hours}</div>
        <div className="dual-ring-minute">{minutes}</div>
      </div>
    </>
  )
}

function Overlay({ now }: { now: Date }) {
  const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`
  return (
    <>
      <div className="overlay-base">{timeStr}</div>
      <div className="overlay-top">{timeStr}</div>
    </>
  )
}

interface AnalogTimeState {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

function AnalogFace({ state, radius, dial }: { state: AnalogTimeState; radius: number; dial: TimeDial }) {
  const cx = radius
  const cy = radius
  const hourAngle = (state.hours % 12) * 30 + state.minutes * 0.5
  const minuteAngle = state.minutes * 6 + state.seconds * 0.1
  const secondAngle = state.seconds * 6 + (state.milliseconds / 1000) * 6
  if (dial === 'minimalist') {
    const hourW = radius * 0.2
    const hourLen = radius * 0.6
    const minW = radius * 0.055
    const minLen = radius * 0.7
    const secDotR = radius * 0.045
    const secDotDist = radius * 0.88
    const secDotAngle = (secondAngle - 90) * (Math.PI / 180)
    const secDotX = cx + secDotDist * Math.cos(secDotAngle)
    const secDotY = cy + secDotDist * Math.sin(secDotAngle)
    return (
      <g>
        <rect className="nothing-analog-clock-widget__hand--hour" x={cx - hourW / 2} y={cy - hourLen} width={hourW} height={hourLen} rx={hourW / 2} style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
        <rect className="nothing-analog-clock-widget__hand--minute" x={cx - minW / 2} y={cy - minLen} width={minW} height={minLen} rx={minW / 2} style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
        <circle className="nothing-analog-clock-widget__second-dot" cx={secDotX} cy={secDotY} r={secDotR} />
      </g>
    )
  }
  // swiss
  const ticks = []
  for (let i = 0; i < 60; i++) {
    const angle = (i * 6 - 90) * (Math.PI / 180)
    const isLarge = i % 5 === 0
    const outerR = radius * 0.92
    const innerR = isLarge ? radius * 0.8 : radius * 0.87
    const strokeWidth = isLarge ? radius * 0.026 : radius * 0.008
    const x1 = cx + outerR * Math.cos(angle)
    const y1 = cy + outerR * Math.sin(angle)
    const x2 = cx + innerR * Math.cos(angle)
    const y2 = cy + innerR * Math.sin(angle)
    ticks.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={strokeWidth} strokeLinecap="round" className={isLarge ? 'nothing-analog-clock-widget__tick--large' : 'nothing-analog-clock-widget__tick--small'} />
    )
  }
  const hourLen = radius * 0.5
  const hourW = radius * 0.025
  const minLen = radius * 0.675
  const minW = radius * 0.025
  const secLen = radius * 0.8
  const secW = radius * 0.008
  const secDotR = radius * 0.025
  const secDotDist = radius * 0.6
  const pivotR = radius * 0.03
  return (
    <g>
      {ticks}
      <rect className="nothing-analog-clock-widget__hand--hour" x={cx - hourW / 2} y={cy - hourLen} width={hourW} height={hourLen} rx={hourW / 2} style={{ transform: `rotate(${hourAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      <rect className="nothing-analog-clock-widget__hand--minute" x={cx - minW / 2} y={cy - minLen} width={minW} height={minLen} rx={minW / 2} style={{ transform: `rotate(${minuteAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      <line className="nothing-analog-clock-widget__hand--second" x1={cx} y1={cy} x2={cx} y2={cy - secLen} strokeWidth={secW} strokeLinecap="round" style={{ transform: `rotate(${secondAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      <circle className="nothing-analog-clock-widget__hand--second" cx={cx} cy={cy - secDotDist} r={secDotR} style={{ transform: `rotate(${secondAngle}deg)`, transformOrigin: `${cx}px ${cy}px` }} />
      <circle className="nothing-analog-clock-widget__pivot" cx={cx} cy={cy} r={pivotR} />
    </g>
  )
}

function DigitalLarge({ now, showSeconds, showDate = true }: { now: Date; showSeconds?: boolean; showDate?: boolean }) {
  const hours = pad2(now.getHours())
  const minutes = pad2(now.getMinutes())
  const seconds = pad2(now.getSeconds())
  const dayName = DAYS[now.getDay()].toUpperCase()
  const timeString = showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`
  return (
    <>
      <div className="nothing-digital-clock-large__time">{timeString}</div>
      {showDate && <div className="nothing-digital-clock-large__day">{dayName}</div>}
    </>
  )
}

const defaultCities: WorldClockCity[] = [
  { name: 'NEW YORK', offset: -5 },
  { name: 'LONDON', offset: 0 },
  { name: 'TOKYO', offset: 9 },
  { name: 'SYDNEY', offset: 11 },
]

/**
 * 从 Intl.supportedValuesOf('timeZone') 提取世界时区城市列表。
 * 兼容回退: 旧浏览器无该 API 时返回 defaultCities + real=false.
 */
function useWorldCities(useBrowser: boolean, provided?: WorldClockCity[]): WorldCityResult {
  return React.useMemo<WorldCityResult>(() => {
    if (provided && provided.length > 0) {
      return { cities: provided, real: true }
    }
    if (!useBrowser || typeof Intl === 'undefined') {
      return { cities: defaultCities, real: false }
    }
    try {
      const supported = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] })
        .supportedValuesOf
      if (typeof supported !== 'function') {
        return { cities: defaultCities, real: false }
      }
      const tzs = supported('timeZone')
      if (!Array.isArray(tzs) || tzs.length === 0) {
        return { cities: defaultCities, real: false }
      }
      // 过滤 UTC / 短别名,只保留有意义的地区
      const meaningful = tzs.filter(
        (tz) => tz.includes('/') && !tz.startsWith('Etc/') && !tz.startsWith('SystemV/')
      )
      // 挑选覆盖全球的 8 个时区 (跨大洲)
      const picks = [
        'America/New_York',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Berlin',
        'Africa/Cairo',
        'Asia/Dubai',
        'Asia/Shanghai',
        'Asia/Tokyo',
        'Australia/Sydney',
        'Pacific/Auckland',
      ]
      const selected: WorldClockCity[] = []
      for (const p of picks) {
        if (meaningful.includes(p)) {
          const name = p.split('/').pop()!.replace(/_/g, ' ').toUpperCase()
          selected.push({ name, offset: getTimezoneOffset(p) })
        }
        if (selected.length >= 6) break
      }
      if (selected.length === 0) {
        return { cities: defaultCities, real: false }
      }
      return { cities: selected, real: true }
    } catch {
      return { cities: defaultCities, real: false }
    }
  }, [useBrowser, provided])
}

function getTimezoneOffset(tz: string, ref: Date = new Date()): number {
  try {
    // 通过"长偏移"格式化 (e.g. "GMT+09:00") 提取 offset
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset',
      hour: 'numeric',
    })
    const parts = fmt.formatToParts(ref)
    const tzPart = parts.find((p) => p.type === 'timeZoneName')?.value || ''
    const match = tzPart.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/)
    if (!match) return 0
    const h = parseInt(match[1], 10)
    const m = match[2] ? parseInt(match[2], 10) : 0
    const sign = h < 0 ? -1 : 1
    return sign * (Math.abs(h) + m / 60)
  } catch {
    return 0
  }
}

const formatOffset = (offset: number): string => {
  if (offset === 0) return 'UTC+0'
  return offset > 0 ? `UTC+${offset}` : `UTC${offset}`
}

const getCityTime = (now: Date, offset: number): Date => {
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  return new Date(utc + offset * 3600000)
}

const isDaytime = (cityDate: Date): boolean => {
  const hours = cityDate.getHours()
  return hours >= 6 && hours < 18
}

function CompactDisplay() {
  return (
    <>
      <div className="widget-bg-dark widget-col-1 h-[152px] ml-0 mt-0 widget-relative widget-rounded-pill widget-row-1 w-[68px]" />
      <div className="widget-col-1 ml-[13px] mt-[40px] widget-relative widget-row-1 widget-text widget-text--ndot widget-text--32 widget-text--grey widget-text--center widget-text--nowrap">
        <p className="widget-leading-36 mb-0">22</p>
        <p className="widget-leading-36">10</p>
      </div>
    </>
  )
}

function TotalDisplay() {
  // 静态示例值 (与原 sub/TotalTime 一致: 6H 20M)
  return (
    <>
      <svg viewBox="0 0 118 20" fill="none" preserveAspectRatio="xMidYMid meet" className="h-[20px] widget-relative widget-shrink-0 w-[118px]">
        <circle cx="38" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="38" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="38" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="52" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="52" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="87" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="87" cy="17" r="3" fill="var(--widget-primary)" />
        <circle cx="52" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="87" cy="10" r="3" fill="var(--widget-primary)" />
        <circle cx="66" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="66" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="101" cy="3" r="3" fill="var(--widget-primary)" />
        <circle cx="101" cy="17" r="3" fill="var(--widget-primary)" />
        <circle cx="73" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="73" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="108" cy="3" r="3" fill="var(--widget-primary)" />
        <circle cx="108" cy="17" r="3" fill="var(--widget-primary)" />
        <circle cx="115" cy="3" r="3" fill="var(--widget-primary)" />
        <circle cx="115" cy="17" r="3" fill="var(--widget-primary)" />
        <circle cx="66" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="101" cy="10" r="3" fill="var(--widget-primary)" />
        <circle cx="73" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="108" cy="10" r="3" fill="var(--widget-primary)" />
        <circle cx="115" cy="10" r="3" fill="var(--widget-primary)" />
        <circle cx="24" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="24" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="10" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="10" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="10" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="24" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="31" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="31" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="31" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="45" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="45" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="80" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="80" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="45" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="80" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="59" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="59" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="94" cy="3" r="3" fill="var(--widget-primary)" />
        <circle cx="94" cy="17" r="3" fill="var(--widget-primary)" />
        <circle cx="59" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="94" cy="10" r="3" fill="var(--widget-primary)" />
        <circle cx="17" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="17" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="3" cy="3" r="3" fill="var(--widget-white)" />
        <circle cx="3" cy="17" r="3" fill="var(--widget-white)" />
        <circle cx="3" cy="10" r="3" fill="var(--widget-white)" />
        <circle cx="17" cy="10" r="3" fill="var(--widget-white)" />
      </svg>
      <p className="widget-text widget-text--light widget-text--sr widget-text--white widget-relative widget-shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="widget-leading-normal text-[32px]">6</span>
        <span className="widget-leading-normal text-[16px]">{`H `}</span>
        <span className="widget-leading-normal text-[32px]">20</span>
      </p>
      <p className="widget-text widget-text--10 widget-text--grey2 widget-text--uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total Time
      </p>
    </>
  )
}

const TimeInner = React.forwardRef<HTMLDivElement, TimeProps>(
  (
    {
      className,
      variant = 'digital-compact',
      theme = 'dark',
      size = 'md',
      dial = 'swiss',
      smoothSeconds = false,
      font = 'sharp',
      showSeconds = false,
      cities = defaultCities,
      useBrowserTimezones = true,
      label,
      value,
      unit,
      subtitle,
      format,
      // card 由 withWidgetCard HOC 在外层使用,此处仅占位避免传入 DOM
      card: _card,
      style,
      ...props
    },
    ref
  ) => {
    // For most variants use 1s tick. For smooth analog, use a separate state.
    const now = useNow(smoothSeconds && variant === 'analog' ? 50 : 1000)
    const analogState = React.useMemo(() => ({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
    }), [now])
    // world 变体的城市数据必须在所有 early return 之前调用,避免 hooks 顺序错乱
    const worldCities = useWorldCities(useBrowserTimezones, cities)

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={cn(timeVariants({ variant }), className)}
          style={style}
          data-state={dataAttr('compact')}
          data-variant={dataAttr(variant)}
          {...props}
        >
          <CompactDisplay />
        </div>
      )
    }

    if (variant === 'total') {
      return (
        <div
          ref={ref}
          className={cn('widget-card widget-card--152 widget-card--rounded widget-card--dark', className)}
          style={style}
          data-state={dataAttr('total')}
          data-variant={dataAttr(variant)}
          {...props}
        >
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] widget-relative size-full">
            <TotalDisplay />
          </div>
        </div>
      )
    }

    if (variant === 'world') {
      const world = worldCities
      return (
        <div
          ref={ref}
          className={cn('nothing-world-clock', `nothing-world-clock--${size}`, className)}
          style={style}
          data-state={dataAttr('ticking')}
          data-variant={dataAttr(variant)}
          data-real={dataAttr(world.real)}
          {...props}
        >
          <div className="world-clock-header">
            World Clock
            {!world.real && <span className="world-clock-header-badge" aria-label="simulated">SIM</span>}
          </div>
          <div className="world-clock-grid">
            {world.cities.map((city) => {
              const cityDate = getCityTime(now, city.offset)
              const isDay = isDaytime(cityDate)
              return (
                <div className="world-clock-city" key={city.name}>
                  <div className="world-clock-city-row">
                    <div className={cn('world-clock-day-indicator', isDay ? 'day' : 'night')} data-state={dataAttr(isDay ? 'day' : 'night')} />
                    <div className="world-clock-city-name">{city.name}</div>
                  </div>
                  <div className="world-clock-time">{stamp(cityDate)}</div>
                  <div className="world-clock-offset">{formatOffset(city.offset)}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (variant === 'analog') {
      const radius = 76
      const h = pad2(analogState.hours)
      const m = pad2(analogState.minutes)
      const s = pad2(analogState.seconds)
      return (
        <div
          ref={ref}
          className={cn('nothing-analog-clock-widget', `nothing-analog-clock-widget--${dial}`, `nothing-analog-clock-widget--${theme}`, smoothSeconds && 'nothing-analog-clock-widget--smooth', className)}
          style={style}
          role="img"
          aria-label={`Analog clock showing ${h}:${m}:${s}`}
          data-variant={dataAttr(dial)}
          data-theme={dataAttr(theme)}
          {...props}
        >
          <svg className="nothing-analog-clock-widget__svg" viewBox={`0 0 152 152`} xmlns="http://www.w3.org/2000/svg">
            <circle className="nothing-analog-clock-widget__face" cx={radius} cy={radius} r={radius} />
            <AnalogFace state={analogState} radius={radius} dial={dial} />
          </svg>
        </div>
      )
    }

    if (variant === 'digital-large') {
      return (
        <div
          ref={ref}
          className={cn('nothing-digital-clock-large', `nothing-digital-clock-large--${font}`, `nothing-digital-clock-large--${theme}`, className)}
          style={style}
          role="timer"
          aria-label={`Current time: ${pad2(now.getHours())}:${pad2(now.getMinutes())}`}
          data-variant={dataAttr(font)}
          data-theme={dataAttr(theme)}
          {...props}
        >
          <DigitalLarge now={now} showSeconds={showSeconds} />
        </div>
      )
    }

    if (variant === 'hero') {
      // 简化 hero: 仅渲染 label/value/unit/subtitle; 不接入 timer
      return (
        <div
          ref={ref}
          className={cn('nothing-time-widget', `nothing-time-widget--${format ?? '24h'}`, className)}
          style={style}
          data-variant={dataAttr('hero')}
          {...props}
        >
          {label && <div className="nothing-time-widget__label">{label}</div>}
          <div className="nothing-time-widget__content">
            <span className="nothing-time-widget__value">{value}</span>
            {unit && <span className="nothing-time-widget__unit">{unit}</span>}
          </div>
          {subtitle && <div className="nothing-time-widget__subtitle">{subtitle}</div>}
        </div>
      )
    }

    if (variant === 'digital-compact') {
      return (
        <div
          ref={ref}
          className={cn('nothing-clock', 'nothing-clock-digital', className)}
          style={style}
          data-state={dataAttr('digital')}
          data-variant={dataAttr(variant)}
          {...props}
        >
          <DigitalCompact now={now} />
        </div>
      )
    }

    if (variant === 'dial') {
      return (
        <div
          ref={ref}
          className={cn('nothing-clock', 'nothing-clock-gauge', className)}
          style={style}
          data-state={dataAttr('gauge')}
          data-variant={dataAttr(variant)}
          {...props}
        >
          <Dial now={now} />
        </div>
      )
    }

    if (variant === 'dual-ring') {
      return (
        <div
          ref={ref}
          className={cn('nothing-clock', 'nothing-clock-dual-ring', className)}
          style={style}
          data-state={dataAttr('dual-ring')}
          data-variant={dataAttr(variant)}
          {...props}
        >
          <DualRing now={now} />
        </div>
      )
    }

    // overlay
    return (
      <div
        ref={ref}
        className={cn('nothing-clock', 'nothing-clock-overlay', className)}
        style={style}
        data-state={dataAttr('overlay')}
        data-variant={dataAttr(variant)}
        {...props}
      >
        <Overlay now={now} />
      </div>
    )
  }
)
TimeInner.displayName = 'Time'

export { timeVariants }
export const Time = withWidgetCard(TimeInner)
export default Time
