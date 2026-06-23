import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Slider.css'

const sliderVariants = cva('nothing-slider', {
  variants: {
    disabled: {
      true: 'nothing-slider--disabled',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
})

export type SliderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  label?: string
  showValue?: boolean
} & VariantProps<typeof sliderVariants>

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      label,
      showValue = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? min)
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue
    const trackRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)
    const isDisabled = !!disabled

    const clampValue = React.useCallback(
      (val: number): number => {
        const clamped = Math.max(min, Math.min(max, val))
        const stepped = Math.round(clamped / step) * step
        const precision = String(step).includes('.')
          ? String(step).split('.')[1].length
          : 0
        return Number(stepped.toFixed(precision))
      },
      [min, max, step]
    )

    const updateValue = React.useCallback(
      (clientX: number) => {
        const track = trackRef.current
        if (!track) return
        const rect = track.getBoundingClientRect()
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const newValue = clampValue(min + ratio * (max - min))
        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [min, max, controlledValue, onValueChange, clampValue]
    )

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (isDisabled) return
        isDragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        updateValue(e.clientX)
      },
      [isDisabled, updateValue]
    )

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current || isDisabled) return
        updateValue(e.clientX)
      },
      [isDisabled, updateValue]
    )

    const handlePointerUp = React.useCallback(() => {
      isDragging.current = false
    }, [])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (isDisabled) return
        let newValue = currentValue
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            e.preventDefault()
            newValue = clampValue(currentValue + step)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            e.preventDefault()
            newValue = clampValue(currentValue - step)
            break
          case 'Home':
            e.preventDefault()
            newValue = min
            break
          case 'End':
            e.preventDefault()
            newValue = max
            break
          default:
            return
        }
        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isDisabled, currentValue, step, min, max, controlledValue, onValueChange, clampValue]
    )

    const percentage = ((currentValue - min) / (max - min)) * 100

    return (
      <div
        ref={ref}
        className={cn(sliderVariants({ disabled: isDisabled }), className)}
        data-disabled={dataAttr(isDisabled)}
        data-value={currentValue}
        {...props}
      >
        {(label || showValue) && (
          <div className="nothing-slider__header">
            {label && <span className="nothing-slider__label">{label}</span>}
            {showValue && <span className="nothing-slider__value">{currentValue}</span>}
          </div>
        )}
        <div
          className="nothing-slider__track"
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="nothing-slider__fill" style={{ width: `${percentage}%` }} />
          <div
            className="nothing-slider__thumb"
            style={{ left: `${percentage}%` }}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-label={label}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { sliderVariants }
export default Slider
