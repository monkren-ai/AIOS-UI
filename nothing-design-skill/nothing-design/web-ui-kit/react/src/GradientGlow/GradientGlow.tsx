import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { gradientGlowVariants, type GradientGlowIntensity } from './gradient-glow-variants'

export interface GradientGlowProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /** 点阵列数。 */
  cols?: number
  /** 点阵行数。 */
  rows?: number
  /** 单个点的直径（px）。 */
  dotSize?: number
  /** 氛围强度，决定中心点的最大 opacity。 */
  intensity?: GradientGlowIntensity
}

/** 各强度对应的最大 opacity——逐点衰减以此为上限。 */
const MAX_OPACITY: Record<GradientGlowIntensity, number> = {
  subtle: 0.3,
  normal: 0.5,
  strong: 0.7,
}

export function GradientGlow({
  cols = 16,
  rows = 10,
  dotSize = 2,
  intensity = 'normal',
  className,
  style,
  ...props
}: GradientGlowProps) {
  const maxOpacity = MAX_OPACITY[intensity]
  const centerR = (rows - 1) / 2
  const centerC = (cols - 1) / 2
  const maxDist = Math.sqrt(centerR ** 2 + centerC ** 2) || 1

  const dots = React.useMemo(() => {
    const result: { key: string; opacity: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dist = Math.sqrt((r - centerR) ** 2 + (c - centerC) ** 2)
        // 径向阶梯：中心 1、边缘 0，乘以强度上限。不用 CSS radial-gradient。
        const falloff = Math.max(0, 1 - dist / maxDist)
        result.push({ key: `${r}-${c}`, opacity: maxOpacity * falloff })
      }
    }
    return result
  }, [rows, cols, centerR, centerC, maxDist, maxOpacity])

  return (
    <div
      className={cn(gradientGlowVariants({ intensity }), className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        placeItems: 'center',
        ...style,
      }}
      data-slot="gradient-glow"
      data-variant="dotmatrix"
      data-intensity={dataAttr(intensity)}
      aria-hidden="true"
      {...props}
    >
      {dots.map((dot) => (
        <div
          key={dot.key}
          data-slot="gradient-glow-dot"
          className="rounded-full bg-foreground-muted"
          style={{
            width: dotSize,
            height: dotSize,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  )
}

GradientGlow.displayName = 'GradientGlow'

export { gradientGlowVariants }
export default GradientGlow
