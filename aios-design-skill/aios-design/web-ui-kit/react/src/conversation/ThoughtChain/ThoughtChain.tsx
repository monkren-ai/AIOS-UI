import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { thoughtChainVariants, thoughtChainItemVariants } from './thought-chain-variants'

export type ThoughtChainSemanticType =
  | 'root'
  | 'item'
  | 'itemHeader'
  | 'itemIcon'
  | 'itemContent'
  | 'itemFooter'

export type ThoughtChainItemStatus = 'pending' | 'active' | 'success' | 'error'

export interface ThoughtChainItem {
  key: string
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  status?: ThoughtChainItemStatus
  collapsible?: boolean
}

export interface ThoughtChainProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof thoughtChainVariants> {
  items: ThoughtChainItem[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpand?: (keys: string[]) => void
  line?: boolean | 'solid' | 'dashed' | 'dotted'
  classNames?: Partial<Record<ThoughtChainSemanticType, string>>
  styles?: Partial<Record<ThoughtChainSemanticType, React.CSSProperties>>
}

function useExpandedKeys(
  defaultExpandedKeys: string[] | undefined,
  expandedKeys: string[] | undefined,
  onExpand: ((keys: string[]) => void) | undefined,
): { expanded: Set<string>; toggle: (key: string) => void } {
  const isControlled = expandedKeys !== undefined
  const [internalKeys, setInternalKeys] = React.useState<Set<string>>(
    () => new Set(defaultExpandedKeys ?? []),
  )

  const expanded = React.useMemo(
    () => (isControlled ? new Set(expandedKeys) : internalKeys),
    [isControlled, expandedKeys, internalKeys],
  )

  const toggle = React.useCallback(
    (key: string) => {
      const next = new Set(expanded)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      if (!isControlled) {
        setInternalKeys(next)
      }
      onExpand?.(Array.from(next))
    },
    [expanded, isControlled, onExpand],
  )

  return { expanded, toggle }
}

export const ThoughtChain = React.forwardRef<HTMLDivElement, ThoughtChainProps>(
  (
    {
      items,
      defaultExpandedKeys,
      expandedKeys,
      onExpand,
      line = true,
      className,
      style,
      classNames: userClassNames,
      styles: userStyles,
      ...rest
    },
    ref,
  ) => {
    const { classNames, styles } = mergeSemanticProps<ThoughtChainSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })
    const { expanded, toggle } = useExpandedKeys(defaultExpandedKeys, expandedKeys, onExpand)

    return (
      <div
        ref={ref}
        className={cn(thoughtChainVariants({ line }), classNames.root, className)}
        style={{ ...styles.root, ...style }}
        data-slot="thought-chain"
        data-line={dataAttr(line)}
        {...rest}
      >
        {items.map((item) => {
          const isExpanded = expanded.has(item.key)
          const isCollapsible = item.collapsible ?? Boolean(item.content)
          const status = item.status ?? 'pending'

          return (
            <div
              key={item.key}
              className={cn(
                thoughtChainItemVariants({
                  status,
                  collapsible: isCollapsible,
                  expanded: isExpanded,
                }),
                classNames.item,
              )}
              style={styles.item}
              data-slot="thought-chain-item"
              data-status={status}
              data-expanded={dataAttr(isExpanded)}
            >
              <button
                type="button"
                className={cn('aios-thought-chain__header', classNames.itemHeader)}
                style={styles.itemHeader}
                data-slot="thought-chain-item-header"
                disabled={!isCollapsible}
                onClick={() => toggle(item.key)}
                aria-expanded={isCollapsible ? isExpanded : undefined}
              >
                {item.icon && (
                  <span
                    className={cn('aios-thought-chain__icon', classNames.itemIcon)}
                    style={styles.itemIcon}
                    data-slot="thought-chain-item-icon"
                  >
                    {item.icon}
                  </span>
                )}
                <span className="aios-thought-chain__title-wrap">
                  {item.title && <span className="aios-thought-chain__title">{item.title}</span>}
                  {item.description && (
                    <span className="aios-thought-chain__description">{item.description}</span>
                  )}
                </span>
                {isCollapsible && (
                  <span className="aios-thought-chain__arrow" aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </span>
                )}
              </button>

              {isExpanded && (
                <div
                  className={cn('aios-thought-chain__content', classNames.itemContent)}
                  style={styles.itemContent}
                  data-slot="thought-chain-item-content"
                >
                  {item.content}
                </div>
              )}

              {item.footer && (
                <div
                  className={cn('aios-thought-chain__footer', classNames.itemFooter)}
                  style={styles.itemFooter}
                  data-slot="thought-chain-item-footer"
                >
                  {item.footer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  },
)

ThoughtChain.displayName = 'ThoughtChain'

export default ThoughtChain
