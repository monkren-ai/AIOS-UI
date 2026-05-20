import { useState, useCallback } from 'react'
import '../styles/sidebar.css'

interface SidebarItem {
  icon?: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: string | number
}

interface SidebarProps {
  items: SidebarItem[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  header,
  footer
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

  const handleToggle = useCallback(() => {
    const next = !isCollapsed
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(next)
    }
    onCollapsedChange?.(next)
  }, [isCollapsed, controlledCollapsed, onCollapsedChange])

  const containerClassNames = [
    'nothing-sidebar',
    isCollapsed ? 'nothing-sidebar--collapsed' : ''
  ].filter(Boolean).join(' ')

  return (
    <aside
      className={containerClassNames}
      role="navigation"
      aria-label="Sidebar navigation"
    >
      {header && (
        <div className="nothing-sidebar__header">
          {header}
        </div>
      )}
      <button
        className="nothing-sidebar__toggle"
        onClick={handleToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>
      <ul className="nothing-sidebar__list">
        {items.map((item, index) => {
          const itemClassNames = [
            'nothing-sidebar__item',
            item.active ? 'nothing-sidebar__item--active' : ''
          ].filter(Boolean).join(' ')

          return (
            <li key={index} className={itemClassNames}>
              <a
                className="nothing-sidebar__item-link"
                href={item.href ?? undefined}
                onClick={(e) => {
                  e.preventDefault()
                  item.onClick?.()
                }}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon && (
                  <span className="nothing-sidebar__item-icon">{item.icon}</span>
                )}
                {!isCollapsed && (
                  <span className="nothing-sidebar__item-label">{item.label}</span>
                )}
                {item.badge !== undefined && !isCollapsed && (
                  <span className="nothing-sidebar__item-badge">{item.badge}</span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
      {footer && (
        <div className="nothing-sidebar__footer">
          {footer}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
