import { useMemo } from 'react'
import DotMatrix from '../DotMatrix'
import { withWidgetCard } from './withWidgetCard'
import '../../styles/dot-matrix.css'
import '../../styles/weather-widget.css'

type WeatherCondition = 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'snowy' | 'thunderstorm' | 'foggy' | 'night_clear' | 'night_cloudy';

interface WeatherForecast {
  day: string;
  hi: string;
  lo: string;
  condition?: string;
}

interface HourlyForecast {
  time: string;
  temp: string;
  condition: WeatherCondition;
}

interface WeatherWidgetProps {
  temp?: string;
  hi?: string;
  lo?: string;
  city?: string;
  condition?: string;
  forecast?: WeatherForecast[];
  variant?: 'square' | 'wide' | 'circular' | 'grid';
  unit?: 'celsius' | 'fahrenheit';
  hourlyForecast?: HourlyForecast[];
  className?: string;
  style?: React.CSSProperties;
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
  },
  snowy: {
    rows: 7,
    cols: 7,
    activeDots: [[0,2],[0,4],[1,1],[1,3],[1,5],[2,0],[2,2],[2,3],[2,4],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[4,0],[4,2],[4,3],[4,4],[4,6],[5,1],[5,3],[5,5],[6,2],[6,4]],
    dimDots: []
  },
  thunderstorm: {
    rows: 7,
    cols: 7,
    activeDots: [[0,2],[0,3],[0,4],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,2],[3,3],[3,4],[4,1],[4,2],[4,4],[4,5],[5,0],[5,1],[5,5],[5,6],[6,1],[6,5]]
  },
  foggy: {
    rows: 7,
    cols: 7,
    activeDots: [[1,1],[1,2],[1,3],[1,4],[1,5],[3,1],[3,2],[3,3],[3,4],[3,5],[5,1],[5,2],[5,3],[5,4],[5,5]]
  },
  night_clear: {
    rows: 5,
    cols: 5,
    activeDots: [[0,2],[1,1],[1,3],[2,0],[2,2],[2,4],[3,1],[3,3],[4,2]]
  },
  night_cloudy: {
    rows: 7,
    cols: 7,
    activeDots: [[0,1],[0,2],[1,0],[1,3],[2,1],[2,2],[2,3],[2,4],[2,5],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,2],[4,3],[4,4],[4,5],[5,3],[5,4]]
  }
};

const FORECAST_ICONS: Record<string, {
  rows: number;
  cols: number;
  activeDots: [number, number][];
}> = {
  sunny: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,1]] },
  partly_cloudy: { rows: 3, cols: 3, activeDots: [[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]] },
  cloudy: { rows: 3, cols: 3, activeDots: [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]] },
  rainy: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,0],[2,2]] },
  snowy: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,1]] },
  thunderstorm: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,1]] },
  foggy: { rows: 3, cols: 3, activeDots: [[0,0],[0,1],[0,2],[2,0],[2,1],[2,2]] },
  night_clear: { rows: 3, cols: 3, activeDots: [[0,1],[1,0],[1,1],[1,2],[2,1]] },
  night_cloudy: { rows: 3, cols: 3, activeDots: [[0,0],[0,2],[1,0],[1,1],[1,2],[2,1]] }
};

function getConditionType(condition: string | undefined): string {
  if (!condition) return 'sunny';
  const lower = condition.toLowerCase();
  if (lower.includes('thunderstorm') || lower.includes('thunder')) return 'thunderstorm';
  if (lower.includes('snow') || lower.includes('blizzard') || lower.includes('sleet')) return 'snowy';
  if (lower.includes('fog') || lower.includes('mist') || lower.includes('haze')) return 'foggy';
  if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return 'rainy';
  if (lower.includes('night cloudy') || lower.includes('night partly')) return 'night_cloudy';
  if (lower.includes('night clear') || lower.includes('clear night')) return 'night_clear';
  if (lower.includes('partly cloudy') || lower.includes('partly sunny')) return 'partly_cloudy';
  if (lower.includes('cloud') || lower.includes('overcast')) return 'cloudy';
  return 'sunny';
}

