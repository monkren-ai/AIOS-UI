import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn, dataAttr } from '@/lib/utils'
import './Switch.css'

const switchVariants = cva('nothing-switch', {
  variants: {
    checked: {
      true: 'nothing-switch--on',
      false: '',
    },
    disabled: {
      true: 'nothing-switch--disabled',
      false: '',
    },
  },
  defaultVariants: { checked: false, disabled: false },
})

export type SwitchProps = Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> & {
  on?: boolean
  label?: string
  disabled?: boolean
  onChange?: (on: boolean) => void
} & VariantProps<typeof switchVariants>

export const Switch = React.forwardRef<HTMLLabelElement, SwitchProps>(
  (
    { className, on: controlledOn, label, disabled, onChange, checked, ...props },
    ref
  ) => {
    const [internalOn, setInternalOn] = React.useState(false)
    const isOn = controlledOn !== undefined ? controlledOn : (checked ?? internalOn)
    const isDisabled = !!disabled

    const handleCheckedChange = (newValue: boolean) => {
      if (controlledOn === undefined) {
        setInternalOn(newValue)
      }
      onChange?.(newValue)
    }

    return (
      <label
        ref={ref}
        className={cn(switchVariants({ checked: isOn, disabled: isDisabled }), className)}
        data-slot="switch"
        data-state={dataAttr(isOn ? 'on' : 'off')}
        data-disabled={dataAttr(isDisabled)}
        {...props}
      >
        <BaseSwitch.Root
          className="nothing-switch__track"
          checked={isOn}
          onCheckedChange={handleCheckedChange}
          disabled={isDisabled}
        >
          <BaseSwitch.Thumb className="nothing-switch__thumb" />
        </BaseSwitch.Root>
        {label && <span className="nothing-switch__label">{label}</span>}
      </label>
    )
  }
)
Switch.displayName = 'Switch'

export { switchVariants }
export default Switch
