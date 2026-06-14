import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/radio-group.css'

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
    const itemRefs = React.useRef<(HTMLLabelElement | null)[]>([])
    const isDisabled = !!disabled

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        if (isDisabled) return
        if (controlledValue === undefined) {
          setInternalValue(optionValue)
        }
        onValueChange?.(optionValue)
      },
      [isDisabled, controlledValue, onValueChange]
    )

    const findNextEnabled = React.useCallback(
      (currentIndex: number, direction: number): number => {
        let idx = currentIndex + direction
        while (idx >= 0 && idx < options.length) {
          if (!options[idx].disabled && !isDisabled) return idx
          idx += direction
        }
        if (direction > 0) {
          for (let i = 0; i < currentIndex; i++) {
            if (!options[i].disabled && !isDisabled) return i
          }
        } else {
          for (let i = options.length - 1; i > currentIndex; i--) {
            if (!options[i].disabled && !isDisabled) return i
          }
        }
        return currentIndex
      },
      [options, isDisabled]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent, index: number) => {
        const enabledItems = options.filter((o) => !o.disabled && !isDisabled)
        if (enabledItems.length === 0) return
        const isHorizontal = orientation === 'horizontal'
        let nextIndex = -1
        switch (e.key) {
          case 'ArrowDown':
            if (!isHorizontal) {
              e.preventDefault()
              nextIndex = findNextEnabled(index, 1)
            }
            break
          case 'ArrowUp':
            if (!isHorizontal) {
              e.preventDefault()
              nextIndex = findNextEnabled(index, -1)
            }
            break
          case 'ArrowRight':
            if (isHorizontal) {
              e.preventDefault()
              nextIndex = findNextEnabled(index, 1)
            }
            break
          case 'ArrowLeft':
            if (isHorizontal) {
              e.preventDefault()
              nextIndex = findNextEnabled(index, -1)
            }
            break
          case 'Home':
            e.preventDefault()
            nextIndex = options.findIndex((o) => !o.disabled && !isDisabled)
            break
          case 'End':
            e.preventDefault()
            for (let i = options.length - 1; i >= 0; i--) {
              if (!options[i].disabled && !isDisabled) {
                nextIndex = i
                break
              }
            }
            break
          default:
            return
        }
        if (nextIndex >= 0 && nextIndex < options.length) {
          itemRefs.current[nextIndex]?.focus()
          handleSelect(options[nextIndex].value)
        }
      },
      [options, orientation, isDisabled, handleSelect, findNextEnabled]
    )

    const getTabIndex = (index: number): number => {
      const isChecked = options[index].value === selectedValue
      const isItemDisabled = options[index].disabled || isDisabled
      if (isItemDisabled) return -1
      if (isChecked) return 0
      const hasChecked = options.some(
        (o) => o.value === selectedValue && !o.disabled
      )
      if (!hasChecked) {
        const firstEnabled = options.findIndex((o) => !o.disabled && !isDisabled)
        return firstEnabled === index ? 0 : -1
      }
      return -1
    }

    return (
      <div
        ref={ref}
        className={cn(radioGroupVariants({ orientation, disabled: isDisabled }), className)}
        role="radiogroup"
        aria-orientation={orientation}
        data-disabled={dataAttr(isDisabled)}
        {...props}
      >
        {options.map((option, index) => {
          const isChecked = option.value === selectedValue
          const isItemDisabled = option.disabled || isDisabled
          return (
            <label
              key={option.value}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={cn(
                'nothing-radio-group__item',
                isChecked && 'nothing-radio-group__item--checked',
                isItemDisabled && 'nothing-radio-group__item--disabled'
              )}
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
)
RadioGroup.displayName = 'RadioGroup'

export { radioGroupVariants }
export default RadioGroup
