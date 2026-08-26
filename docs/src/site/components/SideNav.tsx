import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface SideNavLink {
  to: string
  label: string
  /** 右侧的小角标，例如 NEW / BETA。 */
  badge?: string
}

export interface SideNavGroup {
  id: string
  label: string
  /** 分组标题右侧的计数，appica 的组件侧栏就是这么标的。 */
  count?: number
  links: SideNavLink[]
}

export function SideNav({
  groups,
  className,
  ariaLabel,
}: {
  groups: SideNavGroup[]
  className?: string
  ariaLabel?: string
}) {
  return (
    <nav
      data-slot="side-nav"
      aria-label={ariaLabel}
      className={cn(
        'flex w-full flex-col gap-8 lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:w-60 lg:shrink-0 lg:overflow-y-auto lg:py-8 lg:pe-4',
        className,
      )}
    >
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between px-3 pb-1">
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {group.label}
            </span>
            {group.count !== undefined && (
              <span className="font-mono text-micro text-foreground-subtle">{group.count}</span>
            )}
          </div>

          {group.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-card-technical px-3 py-1.5 text-sm no-underline',
                  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
                  isActive
                    ? 'bg-muted text-foreground-display'
                    : 'text-foreground-muted hover:bg-muted hover:text-foreground',
                )
              }
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="ms-2 rounded-2xs border border-border px-1 font-mono text-micro uppercase text-foreground-subtle">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

export default SideNav
