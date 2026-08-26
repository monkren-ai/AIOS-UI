import * as React from 'react'
import { Button } from 'aios-ui-kit/button'
import { Input } from 'aios-ui-kit/input'
import { cn } from '@/lib/utils'
import { Prose } from '../../components/Prose'
import { useT } from '../../i18n'
import { IconDetailPanel } from './IconDetailPanel'
import { TABLER_GROUPS, loadTablerIcons } from './tabler-icons'
import { useDebouncedValue } from './useDebouncedValue'
import { VirtualIconGrid } from './VirtualIconGrid'
import type { IconEntry, IconGroup } from './types'

const SIZES = [24, 32, 48, 72] as const
const ALL_GROUPS = '__all__'

/** 工具条上的小分段控件——比 SegmentedControl 更贴合这里的密度。 */
function SegmentGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (next: T) => void
  label: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-card-technical border border-border bg-surface p-1"
    >
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            'cursor-pointer rounded-2xs border-0 px-3 py-1 font-mono text-label uppercase tracking-widest',
            'transition-colors duration-200 ease-aios motion-reduce:transition-none',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-interactive',
            option.value === value
              ? 'bg-muted text-foreground-display'
              : 'bg-transparent text-foreground-muted hover:text-foreground',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

/** 左侧分组过滤器。样式对齐 SideNav，但这里是筛选而非路由，所以用按钮。 */
function GroupFilter({
  groups,
  counts,
  total,
  value,
  onChange,
}: {
  groups: IconGroup[]
  counts: Record<string, number>
  total: number
  value: string
  onChange: (next: string) => void
}) {
  const { t, tb } = useT()
  const items = [
    { id: ALL_GROUPS, label: t('全部', 'All'), count: total },
    ...groups.map((group) => ({
      id: group.id,
      label: tb(group.label),
      count: counts[group.id] ?? 0,
    })),
  ]

  return (
    <nav
      aria-label={t('图标分组', 'Icon groups')}
      className="flex w-full flex-col gap-1 lg:w-52 lg:shrink-0"
    >
      <span className="px-3 pb-1 font-mono text-label uppercase tracking-widest text-foreground-subtle">
        {t('分组', 'Groups')}
      </span>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={item.id === value}
          onClick={() => onChange(item.id)}
          className={cn(
            'flex cursor-pointer items-center justify-between rounded-card-technical border-0 px-3 py-1.5 text-start text-sm',
            'transition-colors duration-200 ease-aios motion-reduce:transition-none',
            'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
            item.id === value
              ? 'bg-muted text-foreground-display'
              : 'bg-transparent text-foreground-muted hover:bg-muted hover:text-foreground',
          )}
        >
          <span>{item.label}</span>
          <span className="ms-2 font-mono text-micro text-foreground-subtle">{item.count}</span>
        </button>
      ))}
    </nav>
  )
}

