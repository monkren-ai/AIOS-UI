import { useState, useId } from 'react'
import '../styles/inputs.css'

interface InputProps {
  variant?: 'underline' | 'bordered'
  label?: string
  placeholder?: string
  value?: string
  error?: string
  disabled?: boolean
  id?: string
  onChange?: (value: string) => void
  style?: React.CSSProperties
}

const Input: React.FC<InputProps> = ({
  variant = 'underline',
  label,
  placeholder,
  value: controlledValue,
  error,
  disabled = false,
  id,
  onChange,
  style
}) => {
  const [internalValue, setInternalValue] = useState('')
  const generatedId = useId()
  const inputId = id || generatedId
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const classNames = [
    'nothing-input',
    `nothing-input--${variant}`,
    error ? 'nothing-input--error' : '',
    disabled ? 'nothing-input--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames} style={style}>
      {label && (
        <label className="nothing-input__label" htmlFor={inputId}>{label}</label>
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
      {error && (
        <div className="nothing-input__error">{error}</div>
      )}
    </div>
  )
}

export default Input
