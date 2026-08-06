import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import {
  resolveSelectSize,
  selectContentVariants,
  selectErrorVariants,
  selectItemIndicatorVariants,
  selectItemVariants,
  selectLabelVariants,
  selectListVariants,
  selectPlaceholderVariants,
  selectPositionerVariants,
  selectSearchInputVariants,
  selectSearchVariants,
  selectTriggerIconVariants,
  selectTriggerVariants,
  selectValueVariants,
  selectVariants,
  type SelectSize,
} from './select-variants'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  'onChange' | 'defaultValue' | 'value'
> {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  error?: string
  label?: string
  disabled?: boolean
  /** 触发器高度：36 / 44 / 52px。 */
  size?: SelectSize
  /**
   * 是否在弹出层顶部显示搜索框并过滤选项。
   * @default false
   */
  searchable?: boolean
}

export function Select({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  label,
  error,
  size = 'md',
  searchable = false,
  ref,
  ...props
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const resolvedSize = (resolveSelectSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  const handleValueChange = React.useCallback(
    (value: string | null) => {
      if (value !== null) {
        onValueChange?.(value)
      }
    },
    [onValueChange],
  )

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) {
        setSearchQuery('')
      }
    },
    [setOpen, setSearchQuery],
  )

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter((opt) => opt.label.toLowerCase().includes(query))
  }, [options, searchable, searchQuery])

  const hasError = Boolean(error)

  return (
    <div
      ref={ref}
      className={cn(selectVariants({ size: resolvedSize, disabled, hasError, open }), className)}
      data-slot="select"
      data-size={dataAttr(resolvedSize)}
      data-state={dataAttr(open ? 'open' : 'closed')}
      data-disabled={dataAttr(disabled)}
      data-error={dataAttr(hasError)}
      data-invalid={dataAttr(hasError)}
      {...props}
    >
      <SelectPrimitive.Root
        value={controlledValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onOpenChange={handleOpenChange}
        open={open}
        disabled={disabled}
      >
        {label && (
          <SelectPrimitive.Label className={selectLabelVariants()} data-slot="select-label">
            {label}
          </SelectPrimitive.Label>
        )}
        <SelectPrimitive.Trigger
          className={(state) =>
            selectTriggerVariants({
              size: resolvedSize,
              hasError,
              open: state.open,
            })
          }
          data-slot="select-trigger"
          data-size={dataAttr(resolvedSize)}
          data-invalid={dataAttr(hasError)}
          data-state={dataAttr(open ? 'open' : 'closed')}
        >
          <SelectPrimitive.Value className={selectValueVariants()} data-slot="select-value">
            {(value: string | null) => {
              if (value === null) {
                return (
                  <span className={selectPlaceholderVariants()} data-slot="select-placeholder">
                    {placeholder}
                  </span>
                )
              }
              const option = options.find((opt) => opt.value === value)
              return option?.label ?? value
            }}
          </SelectPrimitive.Value>
          <span
            className={selectTriggerIconVariants({ open })}
            data-slot="select-trigger-icon"
            aria-hidden="true"
          >
            ▾
          </span>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner
            className={selectPositionerVariants()}
            data-slot="select-positioner"
            sideOffset={4}
            align="start"
          >
            <SelectPrimitive.Popup
              className={selectContentVariants()}
              data-slot="select-content"
              data-state={dataAttr(open ? 'open' : 'closed')}
            >
              {searchable && (
                <div className={selectSearchVariants()} data-slot="select-search">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className={selectSearchInputVariants()}
                    data-slot="select-search-input"
                    aria-label="Search options"
                    autoFocus={open}
                  />
                </div>
              )}
              <SelectPrimitive.List className={selectListVariants()} data-slot="select-list">
                {filteredOptions.length === 0 ? (
                  <div
                    className={selectItemVariants({ size: resolvedSize, disabled: true })}
                    data-slot="select-empty"
                    data-disabled=""
                  >
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className={(state) =>
                        selectItemVariants({
                          size: resolvedSize,
                          selected: state.selected,
                          disabled: state.disabled,
                          highlighted: state.highlighted,
                        })
                      }
                      data-slot="select-item"
                      data-state={dataAttr(option.value === controlledValue ? 'selected' : 'idle')}
                      data-disabled={dataAttr(option.disabled)}
                    >
                      <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator
                        keepMounted
                        className={selectItemIndicatorVariants()}
                        data-slot="select-item-indicator"
                      >
                        ✓
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))
                )}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <div className={selectErrorVariants()} data-slot="select-error" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

Select.displayName = 'Select'

export { selectVariants, selectTriggerVariants, selectItemVariants }
export default Select
