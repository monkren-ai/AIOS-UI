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

export interface InputMessageProps {
  children: React.ReactNode
  variant?: 'default' | 'error'
}

const InputMessage: React.FC<InputMessageProps> = ({ children, variant = 'default' }) => (
  <div
    className={cn('nothing-input__message', variant === 'error' && 'nothing-input__message--error')}
    data-variant={variant}
  >
    {children}
  </div>
)

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'disabled'
> &
  VariantProps<typeof inputVariants> & {
    label?: string
    error?: string
    message?: string
    value?: string
    disabled?: boolean
    onChange?: (value: string) => void
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    clearable?: boolean
  }

export interface InputComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  Message: React.FC<InputMessageProps>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      label,
      placeholder,
      value: controlledValue,
      error,
      message,
      disabled = false,
      id,
      onChange,
      className,
      style,
      type = 'text',
      autoComplete,
      inputMode,
      name,
      leadingIcon,
      trailingIcon,
      clearable,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState('')
    const generatedId = React.useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const value = controlledValue !== undefined ? controlledValue : internalValue
    const hasError = Boolean(error)
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleClear = React.useCallback(() => {
      if (controlledValue === undefined) {
        setInternalValue('')
      }
      onChange?.('')
      inputRef.current?.focus()
    }, [controlledValue, onChange])

    const showClear = clearable && value && !disabled

    return (
      <div
        className={cn(inputVariants({ variant, hasError, disabled }), className)}
        style={style}
        data-slot="input"
        data-variant={dataAttr(variant)}
        data-state={hasError ? 'error' : disabled ? 'disabled' : 'default'}
      >
        {label && (
          <label className="nothing-input__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className="nothing-input__control">
          {leadingIcon && (
            <span className="nothing-input__icon nothing-input__icon--leading" aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <input
            ref={inputRef}
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
          {showClear && (
            <button
              type="button"
              className="nothing-input__clear"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
          {!showClear && trailingIcon && (
            <span className="nothing-input__icon nothing-input__icon--trailing" aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </div>
        {hasError && (
          <div id={errorId} className="nothing-input__error" role="alert">
            {error}
          </div>
        )}
        {!hasError && message && <InputMessage>{message}</InputMessage>}
      </div>
    )
  },
) as InputComponent
Input.displayName = 'Input'
Input.Message = InputMessage

export { inputVariants }
export default Input
