import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn, dataAttr, mergeSemanticProps } from '@/lib/utils'
import { promptsVariants, promptsItemVariants } from './prompts-variants'
import './Prompts.css'

export type PromptsSemanticType =
  | 'root'
  | 'title'
  | 'list'
  | 'item'
  | 'itemIcon'
  | 'itemTitle'
  | 'itemDescription'

export interface PromptItem {
  key: string
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export interface PromptsProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof promptsVariants> {
  items: PromptItem[]
  title?: React.ReactNode
  layout?: 'grid' | 'list' | 'wrap'
  onItemClick?: (item: PromptItem, index: number) => void
  classNames?: Partial<Record<PromptsSemanticType, string>>
  styles?: Partial<Record<PromptsSemanticType, React.CSSProperties>>
}

export const Prompts = React.forwardRef<HTMLDivElement, PromptsProps>(
  (
    {
      items,
      title,
      layout = 'grid',
      onItemClick,
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
    const { classNames, styles } = mergeSemanticProps<PromptsSemanticType>({
      classNames: userClassNames,
      styles: userStyles,
    })

    const handleItemClick = (item: PromptItem, index: number) => {
      if (item.disabled) return
      onItemClick?.(item, index)
    }

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
      item: PromptItem,
      index: number,
    ) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleItemClick(item, index)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(promptsVariants({ variant, layout, size }), classNames.root, className)}
        style={{ ...styles.root, ...style }}
        data-slot="prompts"
        data-layout={dataAttr(layout)}
        data-variant={dataAttr(variant)}
        data-size={dataAttr(size)}
        {...rest}
      >
        {title && (
          <div
            className={cn('aios-prompts__title', classNames.title)}
            style={styles.title}
            data-slot="prompts-title"
          >
            {title}
          </div>
        )}

        <div
          className={cn('aios-prompts__list', classNames.list)}
          style={styles.list}
          data-slot="prompts-list"
          role="list"
        >
          {items.map((item, index) => (
            <button
              key={item.key}
              type="button"
              className={cn(promptsItemVariants({ disabled: item.disabled }), classNames.item)}
              style={styles.item}
              data-slot="prompts-item"
              data-disabled={dataAttr(item.disabled)}
              disabled={item.disabled}
              onClick={() => handleItemClick(item, index)}
              onKeyDown={(event) => handleKeyDown(event, item, index)}
            >
              {item.icon && (
                <span
                  className={cn('aios-prompts__item-icon', classNames.itemIcon)}
                  style={styles.itemIcon}
                  data-slot="prompts-item-icon"
                >
                  {item.icon}
                </span>
              )}
              <span className="aios-prompts__item-text">
                {item.title && (
                  <span
                    className={cn('aios-prompts__item-title', classNames.itemTitle)}
                    style={styles.itemTitle}
                    data-slot="prompts-item-title"
                  >
                    {item.title}
                  </span>
                )}
                {item.description && (
                  <span
                    className={cn('aios-prompts__item-description', classNames.itemDescription)}
                    style={styles.itemDescription}
                    data-slot="prompts-item-description"
                  >
                    {item.description}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  },
)

Prompts.displayName = 'Prompts'

export default Prompts
