import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { ComponentPreview } from '../components/ComponentPreview'
import { PropsTable } from '../components/PropsTable'
import { Prose } from '../components/Prose'
import { useT } from '../i18n'
import {
  COMPONENT_MANIFEST,
  COMPONENT_MANIFEST_BY_SLUG,
  hasComponentDoc,
  loadComponentDoc,
} from '../registry'
import type { ComponentDoc } from '../registry'
import { CATEGORY_BY_ID } from '../registry/categories'

function Notice({ title, body }: { title: string; body: string }) {
  const { t } = useT()
  return (
    <div className="flex flex-col items-start gap-4 py-16">
      <h1 className="text-heading text-foreground-display">{title}</h1>
      <p className="text-foreground-muted">{body}</p>
      <Link to="/components" className="text-accent underline">
        {t('返回组件列表', 'Back to components')}
      </Link>
    </div>
  )
}

export function ComponentDetailPage() {
  const { slug = '' } = useParams()
  const { t, tb } = useT()
  const entry = COMPONENT_MANIFEST_BY_SLUG.get(slug)
  const [doc, setDoc] = useState<ComponentDoc | null>(null)

  useEffect(() => {
    if (!entry) return
    let active = true
    setDoc(null)
    void loadComponentDoc(slug).then((loaded) => {
      if (active) setDoc(loaded)
    })
    return () => {
      active = false
    }
  }, [entry, slug])

  if (!entry) {
    return (
      <Notice
        title={t('组件不存在', 'Component not found')}
        body={t(`「${slug}」还没有文档页。`, `There is no documentation page for “${slug}” yet.`)}
      />
    )
  }

  if (!hasComponentDoc(slug)) {
    return (
      <Notice
        title={t('文档撰写中', 'Documentation in progress')}
        body={t(
          `${entry.name} 已经可以使用，但这一页还没写完。组件本身可以直接从 aios-ui-kit/${slug} import。`,
          `${entry.name} already ships, but this page isn't written yet. You can import the component from aios-ui-kit/${slug} today.`,
        )}
      />
    )
  }

  if (!doc) {
    return (
      <div className="flex flex-col gap-6 py-16" aria-busy="true">
        <div className="h-8 w-48 animate-pulse rounded-card-compact bg-muted" />
        <div className="h-4 w-full max-w-lg animate-pulse rounded-card-compact bg-muted" />
        <div className="h-48 w-full animate-pulse rounded-card bg-muted" />
      </div>
    )
  }

  const category = CATEGORY_BY_ID.get(doc.category)
  const position = COMPONENT_MANIFEST.findIndex((item) => item.slug === doc.slug)
  const previous = COMPONENT_MANIFEST[position - 1]
  const next = COMPONENT_MANIFEST[position + 1]

  return (
    <article className="flex w-full max-w-none flex-col gap-12 pb-24">
      <header className="flex flex-col gap-3">
        {category && (
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            {tb(category.label)}
          </span>
        )}
        <h1 className="text-display-sm text-foreground-display">{doc.name}</h1>
        <p className="text-subheading text-foreground-muted">{tb(doc.description)}</p>
      </header>

      <ComponentPreview code={`${doc.importStatement}\n\n${doc.usageSnippet}`} minHeight={200}>
        {doc.preview()}
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-heading text-foreground-display">{t('用法', 'Usage')}</h2>
        <CodeBlock code={doc.importStatement} />
        <CodeBlock code={doc.usageSnippet} />
        {doc.composition && <Prose>{tb(doc.composition)}</Prose>}
      </section>

      {doc.examples.length > 0 && (
        <section className="flex flex-col gap-10">
          <h2 className="text-heading text-foreground-display">{t('示例', 'Examples')}</h2>
          {doc.examples.map((example) => (
            <section key={example.id} id={example.id} className="flex flex-col gap-3">
              <h3 className="text-subheading text-foreground-display">{tb(example.title)}</h3>
              {example.description && <Prose>{tb(example.description)}</Prose>}
              <ComponentPreview code={example.code}>{example.render()}</ComponentPreview>
            </section>
          ))}
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-heading text-foreground-display">RTL</h2>
        <Prose>
          {t(
            '所有组件都原生支持从右到左布局。在容器（通常是 `<html>`）上设置 `dir`，让 CSS 逻辑属性正确解析；再用 `DirectionProvider` 包住组件树，让方向相关的行为——roving focus、浮层落位之类——跟着一起翻。',
            'Every component supports right-to-left layouts out of the box. Set `dir` on a container (usually `<html>`) so CSS logical properties resolve correctly, then wrap your tree in `DirectionProvider` so direction-aware behaviour — roving focus, popup placement, and the like — follows along.',
          )}
        </Prose>
        <ComponentPreview
          dir="rtl"
          minHeight={140}
          code={`import { DirectionProvider } from 'aios-ui-kit/direction-provider'\n\n<DirectionProvider dir="rtl">\n  <App />\n</DirectionProvider>`}
        >
          {doc.preview()}
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-heading text-foreground-display">{t('API 参考', 'API reference')}</h2>
        {doc.baseUi && (
          <Prose>
            {t(
              `\`${doc.name}\` 基于 Base UI 的 \`${doc.baseUi}\`，未列出的属性会原样透传给底层 primitive。`,
              `\`${doc.name}\` wraps Base UI's \`${doc.baseUi}\`; anything not listed below is forwarded straight to the underlying primitive.`,
            )}
          </Prose>
        )}
        {doc.api.map((section) => (
          <PropsTable key={section.name} section={section} />
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-heading text-foreground-display">{t('可访问性', 'Accessibility')}</h2>
        <ul className="flex list-disc flex-col gap-2 ps-5 text-foreground-muted">
          {doc.accessibility.map((item, index) => (
            <li key={index}>
              <Prose inline>{tb(item)}</Prose>
            </li>
          ))}
        </ul>
      </section>

      <nav className="flex items-stretch justify-between gap-4 border-t border-border pt-6">
        {previous ? (
          <Link
            to={`/components/${previous.slug}`}
            className="flex flex-col gap-1 rounded-card-compact border border-border px-4 py-3 no-underline transition-colors duration-200 hover:border-border-visible motion-reduce:transition-none"
          >
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('上一个', 'Previous')}
            </span>
            <span className="text-foreground-display">{previous.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/components/${next.slug}`}
            className="flex flex-col items-end gap-1 rounded-card-compact border border-border px-4 py-3 text-end no-underline transition-colors duration-200 hover:border-border-visible motion-reduce:transition-none"
          >
            <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
              {t('下一个', 'Next')}
            </span>
            <span className="text-foreground-display">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}

export default ComponentDetailPage
