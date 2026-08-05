import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  resolveToggleVariant,
  toggleGroupVariants,
  toggleVariants,
  type ToggleSize,
  type ToggleVariant,
} from './toggle-variants'

type ResolvedToggleVariant = 'soft' | 'outline' | 'ghost'

interface ToggleGroupContextValue {
  value: string[]
  onToggle: (value: string) => void
  variant: ResolvedToggleVariant
  size: ToggleSize
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

export interface ToggleProps extends Omit<
  React.ComponentPropsWithRef<'button'>,
  'value' | 'onChange'
> {
  /** 视觉样式。`default` 是 v1 别名。 */
  variant?: ToggleVariant
  /** 高度阶梯：36 / 44 / 52px。 */
  size?: ToggleSize
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  value?: string
}

export function Toggle({
  className,
  pressed: controlledPressed,
  defaultPressed,
  onPressedChange,
  disabled = false,
  variant,
  size,
  value,
  children,
  onClick,
  ref,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed ?? false)
  const group = React.useContext(ToggleGroupContext)

  const isPressed = group
    ? group.value.includes(value ?? '')
    : controlledPressed !== undefined
      ? controlledPressed
      : internalPressed

  const activeVariant =
    group?.variant ?? ((resolveToggleVariant(variant) ?? 'soft') as ResolvedToggleVariant)
  const activeSize = group?.size ?? size ?? 'md'

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (group && value !== undefined) {
      group.onToggle(value)
    } else {
      const nextPressed = !isPressed
      if (controlledPressed === undefined) {
        setInternalPressed(nextPressed)
      }
      onPressedChange?.(nextPressed)
    }
    onClick?.(event)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(toggleVariants({ variant: activeVariant, size: activeSize }), className)}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={isPressed}
      data-slot="toggle"
      data-variant={dataAttr(activeVariant)}
      data-size={dataAttr(activeSize)}
      data-pressed={dataAttr(isPressed)}
      data-state={dataAttr(isPressed ? 'pressed' : 'unpressed')}
      data-disabled={dataAttr(disabled)}
      {...props}
    >
      {children}
    </button>
  )
}

Toggle.displayName = 'Toggle'

export interface ToggleGroupProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'defaultValue'
> {
  /** 视觉样式，会覆盖子项自己的 variant。`default` 是 v1 别名。 */
  variant?: ToggleVariant
  /** 高度阶梯，会覆盖子项自己的 size。 */
  size?: ToggleSize
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export function ToggleGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant,
  size = 'md',
  children,
  ref,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? [])
  const activeValue = controlledValue !== undefined ? controlledValue : internalValue
  const resolvedVariant = (resolveToggleVariant(variant) ?? 'soft') as ResolvedToggleVariant

  const handleToggle = React.useCallback(
    (itemValue: string) => {
      const nextValue = activeValue.includes(itemValue)
        ? activeValue.filter((entry) => entry !== itemValue)
        : [...activeValue, itemValue]
      if (controlledValue === undefined) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [activeValue, controlledValue, onValueChange],
  )

  const context = React.useMemo<ToggleGroupContextValue>(
    () => ({ value: activeValue, onToggle: handleToggle, variant: resolvedVariant, size }),
    [activeValue, handleToggle, resolvedVariant, size],
  )

  return (
    <ToggleGroupContext.Provider value={context}>
      <div
        ref={ref}
        className={cn(toggleGroupVariants({ variant: resolvedVariant }), className)}
        role="group"
        data-slot="toggle-group"
        data-variant={dataAttr(resolvedVariant)}
        data-size={dataAttr(size)}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

ToggleGroup.displayName = 'ToggleGroup'

export { toggleVariants, toggleGroupVariants }
export default Toggle
