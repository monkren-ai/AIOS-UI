import { useState, useRef, useCallback, useEffect } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import '../styles/command.css'

interface CommandItem {
  id: string
  label: string
  shortcut?: string
  icon?: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

interface CommandGroup {
  heading?: string
  items: CommandItem[]
}

interface CommandProps {
  groups: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Command: React.FC<CommandProps> = ({
  groups,
  placeholder = 'Type a command...',
  emptyMessage = 'No results found.',
  open: controlledOpen,
  onOpenChange
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredGroups = groups
    .map(g => ({
      ...g,
      items: g.items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(g => g.items.length > 0)

  const flatFilteredItems = filteredGroups.flatMap(g => g.items)

  const handleClose = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false)
    }
    onOpenChange?.(false)
    setQuery('')
    setSelectedIndex(0)
  }, [controlledOpen, onOpenChange])

  useClickOutside(containerRef, () => {
    if (isOpen) handleClose()
  })

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.disabled) return
    item.onSelect?.()
    handleClose()
  }, [handleClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        setSelectedIndex(prev =>
          Math.min(prev + 1, flatFilteredItems.length - 1)
        )
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        setSelectedIndex(prev =>
          Math.max(prev - 1, 0)
        )
        break
      }
      case 'Enter': {
        e.preventDefault()
        const item = flatFilteredItems[selectedIndex]
        if (item) handleSelect(item)
        break
      }
      case 'Escape': {
        e.preventDefault()
        handleClose()
        break
      }
    }
  }, [flatFilteredItems, selectedIndex, handleSelect, handleClose])

  let itemIndex = -1

  return (
    <div
      className="nothing-command"
      ref={containerRef}
      role="dialog"
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
    >
      <input
        className="nothing-command__input"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-controls="nothing-command-list"
      />
      <div
        className="nothing-command__list"
        id="nothing-command-list"
        ref={listRef}
        role="listbox"
      >
        {filteredGroups.length === 0 && (
          <div className="nothing-command__empty">{emptyMessage}</div>
        )}
        {filteredGroups.map((group) => (
          <div key={group.heading ?? 'default'} className="nothing-command__group">
            {group.heading && (
              <div className="nothing-command__group-heading">{group.heading}</div>
            )}
            {group.items.map((item) => {
              itemIndex++
              const currentIndex = itemIndex
              const isSelected = currentIndex === selectedIndex

              const itemClassNames = [
                'nothing-command__item',
                isSelected ? 'nothing-command__item--selected' : '',
                item.disabled ? 'nothing-command__item--disabled' : ''
              ].filter(Boolean).join(' ')

              return (
                <div
                  key={item.id}
                  className={itemClassNames}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(currentIndex)}
                >
                  {item.icon && (
                    <span className="nothing-command__item-icon">{item.icon}</span>
                  )}
                  <span className="nothing-command__item-label">{item.label}</span>
                  {item.shortcut && (
                    <span className="nothing-command__item-shortcut">{item.shortcut}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Command
