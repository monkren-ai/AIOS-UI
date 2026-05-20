import { useMemo } from 'react'
import '../../styles/compass-widget.css'

interface CompassWidgetProps {
  heading?: number;
  showDots?: boolean;
  className?: string;
}

const DOT_ROWS = 7;
const DOT_COLS = 7;

const CompassWidget: React.FC<CompassWidgetProps> = ({
  heading = 0,
  showDots = true,
  className
}) => {
  const dotGrid = useMemo(() => {
    if (!showDots) return null;
    const grid: string[][] = [];
    for (let r = 0; r < DOT_ROWS; r++) {
      const row: string[] = [];
      for (let c = 0; c < DOT_COLS; c++) {
        row.push(`${r}-${c}`);
      }
      grid.push(row);
    }
    return grid;
  }, [showDots]);

  const widgetStyle = {
    transform: `rotate(${-heading}deg)`
  };

  const labelStyle = {
    transform: `rotate(${heading}deg)`
  };

  return (
    <div
      className={['nothing-compass-widget', className].filter(Boolean).join(' ')}
      style={widgetStyle}
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
  );
};

export default CompassWidget;
