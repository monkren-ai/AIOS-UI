import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { conversationsVariants, conversationsItemVariants } from './conversations-variants'
import './Conversations.css'

export type ConversationsSemanticType =
  | 'root'
  | 'header'
  | 'list'
  | 'item'
  | 'itemIcon'
  | 'itemLabel'
  | 'itemMeta'
  | 'itemActions'
  | 'footer'

export interface ConversationItem {
  key: string
  icon?: React.ReactNode
  label: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode | ((item: ConversationItem) => React.ReactNode)
  disabled?: boolean
}

export interface ConversationsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof conversationsVariants> {
  items: ConversationItem[]
  activeKey?: string
  defaultActiveKey?: string
  onActiveChange?: (key: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  classNames?: Partial<Record<ConversationsSemanticType, string>>
  styles?: Partial<Record<ConversationsSemanticType, React.CSSProperties>>
}

function useActiveKey(
  defaultActiveKey: string | undefined,
  activeKey: string | undefined,
  onActiveChange: ((key: string) => void) | undefined,
): { current: string | undefined; set: (key: string) => void } {
  const isControlled = activeKey !== undefined
  const [internalKey, setInternalKey] = React.useState<string | undefined>(defaultActiveKey)

  const current = isControlled ? activeKey : internalKey

  const set = React.useCallback(
    (key: string) => {
      if (!isControlled) {
        setInternalKey(key)
      }
      onActiveChange?.(key)
    },
    [isControlled, onActiveChange],
  )

  return { current, set }
}

export const Conversations = React.forwardRef<HTMLDivElement, ConversationsProps>(
  (
    {
      items,
      activeKey,
      defaultActiveKey,
      onActiveChange,
      header,
      footer,
      className,
      style,
      classNames: userClassNames,
      styles: userStyles,
      variant,
      size,
      ...rest
    },
    ref,
  ) => {
    const { classNames, styles } = mergeSemanticProps<ConversationsSemanticType>(
      { classNames: userClassNames, styles: userStyles },
    )
    const { current, set } = useActiveKey(defaultActiveKey, activeKey, onActiveChange)

    const handleSelect = (item: ConversationItem) => {
      if (item.disabled || item.key === current) return
      set(item.key)
    }

    return (
      <div
        ref={ref}
        className={cn(conversationsVariants({ variant, size }), classNames.root, className)}
        style={{ ...styles.root, ...style }}
        data-slot="conversations"
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        {...rest}
      >
        {header && (
          <div
            className={cn('nothing-conversations__header', classNames.header)}
            style={styles.header}
            data-slot="conversations-header"
          >
            {header}
          </div>
        )}

        <div
          className={cn('nothing-conversations__list', classNames.list)}
          style={styles.list}
          data-slot="conversations-list"
          role="tablist"
        >
          {items.map((item) => {
            const isActive = current === item.key
            const actions = typeof item.actions === 'function' ? item.actions(item) : item.actions

            return (
              <button
                key={item.key}
                type="button"
                className={cn(
                  conversationsItemVariants({ active: isActive, disabled: item.disabled }),
                  classNames.item,
                )}
                style={styles.item}
                data-slot="conversations-item"
                data-active={isActive || undefined}
                data-disabled={dataAttr(item.disabled)}
                disabled={item.disabled}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(item)}
              >
                {item.icon && (
                  <span
                    className={cn('nothing-conversations__item-icon', classNames.itemIcon)}
                    style={styles.itemIcon}
                    data-slot="conversations-item-icon"
                  >
                    {item.icon}
                  </span>
                )}
                <span className="nothing-conversations__item-main">
                  <span
                    className={cn('nothing-conversations__item-label', classNames.itemLabel)}
                    style={styles.itemLabel}
                    data-slot="conversations-item-label"
                  >
                    {item.label}
                  </span>
                  {item.meta && (
                    <span
                      className={cn('nothing-conversations__item-meta', classNames.itemMeta)}
                      style={styles.itemMeta}
                      data-slot="conversations-item-meta"
                    >
                      {item.meta}
                    </span>
                  )}
                </span>
                {actions && (
                  <span
                    className={cn('nothing-conversations__item-actions', classNames.itemActions)}
                    style={styles.itemActions}
                    data-slot="conversations-item-actions"
                  >
                    {actions}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {footer && (
          <div
            className={cn('nothing-conversations__footer', classNames.footer)}
            style={styles.footer}
            data-slot="conversations-footer"
          >
            {footer}
          </div>
        )}
      </div>
    )
  },
)

Conversations.displayName = 'Conversations'

export default Conversations
