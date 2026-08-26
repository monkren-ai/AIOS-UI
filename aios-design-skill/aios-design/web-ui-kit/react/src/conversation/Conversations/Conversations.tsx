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
  section?: React.ReactNode
  icon?: React.ReactNode
  label: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode | ((item: ConversationItem) => React.ReactNode)
  disabled?: boolean
  unread?: boolean
}

export interface ConversationsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof conversationsVariants> {
  items: ConversationItem[]
  activeKey?: string
  defaultActiveKey?: string
  onActiveChange?: (key: string) => void
  header?: React.ReactNode
  footer?: React.ReactNode
  onCreate?: () => void
  createLabel?: React.ReactNode
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
      onCreate,
      createLabel = '新建会话 / New conversation',
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
    const { classNames, styles } = mergeSemanticProps<ConversationsSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })
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
            className={cn('aios-conversations__header', classNames.header)}
            style={styles.header}
            data-slot="conversations-header"
          >
            {header}
          </div>
        )}

        <div
          className={cn('aios-conversations__list', classNames.list)}
          style={styles.list}
          data-slot="conversations-list"
          role="tablist"
        >
          {onCreate && (
            <button
              type="button"
              className="aios-conversations__item"
              data-slot="conversations-create"
              onClick={onCreate}
            >
              <span aria-hidden>+</span>
              <span className="aios-conversations__item-label">{createLabel}</span>
            </button>
          )}
          {items.map((item, index) => {
            const isActive = current === item.key
            const actions = typeof item.actions === 'function' ? item.actions(item) : item.actions
            const showSection =
              item.section != null && (index === 0 || items[index - 1]?.section !== item.section)

            return (
              <React.Fragment key={item.key}>
                {showSection && (
                  <div
                    className="px-3 pt-3 font-mono text-caption uppercase text-foreground-disabled"
                    data-slot="conversations-section"
                  >
                    {item.section}
                  </div>
                )}
                <div
                  className={cn(
                    conversationsItemVariants({ active: isActive, disabled: item.disabled }),
                    classNames.item,
                  )}
                  style={styles.item}
                  data-slot="conversations-item"
                  data-active={isActive || undefined}
                  data-disabled={dataAttr(item.disabled)}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-2 text-start"
                    disabled={item.disabled}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelect(item)}
                  >
                    {item.icon && (
                      <span
                        className={cn('aios-conversations__item-icon', classNames.itemIcon)}
                        style={styles.itemIcon}
                        data-slot="conversations-item-icon"
                      >
                        {item.icon}
                      </span>
                    )}
                    <span className="aios-conversations__item-main">
                      <span
                        className={cn('aios-conversations__item-label', classNames.itemLabel)}
                        style={styles.itemLabel}
                        data-slot="conversations-item-label"
                      >
                        {item.label}
                      </span>
                      {item.meta && (
                        <span
                          className={cn('aios-conversations__item-meta', classNames.itemMeta)}
                          style={styles.itemMeta}
                          data-slot="conversations-item-meta"
                        >
                          {item.unread && !isActive && (
                            <span
                              className="me-1 inline-block size-2 rounded-full bg-accent"
                              aria-label="未读 / Unread"
                            />
                          )}
                          {item.meta}
                        </span>
                      )}
                    </span>
                  </button>
                  {actions && (
                    <span
                      className={cn('aios-conversations__item-actions', classNames.itemActions)}
                      style={styles.itemActions}
                      data-slot="conversations-item-actions"
                    >
                      {actions}
                    </span>
                  )}
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {footer && (
          <div
            className={cn('aios-conversations__footer', classNames.footer)}
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
