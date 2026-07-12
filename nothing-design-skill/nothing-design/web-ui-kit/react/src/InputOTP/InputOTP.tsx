import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './InputOTP.css'

const inputOTPVariants = cva('nothing-input-otp', {
  variants: {
    disabled: {
      true: 'nothing-input-otp--disabled',
      false: '',
    },
    error: {
      true: 'nothing-input-otp--error',
      false: '',
    },
  },
  defaultVariants: { disabled: false, error: false },
})

const inputOTPSlotVariants = cva('nothing-input-otp__slot', {
  variants: {
    active: { true: 'nothing-input-otp__slot--active', false: '' },
    filled: { true: 'nothing-input-otp__slot--filled', false: '' },
    error: { true: 'nothing-input-otp__slot--error', false: '' },
  },
  defaultVariants: { active: false, filled: false, error: false },
})

export type InputOTPProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> &
  VariantProps<typeof inputOTPVariants> & {
    length?: number
    value?: string
    onValueChange?: (value: string) => void
  }

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({
    className,
    length = 6,
    value: controlledValue,
    onValueChange,
    disabled = false,
    error = false,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState('')
    const value = controlledValue !== undefined ? controlledValue : internalValue
    const [activeSlot, setActiveSlot] = React.useState<number | null>(null)
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const chars = value.split('').concat(Array(Math.max(0, length - value.length)).fill(''))

    const updateValue = React.useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }, [controlledValue, onValueChange])

    const handleInput = React.useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleKeyDown = React.useCallback((index: number, e: React.KeyboardEvent) => {
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

    const handlePaste = React.useCallback((e: React.ClipboardEvent) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      updateValue(pasted)
      const focusIndex = Math.min(pasted.length, length - 1)
      inputRefs.current[focusIndex]?.focus()
    }, [length, updateValue])

    const handleFocus = React.useCallback((index: number) => {
      setActiveSlot(index)
    }, [])

    const handleBlur = React.useCallback(() => {
      setActiveSlot(null)
    }, [])

    return (
      <div
        ref={ref}
        className={cn(inputOTPVariants({ disabled, error }), className)}
        data-state={dataAttr(error ? 'error' : disabled ? 'disabled' : 'default')}
        data-disabled={dataAttr(disabled)}
        data-error={dataAttr(error)}
        aria-label="OTP input"
        {...props}
      >
        {Array.from({ length }, (_, index) => (
          <div
            key={index}
            className={cn(inputOTPSlotVariants({
              active: activeSlot === index,
              filled: !!chars[index],
              error,
            }))}
            data-active={dataAttr(activeSlot === index)}
            data-filled={dataAttr(!!chars[index])}
          >
            <input
              ref={el => { inputRefs.current[index] = el }}
              className="nothing-input-otp__input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={chars[index] || ''}
              disabled={!!disabled}
              onChange={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              aria-label={`Digit ${index + 1} of ${length}`}
            />
          </div>
        ))}
      </div>
    )
  }
)
InputOTP.displayName = 'InputOTP'

export { inputOTPVariants, inputOTPSlotVariants }
export default InputOTP
