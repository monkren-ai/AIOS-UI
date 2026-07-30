import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { selectVariants, selectTriggerVariants, selectItemVariants } from './select-variants'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'> {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  error?: string
  label?: string
  disabled?: boolean
  /**
   * 是否在弹出层顶部显示搜索框并过滤选项。
   * @default false
   */
  searchable?: boolean
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option',
      disabled = false,
      label,
      error,
      searchable = false,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')

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
        className={cn(selectVariants({ disabled, hasError }), className)}
        data-slot="select"
        data-state={dataAttr(open ? 'open' : 'closed')}
        data-disabled={dataAttr(disabled)}
        data-error={dataAttr(hasError)}
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
            <SelectPrimitive.Label className="nothing-select__label" data-slot="select-label">
              {label}
            </SelectPrimitive.Label>
          )}
          <SelectPrimitive.Trigger
            className={(state) =>
              cn(
                selectTriggerVariants({
                  open: state.open,
                }),
              )
            }
            data-slot="select-trigger"
            data-state={dataAttr(open ? 'open' : 'closed')}
          >
            <SelectPrimitive.Value
              className="nothing-select__trigger-value"
              data-slot="select-value"
            >
              {(value: string | null) => {
                if (value === null) {
                  return <span className="nothing-select__trigger-placeholder">{placeholder}</span>
                }
                const option = options.find((opt) => opt.value === value)
                return option?.label ?? value
              }}
            </SelectPrimitive.Value>
            <span className="nothing-select__trigger-icon" aria-hidden="true">
              ▾
            </span>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner
              className="nothing-select__positioner"
              data-slot="select-positioner"
              sideOffset={4}
              align="start"
            >
              <SelectPrimitive.Popup
                className="nothing-select__content"
                data-slot="select-content"
                data-state={dataAttr(open ? 'open' : 'closed')}
              >
                {searchable && (
                  <div className="nothing-select__search" data-slot="select-search">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="nothing-select__search-input"
                      aria-label="Search options"
                      autoFocus={open}
                    />
                  </div>
                )}
                <SelectPrimitive.List className="nothing-select__list" data-slot="select-list">
                  {filteredOptions.length === 0 ? (
                    <div className="nothing-select__item nothing-select__item--disabled">
                      No results found
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <SelectPrimitive.Item
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className={(state) =>
                          cn(
                            selectItemVariants({
                              selected: state.selected,
                              disabled: state.disabled,
                              highlighted: state.highlighted,
                            }),
                          )
                        }
                        data-slot="select-item"
                        data-state={dataAttr(
                          option.value === controlledValue ? 'selected' : 'idle',
                        )}
                        data-disabled={dataAttr(option.disabled)}
                      >
                        <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator
                          keepMounted
                          className="nothing-select__item-indicator"
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
        {error && <div className="nothing-select__error">{error}</div>}
      </div>
    )
  },
)
Select.displayName = 'Select'

export { selectVariants, selectTriggerVariants, selectItemVariants }
export default Select
