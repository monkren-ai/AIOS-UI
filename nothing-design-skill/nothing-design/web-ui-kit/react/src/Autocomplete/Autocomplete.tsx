import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete'
import {
  autocompleteClearVariants,
  autocompleteContentVariants,
  autocompleteControlVariants,
  autocompleteEmptyVariants,
  autocompleteErrorVariants,
  autocompleteIconVariants,
  autocompleteInputVariants,
  autocompleteItemVariants,
  autocompleteLabelVariants,
  autocompleteListVariants,
  autocompletePositionerVariants,
  autocompleteVariants,
  type AutocompleteSize,
  type AutocompleteVariant,
} from './autocomplete-variants'

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface AutocompleteProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'value' | 'defaultValue' | 'onChange'> {
  /** 选项列表，按 `label` 过滤。 */
  items: AutocompleteOption[]
  /** 受控输入文本。 */
  value?: string
  /** 非受控初始输入文本。 */
  defaultValue?: string
  /** 输入文本变化回调（含选中项后填入的 label）。 */
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  /** 高度阶梯。 */
  size?: AutocompleteSize
  /** 视觉样式。 */
  variant?: AutocompleteVariant
  /** 是否显示清除按钮。 */
  clearable?: boolean
  /** 是否显示右侧下拉箭头。 */
  icon?: boolean
}

