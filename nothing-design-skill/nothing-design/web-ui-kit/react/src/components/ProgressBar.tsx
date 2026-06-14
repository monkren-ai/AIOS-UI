import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/progress-bar.css'

const progressBarVariants = cva('nothing-progress', {
  variants: {
    size: {
      hero: 'nothing-progress--hero',
      standard: 'nothing-progress--standard',
      compact: 'nothing-progress--compact',
    },
    variant: {
      default: '',
      slim: 'nothing-progress--slim',
    },
    status: {
      default: '',
      good: 'nothing-progress__value--good',
      warning: 'nothing-progress__value--warning',
      overlimit: 'nothing-progress__value--overlimit',
      error: 'nothing-progress__value--error',
    },
    indeterminate: {
      true: 'nothing-progress--indeterminate',
      false: '',
    },
    disabled: {
      true: 'nothing-progress--disabled',
      false: '',
    },
  },
  defaultVariants: {
    size: 'standard',
    variant: 'default',
    status: 'default',
    indeterminate: false,
    disabled: false,
  },
})

const progressBarValueVariants = cva('nothing-progress__value', {
  variants: {
    status: {
      default: '',
      good: 'nothing-progress__value--good',
      warning: 'nothing-progress__value--warning',
      overlimit: 'nothing-progress__value--overlimit',
      error: 'nothing-progress__value--error',
    },
  },
  defaultVariants: { status: 'default' },
})

export type ProgressStatus = 'default' | 'good' | 'warning' | 'overlimit' | 'error'

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    Omit<VariantProps<typeof progressBarVariants>, 'indeterminate' | 'disabled'> {
  value: number
  total?: number
  segments?: number
  indeterminate?: boolean
  label?: string
  unit?: string
  status?: ProgressStatus
  showReadout?: boolean
  disabled?: boolean
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      total = 100,
      segments = 20,
      size = 'standard',
      variant = 'default',
      indeterminate = false,
      label,
      unit,
      status = 'default',
      showReadout = true,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const [animatedSegments, setAnimatedSegments] = React.useState(0)

    React.useEffect(() => {
      const filled = Math.round((value / total) * segments)
      const timer = setTimeout(() => setAnimatedSegments(filled), 50)
      return () => clearTimeout(timer)
    }, [value, total, segments])

    const getSegmentStatus = (index: number): string => {
      if (index >= animatedSegments) return 'empty'
      return status === 'default' ? 'filled' : status
    }

    const track = (
      <div className="nothing-progress__track">
        {indeterminate ? (
          <div className="nothing-progress__indeterminate-bar" />
        ) : (
          Array.from({ length: segments }).map((_, index) => (
            <div
              key={index}
              className={`nothing-progress__segment nothing-progress__segment--${getSegmentStatus(index)}`}
            />
          ))
        )}
      </div>
    )

    if (variant === 'slim') {
      return (
        <div
          ref={ref}
          className={cn(progressBarVariants({ variant: 'slim', indeterminate, disabled }), className)}
          style={style}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={total}
          data-state={dataAttr(indeterminate ? 'indeterminate' : disabled ? 'disabled' : 'normal')}
          {...props}
        >
          {track}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(progressBarVariants({ size, variant, indeterminate, disabled }), className)}
        style={style}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={total}
        data-state={dataAttr(indeterminate ? 'indeterminate' : disabled ? 'disabled' : 'normal')}
        {...props}
      >
        {track}
        {showReadout && !indeterminate && (
          <div className="nothing-progress__readout">
            <div className={cn(progressBarValueVariants({ status }))}>
              {value}
              {unit && <span className="nothing-progress__unit">{unit}</span>}
            </div>
            {label && <div className="nothing-progress__label">{label}</div>}
          </div>
        )}
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'

export { progressBarVariants, progressBarValueVariants }
export default ProgressBar
