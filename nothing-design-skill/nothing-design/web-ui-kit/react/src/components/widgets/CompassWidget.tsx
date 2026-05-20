import { useMemo } from 'react'
import WidgetCard from '../WidgetCard'
import '../../styles/compass-widget.css'

interface CompassWidgetProps {
  heading?: number
  showDots?: boolean
  card?: boolean | Omit<React.ComponentProps<typeof WidgetCard>, 'children'>
  className?: string
  style?: React.CSSProperties
}

const DOT_ROWS = 7
const DOT_COLS = 7

const CompassWidget: React.FC<CompassWidgetProps> = ({
  heading = 0,
  showDots = true,
  card,
  className,
  style
}) => {
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
    transform: `rotate(${-heading}deg)`
  }

  const labelStyle = {
    transform: `rotate(${heading}deg)`
  }

  const content = (
    <div
      className={['nothing-compass-widget', className].filter(Boolean).join(' ')}
      style={{ ...widgetStyle, ...style }}
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

  if (card) {
    const cardProps = typeof card === 'object' ? card : {}
    return <WidgetCard {...cardProps}>{content}</WidgetCard>
  }

  return content
}

export default CompassWidget
