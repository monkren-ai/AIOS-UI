import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconVisual } from './IconVisual'
import type { IconEntry } from './types'

/** 视口上下各多渲染几行，滚动时不会看到空洞。 */
const OVERSCAN_ROWS = 2

/**
 * 瓦片尺寸跟着图标尺寸走：72px 图标还要给标签和内边距留空，
 * 写死 96 会把图标挤扁或裁切。
 */
function tileMetrics(iconSize: number) {
  return {
    blockSize: Math.max(96, iconSize + 40),
    minInlineSize: Math.max(104, iconSize + 32),
  }
}

export interface VirtualIconGridProps {
  entries: IconEntry[]
  size: number
  dotMatrix: boolean
  selectedId?: string
  onSelect: (entry: IconEntry) => void
  /** 网格自身的滚动高度。 */
  className?: string
}

/**
 * 定高瓦片的窗口化网格。
 *
 * Tabler 有近 6000 个图标，全量挂 DOM 会直接卡死；点阵模式下每个图标还要额外
 * 铺 cols × rows 个 dot 元素，代价更高。这里用最朴素的做法：瓦片高度固定，
 * 列数由容器宽度算出，于是「第几行」可以直接从 scrollTop 推出来，
 * 只挂可视区 ± OVERSCAN_ROWS 行。不引第三方虚拟列表。
 */
export function VirtualIconGrid({
  entries,
  size,
  dotMatrix,
  selectedId,
  onSelect,
  className,
}: VirtualIconGridProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [viewport, setViewport] = React.useState({ inlineSize: 0, blockSize: 0 })
  const [scrollTop, setScrollTop] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [focusRequest, setFocusRequest] = React.useState(0)

  const { blockSize: tileBlockSize, minInlineSize: tileMinInlineSize } = tileMetrics(size)

  React.useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    const measure = () =>
      setViewport({ inlineSize: node.clientWidth, blockSize: node.clientHeight })
    measure()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // 结果集或瓦片高度变了就回到顶部，否则会停在一段空白上。
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setScrollTop(0)
    setActiveIndex(0)
  }, [entries, tileBlockSize])

  const columns = Math.max(1, Math.floor(viewport.inlineSize / tileMinInlineSize) || 1)
  const rowCount = Math.ceil(entries.length / columns)
  const totalBlockSize = rowCount * tileBlockSize

  const firstRow = Math.max(0, Math.floor(scrollTop / tileBlockSize) - OVERSCAN_ROWS)
  const visibleRows = Math.ceil((viewport.blockSize || tileBlockSize) / tileBlockSize)
  const lastRow = Math.min(rowCount, firstRow + visibleRows + OVERSCAN_ROWS * 2)

  const startIndex = firstRow * columns
  const endIndex = Math.min(entries.length, lastRow * columns)
  const windowed = entries.slice(startIndex, endIndex)

  const rafRef = React.useRef(0)
  const handleScroll = React.useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const next = event.currentTarget.scrollTop
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0
      setScrollTop(next)
    })
  }, [])

  React.useEffect(() => () => window.cancelAnimationFrame(rafRef.current), [])

  /** 把某个下标滚进视口，供方向键导航使用。 */
  const revealIndex = React.useCallback(
    (index: number) => {
      const node = scrollRef.current
      if (!node) return
      const row = Math.floor(index / columns)
      const top = row * tileBlockSize
      const bottom = top + tileBlockSize
      if (top < node.scrollTop) node.scrollTop = top
      else if (bottom > node.scrollTop + node.clientHeight) {
        node.scrollTop = bottom - node.clientHeight
      }
      setScrollTop(node.scrollTop)
    },
    [columns, tileBlockSize],
  )

  const moveActive = React.useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(0, next), entries.length - 1)
      setActiveIndex(clamped)
      revealIndex(clamped)
      setFocusRequest((value) => value + 1)
    },
    [entries.length, revealIndex],
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']
      if (!keys.includes(event.key)) return
      event.preventDefault()
      // 方向键按视觉方向走；RTL 下左右互换，与 dir 属性保持一致。
      const rtl = getComputedStyle(event.currentTarget).direction === 'rtl'
      const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
      const backward = rtl ? 'ArrowRight' : 'ArrowLeft'
      switch (event.key) {
        case forward:
          moveActive(activeIndex + 1)
          break
        case backward:
          moveActive(activeIndex - 1)
          break
        case 'ArrowDown':
          moveActive(activeIndex + columns)
          break
        case 'ArrowUp':
          moveActive(activeIndex - columns)
          break
        case 'Home':
          moveActive(0)
          break
        case 'End':
          moveActive(entries.length - 1)
          break
      }
    },
    [activeIndex, columns, entries.length, moveActive],
  )

  // 方向键移动后，等窗口重算完再把焦点交给目标按钮。
  React.useEffect(() => {
    if (focusRequest === 0) return
    const node = scrollRef.current?.querySelector<HTMLButtonElement>(
      `[data-icon-index="${activeIndex}"]`,
    )
    node?.focus()
  }, [focusRequest, activeIndex, startIndex, endIndex])

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      data-slot="icon-grid"
      className={cn(
        'relative max-h-[calc(100vh-19rem)] min-h-80 overflow-y-auto rounded-card-compact border border-border bg-surface',
        className,
      )}
    >
      <div style={{ blockSize: totalBlockSize }} className="relative">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            transform: `translateY(${firstRow * tileBlockSize}px)`,
          }}
        >
          {windowed.map((entry, offset) => {
            const index = startIndex + offset
            const selected = entry.id === selectedId
            return (
              <button
                key={entry.id}
                type="button"
                data-icon-index={index}
                data-selected={selected ? '' : undefined}
                tabIndex={index === activeIndex ? 0 : -1}
                onFocus={() => setActiveIndex(index)}
                onClick={() => onSelect(entry)}
                title={entry.name}
                className={cn(
                  'flex cursor-pointer flex-col items-center justify-center gap-2 border-0 bg-transparent p-2',
                  'transition-colors duration-200 ease-aios motion-reduce:transition-none',
                  'hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-interactive',
                  'selected:bg-muted selected:text-foreground-display',
                )}
                style={{ blockSize: tileBlockSize }}
              >
                <IconVisual entry={entry} size={size} dotMatrix={dotMatrix} />
                <span className="w-full truncate font-mono text-micro text-foreground-subtle">
                  {entry.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualIconGrid
