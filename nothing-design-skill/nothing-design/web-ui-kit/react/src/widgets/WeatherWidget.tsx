import * as React from 'react'
import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import DotMatrix from '@/DotMatrix'
import { withWidgetCard } from './withWidgetCard'
import { useWeather } from '@/hooks'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/dot-matrix.css'
import '@/styles/weather-widget.css'

type WeatherCondition =
  | 'sunny'
  | 'partly_cloudy'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'thunderstorm'
  | 'foggy'
  | 'night_clear'
  | 'night_cloudy'

interface WeatherForecast {
  day: string
  hi: string
  lo: string
  condition?: string
}

interface HourlyForecast {
  time: string
  temp: string
  condition: WeatherCondition
}

export type WeatherWidgetVariant = 'square' | 'wide' | 'circular' | 'grid'
export type WeatherUnit = 'celsius' | 'fahrenheit'

const weatherWidgetVariants = cva('nothing-weather-widget', {
  variants: {
    variant: {
      square: 'nothing-weather-widget--square',
      wide: 'nothing-weather-widget--wide',
      circular: 'nothing-weather-widget--circular',
      grid: 'nothing-weather-widget--grid',
    },
    unit: {
      celsius: '',
      fahrenheit: 'nothing-weather-widget--fahrenheit',
    },
  },
  defaultVariants: { variant: 'square', unit: 'celsius' },
})

const gridCellVariants = cva('nothing-weather-widget__grid-cell', {
  variants: {
    current: {
      true: 'nothing-weather-widget__grid-cell--current',
      false: '',
    },
  },
  defaultVariants: { current: false },
})

const WEATHER_ICONS: Record<
  string,
  {
    rows: number
    cols: number
    activeDots: [number, number][]
    dimDots?: [number, number][]
  }
> = {
  sunny: {
    rows: 5,
    cols: 5,
    activeDots: [[0, 2], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3], [4, 2]],
  },
  partly_cloudy: {
    rows: 5,
    cols: 7,
    activeDots: [[0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [1, 5], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [3, 5], [4, 3], [4, 4]],
    dimDots: [[0, 1], [1, 0], [1, 1], [2, 0]],
  },
  cloudy: {
    rows: 4,
    cols: 7,
    activeDots: [[0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5]],
  },
  rainy: {
    rows: 5,
    cols: 7,
    activeDots: [[0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [4, 1], [4, 3], [4, 5]],
  },
  snowy: {
    rows: 7,
    cols: 7,
    activeDots: [[0, 2], [0, 4], [1, 1], [1, 3], [1, 5], [2, 0], [2, 2], [2, 3], [2, 4], [2, 6], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [4, 0], [4, 2], [4, 3], [4, 4], [4, 6], [5, 1], [5, 3], [5, 5], [6, 2], [6, 4]],
    dimDots: [],
  },
  thunderstorm: {
    rows: 7,
    cols: 7,
    activeDots: [[0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 1], [4, 2], [4, 4], [4, 5], [5, 0], [5, 1], [5, 5], [5, 6], [6, 1], [6, 5]],
  },
  foggy: {
    rows: 7,
    cols: 7,
    activeDots: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]],
  },
  night_clear: {
    rows: 5,
    cols: 5,
    activeDots: [[0, 2], [1, 1], [1, 3], [2, 0], [2, 2], [2, 4], [3, 1], [3, 3], [4, 2]],
  },
  night_cloudy: {
    rows: 7,
    cols: 7,
    activeDots: [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [4, 2], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4]],
  },
}

const FORECAST_ICONS: Record<
  string,
  { rows: number; cols: number; activeDots: [number, number][] }
> = {
  sunny: { rows: 3, cols: 3, activeDots: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]] },
  partly_cloudy: { rows: 3, cols: 3, activeDots: [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
  cloudy: { rows: 3, cols: 3, activeDots: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]] },
  rainy: { rows: 3, cols: 3, activeDots: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 0], [2, 2]] },
  snowy: { rows: 3, cols: 3, activeDots: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]] },
  thunderstorm: { rows: 3, cols: 3, activeDots: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]] },
  foggy: { rows: 3, cols: 3, activeDots: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]] },
  night_clear: { rows: 3, cols: 3, activeDots: [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]] },
  night_cloudy: { rows: 3, cols: 3, activeDots: [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [2, 1]] },
}

