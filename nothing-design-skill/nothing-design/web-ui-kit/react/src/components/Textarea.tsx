import { useState, useRef, useEffect, useId, useCallback } from 'react'
import '../styles/textarea.css'

interface TextareaProps {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  autoResize?: boolean
  minRows?: number
  maxRows?: number
  id?: string
}

const Textarea: React.FC<TextareaProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  autoResize = false,
  minRows = 3,
  maxRows,
  id
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const generatedId = useId()
  const inputId = id || generatedId
  const errorId = `${inputId}-error`

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea || !autoResize) return

    textarea.style.height = 'auto'

    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20
    const padding = parseFloat(getComputedStyle(textarea).paddingTop) + parseFloat(getComputedStyle(textarea).paddingBottom) || 0
    const minHeight = lineHeight * minRows + padding
    const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
    textarea.style.height = `${newHeight}px`
    textarea.style.overflow = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }, [autoResize, minRows, maxRows])

  useEffect(() => {
    resizeTextarea()
  }, [value, resizeTextarea])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(e)
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

  const classNames = [
    'nothing-textarea',
    error ? 'nothing-textarea--error' : '',
    disabled ? 'nothing-textarea--disabled' : '',
    focused ? 'nothing-textarea--focused' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      {label && (
        <label className="nothing-textarea__label" htmlFor={inputId}>{label}</label>
      )}
      <textarea
        ref={textareaRef}
        className="nothing-textarea__input"
        id={inputId}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={minRows}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <div className="nothing-textarea__error" id={errorId}>{error}</div>
      )}
    </div>
  )
}

export default Textarea
