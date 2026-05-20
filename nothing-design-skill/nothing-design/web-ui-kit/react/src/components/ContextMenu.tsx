import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useClickOutside, useKeyboardNavigation } from '../hooks'
import '../styles/context-menu.css'

interface ContextMenuItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
}

interface ContextMenuProps {
  items: ContextMenuItem[]
  children: React.ReactElement
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children
}) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [activeIndex, setActiveIndex] = useState(-1)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const close = useCallback(() => {
    setVisible(false)
    setActiveIndex(-1)
  }, [])

  useClickOutside(containerRef, () => {
    if (visible) close()
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        close()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [visible, close])

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ top: e.clientY, left: e.clientX })
    setVisible(true)
    setActiveIndex(-1)
  }, [])

  const handleItemSelect = useCallback((index: number) => {
    const item = items[index]
    if (item?.disabled) return
    item?.onClick?.()
    close()
  }, [items, close])

  const focusableItems = items.filter(item => !item.disabled)
  const focusableRefs = focusableItems.map(item => {
    const idx = items.indexOf(item)
    return itemRefs.current[idx]
  }).filter(Boolean) as HTMLElement[]

  const handleKeyDown = useKeyboardNavigation({
    items: focusableRefs,
    orientation: 'vertical',
    loop: true,
    onSelect: (focusableIndex) => {
      const actualItem = focusableItems[focusableIndex]
      if (actualItem) {
        const realIndex = items.indexOf(actualItem)
        handleItemSelect(realIndex)
      }
    }
  })

  const contentClassNames = [
    'nothing-context-menu__content',
    visible ? 'nothing-context-menu__content--visible' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className="nothing-context-menu" ref={containerRef}>
      <div
        className="nothing-context-menu__trigger"
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
      <div
        ref={contentRef}
        className={contentClassNames}
        role="menu"
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex: 'var(--z-overlay)'
        }}
        onKeyDown={(e) => {
          if (activeIndex >= 0) {
            const focusableIndex = focusableItems.indexOf(items[activeIndex])
            if (focusableIndex >= 0) {
              handleKeyDown(e, focusableIndex)
            }
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            const firstFocusable = focusableItems[0]
            if (firstFocusable) {
              const idx = items.indexOf(firstFocusable)
              setActiveIndex(idx)
              itemRefs.current[idx]?.focus()
            }
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const lastFocusable = focusableItems[focusableItems.length - 1]
            if (lastFocusable) {
              const idx = items.indexOf(lastFocusable)
              setActiveIndex(idx)
              itemRefs.current[idx]?.focus()
            }
          }
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div
              ref={(node) => { itemRefs.current[index] = node }}
              className={[
                'nothing-context-menu__item',
                item.disabled ? 'nothing-context-menu__item--disabled' : ''
              ].filter(Boolean).join(' ')}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled || undefined}
              onClick={() => handleItemSelect(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleItemSelect(index)
                }
              }}
              onFocus={() => setActiveIndex(index)}
            >
              <span className="nothing-context-menu__item-label">{item.label}</span>
              {item.shortcut && (
                <span className="nothing-context-menu__item-shortcut">{item.shortcut}</span>
              )}
            </div>
            {item.separator && <div className="nothing-context-menu__separator" role="separator" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ContextMenu
