import * as React from 'react'
import { useDirection } from '@/DirectionProvider'
import { cn, dataAttr } from '@/lib/utils'
import {
  navBackVariants,
  navIndicatorVariants,
  navItemVariants,
  navItemWrapperVariants,
  navSeparatorVariants,
  navigationVariants,
  type NavigationVariant,
} from './navigation-variants'

export interface NavItem {
  label: string
  icon?: React.ReactNode
  /** Slug used for URL hash sync. Defaults to label.toLowerCase(). */
  slug?: string
}

function getItemSlug(item: NavItem, idx: number): string {
  if (item.slug) return item.slug
  // 默认用 label 转 slug
  return (
    item.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || `item-${idx}`
  )
}

export interface NavigationProps extends Omit<
  React.ComponentPropsWithRef<'nav'>,
  'onChange' | 'children'
> {
  items: NavItem[]
  activeIndex?: number
  variant?: NavigationVariant
  showBack?: boolean
  onBack?: () => void
  onChange?: (index: number) => void
  /** 与 URL hash 双向同步. 默认 true. */
  syncWithUrl?: boolean
  /** 当 syncWithUrl=true 时,hash 改变时是否自动滚动到锚点 */
  scrollIntoView?: boolean
}

export function Navigation({
  className,
  items,
  activeIndex: controlledIndex,
  variant = 'default',
  showBack = false,
  onBack,
  onChange,
  syncWithUrl = true,
  scrollIntoView = false,
  ref,
  ...props
}: NavigationProps) {
  const [internalIndex, setInternalIndex] = React.useState(0)
  const isControlled = controlledIndex !== undefined
  const activeIdx = isControlled ? controlledIndex : internalIndex

  const navRef = React.useRef<HTMLElement>(null)
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = React.useState({ start: 0, width: 0 })
  const showIndicator = variant !== 'bracket'
  const { dir } = useDirection()

  // 初始化:从 URL hash 匹配 slug
  React.useEffect(() => {
    if (!syncWithUrl || isControlled || typeof window === 'undefined') return
    const hash = window.location.hash.replace(/^#/, '').toLowerCase()
    if (!hash) return
    const idx = items.findIndex((it, i) => getItemSlug(it, i).toLowerCase() === hash)
    if (idx >= 0) {
      setInternalIndex(idx)
      onChange?.(idx)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncWithUrl, isControlled, items.length])

  // 监听 hashchange (back/forward 按钮,外部 anchor click)
  React.useEffect(() => {
    if (!syncWithUrl || isControlled || typeof window === 'undefined') return
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase()
      const idx = items.findIndex((it, i) => getItemSlug(it, i).toLowerCase() === hash)
      if (idx >= 0) {
        setInternalIndex(idx)
        onChange?.(idx)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncWithUrl, isControlled, items.length])

  const updateIndicator = React.useCallback(() => {
    if (!showIndicator) return
    const nav = navRef.current
    const btn = itemRefs.current[activeIdx]
    if (!nav || !btn) return
    const navRect = nav.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    // 量出来的是物理坐标，换算成行首偏移后才能喂给 inset-inline-start。
    setIndicatorStyle({
      start: dir === 'rtl' ? navRect.right - btnRect.right : btnRect.left - navRect.left,
      width: btnRect.width,
    })
  }, [activeIdx, showIndicator, dir])

  React.useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  React.useEffect(() => {
    if (typeof window === 'undefined' || !showIndicator) return
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator, showIndicator])

  const handleSelect = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index)
    }
    onChange?.(index)
    if (syncWithUrl && typeof window !== 'undefined') {
      const slug = getItemSlug(items[index], index)
      const newHash = `#${slug}`
      if (window.location.hash !== newHash) {
        // 使用 history.replaceState 避免触发额外的 hashchange (我们已在 click handler 内控制)
        window.history.replaceState(null, '', newHash)
      }
      if (scrollIntoView) {
        // 查找页面上对应的锚点元素
        const target = document.getElementById(slug)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      navRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref && 'current' in ref) (ref as React.RefObject<HTMLElement | null>).current = node
    },
    [ref],
  )

  return (
    <nav
      ref={setRefs}
      className={cn(navigationVariants({ variant }), className)}
      data-slot="navigation"
      data-variant={dataAttr(variant)}
      data-active-index={dataAttr(activeIdx)}
      data-has-indicator={dataAttr(showIndicator)}
      data-real={dataAttr(syncWithUrl && typeof window !== 'undefined')}
      {...props}
    >
      {showBack && (
        <button
          data-slot="navigation-back"
          className={navBackVariants()}
          onClick={onBack}
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {items.map((item, index) => (
        <span key={index} data-slot="navigation-item-wrapper" className={navItemWrapperVariants()}>
          {index > 0 && variant === 'pipe' && (
            <span
              data-slot="navigation-separator"
              aria-hidden="true"
              className={navSeparatorVariants()}
            >
              |
            </span>
          )}
          <button
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            data-slot="navigation-item"
            className={navItemVariants({ variant, active: index === activeIdx })}
            onClick={() => handleSelect(index)}
            data-state={dataAttr(index === activeIdx ? 'active' : 'inactive')}
            data-active={dataAttr(index === activeIdx)}
            data-slug={dataAttr(getItemSlug(item, index))}
            aria-current={index === activeIdx ? 'page' : undefined}
          >
            {item.icon}
            {item.label}
          </button>
        </span>
      ))}
      {showIndicator && (
        <span
          data-slot="navigation-indicator"
          className={navIndicatorVariants()}
          style={{ insetInlineStart: indicatorStyle.start, width: indicatorStyle.width }}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

Navigation.displayName = 'Navigation'

export { navigationVariants, navItemVariants }
export default Navigation
