import * as React from 'react'
import { cn, mergeSemanticProps } from '@/lib/utils'
import Bubble, { type BubbleProps, type BubbleSemanticType } from './Bubble'

export type BubbleListSemanticType = 'root' | 'scroll' | 'bubble'

export type BubbleRole = 'ai' | 'system' | 'user' | 'divider'

export interface BubbleItemType
  extends Omit<BubbleProps, 'classNames' | 'styles' | 'content'> {
  key: string | number
  role?: BubbleRole | string
  content?: React.ReactNode
  classNames?: Partial<Record<BubbleSemanticType, string>>
  styles?: Partial<Record<BubbleSemanticType, React.CSSProperties>>
}

export type RoleConfig = Pick<
  BubbleProps,
  | 'placement'
  | 'variant'
  | 'shape'
  | 'avatar'
  | 'classNames'
  | 'styles'
  | 'loading'
  | 'typing'
>

export type RoleType = Partial<Record<BubbleRole | string, RoleConfig | ((item: BubbleItemType) => RoleConfig)>>

export interface BubbleListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  items: BubbleItemType[]
  role?: RoleType
  autoScroll?: boolean
  classNames?: Partial<Record<BubbleListSemanticType, string>>
  styles?: Partial<Record<BubbleListSemanticType, React.CSSProperties>>
}

function resolveRoleConfig(
  roleConfig: RoleConfig | ((item: BubbleItemType) => RoleConfig) | undefined,
  item: BubbleItemType,
): RoleConfig {
  if (typeof roleConfig === 'function') {
    return roleConfig(item)
  }
  return roleConfig || {}
}

export const BubbleList = React.forwardRef<HTMLDivElement, BubbleListProps>(
  (
    { items, role, autoScroll = true, className, style, classNames: userClassNames, styles: userStyles, ...rest },
    ref,
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = React.useMemo(() => {
      return (node: HTMLDivElement | null) => {
        rootRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }
    }, [ref])

    const { classNames, styles } = mergeSemanticProps<BubbleListSemanticType>(
      { classNames: userClassNames, styles: userStyles },
    )

    React.useEffect(() => {
      if (!autoScroll || !rootRef.current) return
      const el = rootRef.current
      if (typeof el.scrollTo === 'function') {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      }
    }, [items, autoScroll])

    return (
      <div
        ref={mergedRef}
        className={cn('nothing-bubble-list', classNames.root, className)}
        style={{ ...styles.root, ...style }}
        data-slot="bubble-list"
        {...rest}
      >
        <div
          className={cn('nothing-bubble-list__scroll', classNames.scroll)}
          style={styles.scroll}
          data-slot="bubble-list-scroll"
        >
          {items.map((item) => {
            const { key, role: itemRole, content, classNames: itemClassNames, styles: itemStyles, ...itemProps } = item
            const resolvedRole = itemRole || 'ai'
            const roleConfig = resolveRoleConfig(role?.[resolvedRole], item)
            const mergedClassNames = mergeSemanticProps<BubbleSemanticType>(
              { classNames: roleConfig.classNames, styles: roleConfig.styles },
              { classNames: itemClassNames, styles: itemStyles },
            )

            return (
              <div
                key={key}
                className={cn('nothing-bubble-list__item', classNames.bubble)}
                style={styles.bubble}
                data-slot="bubble-list-item"
                data-role={resolvedRole}
              >
                <Bubble
                  content={content}
                  placement={roleConfig.placement}
                  variant={roleConfig.variant}
                  shape={roleConfig.shape}
                  avatar={roleConfig.avatar}
                  loading={roleConfig.loading}
                  typing={roleConfig.typing}
                  classNames={mergedClassNames.classNames}
                  styles={mergedClassNames.styles}
                  {...itemProps}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)

BubbleList.displayName = 'BubbleList'

export default BubbleList
