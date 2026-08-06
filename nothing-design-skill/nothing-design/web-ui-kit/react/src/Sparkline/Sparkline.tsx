import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SparklineProps extends Omit<React.ComponentPropsWithRef<'svg'>, 'children'> {
  /** 趋势数据点。 */
  data: number[]
  /** SVG 宽度，默认撑满父容器。 */
  width?: number | string
  /** SVG 高度，默认 32。 */
  height?: number
  /** 描边宽度，默认 1.5。 */
  strokeWidth?: number
  /** 标出最高 / 最低点，用透明度区分而非色相。 */
  showExtremes?: boolean
  /** 显示首末数值，Space Mono。 */
  showValues?: boolean
}

/**
 * 迷你趋势线：1.5px 描边、无填充、currentColor；极值用透明度区分。
 *
 * 纯 SVG，无 Base UI。viewBox 横向拉伸以填满宽度（`preserveAspectRatio="none"`），
 * 描边走 `vectorEffect="non-scaling-stroke"` 保持恒定 1.5px。
 */
export function Sparkline({
  data,
  width = '100%',
  height = 32,
  strokeWidth = 1.5,
  showExtremes = false,
  showValues = false,
  className,
  ref,
  ...props
}: SparklineProps) {
  const internalW = typeof width === 'number' ? width : 100
  const pad = Math.max(strokeWidth, 2)
  const n = data.length
  const hasLine = n >= 2

  let min = 0
  let max = 0
  let minIdx = 0
  let maxIdx = 0
  if (n > 0) {
    min = max = data[0]
    data.forEach((v, i) => {
      if (v < min) {
        min = v
        minIdx = i
      }
      if (v > max) {
        max = v
        maxIdx = i
      }
    })
  }
  const range = max - min || 1

  const xAt = (i: number) => (hasLine ? (i / (n - 1)) * internalW : internalW / 2)
  const yAt = (v: number) => height - pad - ((v - min) / range) * (height - pad * 2)
  const points = data.map((v, i) => `${xAt(i)},${yAt(v)}`).join(' ')

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${internalW} ${height}`}
      preserveAspectRatio="none"
      className={cn('text-foreground', className)}
      data-slot="sparkline"
      role="img"
      aria-label="Sparkline / 趋势线"
      {...props}
    >
      {hasLine && (
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {!hasLine && n === 1 && (
        <circle cx={internalW / 2} cy={height / 2} r={strokeWidth} fill="currentColor" />
      )}
      {showExtremes && n > 0 && (
        <>
          <circle
            cx={xAt(maxIdx)}
            cy={yAt(data[maxIdx])}
            r={strokeWidth * 1.5}
            fill="currentColor"
            opacity={1}
          />
          <circle
            cx={xAt(minIdx)}
            cy={yAt(data[minIdx])}
            r={strokeWidth * 1.5}
            fill="currentColor"
            opacity={0.6}
          />
        </>
      )}
      {showValues && n > 0 && (
        <>
          <text
            x={2}
            y={Math.max(yAt(data[0]) - 3, 10)}
            fontSize={10}
            textAnchor="start"
            className="font-mono"
            fill="currentColor"
          >
            {String(data[0])}
          </text>
          <text
            x={internalW - 2}
            y={Math.max(yAt(data[n - 1]) - 3, 10)}
            fontSize={10}
            textAnchor="end"
            className="font-mono"
            fill="currentColor"
          >
            {String(data[n - 1])}
          </text>
        </>
      )}
    </svg>
  )
}

Sparkline.displayName = 'Sparkline'

export default Sparkline
