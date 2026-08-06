import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn, dataAttr } from '@/lib/utils'
import {
  navigationMenuCaretVariants,
  navigationMenuItemVariants,
  navigationMenuLinkVariants,
  navigationMenuListVariants,
  navigationMenuSubmenuItemVariants,
  navigationMenuSubmenuLinkVariants,
  navigationMenuSubmenuVariants,
  navigationMenuVariants,
} from './navigation-menu-variants'

export interface NavMenuItem {
  label: string
  href?: string
  onClick?: () => void
  children?: NavMenuItem[]
  active?: boolean
}

export type NavigationMenuOrientation = 'horizontal' | 'vertical'

export interface NavigationMenuProps extends Omit<React.ComponentPropsWithRef<'nav'>, 'children'> {
  items: NavMenuItem[]
  orientation?: NavigationMenuOrientation
}

const LINK_SELECTOR = '[data-slot="navigation-menu-link"]'

/** 方向键在 RTL 下要整体翻面，否则「右」会走向列表的开头。 */
function isRtlElement(element: Element): boolean {
  return getComputedStyle(element).direction === 'rtl'
}

export function NavigationMenu({
  className,
  items,
  orientation = 'horizontal',
  style,
  ...props
}: NavigationMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  useClickOutside(containerRef, () => {
    setOpenIndex(null)
  })

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.querySelector<HTMLElement>(LINK_SELECTOR)?.focus()
  }, [])

  const handleTriggerClick = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  const handleTriggerKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      const isHorizontal = orientation === 'horizontal'
      const rtl = isRtlElement(e.currentTarget)
      // 「朝向列表末尾」的那个横向按键
      const forwardKey = rtl ? 'ArrowLeft' : 'ArrowRight'
      const backwardKey = rtl ? 'ArrowRight' : 'ArrowLeft'

      const step = (delta: number) => {
        const next = (index + delta + items.length) % items.length
        focusItem(next)
      }

      switch (e.key) {
        case forwardKey:
          e.preventDefault()
          if (isHorizontal) {
            step(1)
          } else if (items[index].children) {
            setOpenIndex(index)
          }
          break
        case backwardKey:
          e.preventDefault()
          if (isHorizontal) {
            step(-1)
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (!isHorizontal) {
            step(1)
          } else if (items[index].children) {
            setOpenIndex(index)
            setFocusIndex(0)
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (!isHorizontal) {
            step(-1)
          }
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (items[index].children) {
            setOpenIndex((prev) => (prev === index ? null : index))
          } else {
            items[index].onClick?.()
          }
          break
        case 'Escape':
          e.preventDefault()
          setOpenIndex(null)
          break
      }
    },
    [orientation, items, focusItem],
  )

  const handleSubmenuKeyDown = useCallback(
    (itemIndex: number, e: React.KeyboardEvent) => {
      const subItems = items[itemIndex].children ?? []
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusIndex((prev) => (prev !== null ? Math.min(prev + 1, subItems.length - 1) : 0))
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusIndex((prev) => (prev !== null ? Math.max(prev - 1, 0) : 0))
          break
        case 'Escape':
          e.preventDefault()
          setOpenIndex(null)
          focusItem(itemIndex)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusIndex !== null) {
            subItems[focusIndex]?.onClick?.()
            setOpenIndex(null)
          }
          break
      }
    },
    [items, focusIndex, focusItem],
  )

  return (
    <nav
      className={cn(navigationMenuVariants({ orientation }), className)}
      style={style}
      data-slot="navigation-menu"
      data-orientation={dataAttr(orientation)}
      {...props}
    >
      <div ref={containerRef}>
        <ul
          className={navigationMenuListVariants({ orientation })}
          data-slot="navigation-menu-list"
          role={orientation === 'horizontal' ? 'menubar' : 'menu'}
        >
          {items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0
            const isOpen = openIndex === index

            return (
              <li
                key={index}
                className={navigationMenuItemVariants()}
                data-slot="navigation-menu-item"
                data-active={dataAttr(item.active)}
                data-has-children={dataAttr(hasChildren)}
                data-open={dataAttr(isOpen)}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
              >
                <a
                  className={navigationMenuLinkVariants({ active: item.active })}
                  data-slot="navigation-menu-link"
                  href={item.href ?? undefined}
                  role="menuitem"
                  aria-expanded={hasChildren ? isOpen : undefined}
                  aria-haspopup={hasChildren ? 'menu' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    if (hasChildren) {
                      handleTriggerClick(index)
                    } else {
                      item.onClick?.()
                    }
                  }}
                  onKeyDown={(e) => handleTriggerKeyDown(index, e)}
                >
                  {item.label}
                  {hasChildren && (
                    <span
                      className={navigationMenuCaretVariants()}
                      data-slot="navigation-menu-caret"
                      aria-hidden="true"
                    />
                  )}
                </a>
                {hasChildren && (
                  <div
                    className={navigationMenuSubmenuVariants({ orientation })}
                    data-slot="navigation-menu-submenu"
                    data-open={dataAttr(isOpen)}
                    role="menu"
                    onKeyDown={(e) => handleSubmenuKeyDown(index, e)}
                  >
                    {item.children!.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className={navigationMenuSubmenuItemVariants()}
                        data-slot="navigation-menu-submenu-item"
                        role="none"
                      >
                        <a
                          className={navigationMenuSubmenuLinkVariants()}
                          data-slot="navigation-menu-submenu-link"
                          href={subItem.href ?? undefined}
                          role="menuitem"
                          tabIndex={isOpen ? (focusIndex === subIndex ? 0 : -1) : -1}
                          onClick={(e) => {
                            e.preventDefault()
                            subItem.onClick?.()
                            setOpenIndex(null)
                          }}
                          ref={(el) => {
                            if (isOpen && focusIndex === subIndex) {
                              el?.focus()
                            }
                          }}
                        >
                          {subItem.label}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

NavigationMenu.displayName = 'NavigationMenu'

export {
  navigationMenuVariants,
  navigationMenuListVariants,
  navigationMenuItemVariants,
  navigationMenuLinkVariants,
  navigationMenuCaretVariants,
  navigationMenuSubmenuVariants,
  navigationMenuSubmenuItemVariants,
  navigationMenuSubmenuLinkVariants,
}
export default NavigationMenu
