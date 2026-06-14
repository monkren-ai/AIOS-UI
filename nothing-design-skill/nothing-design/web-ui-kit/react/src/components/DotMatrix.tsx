import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/dot-matrix.css'

const dotMatrixVariants = cva('nothing-dot-matrix', {
  variants: {
    dotSize: {
      sm: 'nothing-dot-matrix--sm',
      md: 'nothing-dot-matrix--md',
      lg: 'nothing-dot-matrix--lg',
    },
    theme: {
      light: 'nothing-dot-matrix--light',
      dark: 'nothing-dot-matrix--dark',
    },
    pattern: {
      grid: 'nothing-dot-matrix--grid',
      glyph: 'nothing-dot-matrix--glyph',
      pulse: 'nothing-dot-matrix--pulse',
      custom: '',
    },
  },
  defaultVariants: { dotSize: 'md', theme: 'light', pattern: 'grid' },
})

const dotVariants = cva('nothing-dot-matrix__dot', {
  variants: {
    state: {
      idle: '',
      active: 'nothing-dot-matrix__dot--active',
      dim: 'nothing-dot-matrix__dot--dim',
    },
  },
  defaultVariants: { state: 'idle' },
})

export interface DotMatrixProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof dotMatrixVariants>, 'pattern'> {
  rows: number
  cols: number
  pattern?: 'grid' | 'glyph' | 'pulse' | 'custom'
  activeDots?: [number, number][]
  dimDots?: [number, number][]
}

export const DotMatrix = React.forwardRef<HTMLDivElement, DotMatrixProps>(
  ({ className, rows, cols, dotSize = 'md', theme = 'light', pattern = 'grid', activeDots = [], dimDots = [], style, ...props }, ref) => {
    const activeSet = React.useMemo(() => {
      const set = new Set<string>()
      activeDots.forEach(([r, c]) => set.add(`${r}-${c}`))
      return set
    }, [activeDots])

    const dimSet = React.useMemo(() => {
      const set = new Set<string>()
      dimDots.forEach(([r, c]) => set.add(`${r}-${c}`))
      return set
    }, [dimDots])

    const grid = React.useMemo(() => {
      const result = []
      for (let r = 0; r < rows; r++) {
        const row = []
        for (let c = 0; c < cols; c++) {
          const key = `${r}-${c}`
          let state: 'idle' | 'active' | 'dim' = 'idle'
          if (activeSet.has(key)) state = 'active'
          else if (dimSet.has(key)) state = 'dim'
          row.push({ key, className: dotVariants({ state }) })
        }
        result.push(row)
      }
      return result
    }, [rows, cols, activeSet, dimSet])

    return (
      <div
        ref={ref}
        className={cn(dotMatrixVariants({ dotSize, theme, pattern: pattern === 'custom' ? 'custom' : pattern }), className)}
        style={style}
        data-state={dataAttr(pattern)}
        {...props}
      >
        {grid.map((row, r) => (
          <div key={r} className="nothing-dot-matrix__row">
            {row.map((dot) => (
              <div key={dot.key} className={dot.className} />
            ))}
          </div>
        ))}
      </div>
    )
  }
)
DotMatrix.displayName = 'DotMatrix'

export { dotMatrixVariants, dotVariants }
export default DotMatrix
