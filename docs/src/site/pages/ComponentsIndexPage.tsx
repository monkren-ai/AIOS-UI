import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { groupedComponentManifest } from '../registry'

export function ComponentsIndexPage() {
  const { t, tb } = useT()
  const groups = groupedComponentManifest()
  const total = groups.reduce((sum, group) => sum + group.entries.length, 0)

  return (
    <div className="flex w-full max-w-none flex-col gap-12 pb-24">
      <header className="flex flex-col gap-3">
        <h1 className="text-display-sm text-foreground-display">{t('组件', 'Components')}</h1>
        <p className="text-subheading text-foreground-muted">
          {t(
            `${total} 个已收录文档的组件，按用途分组。每页都包含实时预览、可复制的示例源码、完整 API 与可访问性说明。`,
            `${total} documented components, grouped by what they're for. Every page has a live preview, copy-pasteable example source, the full API, and accessibility notes.`,
          )}
        </p>
      </header>

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
                <span className="text-foreground-display">{doc.name}</span>
                <span className="text-sm leading-relaxed text-foreground-muted">
                  {tb(doc.description)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ComponentsIndexPage