function getConditionType(condition: string | undefined): string {
  if (!condition) return 'sunny'
  const lower = condition.toLowerCase()
  if (lower.includes('thunderstorm') || lower.includes('thunder')) return 'thunderstorm'
  if (lower.includes('snow') || lower.includes('blizzard') || lower.includes('sleet')) return 'snowy'
  if (lower.includes('fog') || lower.includes('mist') || lower.includes('haze')) return 'foggy'
  if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return 'rainy'
  if (lower.includes('night cloudy') || lower.includes('night partly')) return 'night_cloudy'
  if (lower.includes('night clear') || lower.includes('clear night')) return 'night_clear'
  if (lower.includes('partly cloudy') || lower.includes('partly sunny')) return 'partly_cloudy'
  if (lower.includes('cloud') || lower.includes('overcast')) return 'cloudy'
  return 'sunny'
}

function formatTemp(temp: string, unit: WeatherUnit): string {
  if (unit === 'fahrenheit') {
    if (temp.endsWith('°C')) return temp.replace('°C', '°F')
    if (temp.endsWith('°')) return temp + 'F'
    if (!temp.includes('°')) return temp + '°F'
  }
  return temp
}

export interface WeatherWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof weatherWidgetVariants>, 'variant' | 'unit'> {
  temp?: string
  hi?: string
  lo?: string
  city?: string
  condition?: string
  forecast?: WeatherForecast[]
  variant?: WeatherWidgetVariant
  unit?: WeatherUnit
  hourlyForecast?: HourlyForecast[]
  /** Real weather fetch. Pass `{ latitude, longitude, city, enabled }`. */
  live?: { latitude: number; longitude: number; city?: string; enabled?: boolean }
}

