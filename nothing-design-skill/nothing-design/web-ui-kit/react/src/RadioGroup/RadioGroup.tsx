import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'
import { Radio as BaseRadio } from '@base-ui/react/radio'
import { cn, dataAttr } from '@/lib/utils'
import './RadioGroup.css'

const radioGroupVariants = cva('nothing-radio-group', {
  variants: {
    orientation: {
      horizontal: 'nothing-radio-group--horizontal',
      vertical: 'nothing-radio-group--vertical',
    },
    disabled: {
      true: 'nothing-radio-group--disabled',
      false: '',
    },
  },
  defaultVariants: { orientation: 'vertical', disabled: false },
})

export type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
} & VariantProps<typeof radioGroupVariants>

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      orientation = 'vertical',
      name,
      ...props
    },
    ref
  ) => {
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
      [controlledValue, onValueChange]
    )

    return (
      <BaseRadioGroup
        ref={ref}
        className={cn(radioGroupVariants({ orientation, disabled: isDisabled }), className)}
        role="radiogroup"
        aria-orientation={orientation}
        data-slot="radio-group"
        data-disabled={dataAttr(isDisabled)}
        value={selectedValue}
        defaultValue={controlledValue !== undefined ? undefined : defaultValue}
        onValueChange={handleValueChange}
        disabled={isDisabled}
        name={name}
        {...props}
      >
        {options.map((option) => {
          const isItemDisabled = option.disabled || isDisabled
          const isChecked = option.value === selectedValue
          return (
            <label
              key={option.value}
              className={cn(
                'nothing-radio-group__item',
                isChecked && 'nothing-radio-group__item--checked',
                isItemDisabled && 'nothing-radio-group__item--disabled'
              )}
            >
              <BaseRadio.Root
                className="nothing-radio-group__circle"
                value={option.value}
                disabled={isItemDisabled}
              >
                <BaseRadio.Indicator className="nothing-radio-group__dot" keepMounted />
              </BaseRadio.Root>
              <span className="nothing-radio-group__label">{option.label}</span>
            </label>
          )
        })}
      </BaseRadioGroup>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

export { radioGroupVariants }
export default RadioGroup
