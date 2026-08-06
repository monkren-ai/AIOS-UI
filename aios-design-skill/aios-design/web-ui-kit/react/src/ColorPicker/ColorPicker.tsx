import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import Input from '@/Input'
import {
  colorPickerCustomLabelVariants,
  colorPickerHeaderVariants,
  colorPickerInputVariants,
  colorPickerNativeVariants,
  colorPickerPreviewVariants,
  colorPickerSwatchVariants,
  colorPickerSwatchesVariants,
  colorPickerTitleVariants,
  colorPickerValueVariants,
  colorPickerVariants,
  resolveColorPickerSize,
  type ColorPickerSize,
} from './color-picker-variants'

export interface ColorPickerProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'children' | 'onChange' | 'value' | 'defaultValue'
> {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  presets?: string[]
  title?: string
  showInput?: boolean
  inputLabel?: string
  customLabel?: string
  /** 色块边长：36 / 44 / 52px。 */
  size?: ColorPickerSize
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

export function ColorPicker({
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
  ref,
  ...props
}: ColorPickerProps) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = isControlled ? valueProp : internalValue
  const nativeInputRef = React.useRef<HTMLInputElement>(null)
  const resolvedSize = (resolveColorPickerSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

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
      className={cn(colorPickerVariants({ size: resolvedSize }), className)}
      data-slot="color-picker"
      data-size={dataAttr(resolvedSize)}
      {...props}
    >
      <div className={colorPickerHeaderVariants()} data-slot="color-picker-header">
        <span className={colorPickerTitleVariants()} data-slot="color-picker-title">
          {title}
        </span>
        <span className={colorPickerValueVariants()} data-slot="color-picker-value">
          {value.toUpperCase()}
        </span>
      </div>

      <div
        className={colorPickerSwatchesVariants()}
        data-slot="color-picker-swatches"
        role="group"
        aria-label="Color presets"
      >
        {presets.map((color) => {
          const isActive = value.toUpperCase() === color.toUpperCase()
          return (
            <button
              key={color}
              type="button"
              className={colorPickerSwatchVariants({ size: resolvedSize, active: isActive })}
              data-slot="color-picker-swatch"
              data-active={dataAttr(isActive)}
              data-color={color}
              style={
                {
                  '--swatch-color': color,
                  backgroundColor: 'var(--swatch-color)',
                } as React.CSSProperties
              }
              aria-label={`Select color ${color}`}
              aria-pressed={isActive}
              onClick={() => handleChange(color)}
            />
          )
        })}
        <button
          type="button"
          className={colorPickerSwatchVariants({ size: resolvedSize, custom: true })}
          data-slot="color-picker-swatch-custom"
          aria-label={customLabel}
          onClick={openNativePicker}
        >
          <span className={colorPickerCustomLabelVariants()} data-slot="color-picker-custom-label">
            {customLabel}
          </span>
          <input
            ref={nativeInputRef}
            type="color"
            className={colorPickerNativeVariants()}
            data-slot="color-picker-native"
            value={value}
            onChange={(e) => handleChange(e.target.value.toUpperCase())}
            aria-hidden="true"
            tabIndex={-1}
          />
        </button>
      </div>

      {showInput && (
        <div className={colorPickerInputVariants()} data-slot="color-picker-input">
          <Input
            variant="soft"
            size={resolvedSize}
            label={inputLabel}
            value={value.replace('#', '').toUpperCase()}
            onValueChange={handleHexChange}
            leadingIcon={
              <span
                className={colorPickerPreviewVariants()}
                data-slot="color-picker-preview"
                style={{ backgroundColor: value }}
                aria-hidden="true"
              />
            }
          />
        </div>
      )}
    </div>
  )
}

ColorPicker.displayName = 'ColorPicker'

export { colorPickerVariants }
export default ColorPicker
