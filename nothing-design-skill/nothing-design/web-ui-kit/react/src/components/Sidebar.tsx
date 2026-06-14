import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/sidebar.css'

const sidebarVariants = cva('nothing-sidebar', {
  variants: {
    collapsed: { true: 'nothing-sidebar--collapsed', false: '' },
  },
  defaultVariants: { collapsed: false },
})

const sidebarItemVariants = cva('nothing-sidebar__item', {
  variants: {
    active: { true: 'nothing-sidebar__item--active', false: '' },
  },
  defaultVariants: { active: false },
})

export interface SidebarItem {
  icon?: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: string | number
}

export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>,
    VariantProps<typeof sidebarVariants> {
  items: SidebarItem[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    { className, items, collapsed: controlledCollapsed, onCollapsedChange, header, footer, ...props },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(false)
    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed

    const handleToggle = React.useCallback(() => {
      const next = !isCollapsed
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(next)
      }
      onCollapsedChange?.(next)
    }, [isCollapsed, controlledCollapsed, onCollapsedChange])

    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ collapsed: isCollapsed }), className)}
        role="navigation"
        aria-label="Sidebar navigation"
        data-state={dataAttr(isCollapsed ? 'collapsed' : 'expanded')}
        {...props}
      >
        {header && <div className="nothing-sidebar__header">{header}</div>}
        <button
          className="nothing-sidebar__toggle"
          onClick={handleToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
        <ul className="nothing-sidebar__list">
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(sidebarItemVariants({ active: !!item.active }))}
              data-state={dataAttr(item.active ? 'active' : 'inactive')}
            >
              <a
                className="nothing-sidebar__item-link"
                href={item.href ?? undefined}
                onClick={(e) => {
                  e.preventDefault()
                  item.onClick?.()
                }}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon && <span className="nothing-sidebar__item-icon">{item.icon}</span>}
                {!isCollapsed && (
                  <span className="nothing-sidebar__item-label">{item.label}</span>
                )}
                {item.badge !== undefined && !isCollapsed && (
                  <span className="nothing-sidebar__item-badge">{item.badge}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
        {footer && <div className="nothing-sidebar__footer">{footer}</div>}
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export { sidebarVariants, sidebarItemVariants }
export default Sidebar
