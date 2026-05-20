import { useMemo } from 'react'
import DotMatrix from '../DotMatrix'
import '../../styles/dot-matrix.css'
import '../../styles/weather-widget.css'

interface WeatherForecast {
  day: string;
  hi: string;
  lo: string;
  condition?: string;
}

interface WeatherWidgetProps {
  temp?: string;
  hi?: string;
  lo?: string;
  city?: string;
  condition?: string;
  forecast?: WeatherForecast[];
  variant?: 'square' | 'wide';
  className?: string;
}

const WEATHER_ICONS: Record<string, {
  rows: number;
  cols: number;
  activeDots: [number, number][];
  dimDots?: [number, number][];
}> = {
  sunny: {
    rows: 5,
    cols: 5,
    activeDots: [[0,2],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[2,4],[3,1],[3,2],[3,3],[4,2]]
  },
  partly_cloudy: {
    rows: 5,
    cols: 7,
    activeDots: [[0,3],[0,4],[1,2],[1,3],[1,4],[1,5],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,2],[3,3],[3,4],[3,5],[4,3],[4,4]],
    dimDots: [[0,1],[1,0],[1,1],[2,0]]
  },
  cloudy: {
    rows: 4,
    cols: 7,
    activeDots: [[0,2],[0,3],[0,4],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5]]
  },
  rainy: {
    rows: 5,
    cols: 7,
    activeDots: [[0,2],[0,3],[0,4],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[4,1],[4,3],[4,5]]
  }
}

const FORECAST_ICONS: Record<string, {
  rows: number;
  cols: number;
  activeDots: [number, number][];
}> = {
  sunny: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,1]] },
  partly_cloudy: { rows: 3, cols: 3, activeDots: [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]] },
  cloudy: { rows: 3, cols: 3, activeDots: [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]] },
  rainy: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,0],[2,2]] }
}

function getConditionType(condition: string | undefined): string {
  if (!condition) return 'sunny'
  const lower = condition.toLowerCase()
  if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return 'rainy'
  if (lower.includes('partly cloudy') || lower.includes('partly sunny')) return 'partly_cloudy'
  if (lower.includes('cloud') || lower.includes('overcast')) return 'cloudy'
  return 'sunny'
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  temp = '30°',
  hi = '35°',
  lo = '16°',
  city = 'Toronto',
  condition = 'Partly cloudy',
  forecast = [],
  variant = 'square',
  className
}) => {
  const conditionType = useMemo(() => getConditionType(condition), [condition])
  const iconPattern = WEATHER_ICONS[conditionType] || WEATHER_ICONS.sunny

  const widgetClassName = [
    'nothing-weather-widget',
    variant === 'wide' ? 'nothing-weather-widget--wide' : '',
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <div className={widgetClassName}>
      <div className="nothing-weather-widget__dots">
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
      <div className="nothing-weather-widget__temp">{temp}</div>
      <div className="nothing-weather-widget__info">
        <div className="nothing-weather-widget__hi-lo">H {hi}  L {lo}</div>
        <div className="nothing-weather-widget__location">{city}</div>
        <div className="nothing-weather-widget__condition">{condition}</div>
      </div>
      {forecast.length > 0 && (
        <div className="nothing-weather-widget__forecast">
          {forecast.map((day) => {
            const dayConditionType = getConditionType(day.condition)
            const dayIcon = FORECAST_ICONS[dayConditionType] || FORECAST_ICONS.sunny
            return (
              <div className="nothing-weather-widget__forecast-day" key={day.day}>
                <div className="nothing-weather-widget__forecast-label">{day.day}</div>
                <DotMatrix
                  rows={dayIcon.rows}
                  cols={dayIcon.cols}
                  dotSize="sm"
                  theme="dark"
                  pattern="glyph"
                  activeDots={dayIcon.activeDots}
                />
                <div className="nothing-weather-widget__forecast-hi">{day.hi}</div>
                <div className="nothing-weather-widget__forecast-lo">{day.lo}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WeatherWidget
