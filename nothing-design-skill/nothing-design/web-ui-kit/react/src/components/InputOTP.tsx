import { useState, useRef, useCallback } from 'react'
import '../styles/input-otp.css'

interface InputOTPProps {
  length?: number
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
}

const InputOTP: React.FC<InputOTPProps> = ({
  length = 6,
  value: controlledValue,
  onValueChange,
  disabled = false,
  error = false
}) => {
  const [internalValue, setInternalValue] = useState('')
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const [activeSlot, setActiveSlot] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const chars = value.split('').concat(Array(Math.max(0, length - value.length)).fill(''))

  const updateValue = useCallback((newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }, [controlledValue, onValueChange])

  const handleInput = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputChar = e.target.value.slice(-1)
    if (!/^\d$/.test(inputChar)) return

    const newValue = value.split('')
    newValue[index] = inputChar
    const joined = newValue.join('').slice(0, length)
    updateValue(joined)

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }, [value, length, updateValue])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (value[index]) {
        const newValue = value.split('')
        newValue[index] = ''
        updateValue(newValue.join(''))
      } else if (index > 0) {
        const newValue = value.split('')
        newValue[index - 1] = ''
        updateValue(newValue.join(''))
        inputRefs.current[index - 1]?.focus()
      }
      return
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
      return
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
      return
    }
  }, [value, length, updateValue])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    updateValue(pasted)
    const focusIndex = Math.min(pasted.length, length - 1)
    inputRefs.current[focusIndex]?.focus()
  }, [length, updateValue])

  const handleFocus = useCallback((index: number) => {
    setActiveSlot(index)
  }, [])

  const handleBlur = useCallback(() => {
    setActiveSlot(null)
  }, [])

  const containerClassNames = [
    'nothing-input-otp',
    disabled ? 'nothing-input-otp--disabled' : '',
    error ? 'nothing-input-otp--error' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClassNames} aria-label="OTP input">
      {Array.from({ length }, (_, index) => {
        const slotClassNames = [
          'nothing-input-otp__slot',
          activeSlot === index ? 'nothing-input-otp__slot--active' : '',
          chars[index] ? 'nothing-input-otp__slot--filled' : '',
          error ? 'nothing-input-otp__slot--error' : ''
        ].filter(Boolean).join(' ')

        return (
          <div key={index} className={slotClassNames}>
            <input
              ref={el => { inputRefs.current[index] = el }}
              className="nothing-input-otp__input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={chars[index] || ''}
              disabled={disabled}
              onChange={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
          </div>
        )
      })}
    </div>
  )
}

export default InputOTP
