import { Link, useSearchParams } from 'react-router-dom'
import { useT } from '../i18n'
import { getComponentName, groupedComponentManifest } from '../registry'
import {
  COMPONENT_PAGES,
  getComponentPage,
  getComponentPageHref,
} from '../registry/component-pages'

export function ComponentsIndexPage() {
  const { t, tb, lang } = useT()
  const [searchParams] = useSearchParams()
  const allGroups = groupedComponentManifest()
  const page = getComponentPage(searchParams.get('group'))
  const groups = allGroups.filter(({ category }) => page.categoryIds.includes(category.id))
  const total = allGroups.reduce((sum, group) => sum + group.entries.length, 0)
  const pageTotal = groups.reduce((sum, group) => sum + group.entries.length, 0)
  const pageIndex = COMPONENT_PAGES.findIndex(({ id }) => id === page.id)

  return (
    <div className="flex w-full max-w-none flex-col gap-12 pb-24">
      <header className="flex flex-col gap-3">
        <h1 className="text-display-sm text-foreground-display">{t('组件', 'Components')}</h1>
        <p className="text-subheading text-foreground-muted">
          {t(
            `${total} 个已收录文档的组件，分为基础、AI Agent 与其他组件三页。当前展示 ${pageTotal} 个组件。`,
            `${total} documented components across basic, AI Agent, and other pages. This page contains ${pageTotal} components.`,
          )}
        </p>
      </header>

      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {String(pageIndex + 1).padStart(2, '0')} / {String(COMPONENT_PAGES.length).padStart(2, '0')}
        </span>
        <h2 className="text-display-sm text-foreground-display">{tb(page.label)}</h2>
        <p className="text-foreground-muted">{tb(page.description)}</p>
      </div>

      {groups.map(({ category, entries }) => (
        <section key={category.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-heading text-foreground-display">{tb(category.label)}</h2>
            <p className="text-sm text-foreground-muted">{tb(category.description)}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {entries.map((doc) => (
              <Link
                key={doc.slug}
                to={`/components/${doc.slug}`}
                className="flex flex-col gap-1 rounded-card-compact border border-border p-4 no-underline transition-colors duration-200 hover:border-border-visible motion-reduce:transition-none"
              >
                <span className="flex items-baseline justify-between gap-3 text-foreground-display">
                  <span>{getComponentName(doc, lang)}</span>
                  {lang === 'zh' && (
                    <span className="font-mono text-label text-foreground-subtle">{doc.name}</span>
                  )}
                </span>
                <span className="text-sm leading-relaxed text-foreground-muted">
                  {tb(doc.description)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <nav
        aria-label={t('组件目录翻页', 'Component directory pagination')}
        className="flex items-center justify-between gap-4 border-t border-border pt-6"
      >
        {pageIndex > 0 ? (
          <Link
            to={getComponentPageHref(COMPONENT_PAGES[pageIndex - 1].id)}
            className="font-mono text-label uppercase tracking-widest text-foreground-muted no-underline hover:text-foreground-display"
          >
            ← {tb(COMPONENT_PAGES[pageIndex - 1].label)}
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
        <span className="font-mono text-label text-foreground-subtle">
          {pageIndex + 1} / {COMPONENT_PAGES.length}
        </span>
        {pageIndex < COMPONENT_PAGES.length - 1 ? (
          <Link
            to={getComponentPageHref(COMPONENT_PAGES[pageIndex + 1].id)}
            className="font-mono text-label uppercase tracking-widest text-foreground-muted no-underline hover:text-foreground-display"
          >
            {tb(COMPONENT_PAGES[pageIndex + 1].label)} →
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}
      </nav>
    </div>
  )
}

export default ComponentsIndexPage
