import { useState, useRef, useCallback } from 'react'
import '../styles/slider.css'

interface SliderProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  label?: string
  showValue?: boolean
  style?: React.CSSProperties
}

const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = false,
  style
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? min)
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const clampValue = useCallback((val: number): number => {
    const clamped = Math.max(min, Math.min(max, val))
    const stepped = Math.round(clamped / step) * step
    const precision = String(step).includes('.') ? String(step).split('.')[1].length : 0
    return Number(stepped.toFixed(precision))
  }, [min, max, step])

  const updateValue = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newValue = clampValue(min + ratio * (max - min))
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }, [min, max, controlledValue, onValueChange, clampValue])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return
    isDragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateValue(e.clientX)
  }, [disabled, updateValue])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || disabled) return
    updateValue(e.clientX)
  }, [disabled, updateValue])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return
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
  }, [disabled, currentValue, step, min, max, controlledValue, onValueChange, clampValue])

  const percentage = ((currentValue - min) / (max - min)) * 100

  const containerClassNames = [
    'nothing-slider',
    disabled ? 'nothing-slider--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClassNames} style={style}>
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
        <div
          className="nothing-slider__fill"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="nothing-slider__thumb"
          style={{ left: `${percentage}%` }}
          role="slider"
          tabIndex={disabled ? -1 : 0}
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

export default Slider
