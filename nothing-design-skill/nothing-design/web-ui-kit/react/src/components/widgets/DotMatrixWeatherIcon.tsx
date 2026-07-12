import * as React from 'react'
import DotMatrixIcon from '../DotMatrixIcon'
import { weatherSvg } from './icon-svg-registry'
import { cn } from '../../lib/utils'

export type WeatherIconName = keyof typeof weatherSvg

export interface DotMatrixWeatherIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Weather icon name — must match a key in weatherSvg registry. */
  name: WeatherIconName
  /** Total size in px (square). Default 120. */
  size?: number
  /** Grid rows. Default 30 (matches size=120, dotSize=3, gap=1 → 119px). */
  rows?: number
  /** Grid cols. Default 30. */
  cols?: number
  /** Alpha threshold (0–255). Default 100 (weather SVGs use fill=white, need lower threshold). */
  alphaThreshold?: number
  /** Dot diameter in px. Default 3. */
  dotSize?: number
  /** Gap between dots in px. Default 1. */
  gap?: number
  /** Animation mode. 'random' periodically highlights dots. Default 'none'. */
  anim?: 'none' | 'random'
  /** Percentage of on-dots to highlight each pulse cycle. Default 15. */
  activePercent?: number
  /** Pulse cycle duration in ms. Default 1200. */
  speedMs?: number
}

/**
 * DotMatrixWeatherIcon — renders a weather SVG as a dot-matrix grid.
 * Uses the weatherSvg registry (7 icons via Vite ?raw imports).
 * Defaults to white dots on dark background with rounded corners.
 */
export const DotMatrixWeatherIcon = React.forwardRef<HTMLDivElement, DotMatrixWeatherIconProps>(
  (
    {
      name,
      size = 120,
      rows = 30,
      cols = 30,
      alphaThreshold = 100,
      dotSize = 3,
      gap = 1,
      anim = 'none',
      activePercent = 15,
      speedMs = 1200,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <DotMatrixIcon
        ref={ref}
        svg={weatherSvg[name]}
        rows={rows}
        cols={cols}
        alphaThreshold={alphaThreshold}
        dotSize={dotSize}
        gap={gap}
        baseColor="var(--widget-white, #FCFAFE)"
        activeColor="var(--widget-primary, #D71921)"
        backgroundColor="var(--widget-dark-bg, #1A1D1C)"
        radius={size / 4}
        anim={anim}
        activePercent={activePercent}
        speedMs={speedMs}
        className={cn('nothing-weather-dot-icon', className)}
        style={style}
        {...props}
      />
    )
  }
)
DotMatrixWeatherIcon.displayName = 'DotMatrixWeatherIcon'
export default DotMatrixWeatherIcon
