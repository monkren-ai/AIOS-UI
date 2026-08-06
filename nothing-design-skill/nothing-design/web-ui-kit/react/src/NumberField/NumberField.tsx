import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field'
import {
  numberFieldErrorVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldLabelVariants,
  numberFieldStepperVariants,
  numberFieldVariants,
  type NumberFieldSize,
} from './number-field-variants'

export interface NumberFieldProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'value' | 'defaultValue'> {
  /** 受控数值。 */
  value?: number | null
  /** 非受控初始值。 */
  defaultValue?: number
  /** 数值变化回调，直接给新值（可能为 `null`，表示清空）。 */
  onValueChange?: (value: number | null) => void
  /** 最小值。 */
  min?: number
  /** 最大值。 */
  max?: number
  /** 步长。 */
  step?: number | 'any'
  /** 字段标签。 */
  label?: string
  /** 错误文案，同时把边框转红。 */
  error?: string
  /** 占位文字。 */
  placeholder?: string
  /** 是否禁用。 */
  disabled?: boolean
  /** 高度阶梯：36 / 44 / 52px。 */
  size?: NumberFieldSize
}

export function NumberField({
  className,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step,
  label,
  error,
  placeholder,
  disabled = false,
  size = 'md',
  ref,
  ...props
}: NumberFieldProps) {
  const resolvedSize = size
  const hasError = Boolean(error)

  // Base UI 的 onValueChange 会带一个 eventDetails 第二参，这里只对外暴露数值本身。
  const handleValueChange = React.useCallback(
    (nextValue: number | null) => {
      onValueChange?.(nextValue)
    },
    [onValueChange],
  )

  return (
    <NumberFieldPrimitive.Root
      ref={ref}
      className={cn(numberFieldVariants({ size: resolvedSize, disabled, hasError }), className)}
      data-slot="number-field"
      data-size={dataAttr(resolvedSize)}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      {...props}
    >
      {label && (
        <label className={numberFieldLabelVariants({ size: resolvedSize, hasError, disabled })} data-slot="number-field-label">
          {label}
        </label>
      )}
      <NumberFieldPrimitive.Group
        className={numberFieldGroupVariants({ size: resolvedSize, hasError, disabled })}
        data-slot="number-field-group"
        data-size={dataAttr(resolvedSize)}
        data-invalid={dataAttr(hasError)}
      >
        <NumberFieldPrimitive.Decrement
          className={numberFieldStepperVariants({ size: resolvedSize })}
          data-slot="number-field-decrement"
          aria-label="Decrement"
        >
          −
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input
          className={numberFieldInputVariants({ size: resolvedSize })}
          data-slot="number-field-input"
          placeholder={placeholder}
          aria-roledescription="Number field"
        />
        <NumberFieldPrimitive.Increment
          className={numberFieldStepperVariants({ size: resolvedSize })}
          data-slot="number-field-increment"
          aria-label="Increment"
        >
          +
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
      {error && (
        <div className={numberFieldErrorVariants()} data-slot="number-field-error" role="alert">
          {error}
        </div>
      )}
    </NumberFieldPrimitive.Root>
  )
}

NumberField.displayName = 'NumberField'

export {
  numberFieldVariants,
  numberFieldGroupVariants,
  numberFieldStepperVariants,
  numberFieldInputVariants,
  numberFieldLabelVariants,
  numberFieldErrorVariants,
}
export default NumberField