function formatTemp(temp: string, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    if (temp.endsWith('°C')) return temp.replace('°C', '°F');
    if (temp.endsWith('°')) return temp + 'F';
    if (!temp.includes('°')) return temp + '°F';
  }
  return temp;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  temp = '30°',
  hi = '35°',
  lo = '16°',
  city = 'Toronto',
  condition = 'Partly cloudy',
  forecast = [],
  variant = 'square',
  unit = 'celsius',
  hourlyForecast = [],
  className,
  style
}) => {
  const conditionType = useMemo(() => getConditionType(condition), [condition]);
  const iconPattern = WEATHER_ICONS[conditionType] || WEATHER_ICONS.sunny;

  const displayTemp = formatTemp(temp, unit);
  const displayHi = formatTemp(hi, unit);
  const displayLo = formatTemp(lo, unit);

  const widgetClassName = [
    'nothing-weather-widget',
    variant !== 'square' ? `nothing-weather-widget--${variant}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Circular variant
  if (variant === 'circular') {
    return (
      <div
        className={widgetClassName}
        style={style}
        role="region"
        aria-label={`Weather in ${city}: ${condition}, ${displayTemp}`}
      >
        <div className="nothing-weather-widget__circular-icon" role="img" aria-label={`${condition} weather icon`}>
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
        <div className="nothing-weather-widget__circular-condition">{condition}</div>
        <div className="nothing-weather-widget__circular-city">{city}</div>
      </div>
    );
  }

  // Grid variant
  if (variant === 'grid') {
    const gridCells = [
      { label: 'Now', temp: displayTemp, conditionType, isCurrent: true }
    ];
    forecast.slice(0, 3).forEach((day) => {
      const dayConditionType = getConditionType(day.condition);
      gridCells.push({ label: day.day, temp: formatTemp(day.hi, unit), conditionType: dayConditionType, isCurrent: false });
    });
    // Fill remaining cells if forecast is short
    while (gridCells.length < 4) {
      gridCells.push({ label: '', temp: '', conditionType: 'sunny', isCurrent: false });
    }

    return (
      <div
        className={widgetClassName}
        style={style}
        role="region"
        aria-label={`Weather grid for ${city}: ${condition}, ${displayTemp}`}
      >
        {gridCells.map((cell, index) => {
          const cellIcon = WEATHER_ICONS[cell.conditionType] || WEATHER_ICONS.sunny;
          return (
            <div
              key={index}
              className={[
                'nothing-weather-widget__grid-cell',
                cell.isCurrent ? 'nothing-weather-widget__grid-cell--current' : ''
              ].filter(Boolean).join(' ')}
              role="group"
              aria-label={cell.isCurrent ? `Current weather: ${condition}, ${cell.temp}` : `${cell.label} forecast, ${cell.temp}`}
            >
              <div className="nothing-weather-widget__grid-icon" role="img" aria-label={`${cell.conditionType} weather icon`}>
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
          );
        })}
      </div>
    );
  }

  // Square and Wide variants (existing)
  const content = (
    <div className={widgetClassName} style={style}>
      <div className="nothing-weather-widget__dots" role="img" aria-label={`${condition} weather icon`}>
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
        <div className="nothing-weather-widget__hi-lo">H {displayHi}  L {displayLo}</div>
        <div className="nothing-weather-widget__location">{city}</div>
        <div className="nothing-weather-widget__condition">{condition}</div>
      </div>
      {forecast.length > 0 && (
        <div className="nothing-weather-widget__forecast">
          {forecast.map((day) => {
            const dayConditionType = getConditionType(day.condition);
            const dayIcon = FORECAST_ICONS[dayConditionType] || FORECAST_ICONS.sunny;
            return (
              <div className="nothing-weather-widget__forecast-day" key={day.day} role="group" aria-label={`${day.day} forecast, ${day.condition || 'sunny'}`}>
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
            );
          })}
        </div>
      )}
      {hourlyForecast.length > 0 && (
        <div className="nothing-weather-widget__hourly" role="list" aria-label="Hourly forecast">
          {hourlyForecast.map((hour, index) => {
            const hourConditionType = hour.condition || getConditionType(condition);
            const hourIcon = FORECAST_ICONS[hourConditionType] || FORECAST_ICONS.sunny;
            return (
              <div className="nothing-weather-widget__hourly-item" key={index} role="listitem" aria-label={`${hour.time}: ${formatTemp(hour.temp, unit)}`}>
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
            );
          })}
        </div>
      )}
    </div>
  );

  return content
};

export default withWidgetCard(WeatherWidget);
