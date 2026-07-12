import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import './Command.css'

const commandItemVariants = cva('nothing-command__item', {
  variants: {
    selected: { true: 'nothing-command__item--selected', false: '' },
    disabled: { true: 'nothing-command__item--disabled', false: '' },
  },
  defaultVariants: { selected: false, disabled: false },
})

export interface CommandItem {
  id: string
  label: string
  shortcut?: string
  icon?: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export interface CommandGroup {
  heading?: string
  items: CommandItem[]
}

export interface CommandProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof commandItemVariants> {
  groups: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      groups,
      placeholder = 'Type a command...',
      emptyMessage = 'No results found.',
      open: controlledOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const [query, setQuery] = React.useState('')
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const listRef = React.useRef<HTMLDivElement | null>(null)

    const generatedId = React.useId()
    const labelId = `${generatedId}-label`
    const listId = `${generatedId}-list`

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

    const filteredGroups = groups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((g) => g.items.length > 0)

    const flatFilteredItems = filteredGroups.flatMap((g) => g.items)

    const handleClose = React.useCallback(() => {
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

    React.useEffect(() => {
      if (isOpen) {
        requestAnimationFrame(() => {
          inputRef.current?.focus()
        })
      }
    }, [isOpen])

    React.useEffect(() => {
      setSelectedIndex(0)
    }, [query])

    const handleSelect = React.useCallback(
      (item: CommandItem) => {
        if (item.disabled) return
        item.onSelect?.()
        handleClose()
      },
      [handleClose]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault()
            setSelectedIndex((prev) => Math.min(prev + 1, flatFilteredItems.length - 1))
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            setSelectedIndex((prev) => Math.max(prev - 1, 0))
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
      },
      [flatFilteredItems, selectedIndex, handleSelect, handleClose]
    )

    let itemIndex = -1

    return (
      <div
        ref={setContainerRefs}
        className={cn('nothing-command', className)}
        role="dialog"
        aria-label="Command palette"
        onKeyDown={handleKeyDown}
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        {...props}
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

                return (
                  <div
                    key={item.id}
                    id={`${generatedId}-item-${item.id}`}
                    className={cn(
                      commandItemVariants({ selected: isSelected, disabled: !!item.disabled })
                    )}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={item.disabled || undefined}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                    data-state={dataAttr(isSelected ? 'selected' : 'idle')}
                    data-disabled={dataAttr(item.disabled)}
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
)
Command.displayName = 'Command'

export { commandItemVariants }
export default Command
