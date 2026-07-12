import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { useFloating } from '@/hooks'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useEscapeKey, useOverlayState, OverlayPortal, type OverlaySide } from '@/ui/OverlayPortal'
import './DropdownMenu.css'

const dropdownMenuContentVariants = cva('nothing-dropdown-menu__content', {
  variants: {
    visible: { true: 'nothing-dropdown-menu__content--visible', false: '' },
    align: {
      start: 'nothing-dropdown-menu__content--start',
      center: 'nothing-dropdown-menu__content--center',
      end: 'nothing-dropdown-menu__content--end',
    },
  },
  defaultVariants: { visible: false, align: 'start' },
})

const dropdownMenuItemVariants = cva('nothing-dropdown-menu__item', {
  variants: {
    disabled: { true: 'nothing-dropdown-menu__item--disabled', false: '' },
  },
  defaultVariants: { disabled: false },
})

const menubarTriggerVariants = cva('nothing-dropdown-menu__menubar-trigger', {
  variants: {
    active: { true: 'nothing-dropdown-menu__menubar-trigger--active', false: '' },
  },
  defaultVariants: { active: false },
})

const menubarDropdownVariants = cva('nothing-dropdown-menu__menubar-dropdown', {
  variants: {
    visible: { true: 'nothing-dropdown-menu__menubar-dropdown--visible', false: '' },
  },
  defaultVariants: { visible: false },
})

const menubarItemVariants = cva('nothing-dropdown-menu__menubar-item', {
  variants: {
    disabled: { true: 'nothing-dropdown-menu__menubar-item--disabled', false: '' },
  },
  defaultVariants: { disabled: false },
})

export interface DropdownMenuItem {
  label: string
  onClick?: () => void
  disabled?: boolean
  separator?: boolean
  shortcut?: string
  icon?: React.ReactNode
}

export interface MenubarItem {
  label: string
  items?: DropdownMenuItem[]
}

export interface DropdownMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof dropdownMenuContentVariants> {
  trigger?: React.ReactNode
  items: DropdownMenuItem[] | MenubarItem[]
  align?: 'start' | 'center' | 'end'
  side?: OverlaySide
  variant?: 'default' | 'menubar'
  children?: React.ReactNode
}

interface MenubarVariantProps {
  items: MenubarItem[]
}

