import { useState, useCallback, createContext, useContext } from 'react'
import '../styles/toggle.css'

interface ToggleProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  value?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

interface ToggleGroupContextValue {
  value: string[]
  onToggle: (value: string) => void
  variant: 'default' | 'outline'
  size: 'sm' | 'md' | 'lg'
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

const Toggle: React.FC<ToggleProps> = ({
  pressed: controlledPressed,
  defaultPressed,
  onPressedChange,
  disabled = false,
  variant = 'default',
  size = 'md',
  value,
  children,
  style
}) => {
  const [internalPressed, setInternalPressed] = useState(defaultPressed ?? false)
  const group = useContext(ToggleGroupContext)

  const isPressed = group
    ? group.value.includes(value ?? '')
    : (controlledPressed !== undefined ? controlledPressed : internalPressed)

  const activeVariant = group?.variant ?? variant
  const activeSize = group?.size ?? size

  const handleClick = () => {
    if (disabled) return
    if (group && value !== undefined) {
      group.onToggle(value)
      return
    }
    const newValue = !isPressed
    if (controlledPressed === undefined) {
      setInternalPressed(newValue)
    }
    onPressedChange?.(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  const classNames = [
    'nothing-toggle',
    `nothing-toggle--${activeVariant}`,
    `nothing-toggle--${activeSize}`,
    isPressed ? 'nothing-toggle--pressed' : '',
    disabled ? 'nothing-toggle--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="button"
      aria-pressed={isPressed}
      type="button"
      style={style}
    >
      {children}
    </button>
  )
}

interface ToggleGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  style?: React.CSSProperties
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'default',
  size = 'md',
  children,
  style
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? [])

  const activeValue = controlledValue !== undefined ? controlledValue : internalValue

  const handleToggle = useCallback((itemValue: string) => {
    const newValue = activeValue.includes(itemValue)
      ? activeValue.filter(v => v !== itemValue)
      : [...activeValue, itemValue]
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }, [activeValue, controlledValue, onValueChange])

  const groupClassNames = [
    'nothing-toggle-group',
    `nothing-toggle-group--${variant}`
  ].filter(Boolean).join(' ')

  return (
    <ToggleGroupContext.Provider value={{ value: activeValue, onToggle: handleToggle, variant, size }}>
      <div className={groupClassNames} role="group" style={style}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export { Toggle, ToggleGroup }
export default Toggle