export function Autocomplete({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  label,
  error,
  disabled = false,
  size = 'md',
  variant = 'outline',
  clearable = false,
  icon = true,
  ref,
  ...props
}: AutocompleteProps) {
  const generatedId = React.useId()
  const inputId = props.id || generatedId
  const errorId = `${inputId}-error`
  const hasError = Boolean(error)
  const controlled = value !== undefined

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue)
    },
    [onValueChange],
  )

  return (
    <div
      ref={ref}
      className={cn(autocompleteVariants({ size, disabled, hasError }), className)}
      data-slot="autocomplete"
      data-size={dataAttr(size)}
      data-variant={dataAttr(variant)}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      {...props}
    >
      <AutocompletePrimitive.Root
        items={items}
        value={controlled ? value : undefined}
        defaultValue={controlled ? undefined : defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        {label && (
          <label
            className={autocompleteLabelVariants({ size, hasError, disabled })}
            data-slot="autocomplete-label"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <AutocompletePrimitive.InputGroup
          className={autocompleteControlVariants({ variant, size, hasError, disabled })}
          data-slot="autocomplete-control"
          data-size={dataAttr(size)}
          data-variant={dataAttr(variant)}
          data-invalid={dataAttr(hasError)}
        >
          <AutocompletePrimitive.Input
            id={inputId}
            className={autocompleteInputVariants({ size })}
            data-slot="autocomplete-input"
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
          />
          {clearable && (
            <AutocompletePrimitive.Clear
              className={autocompleteClearVariants()}
              data-slot="autocomplete-clear"
              aria-label="Clear"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </AutocompletePrimitive.Clear>
          )}
          {icon && (
            <span
              className={autocompleteIconVariants()}
              data-slot="autocomplete-icon"
              aria-hidden="true"
            >
              ▾
            </span>
          )}
        </AutocompletePrimitive.InputGroup>
        <AutocompletePrimitive.Portal>
          <AutocompletePrimitive.Positioner
            className={autocompletePositionerVariants()}
            data-slot="autocomplete-positioner"
            sideOffset={4}
            align="start"
          >
            <AutocompletePrimitive.Popup
              className={autocompleteContentVariants()}
              data-slot="autocomplete-content"
            >
              <AutocompletePrimitive.List className={autocompleteListVariants()} data-slot="autocomplete-list">
                {(item: AutocompleteOption) => (
                  <AutocompletePrimitive.Item
                    key={item.value}
                    value={item}
                    disabled={item.disabled}
                    className={(state) =>
                      autocompleteItemVariants({
                        size,
                        highlighted: state.highlighted,
                        disabled: state.disabled,
                      })
                    }
                    data-slot="autocomplete-item"
                  >
                    {item.label}
                  </AutocompletePrimitive.Item>
                )}
              </AutocompletePrimitive.List>
              <AutocompletePrimitive.Empty className={autocompleteEmptyVariants()} data-slot="autocomplete-empty">
                No results found
              </AutocompletePrimitive.Empty>
            </AutocompletePrimitive.Popup>
          </AutocompletePrimitive.Positioner>
        </AutocompletePrimitive.Portal>
      </AutocompletePrimitive.Root>
      {error && (
        <div
          id={errorId}
          className={autocompleteErrorVariants()}
          data-slot="autocomplete-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

Autocomplete.displayName = 'Autocomplete'

/* -------------------------------------------------------------------------- */
/* 复合导出：需要自定义布局时，用这些带样式的原语在 `Autocomplete.Root` 下组装。   */
/* -------------------------------------------------------------------------- */

export type AutocompleteInputProps = React.ComponentPropsWithRef<
  typeof AutocompletePrimitive.Input
>

export function AutocompleteInput({ className, ref, ...props }: AutocompleteInputProps) {
  return (
    <AutocompletePrimitive.Input
      ref={ref}
      className={cn(autocompleteInputVariants(), className)}
      data-slot="autocomplete-input"
      {...props}
    />
  )
}
AutocompleteInput.displayName = 'Autocomplete.Input'

export type AutocompleteContentProps = React.ComponentPropsWithRef<
  typeof AutocompletePrimitive.Popup
>

export function AutocompleteContent({ className, ref, ...props }: AutocompleteContentProps) {
  return (
    <AutocompletePrimitive.Popup
      ref={ref}
      className={cn(autocompleteContentVariants(), className)}
      data-slot="autocomplete-content"
      {...props}
    />
  )
}
AutocompleteContent.displayName = 'Autocomplete.Content'

export type AutocompleteListProps = React.ComponentPropsWithRef<
  typeof AutocompletePrimitive.List
>

export function AutocompleteList({ className, ref, ...props }: AutocompleteListProps) {
  return (
    <AutocompletePrimitive.List
      ref={ref}
      className={cn(autocompleteListVariants(), className)}
      data-slot="autocomplete-list"
      {...props}
    />
  )
}
AutocompleteList.displayName = 'Autocomplete.List'

export type AutocompleteItemProps = React.ComponentPropsWithRef<
  typeof AutocompletePrimitive.Item
>

export function AutocompleteItem({ className, ref, ...props }: AutocompleteItemProps) {
  return (
    <AutocompletePrimitive.Item
      ref={ref}
      className={(state) =>
        cn(
          autocompleteItemVariants({
            highlighted: state.highlighted,
            disabled: state.disabled,
          }),
          className,
        )
      }
      data-slot="autocomplete-item"
      {...props}
    />
  )
}
AutocompleteItem.displayName = 'Autocomplete.Item'

export type AutocompleteEmptyProps = React.ComponentPropsWithRef<
  typeof AutocompletePrimitive.Empty
>

export function AutocompleteEmpty({ className, children, ref, ...props }: AutocompleteEmptyProps) {
  return (
    <AutocompletePrimitive.Empty
      ref={ref}
      className={cn(autocompleteEmptyVariants(), className)}
      data-slot="autocomplete-empty"
      {...props}
    >
      {children ?? 'No results found'}
    </AutocompletePrimitive.Empty>
  )
}
AutocompleteEmpty.displayName = 'Autocomplete.Empty'

Autocomplete.Input = AutocompleteInput
Autocomplete.Content = AutocompleteContent
Autocomplete.List = AutocompleteList
Autocomplete.Item = AutocompleteItem
Autocomplete.Empty = AutocompleteEmpty

export {
  autocompleteVariants,
  autocompleteControlVariants,
  autocompleteItemVariants,
  autocompleteContentVariants,
}
export default Autocomplete
