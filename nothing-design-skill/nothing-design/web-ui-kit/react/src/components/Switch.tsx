import { useState } from 'react'
import '../styles/switch.css'

interface SwitchProps {
  on?: boolean
  label?: string
  disabled?: boolean
  onChange?: (on: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({
  on: controlledOn,
  label,
  disabled = false,
  onChange
}) => {
  const [internalOn, setInternalOn] = useState(false)
  const isOn = controlledOn !== undefined ? controlledOn : internalOn

  const handleToggle = () => {
    if (disabled) return
    const newValue = !isOn
    if (controlledOn === undefined) {
      setInternalOn(newValue)
    }
    onChange?.(newValue)
  }

  const classNames = [
    'nothing-switch',
    isOn ? 'nothing-switch--on' : '',
    disabled ? 'nothing-switch--disabled' : ''
  ].filter(Boolean).join(' ')

  return (
    <label className={classNames}>
      <input
        className="nothing-switch__input"
        type="checkbox"
        checked={isOn}
        disabled={disabled}
        onChange={handleToggle}
        tabIndex={0}
      />
      <div className="nothing-switch__track">
        <div className="nothing-switch__thumb" />
      </div>
      {label && (
        <span className="nothing-switch__label">{label}</span>
      )}
    </label>
  )
}

export default Switch
