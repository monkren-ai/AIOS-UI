import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import './Toggle.css'

const toggleVariants = cva('nothing-toggle', {
  variants: {
    variant: {
      default: 'nothing-toggle--default',
      outline: 'nothing-toggle--outline',
    },
    size: {
      sm: 'nothing-toggle--sm',
      md: 'nothing-toggle--md',
      lg: 'nothing-toggle--lg',
    },
    pressed: {
      true: 'nothing-toggle--pressed',
      false: '',
    },
    disabled: {
      true: 'nothing-toggle--disabled',
      false: '',
    },
  },
  defaultVariants: { variant: 'default', size: 'md', pressed: false, disabled: false },
})

const toggleGroupVariants = cva('nothing-toggle-group', {
  variants: {
    variant: {
      default: 'nothing-toggle-group--default',
      outline: 'nothing-toggle-group--outline',
    },
  },
  defaultVariants: { variant: 'default' },
})

interface ToggleGroupContextValue {
  value: string[]
  onToggle: (value: string) => void
  variant: 'default' | 'outline'
  size: 'sm' | 'md' | 'lg'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'onClick' | 'disabled'>,
    Omit<VariantProps<typeof toggleVariants>, 'pressed' | 'disabled'> {
  pressed?: boolean
  defaultPressed?: boolean
  disabled?: boolean
  onPressedChange?: (pressed: boolean) => void
  value?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      pressed: controlledPressed,
      defaultPressed,
      onPressedChange,
      disabled = false,
      variant = 'default',
      size = 'md',
      value,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalPressed, setInternalPressed] = React.useState(defaultPressed ?? false)
    const group = React.useContext(ToggleGroupContext)

    const isPressed = group
      ? group.value.includes(value ?? '')
      : (controlledPressed !== undefined ? controlledPressed : internalPressed)

    const activeVariant = group?.variant ?? variant
    const activeSize = group?.size ?? size

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (group && value !== undefined) {
        group.onToggle(value)
      } else {
        const newValue = !isPressed
        if (controlledPressed === undefined) {
          setInternalPressed(newValue)
        }
        onPressedChange?.(newValue)
      }
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleClick(e as unknown as React.MouseEvent<HTMLButtonElement>)
      }
    }

    return (
      <button
        ref={ref}
        className={cn(toggleVariants({ variant: activeVariant, size: activeSize, pressed: isPressed, disabled }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        role="button"
        aria-pressed={isPressed}
        type="button"
        data-state={dataAttr(isPressed ? 'pressed' : 'unpressed')}
        data-disabled={dataAttr(disabled)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Toggle.displayName = 'Toggle'

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value' | 'defaultValue'>,
    VariantProps<typeof toggleGroupVariants> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  size?: 'sm' | 'md' | 'lg'
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = 'default',
      size = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? [])

    const activeValue = controlledValue !== undefined ? controlledValue : internalValue

    const handleToggle = React.useCallback(
      (itemValue: string) => {
        const newValue = activeValue.includes(itemValue)
          ? activeValue.filter((v) => v !== itemValue)
          : [...activeValue, itemValue]
        if (controlledValue === undefined) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [activeValue, controlledValue, onValueChange]
    )

    return (
      <ToggleGroupContext.Provider
        value={{ value: activeValue, onToggle: handleToggle, variant: variant ?? 'default', size: size ?? 'md' }}
      >
        <div
          ref={ref}
          className={cn(toggleGroupVariants({ variant }), className)}
          role="group"
          data-variant={dataAttr(variant)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)
ToggleGroup.displayName = 'ToggleGroup'

export { toggleVariants, toggleGroupVariants }
export default Toggle