const WeatherWidgetInner = React.forwardRef<HTMLDivElement, WeatherWidgetProps>(
  (
    {
      className,
      temp = '30°',
      hi = '35°',
      lo = '16°',
      city = 'Toronto',
      condition = 'Partly cloudy',
      forecast = [],
      variant = 'square',
      unit = 'celsius',
      hourlyForecast = [],
      live,
      style,
      ...props
    },
    ref
  ) => {
    const liveData = useWeather(
      live
        ? {
            latitude: live.latitude,
            longitude: live.longitude,
            city: live.city,
            enabled: live.enabled !== false,
          }
        : { latitude: 0, longitude: 0, enabled: false }
    )
    const isReal = !!(live && liveData.real && liveData.data)
    const d = liveData.data

    const displayTemp = d ? `${d.temp}°` : temp
    const displayHi = d ? `${d.hi}°` : hi
    const displayLo = d ? `${d.lo}°` : lo
    const displayCity = d ? d.city : city
    const displayCondition = d ? d.condition : condition
    const displayForecast: WeatherForecast[] =
      d && d.forecast.length
        ? d.forecast.map((f) => ({ day: f.day, hi: `${f.hi}°`, lo: `${f.lo}°`, condition: f.condition }))
        : forecast

    const conditionType = useMemo(() => getConditionType(displayCondition), [displayCondition])
    const iconPattern = WEATHER_ICONS[conditionType] || WEATHER_ICONS.sunny

    if (variant === 'circular') {
      return (
        <div
          ref={ref}
          className={cn(weatherWidgetVariants({ variant, unit }), className)}
          style={style}
          role="region"
          aria-label={`Weather in ${displayCity}: ${displayCondition}, ${displayTemp}`}
          data-variant={dataAttr(variant)}
          data-city={dataAttr(displayCity)}
          data-condition={dataAttr(displayCondition)}
          data-real={dataAttr(isReal)}
          {...props}
        >
          <div
            className="nothing-weather-widget__circular-icon"
            role="img"
            aria-label={`${displayCondition} weather icon`}
          >
            <DotMatrix
              rows={iconPattern.rows}
              cols={iconPattern.cols}
              dotSize="sm"
              theme="dark"
              pattern="glyph"
              activeDots={iconPattern.activeDots}
              dimDots={iconPattern.dimDots || []}
            />
          </div>
          <div className="nothing-weather-widget__circular-temp">{displayTemp}</div>
          <div className="nothing-weather-widget__circular-condition">{displayCondition}</div>
          <div className="nothing-weather-widget__circular-city">{displayCity}</div>
        </div>
      )
    }

    if (variant === 'grid') {
      const gridCells: Array<{ label: string; temp: string; conditionType: string; isCurrent: boolean }> = [
        { label: 'Now', temp: displayTemp, conditionType, isCurrent: true },
      ]
      displayForecast.slice(0, 3).forEach((day) => {
        const dayConditionType = getConditionType(day.condition)
        gridCells.push({
          label: day.day,
          temp: formatTemp(day.hi, unit),
          conditionType: dayConditionType,
          isCurrent: false,
        })
      })
      while (gridCells.length < 4) {
        gridCells.push({ label: '', temp: '', conditionType: 'sunny', isCurrent: false })
      }

      return (
        <div
          ref={ref}
          className={cn(weatherWidgetVariants({ variant, unit }), className)}
          style={style}
          role="region"
          aria-label={`Weather grid for ${displayCity}: ${displayCondition}, ${displayTemp}`}
          data-variant={dataAttr(variant)}
          data-real={dataAttr(isReal)}
          {...props}
        >
          {gridCells.map((cell, index) => {
            const cellIcon = WEATHER_ICONS[cell.conditionType] || WEATHER_ICONS.sunny
            return (
              <div
                key={index}
                className={cn(gridCellVariants({ current: cell.isCurrent }))}
                role="group"
                aria-label={
                  cell.isCurrent
                    ? `Current weather: ${displayCondition}, ${cell.temp}`
                    : `${cell.label} forecast, ${cell.temp}`
                }
                data-current={dataAttr(cell.isCurrent)}
              >
                <div
                  className="nothing-weather-widget__grid-icon"
                  role="img"
                  aria-label={`${cell.conditionType} weather icon`}
                >
                  <DotMatrix
                    rows={cellIcon.rows}
                    cols={cellIcon.cols}
                    dotSize={cell.isCurrent ? 'md' : 'sm'}
                    theme="dark"
                    pattern="glyph"
                    activeDots={cellIcon.activeDots}
                    dimDots={cellIcon.dimDots || []}
                  />
                </div>
                <div className="nothing-weather-widget__grid-temp">{cell.temp}</div>
                <div className="nothing-weather-widget__grid-label">{cell.label}</div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(weatherWidgetVariants({ variant, unit }), className)}
        style={style}
        data-variant={dataAttr(variant)}
        data-city={dataAttr(displayCity)}
        data-condition={dataAttr(displayCondition)}
        data-real={dataAttr(isReal)}
        {...props}
      >
        <div className="nothing-weather-widget__dots" role="img" aria-label={`${displayCondition} weather icon`}>
          <DotMatrix
            rows={iconPattern.rows}
            cols={iconPattern.cols}
            dotSize="sm"
            theme="dark"
            pattern="glyph"
            activeDots={iconPattern.activeDots}
            dimDots={iconPattern.dimDots || []}
          />
        </div>
        <div className="nothing-weather-widget__temp">{displayTemp}</div>
        <div className="nothing-weather-widget__info">
          <div className="nothing-weather-widget__hi-lo">H {formatTemp(displayHi, unit)} L {formatTemp(displayLo, unit)}</div>
          <div className="nothing-weather-widget__location">{displayCity}</div>
          <div className="nothing-weather-widget__condition">{displayCondition}</div>
        </div>
        {displayForecast.length > 0 && (
          <div className="nothing-weather-widget__forecast">
            {displayForecast.map((day) => {
              const dayConditionType = getConditionType(day.condition)
              const dayIcon = FORECAST_ICONS[dayConditionType] || FORECAST_ICONS.sunny
              return (
                <div
                  className="nothing-weather-widget__forecast-day"
                  key={day.day}
                  role="group"
                  aria-label={`${day.day} forecast, ${day.condition || 'sunny'}`}
                >
                  <div className="nothing-weather-widget__forecast-label">{day.day}</div>
                  <DotMatrix
                    rows={dayIcon.rows}
                    cols={dayIcon.cols}
                    dotSize="sm"
                    theme="dark"
                    pattern="glyph"
                    activeDots={dayIcon.activeDots}
                  />
                  <div className="nothing-weather-widget__forecast-hi">{formatTemp(day.hi, unit)}</div>
                  <div className="nothing-weather-widget__forecast-lo">{formatTemp(day.lo, unit)}</div>
                </div>
              )
            })}
          </div>
        )}
        {hourlyForecast.length > 0 && (
          <div className="nothing-weather-widget__hourly" role="list" aria-label="Hourly forecast">
            {hourlyForecast.map((hour, index) => {
              const hourConditionType = hour.condition || getConditionType(displayCondition)
              const hourIcon = FORECAST_ICONS[hourConditionType] || FORECAST_ICONS.sunny
              return (
                <div
                  className="nothing-weather-widget__hourly-item"
                  key={index}
                  role="listitem"
                  aria-label={`${hour.time}: ${formatTemp(hour.temp, unit)}`}
                >
                  <div className="nothing-weather-widget__hourly-time">{hour.time}</div>
                  <DotMatrix
                    rows={hourIcon.rows}
                    cols={hourIcon.cols}
                    dotSize="sm"
                    theme="dark"
                    pattern="glyph"
                    activeDots={hourIcon.activeDots}
                  />
                  <div className="nothing-weather-widget__hourly-temp">{formatTemp(hour.temp, unit)}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
WeatherWidgetInner.displayName = 'WeatherWidget'

export { weatherWidgetVariants, gridCellVariants }
export const WeatherWidget = withWidgetCard(WeatherWidgetInner)
export default WeatherWidget
