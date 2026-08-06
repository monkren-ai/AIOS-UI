import * as React from 'react'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { cn, dataAttr } from '@/lib/utils'
import {
  radioGroupCircleVariants,
  radioGroupDotVariants,
  radioGroupItemVariants,
  radioGroupLabelVariants,
  radioGroupVariants,
  type RadioGroupSize,
} from './radio-group-variants'

export type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupProps = React.ComponentPropsWithRef<'div'> & {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  /** 圆环与行高阶梯。 */
  size?: RadioGroupSize
}

export function RadioGroup({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  orientation = 'vertical',
  size = 'md',
  name,
  ref,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
  const isDisabled = !!disabled

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [controlledValue, onValueChange],
  )

  return (
    <BaseRadioGroup
      ref={ref}
      className={cn(radioGroupVariants({ orientation, size, disabled: isDisabled }), className)}
      role="radiogroup"
      aria-orientation={orientation}
      data-slot="radio-group"
      data-orientation={dataAttr(orientation)}
      data-size={dataAttr(size)}
      data-disabled={dataAttr(isDisabled)}
      value={selectedValue}
      defaultValue={controlledValue !== undefined ? undefined : defaultValue}
      onValueChange={handleValueChange}
      disabled={isDisabled}
      name={name}
      {...props}
    >
      {options.map((option) => {
        const isItemDisabled = Boolean(option.disabled || isDisabled)
        const isChecked = option.value === selectedValue
        return (
          <label
            key={option.value}
            className={radioGroupItemVariants({
              size,
              checked: isChecked,
              disabled: isItemDisabled,
            })}
            data-slot="radio-group-item"
            data-state={dataAttr(isChecked ? 'checked' : 'unchecked')}
            data-disabled={dataAttr(isItemDisabled)}
          >
            <BaseRadio.Root
              className={radioGroupCircleVariants({ size })}
              data-slot="radio-group-circle"
              value={option.value}
              disabled={isItemDisabled}
            >
              <BaseRadio.Indicator
                className={radioGroupDotVariants({ size })}
                data-slot="radio-group-dot"
                keepMounted
              />
            </BaseRadio.Root>
            <span className={radioGroupLabelVariants({ size })} data-slot="radio-group-label">
              {option.label}
            </span>
          </label>
        )
      })}
    </BaseRadioGroup>
  )
}

RadioGroup.displayName = 'RadioGroup'

export { radioGroupVariants }
export default RadioGroup
