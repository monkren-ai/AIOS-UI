import { useState, useRef, useEffect, useCallback } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import '../styles/select.css'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  error?: string
  searchable?: boolean
  style?: React.CSSProperties
}

const Select: React.FC<SelectProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = 'Select an option',
  disabled = false,
  label,
  error,
  searchable = false,
  style
}) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
  const selectedOption = options.find(opt => opt.value === selectedValue)

  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  useClickOutside(containerRef, () => {
    setIsOpen(false)
    setSearchQuery('')
  })

  useEffect(() => {
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
    setIsOpen(prev => !prev)
  }

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return
    if (controlledValue === undefined) {
      setInternalValue(option.value)
    }
    onValueChange?.(option.value)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getEnabledIndices = useCallback(() => {
    return filteredOptions
      .map((opt, i) => (!opt.disabled ? i : -1))
      .filter(i => i !== -1)
  }, [filteredOptions])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
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
  }, [isOpen, highlightedIndex, disabled, filteredOptions, getEnabledIndices])

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const containerClassNames = [
    'nothing-select',
    disabled ? 'nothing-select--disabled' : '',
    error ? 'nothing-select--error' : '',
    isOpen ? 'nothing-select--open' : ''
  ].filter(Boolean).join(' ')

  const triggerClassNames = [
    'nothing-select__trigger',
    isOpen ? 'nothing-select__trigger--open' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClassNames} ref={containerRef} onKeyDown={handleKeyDown} style={style}>
      {label && (
        <label className="nothing-select__label">{label}</label>
      )}
      <button
        className={triggerClassNames}
        onClick={handleToggle}
        disabled={disabled}
        role={searchable ? 'combobox' : 'listbox'}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        {selectedOption ? (
          <span className="nothing-select__trigger-value">{selectedOption.label}</span>
        ) : (
          <span className="nothing-select__trigger-placeholder">{placeholder}</span>
        )}
        <span className="nothing-select__trigger-icon" aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div className="nothing-select__content" role="listbox" aria-label={label || 'Options'}>
          {searchable && (
            <div className="nothing-select__search">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="nothing-select__search-input"
                aria-label="Search options"
              />
            </div>
          )}
          <div className="nothing-select__list" ref={listRef}>
            {filteredOptions.length === 0 ? (
              <div className="nothing-select__item nothing-select__item--disabled">No results found</div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === selectedValue
                const isHighlighted = index === highlightedIndex
                const itemClassNames = [
                  'nothing-select__item',
                  isSelected ? 'nothing-select__item--selected' : '',
                  option.disabled ? 'nothing-select__item--disabled' : '',
                  isHighlighted ? 'nothing-select__item--highlighted' : ''
                ].filter(Boolean).join(' ')

                return (
                  <div
                    key={option.value}
                    className={itemClassNames}
                    onClick={() => handleSelect(option)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.label}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
      {error && (
        <div className="nothing-select__error">{error}</div>
      )}
    </div>
  )
}

export default Select
