import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'
import { useT } from '../i18n'
import { COMPONENT_MANIFEST, getComponentName } from '../registry'
import { CATEGORY_BY_ID } from '../registry/categories'
import { DOC_PAGES, DOC_GROUPS } from '../registry/docs'

interface SearchEntry {
  to: string
  title: string
  group: string
  keywords: string
}

function useSearchIndex(): SearchEntry[] {
  const { tb, lang } = useT()

  return React.useMemo(() => {
    const docGroupLabel = new Map(DOC_GROUPS.map((group) => [group.id, tb(group.label)]))

    const docs: SearchEntry[] = DOC_PAGES.map((page) => ({
      to: `/docs/${page.slug}`,
      title: tb(page.title),
      group: docGroupLabel.get(page.group) ?? 'Docs',
      keywords: `${page.slug} ${tb(page.title)} ${tb(page.description)}`.toLowerCase(),
    }))

    const components: SearchEntry[] = COMPONENT_MANIFEST.map((doc) => {
      const category = CATEGORY_BY_ID.get(doc.category)
      return {
        to: `/components/${doc.slug}`,
        title: getComponentName(doc, lang),
        group: category ? tb(category.label) : doc.category,
        keywords: `${doc.slug} ${doc.name} ${getComponentName(doc, 'zh')} ${tb(doc.description)}`.toLowerCase(),
      }
    })

    return [...components, ...docs]
  }, [lang, tb])
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { t } = useT()
  const navigate = useNavigate()
  const index = useSearchIndex()
  const [query, setQuery] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(0)

  const results = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return index.slice(0, 12)
    return index.filter((entry) => entry.keywords.includes(needle)).slice(0, 24)
  }, [index, query])

  // 结果集变了就把高亮拉回第一条，否则会停在一个已经不存在的下标上
  React.useEffect(() => {
    setActiveIndex(0)
  }, [query])

  React.useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const go = React.useCallback(
    (to: string) => {
      onOpenChange(false)
      navigate(to)
    },
    [navigate, onOpenChange],
  )

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % Math.max(results.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + results.length) % Math.max(results.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const entry = results[activeIndex]
      if (entry) go(entry.to)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[1000] bg-overlay" />
        <Dialog.Popup
          className={cn(
            'fixed start-1/2 top-24 z-[1001] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2',
            'overflow-hidden rounded-card-compact border border-border-visible bg-popover',
          )}
          onKeyDown={onKeyDown}
        >
          <Dialog.Title className="sr-only">{t('搜索文档', 'Search documentation')}</Dialog.Title>

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('搜索组件与文档…', 'Search components and docs…')}
            aria-label={t('搜索', 'Search')}
            className="w-full border-b border-border bg-transparent px-4 py-3 text-base text-foreground outline-none placeholder:text-foreground-subtle"
          />

          <ul className="max-h-80 overflow-y-auto py-1">
            {results.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-foreground-subtle">
                {t('没有匹配结果。', 'No matches found.')}
              </li>
            )}
            {results.map((entry, position) => (
              <li key={entry.to}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(position)}
                  onClick={() => go(entry.to)}
                  data-active={position === activeIndex ? '' : undefined}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-4 py-2 text-start',
                    'text-sm text-foreground-muted data-active:bg-muted data-active:text-foreground-display',
                  )}
                >
                  <span>{entry.title}</span>
                  <span className="font-mono text-micro uppercase tracking-widest text-foreground-subtle">
                    {entry.group}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-micro uppercase tracking-widest text-foreground-subtle">
            <span>↑↓ {t('移动', 'navigate')}</span>
            <span>↵ {t('打开', 'open')}</span>
            <span>esc {t('关闭', 'close')}</span>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SearchDialog