const MenubarVariant: React.FC<MenubarVariantProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [focusItemIndex, setFocusItemIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const triggerRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  useClickOutside(containerRef, () => {
    setActiveIndex(null)
  })

  const handleTriggerClick = React.useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
    setFocusItemIndex(0)
  }, [])

  const handleTriggerKeyDown = React.useCallback(
    (index: number, e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          setActiveIndex((prev) => {
            const next = (index + 1) % items.length
            triggerRefs.current[next]?.focus()
            return prev !== null ? next : null
          })
          break
        case 'ArrowLeft':
          e.preventDefault()
          setActiveIndex((prev) => {
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
    },
    [items, handleTriggerClick]
  )

  const handleDropdownKeyDown = React.useCallback(
    (triggerIndex: number, e: React.KeyboardEvent) => {
      const dropdownItems = items[triggerIndex].items?.filter((i) => !i.separator) ?? []

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusItemIndex((prev) => Math.min(prev + 1, dropdownItems.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusItemIndex((prev) => Math.max(prev - 1, 0))
          break
        case 'ArrowRight':
          e.preventDefault()
          setActiveIndex((prev) => {
            if (prev === null) return null
            const next = (prev + 1) % items.length
            triggerRefs.current[next]?.focus()
            setFocusItemIndex(0)
            return next
          })
          break
        case 'ArrowLeft':
          e.preventDefault()
          setActiveIndex((prev) => {
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
    },
    [items, focusItemIndex]
  )

  return (
    <div className="nothing-dropdown-menu--menubar" ref={containerRef} role="menubar">
      {items.map((item, index) => {
        const isOpen = activeIndex === index

        let visibleItemIndex = -1

        return (
          <div key={index} style={{ position: 'relative' }}>
            <button
              ref={(el) => {
                triggerRefs.current[index] = el
              }}
              className={cn(menubarTriggerVariants({ active: isOpen }))}
              role="menuitem"
              aria-expanded={isOpen}
              aria-haspopup={item.items ? 'menu' : undefined}
              onClick={() => handleTriggerClick(index)}
              onKeyDown={(e) => handleTriggerKeyDown(index, e)}
              data-state={dataAttr(isOpen ? 'open' : 'closed')}
            >
              {item.label}
            </button>
            {item.items && (
              <div
                className={cn(menubarDropdownVariants({ visible: isOpen }))}
                role="menu"
                onKeyDown={(e) => handleDropdownKeyDown(index, e)}
                data-state={dataAttr(isOpen ? 'open' : 'closed')}
              >
                {item.items.map((dropdownItem, di) => {
                  if (dropdownItem.separator) {
                    return (
                      <div
                        key={di}
                        className="nothing-dropdown-menu__menubar-separator"
                        role="separator"
                      />
                    )
                  }

                  visibleItemIndex++

                  const currentVisibleIndex = visibleItemIndex
                  const isFocused = isOpen && focusItemIndex === currentVisibleIndex

                  return (
                    <div
                      key={di}
                      className={cn(menubarItemVariants({ disabled: !!dropdownItem.disabled }))}
                      role="menuitem"
                      tabIndex={isFocused ? 0 : -1}
                      onClick={() => {
                        if (dropdownItem.disabled) return
                        dropdownItem.onClick?.()
                        setActiveIndex(null)
                      }}
                      onMouseEnter={() => setFocusItemIndex(currentVisibleIndex)}
                      ref={(el) => {
                        if (isFocused) el?.focus()
                      }}
                      data-disabled={dataAttr(dropdownItem.disabled)}
                    >
                      <span className="nothing-dropdown-menu__menubar-item-label">
                        {dropdownItem.label}
                      </span>
                      {dropdownItem.shortcut && (
                        <span className="nothing-dropdown-menu__menubar-item-shortcut">
                          {dropdownItem.shortcut}
                        </span>
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

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, trigger, items, align = 'start', side = 'bottom', variant = 'default', visible: _visible, ...props }, ref) => {
    // Hooks must be called unconditionally. We always wire the dropdown's
    // internal state, then dispatch on `variant` at render time below.
    const { isOpen, toggle, close } = useOverlayState(undefined)
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const itemRefs = React.useRef<(HTMLElement | null)[]>([])
    const { style, update } = useFloating(side)

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

    useEscapeKey(isOpen, () => {
      close()
      triggerRef.current?.focus()
    })

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

    React.useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        update(triggerRef.current, contentRef.current)
      }
    }, [isOpen, update])

    const handleItemSelect = React.useCallback(
      (index: number) => {
        const item = (items as DropdownMenuItem[])[index]
        if (item?.disabled) return
        item?.onClick?.()
        close()
        triggerRef.current?.focus()
      },
      [items, close]
    )

    const defaultItems = items as DropdownMenuItem[]
    const focusableItems = defaultItems.filter((item) => !item.disabled)
    const focusableRefs = focusableItems
      .map((item) => {
        const idx = defaultItems.indexOf(item)
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
          const realIndex = defaultItems.indexOf(actualItem)
          handleItemSelect(realIndex)
        }
      },
    })

    if (variant === 'menubar') {
      return <MenubarVariant items={items as MenubarItem[]} />
    }

    return (
      <div
        ref={setContainerRefs}
        className={cn('nothing-dropdown-menu', className)}
        data-state={dataAttr(isOpen ? 'open' : 'closed')}
        data-variant={dataAttr(variant)}
        {...props}
      >
        <button
          ref={triggerRef}
          className="nothing-dropdown-menu__trigger"
          onClick={toggle}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
        >
          {trigger}
        </button>
        <OverlayPortal open={isOpen}>
          <div
            ref={contentRef}
            className={cn(dropdownMenuContentVariants({ visible: isOpen, align }))}
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
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
            data-align={dataAttr(align)}
          >
            {defaultItems.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  ref={(node) => {
                    itemRefs.current[index] = node
                  }}
                  className={cn(dropdownMenuItemVariants({ disabled: !!item.disabled }))}
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
                  data-disabled={dataAttr(item.disabled)}
                >
                  {item.icon && <span className="nothing-dropdown-menu__item-icon">{item.icon}</span>}
                  <span className="nothing-dropdown-menu__item-label">{item.label}</span>
                  {item.shortcut && (
                    <span className="nothing-dropdown-menu__item-shortcut">{item.shortcut}</span>
                  )}
                </div>
                {item.separator && (
                  <div className="nothing-dropdown-menu__separator" role="separator" />
                )}
              </React.Fragment>
            ))}
          </div>
        </OverlayPortal>
      </div>
    )
  }
)
DropdownMenu.displayName = 'DropdownMenu'

export {
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  menubarTriggerVariants,
  menubarDropdownVariants,
  menubarItemVariants,
}
export default DropdownMenu
