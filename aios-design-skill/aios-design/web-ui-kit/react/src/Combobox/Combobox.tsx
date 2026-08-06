import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import {
  comboboxClearVariants,
  comboboxContentVariants,
  comboboxControlVariants,
  comboboxEmptyVariants,
  comboboxErrorVariants,
  comboboxIconVariants,
  comboboxInputVariants,
  comboboxItemIndicatorVariants,
  comboboxItemVariants,
  comboboxLabelVariants,
  comboboxListVariants,
  comboboxPositionerVariants,
  comboboxVariants,
  type ComboboxSize,
  type ComboboxVariant,
} from './combobox-variants'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'value' | 'defaultValue' | 'onChange'> {
  /** 选项列表，按 `label` 过滤。 */
  items: ComboboxOption[]
  /**
   * 受控选中值。
   *
   * 非 freeInput 模式下是选中项的 `value`；freeInput 模式下是输入框文本本身。
   */
  value?: string
  /** 非受控初始值，语义同 `value`。 */
  defaultValue?: string
  /** 选中值变化回调。 */
  onValueChange?: (value: string) => void
  /** 输入文本变化回调（用于跟踪过滤关键字）。 */
  onInputValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  /** 高度阶梯。 */
  size?: ComboboxSize
  /** 视觉样式。 */
  variant?: ComboboxVariant
  /** 是否显示清除按钮。 */
  clearable?: boolean
  /**
   * 是否允许输入列表外的任意值。
   *
   * 关闭时（默认），输入仅用于过滤，选中后输入框回填选中项的 `label`，`value` 是选项的 `value`。
   * 开启时，输入文本即 `value`——`onValueChange` 会在每次输入时以当前文本触发，选中选项时则以该选项的 `label` 触发。
   */
  freeInput?: boolean
}