export function IconsPage() {
  const { t } = useT()

  const [query, setQuery] = React.useState('')
  const [group, setGroup] = React.useState<string>(ALL_GROUPS)
  const [size, setSize] = React.useState<number>(72)
  const [dotMatrix, setDotMatrix] = React.useState(false)
  const [selected, setSelected] = React.useState<IconEntry | null>(null)

  const [tablerIcons, setTablerIcons] = React.useState<IconEntry[] | null>(null)
  const [tablerLoading, setTablerLoading] = React.useState(false)
  const [tablerError, setTablerError] = React.useState(false)

  const debouncedQuery = useDebouncedValue(query)

  // Tabler 保持动态加载，避免把整包图标并入文档站首屏。
  // 不用 loading 作为前置守卫，保证 React Strict Mode 重挂载后仍会发起有效请求。
  React.useEffect(() => {
    let cancelled = false
    setTablerLoading(true)
    setTablerError(false)

    loadTablerIcons()
      .then((entries) => {
        if (cancelled) return
        setTablerIcons(entries)
      })
      .catch(() => {
        if (!cancelled) setTablerError(true)
      })
      .finally(() => {
        if (!cancelled) setTablerLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const pool = tablerIcons ?? []

  const counts = React.useMemo(() => {
    return pool.reduce<Record<string, number>>((acc, icon) => {
      acc[icon.groupId] = (acc[icon.groupId] ?? 0) + 1
      return acc
    }, {})
  }, [pool])

  const filtered = React.useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase()
    return pool.filter((icon) => {
      if (group !== ALL_GROUPS && icon.groupId !== group) return false
      if (!needle) return true
      return icon.searchText.includes(needle)
    })
  }, [pool, group, debouncedQuery])

  const sizeOptions = SIZES.map((value) => ({ value, label: `${value}` }))

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 py-8 md:px-6">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-label uppercase tracking-widest text-foreground-subtle">
          {t('资源', 'Resources')}
        </span>
        <h1 className="text-display-sm text-foreground-display">{t('图标', 'Icons')}</h1>
        <Prose>
          {t(
            '完整收录 `@tabler/icons-react`。可按名称和分组筛选、调整预览尺寸，并用点阵预览检查图标在 AIOS 栅格语言中的表现。',
            'Browse the complete `@tabler/icons-react` library. Filter by name and group, adjust the preview size, and use Dot matrix to inspect each icon in the AIOS raster language.',
          )}
        </Prose>
      </header>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-56 flex-1">
            <Input
              size="sm"
              type="search"
              value={query}
              onValueChange={setQuery}
              clearable
              placeholder={t('搜索图标名…', 'Search icon names…')}
              aria-label={t('搜索图标', 'Search icons')}
            />
          </div>

          <SegmentGroup<number>
            label={t('图标尺寸', 'Icon size')}
            value={size}
            onChange={setSize}
            options={sizeOptions}
          />

          <Button
            variant={dotMatrix ? 'primary' : 'secondary'}
            size="sm"
            active={dotMatrix}
            // Button 只在 active 时才输出 aria-pressed，toggle 需要 false 态也可读。
            aria-pressed={dotMatrix}
            onClick={() => setDotMatrix((value) => !value)}
            className="rounded-card-technical"
          >
            {t('点阵预览', 'Dot matrix')}
          </Button>
        </div>

        <div className="flex items-baseline gap-2 font-mono text-label uppercase tracking-widest text-foreground-subtle">
          <span>{t(`${filtered.length} 个图标`, `${filtered.length} icons`)}</span>
          {debouncedQuery.trim() && (
            <span className="text-foreground-muted">
              {t(`匹配「${debouncedQuery.trim()}」`, `matching “${debouncedQuery.trim()}”`)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <GroupFilter
          groups={TABLER_GROUPS}
          counts={counts}
          total={pool.length}
          value={group}
          onChange={setGroup}
        />

        <main className="flex min-w-0 flex-1 flex-col gap-4">
          {tablerLoading && (
            <div className="rounded-card-compact border border-border bg-surface p-10 text-center text-sm text-foreground-muted">
              {t('正在加载 Tabler 图标…', 'Loading Tabler icons…')}
            </div>
          )}

          {tablerError && (
            <div className="rounded-card-compact border border-accent bg-surface p-10 text-center text-sm text-accent">
              {t('Tabler 图标加载失败。', 'Failed to load the Tabler icons.')}
            </div>
          )}

          {!tablerLoading && !tablerError && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-card-compact border border-dashed border-border bg-surface p-16 text-center">
              <p className="text-subheading text-foreground-display">
                {t('没有匹配的图标', 'No icons match')}
              </p>
              <p className="text-sm text-foreground-muted">
                {t(
                  '换个关键词，或者把分组切回「全部」。',
                  'Try a different keyword, or switch the group filter back to All.',
                )}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery('')
                  setGroup(ALL_GROUPS)
                }}
              >
                {t('清空筛选', 'Clear filters')}
              </Button>
            </div>
          )}

          {filtered.length > 0 && (
            <VirtualIconGrid
              entries={filtered}
              size={size}
              dotMatrix={dotMatrix}
              selectedId={selected?.id}
              onSelect={setSelected}
            />
          )}
        </main>

        <div className="lg:w-72 lg:shrink-0">
          <div className="lg:sticky lg:top-20">
            <IconDetailPanel
              entry={selected}
              size={size}
              dotMatrix={dotMatrix}
              onClose={() => setSelected(null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconsPage
