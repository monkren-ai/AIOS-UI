import { useMemo } from 'react'
import '../styles/dot-matrix.css'

interface DotMatrixProps {
  rows: number
  cols: number
  dotSize?: 'sm' | 'md' | 'lg'
  theme?: 'light' | 'dark'
  pattern?: 'grid' | 'glyph' | 'pulse' | 'custom'
  activeDots?: [number, number][]
  dimDots?: [number, number][]
  className?: string
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  rows,
  cols,
  dotSize = 'md',
  theme = 'light',
  pattern = 'grid',
  activeDots = [],
  dimDots = [],
  className
}) => {
  const activeSet = useMemo(() => {
    const set = new Set<string>()
    activeDots.forEach(([r, c]) => set.add(`${r}-${c}`))
    return set
  }, [activeDots])

  const dimSet = useMemo(() => {
    const set = new Set<string>()
    dimDots.forEach(([r, c]) => set.add(`${r}-${c}`))
    return set
  }, [dimDots])

  const matrixClassName = [
    'nothing-dot-matrix',
    `nothing-dot-matrix--${dotSize}`,
    `nothing-dot-matrix--${theme}`,
    pattern !== 'custom' ? `nothing-dot-matrix--${pattern}` : '',
    className || ''
  ].filter(Boolean).join(' ')

  const grid = useMemo(() => {
    const result = []
    for (let r = 0; r < rows; r++) {
      const row = []
      for (let c = 0; c < cols; c++) {
        const key = `${r}-${c}`
        let dotClassName = 'nothing-dot-matrix__dot'
        if (activeSet.has(key)) {
          dotClassName += ' nothing-dot-matrix__dot--active'
        } else if (dimSet.has(key)) {
          dotClassName += ' nothing-dot-matrix__dot--dim'
        }
        row.push({ key, className: dotClassName })
      }
      result.push(row)
    }
    return result
  }, [rows, cols, activeSet, dimSet])

  return (
    <div className={matrixClassName}>
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

export default DotMatrix
