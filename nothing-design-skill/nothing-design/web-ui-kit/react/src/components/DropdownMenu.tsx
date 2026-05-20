import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDisclosure, useFloating, useClickOutside, useKeyboardNavigation } from '../hooks'
import '../styles/dropdown-menu.css'

interface DropdownMenuItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

interface MenubarItem {
  label: string
  items?: DropdownMenuItem[]
}

interface DropdownMenuProps {
  trigger?: React.ReactNode
  items: DropdownMenuItem[] | MenubarItem[]
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom'
  variant?: 'default' | 'menubar'
}

const MenubarVariant: React.FC<{ items: MenubarItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [focusItemIndex, setFocusItemIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  useClickOutside(containerRef, () => {
    setActiveIndex(null)
  })

  const handleTriggerClick = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index)
    setFocusItemIndex(0)
  }, [])

  const handleTriggerKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        setActiveIndex(prev => {
          const next = (index + 1) % items.length
          triggerRefs.current[next]?.focus()
          return prev !== null ? next : null
        })
        break
      case 'ArrowLeft':
        e.preventDefault()
        setActiveIndex(prev => {
          const prevIdx = (index - 1 + items.length) % items.length
          triggerRefs.current[prevIdx]?.focus()
          return prev !== null ? prevIdx : null
        })
        break
      case 'ArrowDown':
        e.preventDefault()
        if (items[index].items) {
          setActiveIndex(index)
          setFocusItemIndex(0)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleTriggerClick(index)
        break
      case 'Escape':
        e.preventDefault()
        setActiveIndex(null)
        break
    }
  }, [items, handleTriggerClick])

  const handleDropdownKeyDown = useCallback((triggerIndex: number, e: React.KeyboardEvent) => {
    const dropdownItems = items[triggerIndex].items?.filter(i => !i.separator) ?? []

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusItemIndex(prev => Math.min(prev + 1, dropdownItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusItemIndex(prev => Math.max(prev - 1, 0))
        break
      case 'ArrowRight':
        e.preventDefault()
        setActiveIndex(prev => {
          if (prev === null) return null
          const next = (prev + 1) % items.length
          triggerRefs.current[next]?.focus()
          setFocusItemIndex(0)
          return next
        })
        break
      case 'ArrowLeft':
        e.preventDefault()
        setActiveIndex(prev => {
          if (prev === null) return null
          const prevIdx = (prev - 1 + items.length) % items.length
          triggerRefs.current[prevIdx]?.focus()
          setFocusItemIndex(0)
          return prevIdx
        })
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (dropdownItems[focusItemIndex]) {
          dropdownItems[focusItemIndex].onClick?.()
          setActiveIndex(null)
        }
        break
      case 'Escape':
        e.preventDefault()
        setActiveIndex(null)
        triggerRefs.current[triggerIndex]?.focus()
        break
    }
  }, [items, focusItemIndex])

  return (
    <div className="nothing-dropdown-menu--menubar" ref={containerRef} role="menubar">
      {items.map((item, index) => {
        const isOpen = activeIndex === index

        const triggerClassNames = [
          'nothing-dropdown-menu__menubar-trigger',
          isOpen ? 'nothing-dropdown-menu__menubar-trigger--active' : ''
        ].filter(Boolean).join(' ')

        const dropdownClassNames = [
          'nothing-dropdown-menu__menubar-dropdown',
          isOpen ? 'nothing-dropdown-menu__menubar-dropdown--visible' : ''
        ].filter(Boolean).join(' ')

        let visibleItemIndex = -1

        return (
          <div key={index} style={{ position: 'relative' }}>
            <button
              ref={el => { triggerRefs.current[index] = el }}
              className={triggerClassNames}
              role="menuitem"
              aria-expanded={isOpen}
              aria-haspopup={item.items ? 'menu' : undefined}
              onClick={() => handleTriggerClick(index)}
              onKeyDown={(e) => handleTriggerKeyDown(index, e)}
            >
              {item.label}
            </button>
            {item.items && (
              <div
                className={dropdownClassNames}
                role="menu"
                onKeyDown={(e) => handleDropdownKeyDown(index, e)}
              >
                {item.items.map((dropdownItem, di) => {
                  if (dropdownItem.separator) {
                    return <div key={di} className="nothing-dropdown-menu__menubar-separator" role="separator" />
                  }

                  visibleItemIndex++

                  const currentVisibleIndex = visibleItemIndex
                  const isFocused = isOpen && focusItemIndex === currentVisibleIndex

                  const itemClassNames = [
                    'nothing-dropdown-menu__menubar-item',
                    dropdownItem.disabled ? 'nothing-dropdown-menu__menubar-item--disabled' : ''
                  ].filter(Boolean).join(' ')

                  return (
                    <div
                      key={di}
                      className={itemClassNames}
                      role="menuitem"
                      tabIndex={isFocused ? 0 : -1}
                      onClick={() => {
                        if (dropdownItem.disabled) return
                        dropdownItem.onClick?.()
                        setActiveIndex(null)
                      }}
                      onMouseEnter={() => setFocusItemIndex(currentVisibleIndex)}
                      ref={el => {
                        if (isFocused) el?.focus()
                      }}
                    >
                      <span className="nothing-dropdown-menu__menubar-item-label">{dropdownItem.label}</span>
                      {dropdownItem.shortcut && (
                        <span className="nothing-dropdown-menu__menubar-item-shortcut">{dropdownItem.shortcut}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'start',
  side = 'bottom',
  variant = 'default'
}) => {
  if (variant === 'menubar') {
    return <MenubarVariant items={items as MenubarItem[]} />
  }

  const { isOpen, toggle, close } = useDisclosure(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const { style, update } = useFloating(side)

  useClickOutside(containerRef, () => {
    if (isOpen) close()
  })

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      update(triggerRef.current, contentRef.current)
    }
  }, [isOpen, update])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, close])

  const handleItemSelect = useCallback((index: number) => {
    const item = (items as DropdownMenuItem[])[index]
    if (item?.disabled) return
    item?.onClick?.()
    close()
    triggerRef.current?.focus()
  }, [items, close])

  const defaultItems = items as DropdownMenuItem[]
  const focusableItems = defaultItems.filter(item => !item.disabled)
  const focusableRefs = focusableItems.map(item => {
    const idx = defaultItems.indexOf(item)
    return itemRefs.current[idx]
  }).filter(Boolean) as HTMLElement[]

  const handleKeyDown = useKeyboardNavigation({
    items: focusableRefs,
    orientation: 'vertical',
    loop: true,
    onSelect: (focusableIndex) => {
      const actualItem = focusableItems[focusableIndex]
      if (actualItem) {
        const realIndex = defaultItems.indexOf(actualItem)
        handleItemSelect(realIndex)
      }
    }
  })

  const contentClassNames = [
    'nothing-dropdown-menu__content',
    isOpen ? 'nothing-dropdown-menu__content--visible' : '',
    `nothing-dropdown-menu__content--${align}`
  ].filter(Boolean).join(' ')

  return (
    <div className="nothing-dropdown-menu" ref={containerRef}>
      <button
        ref={triggerRef}
        className="nothing-dropdown-menu__trigger"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>
      <div
        ref={contentRef}
        className={contentClassNames}
        role="menu"
        style={style}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            const firstFocusable = focusableItems[0]
            if (firstFocusable) {
              const idx = defaultItems.indexOf(firstFocusable)
              itemRefs.current[idx]?.focus()
            }
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const lastFocusable = focusableItems[focusableItems.length - 1]
            if (lastFocusable) {
              const idx = defaultItems.indexOf(lastFocusable)
              itemRefs.current[idx]?.focus()
            }
          }
        }}
      >
        {defaultItems.map((item, index) => (
          <React.Fragment key={index}>
            <div
              ref={(node) => { itemRefs.current[index] = node }}
              className={[
                'nothing-dropdown-menu__item',
                item.disabled ? 'nothing-dropdown-menu__item--disabled' : ''
              ].filter(Boolean).join(' ')}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled || undefined}
              onClick={() => handleItemSelect(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleItemSelect(index)
                } else {
                  const focusableIndex = focusableItems.indexOf(defaultItems[index])
                  if (focusableIndex >= 0) {
                    handleKeyDown(e, focusableIndex)
                  }
                }
              }}
            >
              {item.icon && <span className="nothing-dropdown-menu__item-icon">{item.icon}</span>}
              <span className="nothing-dropdown-menu__item-label">{item.label}</span>
              {item.shortcut && (
                <span className="nothing-dropdown-menu__item-shortcut">{item.shortcut}</span>
              )}
            </div>
            {item.separator && <div className="nothing-dropdown-menu__separator" role="separator" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default DropdownMenu
