import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useEscapeKey, useOverlayState, OverlayPortal } from '../ui/OverlayPortal'
import '../styles/context-menu.css'

const contextMenuContentVariants = cva('nothing-context-menu__content', {
  variants: {
    visible: { true: 'nothing-context-menu__content--visible', false: '' },
  },
  defaultVariants: { visible: false },
})

const contextMenuItemVariants = cva('nothing-context-menu__item', {
  variants: {
    disabled: { true: 'nothing-context-menu__item--disabled', false: '' },
  },
  defaultVariants: { disabled: false },
})

export interface ContextMenuItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
}

export interface ContextMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof contextMenuContentVariants> {
  items: ContextMenuItem[]
  children: React.ReactElement
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, items, visible: _visible, children, ...props }, ref) => {
    const { isOpen, close, setOpen } = useOverlayState(undefined)
    const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 })
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const itemRefs = React.useRef<(HTMLElement | null)[]>([])

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

    // Click outside covers both the trigger wrapper AND the portaled content
    // (content lives in document.body after portal, so containerRef alone is not enough).
    React.useEffect(() => {
      if (!isOpen) return
      const handler = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node | null
        if (!target) return
        if (containerRef.current?.contains(target)) return
        if (contentRef.current?.contains(target)) return
        close()
      }
      document.addEventListener('mousedown', handler)
      document.addEventListener('touchstart', handler)
      return () => {
        document.removeEventListener('mousedown', handler)
        document.removeEventListener('touchstart', handler)
      }
    }, [isOpen, close])

    useEscapeKey(isOpen, close)

    const handleContextMenu = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        setPosition({ top: e.clientY, left: e.clientX })
        setOpen(true)
        setActiveIndex(-1)
      },
      [setOpen]
    )

    const handleItemSelect = React.useCallback(
      (index: number) => {
        const item = items[index]
        if (item?.disabled) return
        item?.onClick?.()
        close()
      },
      [items, close]
    )

    const focusableItems = items.filter((item) => !item.disabled)
    const focusableRefs = focusableItems
      .map((item) => {
        const idx = items.indexOf(item)
        return itemRefs.current[idx]
      })
      .filter(Boolean) as HTMLElement[]

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
      },
    })

    return (
      <div
        ref={setContainerRefs}
        className={cn('nothing-context-menu', className)}
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        {...props}
      >
        <div className="nothing-context-menu__trigger" onContextMenu={handleContextMenu}>
          {children}
        </div>
        <OverlayPortal open={isOpen}>
          <div
            ref={contentRef}
            className={cn(contextMenuContentVariants({ visible: isOpen }))}
            role="menu"
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 'var(--z-dropdown)',
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
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  className={cn(contextMenuItemVariants({ disabled: !!item.disabled }))}
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
                  data-disabled={dataAttr(item.disabled)}
                >
                  <span className="nothing-context-menu__item-label">{item.label}</span>
                  {item.shortcut && (
                    <span className="nothing-context-menu__item-shortcut">{item.shortcut}</span>
                  )}
                </div>
                {item.separator && (
                  <div className="nothing-context-menu__separator" role="separator" />
                )}
              </React.Fragment>
            ))}
          </div>
        </OverlayPortal>
      </div>
    )
  }
)
ContextMenu.displayName = 'ContextMenu'

export { contextMenuContentVariants, contextMenuItemVariants }
export default ContextMenu
