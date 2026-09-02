import { Link, useParams } from 'react-router-dom'
import { Badge } from 'aios-ui-kit/badge'
import { surfaceVariants } from 'aios-ui-kit/surfaces'
import { useT } from '../i18n'
import { DOC_GROUPS, DOC_PAGES, DOC_PAGE_BY_SLUG } from '../registry/docs'
import { DOC_PAGE_COMPONENTS } from './docs'

function NotFound({ slug }: { slug: string }) {
  const { t } = useT()
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="text-heading text-foreground-display">{t('页面不存在', 'Page not found')}</h1>
      <p className="text-foreground-muted">
        {t(`「${slug}」还没有文档页。`, `There is no documentation page for “${slug}” yet.`)}
      </p>
      <Link to="/docs/installation" className="text-accent underline">
        {t('回到安装指南', 'Back to installation')}
      </Link>
    </div>
  )
}

/**
 * `/docs/:slug` 的渲染器。
 *
 * 标题、描述、分组标签全部来自 `registry/docs.ts`，页面文件只写正文；
 * 上/下一页跟着 `DOC_PAGES` 的顺序走，和组件详情页一致。
 */
export function DocPage() {
  const { slug = '' } = useParams()
  const { t, tb } = useT()

  const meta = DOC_PAGE_BY_SLUG.get(slug)
  const Body = DOC_PAGE_COMPONENTS[slug]

  if (!meta || !Body) return <NotFound slug={slug} />

  const group = DOC_GROUPS.find((entry) => entry.id === meta.group)
  const position = DOC_PAGES.findIndex((entry) => entry.slug === meta.slug)
  const previous = DOC_PAGES[position - 1]
  const next = DOC_PAGES[position + 1]

  return (
    <article className="flex w-full max-w-none flex-col gap-12 pb-24">
      <header className="flex flex-col gap-3">
        {group && (
          <Badge variant="soft" size="sm" className="w-fit">
            {tb(group.label)}
          </Badge>
        )}
        <h1 className="text-display-sm text-foreground-display">{tb(meta.title)}</h1>
        <p className="text-subheading text-foreground-muted">{tb(meta.description)}</p>
      </header>

      <Body />

      <nav className="flex items-stretch justify-between gap-4 border-t border-border pt-6">
        {previous ? (
          <Link
            to={`/docs/${previous.slug}`}
            className={`${surfaceVariants({ elevation: 1, padding: 'md', border: 'default', radius: 'sm' })} flex flex-col gap-1 no-underline hover:border-border-visible`}
          >
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('上一页', 'Previous')}
            </span>
            <span className="text-foreground-display">{tb(previous.title)}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/docs/${next.slug}`}
            className={`${surfaceVariants({ elevation: 1, padding: 'md', border: 'default', radius: 'sm' })} flex flex-col items-end gap-1 text-end no-underline hover:border-border-visible`}
          >
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('下一页', 'Next')}
            </span>
            <span className="text-foreground-display">{tb(next.title)}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}

export default DocPage
