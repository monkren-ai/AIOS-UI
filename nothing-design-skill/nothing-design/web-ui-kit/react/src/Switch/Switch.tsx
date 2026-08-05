import * as React from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { cn, dataAttr } from '@/lib/utils'
import {
  switchLabelVariants,
  switchThumbVariants,
  switchTrackVariants,
  switchVariants,
  type SwitchSize,
} from './switch-variants'

export type SwitchProps = Omit<React.ComponentPropsWithRef<'label'>, 'onChange'> & {
  /** 受控开关状态。不传则组件自己维护。 */
  checked?: boolean
  /** 非受控时的初始状态。 */
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
  /** 轨道与行高阶梯。 */
  size?: SwitchSize
  onChange?: (checked: boolean) => void
}

export function Switch({
  className,
  label,
  disabled,
  onChange,
  checked,
  defaultChecked = false,
  size = 'md',
  ref,
  ...props
}: SwitchProps) {
  const [internalOn, setInternalOn] = React.useState(defaultChecked)
  const isOn = checked ?? internalOn
  const isDisabled = !!disabled

  const handleCheckedChange = (nextValue: boolean) => {
    if (checked === undefined) {
      setInternalOn(nextValue)
    }
    onChange?.(nextValue)
  }

  return (
    <label
      ref={ref}
      className={cn(switchVariants({ size, checked: isOn, disabled: isDisabled }), className)}
      data-slot="switch"
      data-state={dataAttr(isOn ? 'on' : 'off')}
      data-disabled={dataAttr(isDisabled)}
      data-size={dataAttr(size)}
      {...props}
    >
      <BaseSwitch.Root
        className={switchTrackVariants({ size })}
        data-slot="switch-track"
        checked={isOn}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
      >
        <BaseSwitch.Thumb className={switchThumbVariants({ size })} data-slot="switch-thumb" />
      </BaseSwitch.Root>
      {label && (
        <span className={switchLabelVariants({ size })} data-slot="switch-label">
          {label}
        </span>
      )}
    </label>
  )
}

Switch.displayName = 'Switch'

export { switchVariants }
export default Switch
