import * as React from 'react'
import { Meter as MeterPrimitive } from '@base-ui/react/meter'
import { cn, dataAttr } from '@/lib/utils'
import {
  meterMarkerVariants,
  meterSegmentVariants,
  meterTrackVariants,
  meterValueVariants,
  meterVariants,
  type MeterSize,
  type MeterZone,
} from './meter-variants'

export interface MeterProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /** 当前值。必填。 */
  value: number
  /** 下限，默认 0。 */
  min?: number
  /** 上限，默认 100。 */
  max?: number
  /** 临界下界。低于它进入 low 区。 */
  low?: number
  /** 临界上界。高于它进入 high 区。 */
  high?: number
  /** 期望值所在区为 good 区，决定状态色映射。 */
  optimum?: number
  /** 读数行末端的说明文字（不是无障碍名称）。 */
  label?: string
  /** 是否显示数值。默认 true。 */
  showValue?: boolean
  size?: MeterSize
}

/** 分段轨被切成多少格。 */
const SEGMENTS = 20

/**
 * 按 HTML `<meter>` 语义计算 zone：把区间切成 low / mid / high 三段，optimum
 * 落在哪段哪段就是 good；value 离 optimum 段越远颜色越警示。
 *
 * - distance 0 → good（默认前景色）
 * - distance 1 → warning（黄）
 * - distance 2 → critical（红）
 *
 * 缺省时 low=min、high=max、optimum=中点，于是 value 永远落在 mid = good。
 */
function getZone(
  value: number,
  min: number,
  max: number,
  low: number | undefined,
  high: number | undefined,
  optimum: number | undefined,
): MeterZone {
  const lowBound = low ?? min
  const highBound = high ?? max
  const opt = optimum ?? (min + max) / 2

  const zoneIndexOf = (v: number): 0 | 1 | 2 => {
    if (v < lowBound) return 0 // low
    if (v > highBound) return 2 // high
    return 1 // mid
  }

  const distance = Math.abs(zoneIndexOf(value) - zoneIndexOf(opt))
  if (distance === 0) return 'good'
  if (distance === 1) return 'warning'
  return 'critical'
}

export function Meter({
  className,
  value,
  min = 0,
  max = 100,
  low,
  high,
  optimum,
  label,
  showValue = true,
  size,
  ...props
}: MeterProps) {
  const resolvedSize = (size ?? 'md') as MeterSize
  const span = Math.max(max - min, 0)
  const ratio = span > 0 ? Math.min(Math.max((value - min) / span, 0), 1) : 0
  const filled = Math.round(ratio * SEGMENTS)
  const zone = getZone(value, min, max, low, high, optimum)

  const hasOwnLabel = Boolean(props['aria-label'] || props['aria-labelledby'])
  const ariaLabel = label && !hasOwnLabel ? label : undefined

  const markerPct = (bound: number): number | null => {
    if (span <= 0) return null
    const pct = ((bound - min) / span) * 100
    if (pct <= 0 || pct >= 100) return null
    return pct
  }
  const lowPct = low !== undefined ? markerPct(low) : null
  const highPct = high !== undefined ? markerPct(high) : null

  return (
    <MeterPrimitive.Root
      className={cn(meterVariants({ size: resolvedSize }), className)}
      value={value}
      min={min}
      max={max}
      aria-label={ariaLabel}
      data-slot="meter"
      data-size={dataAttr(resolvedSize)}
      data-zone={dataAttr(zone)}
      {...props}
    >
      <div data-slot="meter-track" className={meterTrackVariants({ size: resolvedSize })}>
        {Array.from({ length: SEGMENTS }).map((_, index) => {
          const state = index < filled ? 'filled' : 'empty'
          return (
            <div
              key={index}
              data-slot="meter-segment"
              data-state={state}
              className={meterSegmentVariants({ state, size: resolvedSize })}
            />
          )
        })}
        {lowPct !== null && (
          <div
            aria-hidden="true"
            data-slot="meter-marker"
            data-bound="low"
            className={meterMarkerVariants()}
            style={{ insetInlineStart: `${lowPct}%` }}
          />
        )}
        {highPct !== null && (
          <div
            aria-hidden="true"
            data-slot="meter-marker"
            data-bound="high"
            className={meterMarkerVariants()}
            style={{ insetInlineStart: `${highPct}%` }}
          />
        )}
      </div>
      {(showValue || label) && (
        <div data-slot="meter-readout" className="flex items-baseline justify-between">
          {showValue && (
            <div
              data-slot="meter-value"
              className={meterValueVariants({ size: resolvedSize, zone })}
            >
              {value}
            </div>
          )}
          {label && (
            <div
              data-slot="meter-label"
              className="font-mono text-label uppercase tracking-wider text-foreground-muted"
            >
              {label}
            </div>
          )}
        </div>
      )}
    </MeterPrimitive.Root>
  )
}

Meter.displayName = 'Meter'

export { meterVariants, meterValueVariants, type MeterZone }
export default Meter
