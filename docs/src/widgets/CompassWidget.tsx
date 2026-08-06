import * as React from 'react'
import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { withWidgetCard } from './withWidgetCard'
import { useDeviceOrientation } from '@/hooks'
import { cn, dataAttr } from '@/lib/utils'
import '@/styles/compass-widget.css'

const compassWidgetVariants = cva('aios-compass-widget', {
  variants: {
    size: {
      sm: 'aios-compass-widget--sm',
      md: 'aios-compass-widget--md',
      lg: 'aios-compass-widget--lg',
    },
    dotted: { true: 'aios-compass-widget--dotted', false: '' },
  },
  defaultVariants: { size: 'md', dotted: true },
})

const DOT_ROWS = 7
const DOT_COLS = 7

function getDirectionLabel(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360
  const directions = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ]
  const index = Math.round(normalized / 45) % 8
  return directions[index]
}

export type CompassHeading = number | 'auto'

export interface CompassWidgetProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof compassWidgetVariants>, 'size' | 'dotted'> {
  heading?: CompassHeading
  showDots?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const CompassWidgetInner = React.forwardRef<HTMLDivElement, CompassWidgetProps>(
  ({ className, heading = 0, showDots = true, size, style, ...props }, ref) => {
    const useAuto = heading === 'auto'
    const orient = useDeviceOrientation(useAuto)
    const effectiveHeading: number =
      useAuto && orient.heading !== null
        ? orient.heading
        : typeof heading === 'number'
          ? heading
          : 0
    const real = !useAuto ? true : orient.real
    const normalizedHeading = ((effectiveHeading % 360) + 360) % 360

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
      ...style,
    } as React.CSSProperties

    const labelStyle = {
      transform: `rotate(${normalizedHeading}deg)`,
    }

    const directionLabel = getDirectionLabel(normalizedHeading)

    return (
      <div
        ref={ref}
        className={cn(compassWidgetVariants({ size, dotted: showDots }), className)}
        style={widgetStyle}
        role="img"
        aria-label={`Compass pointing ${normalizedHeading} degrees, ${directionLabel}`}
        data-heading={dataAttr(normalizedHeading)}
        data-direction={dataAttr(directionLabel)}
        data-real={dataAttr(real)}
        data-mode={dataAttr(useAuto ? 'auto' : 'manual')}
        {...props}
      >
        <span
          className="aios-compass-widget__direction aios-compass-widget__direction--default"
          style={labelStyle}
        >
          W
        </span>
        <div className="aios-compass-widget__center">
          <span
            className="aios-compass-widget__direction aios-compass-widget__direction--north"
            style={labelStyle}
          >
            N
          </span>
          {dotGrid && (
            <div className="aios-compass-widget__dots">
              {dotGrid.map((row, r) => (
                <div key={r} className="aios-compass-widget__dots-row">
                  {row.map((key) => (
                    <div key={key} className="aios-compass-widget__dot" />
                  ))}
                </div>
              ))}
            </div>
          )}
          <span
            className="aios-compass-widget__direction aios-compass-widget__direction--default"
            style={labelStyle}
          >
            S
          </span>
        </div>
        <span
          className="aios-compass-widget__direction aios-compass-widget__direction--default"
          style={labelStyle}
        >
          E
        </span>
      </div>
    )
  },
)
CompassWidgetInner.displayName = 'CompassWidget'

export { compassWidgetVariants }
export const CompassWidget = withWidgetCard(CompassWidgetInner)
export default CompassWidget
