import { useState, useCallback, useRef } from 'react'
import '../styles/checkbox.css'

interface CheckboxProps {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  label?: string
  id?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  id
}) => {
  const [internalChecked, setInternalChecked] = useState<boolean | 'indeterminate'>(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(() => {
    if (disabled) return
    let nextChecked: boolean | 'indeterminate'
    if (isChecked === 'indeterminate') {
      nextChecked = true
    } else {
      nextChecked = !isChecked
    }
    if (!isControlled) {
      setInternalChecked(nextChecked)
    }
    onCheckedChange?.(nextChecked)
  }, [disabled, isChecked, isControlled, onCheckedChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault()
      handleChange()
    }
  }, [handleChange])

  const wrapperClassNames = [
    'nothing-checkbox',
    isChecked === true ? 'nothing-checkbox--checked' : '',
    isChecked === 'indeterminate' ? 'nothing-checkbox--indeterminate' : '',
    disabled ? 'nothing-checkbox--disabled' : ''
  ].filter(Boolean).join(' ')

  const ariaChecked = isChecked === 'indeterminate' ? 'mixed' : isChecked ? 'true' : 'false'

  const inputId = id ?? undefined

  return (
    <label className={wrapperClassNames}>
      <input
        ref={inputRef}
        className="nothing-checkbox__input"
        type="checkbox"
        checked={isChecked === 'indeterminate' ? false : isChecked}
        aria-checked={ariaChecked}
        disabled={disabled}
        id={inputId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
      <div className="nothing-checkbox__box">
        <svg className="nothing-checkbox__check" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="nothing-checkbox__dash" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {label && (
        <span className="nothing-checkbox__label">{label}</span>
      )}
    </label>
  )
}

export default Checkbox
