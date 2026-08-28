import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useT } from '../i18n'
import { groupedComponentManifest } from '../registry'
import {
  COMPONENT_PAGES,
  getComponentPageHref,
  type ComponentPage,
} from '../registry/component-pages'

interface ComponentGroupNavProps {
  activePage: ComponentPage
  groups: ReturnType<typeof groupedComponentManifest>
}

export function ComponentGroupNav({ activePage, groups }: ComponentGroupNavProps) {
  const { t, tb } = useT()

  return (
    <nav
      aria-label={t('组件分组分页', 'Component group pages')}
      className="grid overflow-hidden rounded-2xl border border-border sm:grid-cols-3"
    >
      {COMPONENT_PAGES.map((page) => {
        const count = groups
          .filter(({ category }) => page.categoryIds.includes(category.id))
          .reduce((sum, group) => sum + group.entries.length, 0)
        const active = page.id === activePage.id

        return (
          <Link
            key={page.id}
            to={getComponentPageHref(page.id)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex min-w-0 flex-col gap-2 p-4 no-underline',
              'transition-colors duration-200 motion-reduce:transition-none',
              active
                ? 'bg-foreground-display text-background'
                : 'text-foreground-display hover:bg-muted',
            )}
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="docs-group-nav-title text-subheading">{tb(page.label)}</span>
              <span
                className={cn(
                  'font-mono text-label',
                  active ? 'opacity-60' : 'text-foreground-subtle',
                )}
              >
                {count}
              </span>
            </span>
            <span
              className={cn(
                'text-sm leading-relaxed',
                active ? 'opacity-70' : 'text-foreground-muted',
              )}
            >
              {tb(page.description)}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
