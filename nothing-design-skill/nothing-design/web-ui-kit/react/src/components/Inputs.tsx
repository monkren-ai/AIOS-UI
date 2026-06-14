import { useState, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/inputs.css'

const inputVariants = cva('nothing-input', {
  variants: {
    variant: {
      underline: 'nothing-input--underline',
      bordered: 'nothing-input--bordered',
    },
    hasError: {
      true: 'nothing-input--error',
      false: '',
    },
    disabled: {
      true: 'nothing-input--disabled',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'underline',
    hasError: false,
    disabled: false,
  },
})

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'disabled'
> &
  VariantProps<typeof inputVariants> & {
    label?: string
    error?: string
    value?: string
    disabled?: boolean
    onChange?: (value: string) => void
  }

const Input: React.FC<InputProps> = ({
  variant,
  label,
  placeholder,
  value: controlledValue,
  error,
  disabled = false,
  id,
  onChange,
  className,
  style
}) => {
  const [internalValue, setInternalValue] = useState('')
  const generatedId = useId()
  const inputId = id || generatedId
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const hasError = Boolean(error)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <div
      className={cn(inputVariants({ variant, hasError, disabled }), className)}
      style={style}
      data-variant={dataAttr(variant)}
      data-state={hasError ? 'error' : disabled ? 'disabled' : 'default'}
    >
      {label && (
        <label className="nothing-input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className="nothing-input__field"
        type="text"
        id={inputId}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      {hasError && <div className="nothing-input__error">{error}</div>}
    </div>
  )
}

export { Input, inputVariants }
export default Input
