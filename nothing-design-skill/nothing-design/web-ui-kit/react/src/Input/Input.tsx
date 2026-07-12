import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Input.css'

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

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      label,
      placeholder,
      value: controlledValue,
      error,
      disabled = false,
      id,
      onChange,
      className,
      style,
      type = 'text',
      autoComplete,
      inputMode,
      name,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState('')
    const generatedId = React.useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
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
          ref={ref}
          className="nothing-input__field"
          type={type}
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          {...rest}
        />
        {hasError && (
          <div id={errorId} className="nothing-input__error" role="alert">
            {error}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { inputVariants }
export default Input
