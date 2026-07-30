import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import Input from '@/Input'
import './ColorPicker.css'

export const colorPickerVariants = cva('nothing-color-picker', {
  variants: {
    size: {
      sm: 'nothing-color-picker--sm',
      md: 'nothing-color-picker--md',
      lg: 'nothing-color-picker--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'value' | 'defaultValue'>,
    VariantProps<typeof colorPickerVariants> {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  presets?: string[]
  title?: string
  showInput?: boolean
  inputLabel?: string
  customLabel?: string
}

const defaultPresets = [
  '#000000',
  '#FFFFFF',
  '#D71921',
  '#5B9BF6',
  '#4A9E5C',
  '#D4A843',
  '#999999',
  '#E8E8E8',
]

const isValidHex = (value: string): boolean => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value)

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: valueProp,
      defaultValue = defaultPresets[0],
      onChange,
      presets = defaultPresets,
      title = 'COLOR',
      showInput = true,
      inputLabel = 'HEX',
      customLabel = 'Custom',
      size = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internalValue
    const nativeInputRef = React.useRef<HTMLInputElement>(null)

    const handleChange = React.useCallback(
      (color: string) => {
        if (!isControlled) {
          setInternalValue(color)
        }
        onChange?.(color)
      },
      [isControlled, onChange],
    )

    const handleHexChange = (hex: string) => {
      const normalized = hex.startsWith('#') ? hex : `#${hex}`
      if (isValidHex(normalized)) {
        handleChange(normalized.toUpperCase())
      }
    }

    const openNativePicker = () => {
      nativeInputRef.current?.click()
    }

    return (
      <div
        ref={ref}
        className={cn(colorPickerVariants({ size }), className)}
        data-slot="color-picker"
        data-size={dataAttr(size)}
        {...props}
      >
        <div className="nothing-color-picker__header">
          <span className="nothing-color-picker__title">{title}</span>
          <span className="nothing-color-picker__value">{value.toUpperCase()}</span>
        </div>

        <div className="nothing-color-picker__swatches" role="group" aria-label="Color presets">
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                'nothing-color-picker__swatch',
                value.toUpperCase() === color.toUpperCase() && 'nothing-color-picker__swatch--active',
              )}
              style={{ '--swatch-color': color } as React.CSSProperties}
              aria-label={`Select color ${color}`}
              aria-pressed={value.toUpperCase() === color.toUpperCase()}
              onClick={() => handleChange(color)}
            />
          ))}
          <button
            type="button"
            className="nothing-color-picker__swatch nothing-color-picker__swatch--custom"
            aria-label={customLabel}
            onClick={openNativePicker}
          >
            <span className="nothing-color-picker__custom-label">{customLabel}</span>
            <input
              ref={nativeInputRef}
              type="color"
              className="nothing-color-picker__native"
              value={value}
              onChange={(e) => handleChange(e.target.value.toUpperCase())}
              aria-hidden="true"
              tabIndex={-1}
            />
          </button>
        </div>

        {showInput && (
          <div className="nothing-color-picker__input">
            <Input
              variant="bordered"
              label={inputLabel}
              value={value.replace('#', '').toUpperCase()}
              onChange={handleHexChange}
              leadingIcon={
                <span
                  className="nothing-color-picker__preview"
                  style={{ backgroundColor: value }}
                  aria-hidden="true"
                />
              }
            />
          </div>
        )}
      </div>
    )
  },
)
ColorPicker.displayName = 'ColorPicker'

export default ColorPicker
