import { useState, useRef, useCallback } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import '../styles/navigation-menu.css'

interface NavMenuItem {
  label: string
  href?: string
  onClick?: () => void
  children?: NavMenuItem[]
  active?: boolean
}

interface NavigationMenuProps {
  items: NavMenuItem[]
  orientation?: 'horizontal' | 'vertical'
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  orientation = 'horizontal'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  useClickOutside(containerRef, () => {
    setOpenIndex(null)
  })

  const handleTriggerClick = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }, [])

  const handleTriggerKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    const isHorizontal = orientation === 'horizontal'

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        if (isHorizontal) {
          const next = (index + 1) % items.length
          itemRefs.current[next]?.querySelector<HTMLElement>('.nothing-nav-menu__link')?.focus()
        } else if (items[index].children) {
          setOpenIndex(index)
        }
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (isHorizontal) {
          const prev = (index - 1 + items.length) % items.length
          itemRefs.current[prev]?.querySelector<HTMLElement>('.nothing-nav-menu__link')?.focus()
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isHorizontal) {
          const next = (index + 1) % items.length
          itemRefs.current[next]?.querySelector<HTMLElement>('.nothing-nav-menu__link')?.focus()
        } else if (items[index].children) {
          setOpenIndex(index)
          setFocusIndex(0)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isHorizontal) {
          const prev = (index - 1 + items.length) % items.length
          itemRefs.current[prev]?.querySelector<HTMLElement>('.nothing-nav-menu__link')?.focus()
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (items[index].children) {
          setOpenIndex(prev => prev === index ? null : index)
        } else {
          items[index].onClick?.()
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpenIndex(null)
        break
    }
  }, [orientation, items])

  const handleSubmenuKeyDown = useCallback((itemIndex: number, e: React.KeyboardEvent) => {
    const subItems = items[itemIndex].children ?? []
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusIndex(prev => prev !== null ? Math.min(prev + 1, subItems.length - 1) : 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusIndex(prev => prev !== null ? Math.max(prev - 1, 0) : 0)
        break
      case 'Escape':
        e.preventDefault()
        setOpenIndex(null)
        itemRefs.current[itemIndex]?.querySelector<HTMLElement>('.nothing-nav-menu__link')?.focus()
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
  }, [items, focusIndex])

  const containerClassNames = [
    'nothing-nav-menu',
    `nothing-nav-menu--${orientation}`
  ].join(' ')

  return (
    <nav className={containerClassNames} ref={containerRef}>
      <ul className="nothing-nav-menu__list" role={orientation === 'horizontal' ? 'menubar' : 'menu'}>
        {items.map((item, index) => {
          const hasChildren = item.children && item.children.length > 0
          const isOpen = openIndex === index

          const itemClassNames = [
            'nothing-nav-menu__item',
            item.active ? 'nothing-nav-menu__item--active' : '',
            hasChildren ? 'nothing-nav-menu__item--has-children' : ''
          ].filter(Boolean).join(' ')

          return (
            <li key={index} className={itemClassNames} ref={el => { itemRefs.current[index] = el }}>
              <a
                className="nothing-nav-menu__link"
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
              </a>
              {hasChildren && (
                <div
                  className={[
                    'nothing-nav-menu__submenu',
                    isOpen ? 'nothing-nav-menu__submenu--visible' : ''
                  ].filter(Boolean).join(' ')}
                  role="menu"
                  onKeyDown={(e) => handleSubmenuKeyDown(index, e)}
                >
                  {item.children!.map((subItem, subIndex) => (
                    <div key={subIndex} className="nothing-nav-menu__submenu-item" role="none">
                      <a
                        className="nothing-nav-menu__submenu-link"
                        href={subItem.href ?? undefined}
                        role="menuitem"
                        tabIndex={isOpen ? (focusIndex === subIndex ? 0 : -1) : -1}
                        onClick={(e) => {
                          e.preventDefault()
                          subItem.onClick?.()
                          setOpenIndex(null)
                        }}
                        ref={el => {
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
    </nav>
  )
}

export default NavigationMenu
