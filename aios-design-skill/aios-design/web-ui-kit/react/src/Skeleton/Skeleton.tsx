import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  skeletonDotVariants,
  skeletonVariants,
  type SkeletonVariant,
} from './skeleton-variants'
import './Skeleton.css'

export interface SkeletonProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /** 占位形状。text 是一行点阵，rect 是矩形点阵，circle 是圆形点阵。 */
  variant?: SkeletonVariant
  /** 容器宽度，数字按 px 处理。 */
  width?: number | string
  /** 容器高度，数字按 px 处理。 */
  height?: number | string
  /** 点阵行数。 */
  rows?: number
  /** 点阵列数。 */
  cols?: number
  /** 是否开启呼吸动画；motion-reduce 下始终静态停在 0.6 透明度。 */
  animate?: boolean
}

/** 各形状的默认尺寸与点阵密度。 */
const DEFAULTS: Record<SkeletonVariant, { width: string; height: string; rows: number; cols: number }> = {
  text: { width: '100%', height: '1em', rows: 1, cols: 16 },
  rect: { width: '100%', height: '64px', rows: 4, cols: 16 },
  circle: { width: '48px', height: '48px', rows: 6, cols: 6 },
}

function resolveSize(value: number | string | undefined, fallback: string): string {
  if (value === undefined || value === null) return fallback
  if (typeof value === 'number') return `${value}px`
  return value
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  rows,
  cols,
  animate = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const defaults = DEFAULTS[variant]
  const resolvedRows = rows ?? defaults.rows
  const resolvedCols = cols ?? defaults.cols
  const resolvedWidth = resolveSize(width, defaults.width)
  const resolvedHeight = resolveSize(height, defaults.height)

  return (
    <div
      className={cn(skeletonVariants({ variant, animate }), className)}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        gridTemplateColumns: `repeat(${resolvedCols}, 1fr)`,
        gridTemplateRows: `repeat(${resolvedRows}, 1fr)`,
        placeItems: 'center',
        ...style,
      }}
      data-slot="skeleton"
      data-variant="dotmatrix"
      data-shape={dataAttr(variant)}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: resolvedRows * resolvedCols }).map((_, i) => (
        <div
          key={i}
          data-slot="skeleton-dot"
          className={skeletonDotVariants({ variant })}
        />
      ))}
    </div>
  )
}

Skeleton.displayName = 'Skeleton'

export { skeletonVariants, skeletonDotVariants }
export default Skeleton
