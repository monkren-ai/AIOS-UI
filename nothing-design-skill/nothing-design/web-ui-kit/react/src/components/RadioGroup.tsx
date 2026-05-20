import { useState, useRef, useCallback } from 'react'
import '../styles/radio-group.css'

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  name,
  orientation = 'vertical'
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
  const itemRefs = useRef<(HTMLLabelElement | null)[]>([])

  const handleSelect = useCallback((optionValue: string) => {
    if (disabled) return
    if (controlledValue === undefined) {
      setInternalValue(optionValue)
    }
    onValueChange?.(optionValue)
  }, [disabled, controlledValue, onValueChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const enabledItems = options.filter(o => !o.disabled && !disabled)
    if (enabledItems.length === 0) return

    const isHorizontal = orientation === 'horizontal'
    let nextIndex = -1

    switch (e.key) {
      case 'ArrowDown':
        if (!isHorizontal) { e.preventDefault(); nextIndex = findNextEnabled(index, 1) }
        break
      case 'ArrowUp':
        if (!isHorizontal) { e.preventDefault(); nextIndex = findNextEnabled(index, -1) }
        break
      case 'ArrowRight':
        if (isHorizontal) { e.preventDefault(); nextIndex = findNextEnabled(index, 1) }
        break
      case 'ArrowLeft':
        if (isHorizontal) { e.preventDefault(); nextIndex = findNextEnabled(index, -1) }
        break
      case 'Home':
        e.preventDefault()
        nextIndex = options.findIndex(o => !o.disabled && !disabled)
        break
      case 'End':
        e.preventDefault()
        for (let i = options.length - 1; i >= 0; i--) {
          if (!options[i].disabled && !disabled) { nextIndex = i; break }
        }
        break
      default:
        return
    }

    if (nextIndex >= 0 && nextIndex < options.length) {
      itemRefs.current[nextIndex]?.focus()
      handleSelect(options[nextIndex].value)
    }
  }, [options, orientation, disabled, handleSelect])

  const findNextEnabled = (currentIndex: number, direction: number): number => {
    let idx = currentIndex + direction
    while (idx >= 0 && idx < options.length) {
      if (!options[idx].disabled && !disabled) return idx
      idx += direction
    }
    if (direction > 0) {
      for (let i = 0; i < currentIndex; i++) {
        if (!options[i].disabled && !disabled) return i
      }
    } else {
      for (let i = options.length - 1; i > currentIndex; i--) {
        if (!options[i].disabled && !disabled) return i
      }
    }
    return currentIndex
  }

  const containerClassNames = [
    'nothing-radio-group',
    `nothing-radio-group--${orientation}`,
    disabled ? 'nothing-radio-group--disabled' : ''
  ].filter(Boolean).join(' ')

  const getTabIndex = (index: number): number => {
    const isChecked = options[index].value === selectedValue
    const isItemDisabled = options[index].disabled || disabled
    if (isItemDisabled) return -1
    if (isChecked) return 0
    const hasChecked = options.some(o => o.value === selectedValue && !o.disabled)
    if (!hasChecked) {
      const firstEnabled = options.findIndex(o => !o.disabled && !disabled)
      return firstEnabled === index ? 0 : -1
    }
    return -1
  }

  return (
    <div
      className={containerClassNames}
      role="radiogroup"
      aria-orientation={orientation}
    >
      {options.map((option, index) => {
        const isChecked = option.value === selectedValue
        const isItemDisabled = option.disabled || disabled

        const itemClassNames = [
          'nothing-radio-group__item',
          isChecked ? 'nothing-radio-group__item--checked' : '',
          isItemDisabled ? 'nothing-radio-group__item--disabled' : ''
        ].filter(Boolean).join(' ')

        return (
          <label
            key={option.value}
            ref={el => { itemRefs.current[index] = el }}
            className={itemClassNames}
            tabIndex={getTabIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <input
              className="nothing-radio-group__input"
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={isItemDisabled}
              onChange={() => handleSelect(option.value)}
              tabIndex={-1}
            />
            <span className="nothing-radio-group__circle">
              <span className="nothing-radio-group__dot" />
            </span>
            <span className="nothing-radio-group__label">{option.label}</span>
          </label>
        )
      })}
    </div>
  )
}

export default RadioGroup
