import * as React from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { cn, dataAttr } from '@/lib/utils'
import {
  checkboxBoxVariants,
  checkboxCheckVariants,
  checkboxDashVariants,
  checkboxIndicatorVariants,
  checkboxLabelVariants,
  checkboxVariants,
  type CheckboxSize,
} from './checkbox-variants'

export type CheckboxProps = Omit<React.ComponentPropsWithRef<'label'>, 'onChange'> & {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  label?: string
  /** 盒子与行高阶梯。 */
  size?: CheckboxSize
  id?: string
}

export function Checkbox({
  className,
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  size = 'md',
  id,
  ref,
  ...props
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(
    defaultChecked,
  )
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked
  const isDisabled = !!disabled
  const isIndeterminate = isChecked === 'indeterminate'

  const handleCheckedChange = React.useCallback(
    (nextChecked: boolean) => {
      if (!isControlled) {
        setInternalChecked(nextChecked)
      }
      onCheckedChange?.(nextChecked)
    },
    [isControlled, onCheckedChange],
  )

  const state = isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'

  return (
    <label
      ref={ref}
      className={cn(
        checkboxVariants({
          size,
          isChecked: !!isChecked,
          indeterminate: isIndeterminate,
          disabled: isDisabled,
        }),
        className,
      )}
      data-slot="checkbox"
      data-size={dataAttr(size)}
      data-state={dataAttr(state)}
      data-disabled={dataAttr(isDisabled)}
      {...props}
    >
      <BaseCheckbox.Root
        className={checkboxBoxVariants({ size })}
        data-slot="checkbox-box"
        checked={isIndeterminate ? false : !!isChecked}
        indeterminate={isIndeterminate}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        id={id}
      >
        <BaseCheckbox.Indicator
          className={checkboxIndicatorVariants()}
          data-slot="checkbox-indicator"
          keepMounted
        >
          <svg
            className={checkboxCheckVariants({ size })}
            data-slot="checkbox-check"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 7L6 10L11 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            className={checkboxDashVariants({ size })}
            data-slot="checkbox-dash"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 7H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label && (
        <span className={checkboxLabelVariants({ size })} data-slot="checkbox-label">
          {label}
        </span>
      )}
    </label>
  )
}

Checkbox.displayName = 'Checkbox'

export { checkboxVariants }
export default Checkbox
