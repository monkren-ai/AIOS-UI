import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import { selectVariants, selectTriggerVariants, selectItemVariants } from './select-variants'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'value'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  error?: string
  label?: string
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
      hasError = false,
      label,
      error,
      searchable = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const searchInputRef = React.useRef<HTMLInputElement | null>(null)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const setContainerRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref]
    )

    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
    const selectedOption = options.find((opt) => opt.value === selectedValue)

    const filteredOptions =
      searchable && searchQuery
        ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : options

    useClickOutside(containerRef, () => {
      setIsOpen(false)
      setSearchQuery('')
    })

    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
      if (isOpen) {
        setHighlightedIndex(-1)
        setSearchQuery('')
      }
    }, [isOpen, searchable])

    const handleToggle = () => {
      if (disabled) return
      setIsOpen((prev) => !prev)
    }

    const handleSelect = React.useCallback(
      (option: SelectOption) => {
        if (option.disabled) return
        if (controlledValue === undefined) {
          setInternalValue(option.value)
        }
        onValueChange?.(option.value)
        setIsOpen(false)
        setSearchQuery('')
      },
      [controlledValue, onValueChange],
    )

    const getEnabledIndices = React.useCallback(() => {
      return filteredOptions
        .map((opt, i) => (!opt.disabled ? i : -1))
        .filter((i) => i !== -1)
    }, [filteredOptions])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isOpen) {
          if (
            e.key === 'Enter' ||
            e.key === ' ' ||
            e.key === 'ArrowDown' ||
            e.key === 'ArrowUp'
          ) {
            e.preventDefault()
            if (!disabled) setIsOpen(true)
          }
          return
        }

        const enabledIndices = getEnabledIndices()

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            const currentPos = enabledIndices.indexOf(highlightedIndex)
            const nextPos = currentPos < enabledIndices.length - 1 ? currentPos + 1 : 0
            setHighlightedIndex(enabledIndices[nextPos])
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            const currentPos = enabledIndices.indexOf(highlightedIndex)
            const prevPos = currentPos > 0 ? currentPos - 1 : enabledIndices.length - 1
            setHighlightedIndex(enabledIndices[prevPos])
            break
          }
          case 'Enter': {
            e.preventDefault()
            if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
              handleSelect(filteredOptions[highlightedIndex])
            }
            break
          }
          case 'Escape': {
            e.preventDefault()
            setIsOpen(false)
            setSearchQuery('')
            break
          }
        }
      },
      [isOpen, highlightedIndex, disabled, filteredOptions, getEnabledIndices, handleSelect]
    )

    React.useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('[role="option"]')
        items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
      }
    }, [highlightedIndex])

    return (
      <div
        ref={setContainerRefs}
        className={cn(
          selectVariants({ disabled, hasError: !!error || hasError, open: isOpen }),
          className
        )}
        onKeyDown={handleKeyDown}
        data-slot="select"
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        data-disabled={dataAttr(disabled)}
        data-error={dataAttr(!!error || hasError)}
        {...props}
      >
        {label && <label className="nothing-select__label">{label}</label>}
        <button
          className={cn(selectTriggerVariants({ open: isOpen }))}
          onClick={handleToggle}
          disabled={!!disabled}
          role={searchable ? 'combobox' : 'listbox'}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          type="button"
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
        >
          {selectedOption ? (
            <span className="nothing-select__trigger-value">{selectedOption.label}</span>
          ) : (
            <span className="nothing-select__trigger-placeholder">{placeholder}</span>
          )}
          <span className="nothing-select__trigger-icon" aria-hidden="true">
            ▾
          </span>
        </button>
        {isOpen && (
          <div
            className="nothing-select__content"
            role="listbox"
            aria-label={label || 'Options'}
            data-state={dataAttr('open')}
          >
            {searchable && (
              <div className="nothing-select__search">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="nothing-select__search-input"
                  aria-label="Search options"
                />
              </div>
            )}
            <div className="nothing-select__list" ref={listRef}>
              {filteredOptions.length === 0 ? (
                <div className="nothing-select__item nothing-select__item--disabled">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue
                  const isHighlighted = index === highlightedIndex
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        selectItemVariants({
                          selected: isSelected,
                          disabled: !!option.disabled,
                          highlighted: isHighlighted,
                        })
                      )}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={isSelected}
                      data-state={dataAttr(isSelected ? 'selected' : 'idle')}
                      data-highlighted={dataAttr(isHighlighted)}
                      data-disabled={dataAttr(option.disabled)}
                    >
                      {option.label}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
        {error && <div className="nothing-select__error">{error}</div>}
      </div>
    )
  }
)
Select.displayName = 'Select'

export default Select
