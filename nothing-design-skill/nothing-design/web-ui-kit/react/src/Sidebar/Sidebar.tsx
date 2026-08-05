import * as React from 'react'
import { useDirection } from '@/DirectionProvider'
import { cn, dataAttr } from '@/lib/utils'
import {
  sidebarFooterVariants,
  sidebarHeaderVariants,
  sidebarItemBadgeVariants,
  sidebarItemIconVariants,
  sidebarItemLabelVariants,
  sidebarItemLinkVariants,
  sidebarItemVariants,
  sidebarListVariants,
  sidebarToggleVariants,
  sidebarVariants,
} from './sidebar-variants'

export interface SidebarItem {
  icon?: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
  badge?: string | number
}

export interface SidebarProps extends Omit<
  React.ComponentPropsWithRef<'aside'>,
  'onChange' | 'children'
> {
  items: SidebarItem[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  header?: React.ReactNode
  footer?: React.ReactNode
}

export function Sidebar({
  className,
  items,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  header,
  footer,
  ...props
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false)
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed
  const { dir } = useDirection()

  const handleToggle = React.useCallback(() => {
    const next = !isCollapsed
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(next)
    }
    onCollapsedChange?.(next)
  }, [isCollapsed, controlledCollapsed, onCollapsedChange])

  // 箭头指向「侧栏会往哪边动」，所以要跟着书写方向翻。
  const toggleGlyph = isCollapsed === (dir === 'rtl') ? '←' : '→'

  return (
    <aside
      className={cn(sidebarVariants({ collapsed: isCollapsed }), className)}
      role="navigation"
      aria-label="Sidebar navigation"
      data-slot="sidebar"
      data-state={dataAttr(isCollapsed ? 'collapsed' : 'expanded')}
      data-collapsed={dataAttr(isCollapsed)}
      {...props}
    >
      {header && (
        <div data-slot="sidebar-header" className={sidebarHeaderVariants()}>
          {header}
        </div>
      )}
      <button
        data-slot="sidebar-toggle"
        className={sidebarToggleVariants()}
        onClick={handleToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {toggleGlyph}
      </button>
      <ul data-slot="sidebar-list" className={sidebarListVariants()}>
        {items.map((item, index) => (
          <li
            key={index}
            data-slot="sidebar-item"
            className={sidebarItemVariants({ active: !!item.active })}
            data-state={dataAttr(item.active ? 'active' : 'inactive')}
            data-active={dataAttr(!!item.active)}
          >
            <a
              data-slot="sidebar-item-link"
              className={sidebarItemLinkVariants({ active: !!item.active, collapsed: isCollapsed })}
              href={item.href ?? undefined}
              onClick={(e) => {
                e.preventDefault()
                item.onClick?.()
              }}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon && (
                <span data-slot="sidebar-item-icon" className={sidebarItemIconVariants()}>
                  {item.icon}
                </span>
              )}
              {!isCollapsed && (
                <span data-slot="sidebar-item-label" className={sidebarItemLabelVariants()}>
                  {item.label}
                </span>
              )}
              {item.badge !== undefined && !isCollapsed && (
                <span data-slot="sidebar-item-badge" className={sidebarItemBadgeVariants()}>
                  {item.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {footer && (
        <div data-slot="sidebar-footer" className={sidebarFooterVariants()}>
          {footer}
        </div>
      )}
    </aside>
  )
}

Sidebar.displayName = 'Sidebar'

export { sidebarVariants, sidebarItemVariants }
export default Sidebar
