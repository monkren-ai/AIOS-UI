import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn, dataAttr } from '@/lib/utils'
import './Slider.css'

const sliderVariants = cva('nothing-slider', {
  variants: {
    size: {
      sm: 'nothing-slider--sm',
      md: 'nothing-slider--md',
      lg: 'nothing-slider--lg',
    },
    variant: {
      default: 'nothing-slider--default',
      minimal: 'nothing-slider--minimal',
    },
    disabled: {
      true: 'nothing-slider--disabled',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    disabled: false,
  },
})

export type SliderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
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
} & VariantProps<typeof sliderVariants>

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
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
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = React.useCallback(
      (value: number) => {
        onValueChange?.(value)
      },
      [onValueChange],
    )

    const hasHeader = Boolean(label || showValue)

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(sliderVariants({ size, variant, disabled: !!disabled }), className)}
        data-slot="slider"
        data-size={dataAttr(size)}
        data-variant={dataAttr(variant)}
        value={controlledValue}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        data-disabled={dataAttr(disabled)}
        onValueChange={handleValueChange}
        {...props}
      >
        {hasHeader && (
          <div className="nothing-slider__header">
            {label && (
              <SliderPrimitive.Label className="nothing-slider__label">
                {label}
              </SliderPrimitive.Label>
            )}
            {showValue && (
              <SliderPrimitive.Value className="nothing-slider__value" />
            )}
          </div>
        )}
        <SliderPrimitive.Control className="nothing-slider__control" data-slot="slider-control">
          <SliderPrimitive.Track className="nothing-slider__track" data-slot="slider-track">
            <SliderPrimitive.Indicator className="nothing-slider__fill" data-slot="slider-fill" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="nothing-slider__thumb" data-slot="slider-thumb" />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    )
  },
)
Slider.displayName = 'Slider'

export { sliderVariants }
export default Slider
