import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  progressBarVariants,
  progressIndeterminateVariants,
  progressSegmentVariants,
  progressTrackVariants,
  progressValueVariants,
  resolveProgressBarSize,
  resolveProgressBarVariant,
  type ProgressBarSize,
  type ProgressBarVariant,
  type ProgressStatus,
} from './progress-bar-variants'
import './ProgressBar.css'

export interface ProgressBarProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  value: number
  total?: number
  /** 轨道被切成几段。 */
  segments?: number
  /** 结构：分段轨（默认）或没有读数的细轨。 */
  variant?: ProgressBarVariant
  /** 轨道高度。 */
  size?: ProgressBarSize
  indeterminate?: boolean
  label?: string
  unit?: string
  status?: ProgressStatus
  showReadout?: boolean
  disabled?: boolean
}

export function ProgressBar({
  className,
  value,
  total = 100,
  segments = 20,
  size,
  variant,
  indeterminate = false,
  label,
  unit,
  status = 'default',
  showReadout = true,
  disabled = false,
  ...props
}: ProgressBarProps) {
  const [animatedSegments, setAnimatedSegments] = React.useState(0)

  // `label` 之前纯粹是读数行里的一段视觉文字，没进无障碍树，于是每个 progressbar
  // 都是无名的。这里用 aria-label 而不是 aria-labelledby：那段文字只在
  // `showReadout && !isSlim && !indeterminate` 时才渲染，用 id 关联会在其余
  // 情况下指向不存在的节点。调用方自己传了名字就以调用方为准。
  const hasOwnLabel = Boolean(props['aria-label'] || props['aria-labelledby'])
  const ariaLabel = label && !hasOwnLabel ? label : undefined

  React.useEffect(() => {
    const filled = Math.round((value / total) * segments)
    const timer = setTimeout(() => setAnimatedSegments(filled), 50)
    return () => clearTimeout(timer)
  }, [value, total, segments])

  const resolvedVariant = (resolveProgressBarVariant(variant) ?? 'segmented') as
    | 'segmented'
    | 'slim'
  const resolvedSize = (resolveProgressBarSize(size) ?? 'md') as 'sm' | 'md' | 'lg'
  const isSlim = resolvedVariant === 'slim'

  const getSegmentState = (index: number) => {
    if (index >= animatedSegments) return 'empty' as const
    return status === 'default' ? ('filled' as const) : status
  }

  return (
    <div
      className={cn(
        progressBarVariants({ variant: resolvedVariant, size: resolvedSize, disabled }),
        className,
      )}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={ariaLabel}
      // 带单位时读数应当是「72 percent」而不是光秃秃的 72。
      aria-valuetext={!indeterminate && unit ? `${value}${unit}` : undefined}
      data-slot="progress-bar"
      data-variant={dataAttr(resolvedVariant)}
      data-size={dataAttr(resolvedSize)}
      data-status={dataAttr(status)}
      data-state={dataAttr(indeterminate ? 'indeterminate' : disabled ? 'disabled' : 'normal')}
      {...props}
    >
      <div
        data-slot="progress-bar-track"
        className={progressTrackVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          indeterminate,
        })}
      >
        {indeterminate ? (
          <div data-slot="progress-bar-indeterminate" className={progressIndeterminateVariants()} />
        ) : (
          Array.from({ length: segments }).map((_, index) => (
            <div
              key={index}
              data-slot="progress-bar-segment"
              data-state={getSegmentState(index)}
              className={progressSegmentVariants({
                state: getSegmentState(index),
                size: resolvedSize,
                variant: resolvedVariant,
              })}
            />
          ))
        )}
      </div>
      {showReadout && !isSlim && !indeterminate && (
        <div data-slot="progress-bar-readout" className="flex items-baseline justify-between">
          <div data-slot="progress-bar-value" className={progressValueVariants({ status })}>
            {value}
            {unit && (
              <span
                data-slot="progress-bar-unit"
                className="ms-0.5 font-mono text-label text-foreground-muted"
              >
                {unit}
              </span>
            )}
          </div>
          {label && (
            <div
              data-slot="progress-bar-label"
              className="font-mono text-label uppercase tracking-wider text-foreground-muted"
            >
              {label}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'

export { progressBarVariants, progressValueVariants, type ProgressStatus }
export default ProgressBar
