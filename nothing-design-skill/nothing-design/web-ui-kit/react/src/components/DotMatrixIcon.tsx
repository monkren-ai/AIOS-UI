import * as React from 'react'
import { cn, dataAttr } from '../lib/utils'
import '../styles/dot-matrix-icon.css'

const MAX_DIM = 96

export interface DotMatrixIconProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Full <svg>...</svg> markup to rasterize into a dot mask. */
  svg: string
  /** Grid resolution — number of rows. Default 24. */
  rows?: number
  /** Grid resolution — number of columns. Default 24. */
  cols?: number
  /** Alpha threshold (0–255). Pixels with alpha >= threshold become dots. Default 128. */
  alphaThreshold?: number
  /** Dot diameter in px. Default 6. */
  dotSize?: number
  /** Gap between dots in px. Default 2. */
  gap?: number
  /** Color of non-pulsing dots. Default 'var(--widget-dark-2)'. */
  baseColor?: string
  /** Color of pulsing dots. Default 'var(--widget-primary)'. */
  activeColor?: string
  /** Container background. Default 'transparent'. */
  backgroundColor?: string
  /** Container corner radius in px. Default 0. */
  radius?: number
  /** Animation mode. 'random' periodically highlights a percentage of dots. Default 'none'. */
  anim?: 'none' | 'random'
  /** Percentage of on-dots to highlight each pulse cycle (0–100). Default 20. */
  activePercent?: number
  /** Pulse cycle duration in ms. Default 1200. */
  speedMs?: number
}

/**
 * Dot Matrix Icon — turns pasted <svg>...</svg> markup into a crisp dot-grid
 * render. Rasterizes the SVG into a rows × cols grid and draws circular dots
 * wherever the SVG alpha exceeds the threshold. Optional Random Pulse animation
 * periodically highlights a percentage of dots using the active color.
 */
