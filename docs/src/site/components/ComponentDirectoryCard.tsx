import * as React from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import {
  getComponentName,
  hasComponentDoc,
  loadComponentDoc,
  type ComponentDoc,
  type ComponentManifestEntry,
} from '../registry'

class LivePreviewBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function liveStage(doc: ComponentDoc) {
  const first = doc.examples[0]
  return first ? first.render() : doc.preview()
}

export function ComponentDirectoryCard({ entry }: { entry: ComponentManifestEntry }) {
  const { t, tb, lang } = useT()
  const hostRef = React.useRef<HTMLElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [doc, setDoc] = React.useState<ComponentDoc | null>(null)

  React.useEffect(() => {
    const node = hostRef.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([item]) => {
        if (item.isIntersecting) setVisible(true)
      },
      { rootMargin: '240px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!visible || !hasComponentDoc(entry.slug)) return
    let active = true
    void loadComponentDoc(entry.slug).then((loaded) => {
      if (active) setDoc(loaded)
    })
    return () => {
      active = false
    }
  }, [visible, entry.slug])

  const live = doc ? liveStage(doc) : null

  return (
    <article
      ref={hostRef}
      className="flex flex-col overflow-hidden rounded-card-compact border border-border"
    >
      <header className="flex flex-col gap-1 border-b border-border px-4 py-3">
        <Link
          to={`/components/${entry.slug}`}
          className="flex items-baseline justify-between gap-3 text-foreground-display no-underline hover:text-accent"
        >
          <span>{getComponentName(entry, lang)}</span>
          {lang === 'zh' && (
            <span className="font-mono text-label text-foreground-subtle">{entry.name}</span>
          )}
        </Link>
        <p className="text-sm leading-relaxed text-foreground-muted">{tb(entry.description)}</p>
      </header>

      <div
        className="dot-grid-subtle flex min-h-40 items-center justify-center overflow-auto p-5"
        aria-label={t(`${getComponentName(entry, lang)} 实景`, `Live ${entry.name}`)}
      >
        {live ? (
          <LivePreviewBoundary>{live}</LivePreviewBoundary>
        ) : (
          <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
            {visible ? t('加载中', 'Loading') : t('实景', 'Live')}
          </span>
        )}
      </div>
    </article>
  )
}
