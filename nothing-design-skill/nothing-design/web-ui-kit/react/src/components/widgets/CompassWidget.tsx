import { useMemo } from 'react'
import { withWidgetCard } from './withWidgetCard'
import '../../styles/compass-widget.css'

interface CompassWidgetProps {
  heading?: number
  showDots?: boolean
  className?: string
  style?: React.CSSProperties
}

const DOT_ROWS = 7
const DOT_COLS = 7

function getDirectionLabel(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest']
  const index = Math.round(normalized / 45) % 8
  return directions[index]
}

const CompassWidget: React.FC<CompassWidgetProps> = ({
  heading = 0,
  showDots = true,
  className,
  style
}) => {
  const normalizedHeading = ((heading % 360) + 360) % 360

  const dotGrid = useMemo(() => {
    if (!showDots) return null
    const grid: string[][] = []
    for (let r = 0; r < DOT_ROWS; r++) {
      const row: string[] = []
      for (let c = 0; c < DOT_COLS; c++) {
        row.push(`${r}-${c}`)
      }
      grid.push(row)
    }
    return grid
  }, [showDots])

  const widgetStyle = {
    '--compass-heading': `${-normalizedHeading}deg`,
    ...style
  } as React.CSSProperties

  const labelStyle = {
    transform: `rotate(${normalizedHeading}deg)`
  }

  const directionLabel = getDirectionLabel(normalizedHeading)

  const content = (
    <div
      className={['nothing-compass-widget', className].filter(Boolean).join(' ')}
      style={widgetStyle}
      role="img"
      aria-label={`Compass pointing ${normalizedHeading} degrees, ${directionLabel}`}
    >
      <span
        className="nothing-compass-widget__direction nothing-compass-widget__direction--default"
        style={labelStyle}
      >
        W
      </span>
      <div className="nothing-compass-widget__center">
        <span
          className="nothing-compass-widget__direction nothing-compass-widget__direction--north"
          style={labelStyle}
        >
          N
        </span>
        {dotGrid && (
          <div className="nothing-compass-widget__dots">
            {dotGrid.map((row, r) => (
              <div key={r} className="nothing-compass-widget__dots-row">
                {row.map((key) => (
                  <div key={key} className="nothing-compass-widget__dot" />
                ))}
              </div>
            ))}
          </div>
        )}
        <span
          className="nothing-compass-widget__direction nothing-compass-widget__direction--default"
          style={labelStyle}
        >
          S
        </span>
      </div>
      <span
        className="nothing-compass-widget__direction nothing-compass-widget__direction--default"
        style={labelStyle}
      >
        E
      </span>
    </div>
  )

  return content
}

export default withWidgetCard(CompassWidget)