export const DotMatrixIcon = React.forwardRef<HTMLDivElement, DotMatrixIconProps>(
  (
    {
      svg,
      rows = 24,
      cols = 24,
      alphaThreshold = 128,
      dotSize = 6,
      gap = 2,
      baseColor = 'var(--widget-dark-2)',
      activeColor = 'var(--widget-primary)',
      backgroundColor = 'transparent',
      radius = 0,
      anim = 'none',
      activePercent = 20,
      speedMs = 1200,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Clamp grid dimensions to protect against DOM explosion on low-end devices.
    const safeRows = Math.min(Math.max(1, Math.floor(rows)), MAX_DIM)
    const safeCols = Math.min(Math.max(1, Math.floor(cols)), MAX_DIM)

    if (import.meta.env.DEV) {
      if (rows > MAX_DIM || cols > MAX_DIM) {
        console.warn(
          `[DotMatrixIcon] rows/cols exceed ${MAX_DIM} and were clamped. Very high grid sizes increase render cost.`,
        )
      }
    }

    // Stage 1: rasterize SVG → per-cell alpha map (0–255).
    // Re-runs only when the SVG source or grid shape changes (not on threshold tweak).
    const [alphaMap, setAlphaMap] = React.useState<number[][] | null>(null)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
      if (!svg) {
        setAlphaMap(null)
        setError(false)
        return
      }

      let cancelled = false
      const img = new Image()

      const handleLoad = () => {
        if (cancelled) return
        try {
          const canvas = document.createElement('canvas')
          canvas.width = safeCols
          canvas.height = safeRows
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          if (!ctx) {
            setError(true)
            return
          }
          // Draw the SVG scaled to one pixel per cell — we only need per-cell alpha.
          ctx.clearRect(0, 0, safeCols, safeRows)
          ctx.drawImage(img, 0, 0, safeCols, safeRows)
          const { data } = ctx.getImageData(0, 0, safeCols, safeRows)
          const map: number[][] = []
          for (let r = 0; r < safeRows; r++) {
            const row: number[] = []
            for (let c = 0; c < safeCols; c++) {
              const idx = (r * safeCols + c) * 4 + 3
              row.push(data[idx])
            }
            map.push(row)
          }
          setAlphaMap(map)
          setError(false)
        } catch {
          setError(true)
        }
      }

      const handleError = () => {
        if (cancelled) return
        setError(true)
      }

      img.onload = handleLoad
      img.onerror = handleError
      img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

      return () => {
        cancelled = true
        img.onload = null
        img.onerror = null
      }
    }, [svg, safeRows, safeCols])

    // Stage 2: apply alpha threshold → boolean on/off grid.
    // Cheap recomputation; safe to run on every threshold change without re-loading the image.
    const onCells = React.useMemo(() => {
      const grid: boolean[][] = []
      for (let r = 0; r < safeRows; r++) {
        const row: boolean[] = []
        for (let c = 0; c < safeCols; c++) {
          const a = alphaMap?.[r]?.[c] ?? 0
          row.push(a >= alphaThreshold)
        }
        grid.push(row)
      }
      return grid
    }, [alphaMap, safeRows, safeCols, alphaThreshold])

    // Collect on-cell keys for the pulse sampler.
    const onKeys = React.useMemo(() => {
      const keys: string[] = []
      for (let r = 0; r < safeRows; r++) {
        for (let c = 0; c < safeCols; c++) {
          if (onCells[r]?.[c]) keys.push(`${r}-${c}`)
        }
      }
      return keys
    }, [onCells, safeRows, safeCols])

    // Stage 3: Random Pulse — periodically highlight a random subset of on-dots.
    const [pulsing, setPulsing] = React.useState<Set<string>>(new Set())

    React.useEffect(() => {
      if (anim !== 'random' || onKeys.length === 0) {
        setPulsing(new Set())
        return
      }

      // Respect reduced-motion: render all on-cells in activeColor statically.
      const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (reduceQuery.matches) {
        setPulsing(new Set(onKeys))
        return
      }

      const sample = () => {
        const count = Math.max(1, Math.floor((onKeys.length * activePercent) / 100))
        const next = new Set<string>()
        // Fisher–Yates partial shuffle to pick `count` distinct keys.
        const pool = onKeys.slice()
        for (let i = 0; i < count && pool.length > 0; i++) {
          const j = Math.floor(Math.random() * pool.length)
          next.add(pool[j])
          pool.splice(j, 1)
        }
        setPulsing(next)
      }

      sample()
      const id = window.setInterval(sample, Math.max(60, speedMs))
      return () => window.clearInterval(id)
    }, [anim, onKeys, activePercent, speedMs])

    const total = safeRows * safeCols
    const cells: React.ReactNode[] = []
    for (let r = 0; r < safeRows; r++) {
      for (let c = 0; c < safeCols; c++) {
        const key = `${r}-${c}`
        const isOn = onCells[r]?.[c] ?? false
        const isPulsing = pulsing.has(key)
        const bg = isOn ? (isPulsing ? activeColor : baseColor) : 'transparent'
        cells.push(
          <div
            key={key}
            className={cn(
              'nothing-dot-matrix-icon__dot',
              isPulsing && 'nothing-dot-matrix-icon__dot--pulse',
            )}
            style={{ width: dotSize, height: dotSize, backgroundColor: bg }}
          />,
        )
      }
    }

    return (
      <div
        ref={ref}
        className={cn('nothing-dot-matrix-icon', className)}
        style={{
          backgroundColor,
          borderRadius: radius,
          gridTemplateColumns: `repeat(${safeCols}, ${dotSize}px)`,
          gap: `${gap}px`,
          ...style,
        }}
        data-anim={dataAttr(anim)}
        data-rows={safeRows}
        data-cols={safeCols}
        data-error={error ? 'true' : undefined}
        data-empty={total === 0 || (!alphaMap && !error) ? 'true' : undefined}
        role="img"
        aria-label={props['aria-label'] ?? 'Dot matrix icon'}
        {...props}
      >
        {cells}
      </div>
    )
  },
)
DotMatrixIcon.displayName = 'DotMatrixIcon'

export default DotMatrixIcon
