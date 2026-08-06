import * as React from 'react'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn, dataAttr } from '@/lib/utils'
import {
  resolveSliderVariant,
  sliderControlVariants,
  sliderFillVariants,
  sliderHeaderVariants,
  sliderLabelVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  sliderValueVariants,
  sliderVariants,
  type SliderSize,
  type SliderVariant,
} from './slider-variants'

export type SliderProps = Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'defaultValue' | 'value'
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  label?: string
  showValue?: boolean
  /** 轨道粗细与触达高度阶梯。 */
  size?: SliderSize
  /** 视觉样式。`default` / `minimal` 是 v1 别名。 */
  variant?: SliderVariant
}

export function Slider({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  label,
  showValue = false,
  size = 'md',
  variant,
  ref,
  ...props
}: SliderProps) {
  const handleValueChange = React.useCallback(
    (value: number) => {
      onValueChange?.(value)
    },
    [onValueChange],
  )

  const resolvedVariant = (resolveSliderVariant(variant) ?? 'primary') as 'primary' | 'soft'
  const hasHeader = Boolean(label || showValue)

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        sliderVariants({ size, variant: resolvedVariant, disabled: !!disabled }),
        className,
      )}
      data-slot="slider"
      data-size={dataAttr(size)}
      data-variant={dataAttr(resolvedVariant)}
      data-disabled={dataAttr(disabled)}
      value={controlledValue}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={handleValueChange}
      {...props}
    >
      {hasHeader && (
        <div className={sliderHeaderVariants()} data-slot="slider-header">
          {label && (
            <SliderPrimitive.Label className={sliderLabelVariants()} data-slot="slider-label">
              {label}
            </SliderPrimitive.Label>
          )}
          {showValue && (
            <SliderPrimitive.Value className={sliderValueVariants()} data-slot="slider-value" />
          )}
        </div>
      )}
      <SliderPrimitive.Control
        className={sliderControlVariants({ size })}
        data-slot="slider-control"
      >
        <SliderPrimitive.Track className={sliderTrackVariants({ size })} data-slot="slider-track">
          <SliderPrimitive.Indicator className={sliderFillVariants()} data-slot="slider-fill" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={sliderThumbVariants({ size })} data-slot="slider-thumb" />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

Slider.displayName = 'Slider'

export { sliderVariants }
export default Slider
