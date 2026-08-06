import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import {
  commandEmptyVariants,
  commandGroupHeadingVariants,
  commandGroupVariants,
  commandInputVariants,
  commandItemIconVariants,
  commandItemLabelVariants,
  commandItemShortcutVariants,
  commandItemVariants,
  commandListVariants,
  commandVariants,
  resolveCommandSize,
  type CommandSize,
} from './command-variants'

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

export interface CommandProps extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  groups: CommandGroup[]
  placeholder?: string
  emptyMessage?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** 搜索框与命令行的高度：36 / 44 / 52px。 */
  size?: CommandSize
}

export function Command({
  className,
  groups,
  placeholder = 'Type a command...',
  emptyMessage = 'No results found.',
  open: controlledOpen,
  onOpenChange,
  size = 'md',
  ref,
  ...props
}: CommandProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  const generatedId = React.useId()
  const listId = `${generatedId}-list`
  const resolvedSize = (resolveCommandSize(size) ?? 'md') as 'sm' | 'md' | 'lg'

  const setContainerRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const filteredGroups = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
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
    [handleClose],
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
    [flatFilteredItems, selectedIndex, handleSelect, handleClose],
  )

  let itemIndex = -1

  return (
    <div
      ref={setContainerRefs}
      className={cn(commandVariants(), className)}
      role="dialog"
      aria-label="Command palette"
      onKeyDown={handleKeyDown}
      data-slot="command"
      data-size={dataAttr(resolvedSize)}
      data-state={dataAttr(isOpen ? 'open' : 'closed')}
      {...props}
    >
      <input
        className={commandInputVariants({ size: resolvedSize })}
        data-slot="command-input"
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-controls={listId}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-activedescendant={
          isOpen && flatFilteredItems[selectedIndex]
            ? `${generatedId}-item-${flatFilteredItems[selectedIndex].id}`
            : undefined
        }
        aria-label={placeholder}
      />
      <div
        className={commandListVariants()}
        data-slot="command-list"
        id={listId}
        ref={listRef}
        role="listbox"
      >
        {filteredGroups.length === 0 && (
          <div className={commandEmptyVariants()} data-slot="command-empty">
            {emptyMessage}
          </div>
        )}
        {filteredGroups.map((group) => (
          <div
            key={group.heading ?? 'default'}
            className={commandGroupVariants()}
            data-slot="command-group"
          >
            {group.heading && (
              <div className={commandGroupHeadingVariants()} data-slot="command-group-heading">
                {group.heading}
              </div>
            )}
            {group.items.map((item) => {
              itemIndex++
              const currentIndex = itemIndex
              const isSelected = currentIndex === selectedIndex

              return (
                <div
                  key={item.id}
                  id={`${generatedId}-item-${item.id}`}
                  className={commandItemVariants({
                    size: resolvedSize,
                    selected: isSelected,
                    disabled: !!item.disabled,
                  })}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={item.disabled || undefined}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(currentIndex)}
                  data-slot="command-item"
                  data-state={dataAttr(isSelected ? 'selected' : 'idle')}
                  data-selected={dataAttr(isSelected)}
                  data-disabled={dataAttr(item.disabled)}
                >
                  {item.icon && (
                    <span className={commandItemIconVariants()} data-slot="command-item-icon">
                      {item.icon}
                    </span>
                  )}
                  <span className={commandItemLabelVariants()} data-slot="command-item-label">
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span
                      className={commandItemShortcutVariants()}
                      data-slot="command-item-shortcut"
                    >
                      {item.shortcut}
                    </span>
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

Command.displayName = 'Command'

export { commandItemVariants }
export default Command
