import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { tocItemVariants, tocVariants, type TocItemLevel } from './toc-variants'

export interface TocItem {
  /** 目标节点的 id（不含 `#`）。 */
  id: string
  /** 显示文字。 */
  label: string
  /** 层级，控制缩进。默认 1。 */
  level?: number
}

export interface TOCProps extends React.ComponentPropsWithRef<'nav'> {
  items: TocItem[]
  /**
   * 受控的当前节 id。传入即进入受控模式，组件不再自行追踪；
   * 不传则用 IntersectionObserver 自动追踪。
   */
  activeId?: string
  /** 当前节变化时回调（无论受控与否）。 */
  onActiveChange?: (id: string) => void
  /**
   * 滚动容器。默认 `window`。传一个具体元素时，IntersectionObserver
   * 以它为 root，点击也滚它里面的目标。
   */
  container?: HTMLElement | null
}

export function TOC({
  className,
  items,
  activeId,
  onActiveChange,
  container,
  ...props
}: TOCProps) {
  const isControlled = activeId !== undefined
  const [internalActive, setInternalActive] = React.useState<string | undefined>(
    items[0]?.id,
  )

  const currentActive = isControlled ? activeId : internalActive

  // 用 ref 持有最新的 active 与回调，避免 IntersectionObserver effect 频繁重建。
  const activeRef = React.useRef(currentActive)
  activeRef.current = currentActive
  const onActiveChangeRef = React.useRef(onActiveChange)
  onActiveChangeRef.current = onActiveChange
  const itemsRef = React.useRef(items)
  itemsRef.current = items

  // 以 ids 作为 effect 依赖签名，调用方传新数组字面量也不会每次重建 observer。
  const itemsKey = items.map((item) => `${item.id}:${item.level ?? 1}`).join('|')

  React.useEffect(() => {
    if (isControlled) return
    if (typeof IntersectionObserver === 'undefined') return

    const root = container ?? null
    const doc = container ? container.ownerDocument : document
    const targets = itemsRef.current
      .map((item) => doc.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (targets.length === 0) return

    // 记录当前可见的目标及其顶部坐标，选最靠上的那个作为当前节。
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visible.delete(entry.target.id)
          }
        }
        if (visible.size === 0) return
        let topId: string | undefined
        let topY = Infinity
        visible.forEach((y, id) => {
          if (y < topY) {
            topY = y
            topId = id
          }
        })
        if (topId && topId !== activeRef.current) {
          setInternalActive(topId)
          onActiveChangeRef.current?.(topId)
        }
      },
      // 把判定线下压 70%：标题进入视口上 30% 才算「到达」，更贴近阅读直觉。
      { root, rootMargin: '0px 0px -70% 0px', threshold: [0, 1] },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [itemsKey, container, isControlled])

  const handleClick =
    (item: TocItem) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      // 修饰键点击交给浏览器走默认行为（新标签 / 新窗口）。
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const doc = container ? container.ownerDocument : document
      const target = doc.getElementById(item.id)
      if (!target) return
      event.preventDefault()
      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      if (!isControlled) {
        setInternalActive(item.id)
      }
      onActiveChange?.(item.id)
      // 同步 URL hash，但不触发跳转；某些环境（jsdom）对 replaceState 有限制，忽略。
      try {
        if (typeof history !== 'undefined' && history.replaceState) {
          history.replaceState(null, '', `#${item.id}`)
        }
      } catch {
        /* no-op */
      }
    }

  return (
    <nav
      className={cn(tocVariants(), className)}
      data-slot="toc"
      {...props}
      aria-label={props['aria-label'] ?? 'Table of contents'}
    >
      {items.map((item) => {
        const level = String(item.level ?? 1) as TocItemLevel
        const active = currentActive === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-slot="toc-item"
            data-active={dataAttr(active)}
            aria-current={active ? 'location' : undefined}
            className={tocItemVariants({ level, active })}
            onClick={handleClick(item)}
          >
            {active && (
              <span
                aria-hidden="true"
                data-slot="toc-item-bar"
                className="absolute inset-y-0 start-0 w-0.5 bg-accent"
              />
            )}
            <span className="relative py-1.5">{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}

TOC.displayName = 'TOC'

export { tocVariants, tocItemVariants }
export default TOC
