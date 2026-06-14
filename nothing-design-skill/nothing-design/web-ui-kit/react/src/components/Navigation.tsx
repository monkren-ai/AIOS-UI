import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/navigation.css'

const navigationVariants = cva('nothing-nav', {
  variants: {
    variant: {
      default: '',
      bracket: 'nothing-nav--bracket',
      pipe: 'nothing-nav--pipe',
    },
  },
  defaultVariants: { variant: 'default' },
})

const navItemVariants = cva('nothing-nav__item', {
  variants: {
    active: { true: 'nothing-nav__item--active', false: '' },
  },
  defaultVariants: { active: false },
})

export interface NavItem {
  label: string
  icon?: React.ReactNode
  /** Slug used for URL hash sync. Defaults to label.toLowerCase(). */
  slug?: string
}

function getItemSlug(item: NavItem, idx: number): string {
  if (item.slug) return item.slug
  // 默认用 label 转 slug
  return item.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `item-${idx}`
}

export interface NavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>,
    VariantProps<typeof navigationVariants> {
  items: NavItem[]
  activeIndex?: number
  showBack?: boolean
  onBack?: () => void
  onChange?: (index: number) => void
  /** 与 URL hash 双向同步. 默认 true. */
  syncWithUrl?: boolean
  /** 当 syncWithUrl=true 时,hash 改变时是否自动滚动到锚点 */
  scrollIntoView?: boolean
}

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    {
      className,
      items,
      activeIndex: controlledIndex,
      variant = 'default',
      showBack = false,
      onBack,
      onChange,
      syncWithUrl = true,
      scrollIntoView = false,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(0)
    const isControlled = controlledIndex !== undefined
    const activeIdx = isControlled ? controlledIndex : internalIndex

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

    return (
      <nav
        ref={ref}
        className={cn(navigationVariants({ variant }), className)}
        data-variant={dataAttr(variant)}
        data-active-index={dataAttr(activeIdx)}
        data-real={dataAttr(syncWithUrl && typeof window !== 'undefined')}
        {...props}
      >
        {showBack && (
          <button className="nothing-nav__back" onClick={onBack} aria-label="Go back">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {items.map((item, index) => (
          <span key={index} className="nothing-nav__item-wrapper">
            {index > 0 && variant === 'pipe' && (
              <span className="nothing-nav__separator">|</span>
            )}
            <button
              className={cn(navItemVariants({ active: index === activeIdx }))}
              onClick={() => handleSelect(index)}
              data-state={dataAttr(index === activeIdx ? 'active' : 'inactive')}
              data-slug={dataAttr(getItemSlug(item, index))}
            >
              {item.icon}
              {item.label}
            </button>
          </span>
        ))}
      </nav>
    )
  }
)
Navigation.displayName = 'Navigation'

export { navigationVariants, navItemVariants }
export default Navigation
