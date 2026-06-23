import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Checkbox.css'

const checkboxVariants = cva('nothing-checkbox', {
  variants: {
    isChecked: {
      true: 'nothing-checkbox--checked',
      false: '',
    },
    indeterminate: {
      true: 'nothing-checkbox--indeterminate',
      false: '',
    },
    disabled: {
      true: 'nothing-checkbox--disabled',
      false: '',
    },
  },
  defaultVariants: { isChecked: false, indeterminate: false, disabled: false },
})

export type CheckboxProps = Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'> & {
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  disabled?: boolean
  label?: string
  id?: string
}

export const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState<
      boolean | 'indeterminate'
    >(defaultChecked)
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : internalChecked
    const isDisabled = !!disabled
    const isIndeterminate = isChecked === 'indeterminate'
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = React.useCallback(() => {
      if (isDisabled) return
      const nextChecked: boolean | 'indeterminate' =
        isChecked === 'indeterminate' ? true : !isChecked
      if (!isControlled) {
        setInternalChecked(nextChecked)
      }
      onCheckedChange?.(nextChecked)
    }, [isDisabled, isChecked, isControlled, onCheckedChange])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault()
          handleChange()
        }
      },
      [handleChange]
    )

    const ariaChecked = isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false'
    const inputId = id ?? undefined

    return (
      <label
        ref={ref}
        className={cn(
          checkboxVariants({
            isChecked: !!isChecked,
            indeterminate: isIndeterminate,
            disabled: isDisabled,
          }),
          className
        )}
        data-state={dataAttr(
          isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'
        )}
        data-disabled={dataAttr(isDisabled)}
        {...props}
      >
        <input
          ref={inputRef}
          className="nothing-checkbox__input"
          type="checkbox"
          checked={isIndeterminate ? false : !!isChecked}
          aria-checked={ariaChecked}
          disabled={isDisabled}
          id={inputId}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        />
        <div className="nothing-checkbox__box">
          <svg
            className="nothing-checkbox__check"
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
            className="nothing-checkbox__dash"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 7H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {label && <span className="nothing-checkbox__label">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { checkboxVariants }
export default Checkbox