export function Combobox({
  className,
  items,
  value,
  defaultValue,
  onValueChange,
  onInputValueChange,
  placeholder,
  label,
  error,
  disabled = false,
  size = 'md',
  variant = 'outline',
  clearable = false,
  freeInput = false,
  ref,
  ...props
}: ComboboxProps) {
  const generatedId = React.useId()
  const inputId = props.id || generatedId
  const errorId = `${inputId}-error`
  const hasError = Boolean(error)

  // 非自由输入模式下，把外层的字符串 value 查表换成选项对象交给 Base UI。
  const selectedObject = React.useMemo<ComboboxOption | null | undefined>(() => {
    if (freeInput || value === undefined) return undefined
    return items.find((item) => item.value === value) ?? null
  }, [items, value, freeInput])

  const defaultSelectedObject = React.useMemo<ComboboxOption | null | undefined>(() => {
    if (freeInput || defaultValue === undefined) return undefined
    return items.find((item) => item.value === defaultValue) ?? null
  }, [items, defaultValue, freeInput])

  // Base UI 选中值变化：回调给出选项对象（或 null）。
  const handleValueChange = React.useCallback(
    (nextValue: ComboboxOption | null) => {
      // freeInput 模式下 value 由输入文本驱动，选中事件交给 onInputValueChange 处理，避免重复触发。
      if (freeInput) return
      if (nextValue && typeof nextValue === 'object' && 'value' in nextValue) {
        onValueChange?.((nextValue as ComboboxOption).value)
      } else if (nextValue === null) {
        onValueChange?.('')
      }
    },
    [freeInput, onValueChange],
  )

  const handleInputValueChange = React.useCallback(
    (nextInputValue: string) => {
      onInputValueChange?.(nextInputValue)
      // freeInput 模式：输入文本即 value。
      if (freeInput) {
        onValueChange?.(nextInputValue)
      }
    },
    [freeInput, onInputValueChange, onValueChange],
  )

  return (
    <div
      ref={ref}
      className={cn(comboboxVariants({ size, disabled, hasError }), className)}
      data-slot="combobox"
      data-size={dataAttr(size)}
      data-variant={dataAttr(variant)}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      {...props}
    >
      <ComboboxPrimitive.Root
        items={items}
        disabled={disabled}
        value={!freeInput ? (selectedObject ?? undefined) : undefined}
        defaultValue={!freeInput ? (defaultSelectedObject ?? undefined) : undefined}
        onValueChange={handleValueChange}
        inputValue={freeInput ? value : undefined}
        defaultInputValue={freeInput ? defaultValue : undefined}
        onInputValueChange={handleInputValueChange}
      >
        {label && (
          <label
            className={comboboxLabelVariants({ size, hasError, disabled })}
            data-slot="combobox-label"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <ComboboxPrimitive.InputGroup
          className={comboboxControlVariants({ variant, size, hasError, disabled })}
          data-slot="combobox-control"
          data-size={dataAttr(size)}
          data-variant={dataAttr(variant)}
          data-invalid={dataAttr(hasError)}
        >
          <ComboboxPrimitive.Input
            id={inputId}
            className={comboboxInputVariants({ size })}
            data-slot="combobox-input"
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
          />
          {clearable && (
            <ComboboxPrimitive.Clear
              className={comboboxClearVariants()}
              data-slot="combobox-clear"
              aria-label="Clear"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </ComboboxPrimitive.Clear>
          )}
          <span
            className={comboboxIconVariants()}
            data-slot="combobox-icon"
            aria-hidden="true"
          >
            ▾
          </span>
        </ComboboxPrimitive.InputGroup>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            className={comboboxPositionerVariants()}
            data-slot="combobox-positioner"
            sideOffset={4}
            align="start"
          >
            <ComboboxPrimitive.Popup
              className={comboboxContentVariants()}
              data-slot="combobox-content"
            >
              <ComboboxPrimitive.List className={comboboxListVariants()} data-slot="combobox-list">
                {(item: ComboboxOption) => (
                  <ComboboxPrimitive.Item
                    key={item.value}
                    value={item}
                    disabled={item.disabled}
                    className={(state: { selected: boolean; highlighted: boolean; disabled: boolean }) =>
                      comboboxItemVariants({
                        size,
                        selected: state.selected,
                        highlighted: state.highlighted,
                        disabled: state.disabled,
                      })
                    }
                    data-slot="combobox-item"
                  >
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <ComboboxPrimitive.ItemIndicator
                      keepMounted
                      className={comboboxItemIndicatorVariants()}
                      data-slot="combobox-item-indicator"
                    >
                      ✓
                    </ComboboxPrimitive.ItemIndicator>
                  </ComboboxPrimitive.Item>
                )}
              </ComboboxPrimitive.List>
              <ComboboxPrimitive.Empty className={comboboxEmptyVariants()} data-slot="combobox-empty">
                No results found
              </ComboboxPrimitive.Empty>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
      {error && (
        <div
          id={errorId}
          className={comboboxErrorVariants()}
          data-slot="combobox-error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  )
}

Combobox.displayName = 'Combobox'

/* -------------------------------------------------------------------------- */
/* 复合导出：需要自定义布局时，用这些带样式的原语在 `Combobox.Root` 下组装。       */
/* -------------------------------------------------------------------------- */

export type ComboboxInputProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Input
>

export function ComboboxInput({ className, ref, ...props }: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      className={cn(comboboxInputVariants(), className)}
      data-slot="combobox-input"
      {...props}
    />
  )
}
ComboboxInput.displayName = 'Combobox.Input'

export type ComboboxContentProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Popup
>

export function ComboboxContent({ className, ref, ...props }: ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Popup
      ref={ref}
      className={cn(comboboxContentVariants(), className)}
      data-slot="combobox-content"
      {...props}
    />
  )
}
ComboboxContent.displayName = 'Combobox.Content'

export type ComboboxListProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.List
>

export function ComboboxList({ className, ref, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      className={cn(comboboxListVariants(), className)}
      data-slot="combobox-list"
      {...props}
    />
  )
}
ComboboxList.displayName = 'Combobox.List'

export type ComboboxItemProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Item
>

export function ComboboxItem({ className, ref, ...props }: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      className={(state: { selected: boolean; highlighted: boolean; disabled: boolean }) =>
        cn(
          comboboxItemVariants({
            selected: state.selected,
            highlighted: state.highlighted,
            disabled: state.disabled,
          }),
          className,
        )
      }
      data-slot="combobox-item"
      {...props}
    />
  )
}
ComboboxItem.displayName = 'Combobox.Item'

export type ComboboxItemIndicatorProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.ItemIndicator
>

export function ComboboxItemIndicator({ className, ref, ...props }: ComboboxItemIndicatorProps) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      className={cn(comboboxItemIndicatorVariants(), className)}
      data-slot="combobox-item-indicator"
      {...props}
    />
  )
}
ComboboxItemIndicator.displayName = 'Combobox.ItemIndicator'

export type ComboboxEmptyProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Empty
>

export function ComboboxEmpty({ className, children, ref, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={cn(comboboxEmptyVariants(), className)}
      data-slot="combobox-empty"
      {...props}
    >
      {children ?? 'No results found'}
    </ComboboxPrimitive.Empty>
  )
}
ComboboxEmpty.displayName = 'Combobox.Empty'

export type ComboboxGroupProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Group
>

export function ComboboxGroup({ className, ref, ...props }: ComboboxGroupProps) {
  return (
    <ComboboxPrimitive.Group
      ref={ref}
      className={cn('py-1', className)}
      data-slot="combobox-group"
      {...props}
    />
  )
}
ComboboxGroup.displayName = 'Combobox.Group'

Combobox.Input = ComboboxInput
Combobox.Content = ComboboxContent
Combobox.List = ComboboxList
Combobox.Item = ComboboxItem
Combobox.ItemIndicator = ComboboxItemIndicator
Combobox.Empty = ComboboxEmpty
Combobox.Group = ComboboxGroup

export {
  comboboxVariants,
  comboboxControlVariants,
  comboboxItemVariants,
  comboboxContentVariants,
}
export default Combobox
