import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  dotMatrixRowVariants,
  dotMatrixVariants,
  dotVariants,
  type DotMatrixPattern,
  type DotMatrixSize,
  type DotMatrixTheme,
  type DotState,
} from '../DotMatrix/dot-matrix-variants'
import '../DotMatrix/DotMatrix.css'

export interface StaticDotMatrixProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  rows: number
  cols: number
  dotSize?: DotMatrixSize
  theme?: DotMatrixTheme
  pattern?: DotMatrixPattern
  activeDots?: [number, number][]
  dimDots?: [number, number][]
}

/**
 * 点阵渲染原语。
 *
 * 主题走 `data-dot-theme` 而不是 `data-theme`：后者是 theme.css 里 `dark:` /
 * `light:` 变体的选择器，挂在这里会把整棵子树的主题令牌一起翻掉。
 */
export function StaticDotMatrix({
  className,
  rows,
  cols,
  dotSize = 'md',
  theme = 'light',
  pattern = 'grid',
  activeDots = [],
  dimDots = [],
  style,
  ...props
}: StaticDotMatrixProps) {
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
        let state: DotState = 'idle'
        if (activeSet.has(key)) state = 'active'
        else if (dimSet.has(key)) state = 'dim'
        row.push({ key, state, className: cn(dotVariants({ dotSize, theme, pattern, state })) })
      }
      result.push(row)
    }
    return result
  }, [rows, cols, activeSet, dimSet, dotSize, theme, pattern])

  return (
    <div
      className={cn(dotMatrixVariants({ dotSize, theme, pattern }), className)}
      style={style}
      data-slot="dot-matrix"
      data-state={dataAttr(pattern)}
      data-pattern={dataAttr(pattern)}
      data-dot-size={dataAttr(dotSize)}
      data-dot-theme={dataAttr(theme)}
      {...props}
    >
      {grid.map((row, r) => (
        <div key={r} data-slot="dot-matrix-row" className={dotMatrixRowVariants({ dotSize })}>
          {row.map((dot) => (
            <div
              key={dot.key}
              data-slot="dot-matrix-dot"
              data-dot-state={dataAttr(dot.state)}
              className={dot.className}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

StaticDotMatrix.displayName = 'StaticDotMatrix'

export { dotMatrixVariants, dotMatrixRowVariants, dotVariants }
export default StaticDotMatrix
