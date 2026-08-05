import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import {
  contentCardVariants,
  resolveCardShape,
  resolveCardSize,
  resolveCardVariant,
  resolveWidgetCardDensity,
  resolveWidgetCardSize,
  widgetCardSubtitleVariants,
  widgetCardTitleVariants,
  widgetCardValueVariants,
  widgetCardVariants,
  type CardShape,
  type CardSize,
  type CardVariant,
  type WidgetCardAlign,
  type WidgetCardDensity,
  type WidgetCardIconPosition,
  type WidgetCardShape,
  type WidgetCardSize,
  type WidgetCardTheme,
} from './card-variants'

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

export type ContentCardProps = React.ComponentPropsWithRef<'div'> & {
  /** 视觉样式。 */
  variant?: CardVariant
  /** 内边距密度。 */
  size?: CardSize
  /** 圆角或工业风方角。 */
  shape?: CardShape
  /** 整卡可点击，带 button 语义与键盘激活。 */
  interactive?: boolean
  disabled?: boolean
  title?: string
  action?: string
  onAction?: (e: React.MouseEvent<HTMLElement>) => void
  footer?: React.ReactNode
  media?: React.ReactNode
  logo?: React.ReactNode
  feature?: React.ReactNode
}

export type WidgetCardProps = Omit<React.ComponentPropsWithRef<'div'>, 'onClick' | 'title'> & {
  /** 版型。也接受 sm|md|lg 作为 tall|square|wide 的别名。 */
  size?: WidgetCardSize
  shape?: WidgetCardShape
  /** Widget 自己的配色，与全局 `[data-theme]` 无关。 */
  theme?: WidgetCardTheme
  /** 内边距密度。 */
  variant?: WidgetCardDensity
  align?: WidgetCardAlign
  iconPosition?: WidgetCardIconPosition
  title?: string
  value?: string | number
  subtitle?: string
  icon?: React.ReactNode
  onClick?: () => void
}

export type CardProps =
  | (ContentCardProps & { mode?: 'content' })
  | (WidgetCardProps & { mode: 'widget' })

/* ────────────────────────────────────────────────────────────
   ContentCard
   ──────────────────────────────────────────────────────────── */

function ContentCard({
  variant,
  size,
  shape,
  interactive,
  disabled,
  title,
  action,
  onAction,
  onClick,
  footer,
  media,
  logo,
  feature,
  children,
  className,
  ...props
}: ContentCardProps) {
  const resolvedVariant = (resolveCardVariant(variant) ?? 'soft') as never
  const resolvedSize = (resolveCardSize(variant, size) ?? 'md') as never
  const resolvedShape = (resolveCardShape(variant, shape) ?? 'rounded') as never

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
    }
  }

  return (
    <div
      className={cn(
        contentCardVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          shape: resolvedShape,
          interactive,
          disabled,
        }),
        className,
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      data-slot="card"
      data-variant={dataAttr(resolveCardVariant(variant) ?? 'soft')}
      data-size={dataAttr(resolveCardSize(variant, size) ?? 'md')}
      data-shape={dataAttr(resolveCardShape(variant, shape) ?? 'rounded')}
      data-interactive={dataAttr(interactive)}
      data-disabled={dataAttr(disabled)}
      data-state={dataAttr(disabled ? 'disabled' : interactive ? 'interactive' : 'default')}
      {...props}
    >
      {logo && (
        <div
          data-slot="card-logo"
          className="mb-2 inline-flex items-center justify-center text-foreground-muted [&_svg]:size-6"
        >
          {logo}
        </div>
      )}
      {(title || action || feature) && (
        <div data-slot="card-header" className="mb-4 flex items-center justify-between gap-2">
          <div data-slot="card-header-main" className="flex flex-wrap items-center gap-2">
            {title && (
              <div
                data-slot="card-title"
                className="font-mono text-caption uppercase tracking-wider text-foreground-muted"
              >
                {title}
              </div>
            )}
            {feature && (
              <span
                data-slot="card-feature"
                className="rounded-pill border border-border-visible px-2 py-0.5 font-mono text-micro uppercase tracking-wider text-foreground-muted"
              >
                {feature}
              </span>
            )}
          </div>
          {action && (
            <button
              type="button"
              data-slot="card-action"
              className={cn(
                'cursor-pointer border-none bg-transparent p-0',
                'font-mono text-label uppercase tracking-wider text-foreground-muted',
                'transition-colors duration-200 ease-nothing motion-reduce:transition-none',
                'hover:text-foreground-display',
                'outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2',
              )}
              onClick={onAction}
            >
              {action}
            </button>
          )}
        </div>
      )}
      {media && (
        <div
          data-slot="card-media"
          className="mb-4 overflow-hidden rounded-md [&_img]:block [&_img]:h-auto [&_img]:w-full [&_video]:block [&_video]:h-auto [&_video]:w-full"
        >
          {media}
        </div>
      )}
      <div data-slot="card-body" className="text-foreground">
        {children}
      </div>
      {footer && (
        <div
          data-slot="card-footer"
          className="mt-4 flex items-center gap-2 border-t border-border pt-4"
        >
          {footer}
        </div>
      )}
    </div>
  )
}

ContentCard.displayName = 'ContentCard'

/* ────────────────────────────────────────────────────────────
   WidgetCard
   ──────────────────────────────────────────────────────────── */

export function WidgetCard({
  size,
  shape = 'rounded',
  theme = 'dark',
  variant,
  title,
  value,
  subtitle,
  icon,
  iconPosition = 'top',
  align = 'center',
  className,
  children,
  onClick,
  ...props
}: WidgetCardProps) {
  const hasChildren = Boolean(children)
  const hasOwnContent = title || value !== undefined || subtitle || icon
  const resolvedSize = (resolveWidgetCardSize(size) ?? 'square') as never
  const density = (resolveWidgetCardDensity(variant) ?? 'default') as WidgetCardDensity

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const alignItems =
    align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'

  const renderOwnContent = () => {
    if (!hasOwnContent) return null
    const content =
      value !== undefined ? (
        <div data-slot="widget-card-value" className={widgetCardValueVariants({ theme, density })}>
          {value}
        </div>
      ) : null

    if (!icon) return content

    const iconEl = (
      <div data-slot="widget-card-icon" className="flex shrink-0 items-center justify-center">
        {icon}
      </div>
    )
    const textEl = (
      <div data-slot="widget-card-text" className="flex flex-1 flex-col gap-1">
        {content}
      </div>
    )

    switch (iconPosition) {
      case 'left':
        return (
          <div data-slot="widget-card-row" className={cn('flex flex-row gap-2', alignItems)}>
            {iconEl}
            {textEl}
          </div>
        )
      case 'right':
        return (
          <div data-slot="widget-card-row" className={cn('flex flex-row gap-2', alignItems)}>
            {textEl}
            {iconEl}
          </div>
        )
      case 'bottom':
        return (
          <div data-slot="widget-card-column" className={cn('flex flex-col gap-2', alignItems)}>
            {content}
            {iconEl}
          </div>
        )
      case 'top':
      default:
        return (
          <div data-slot="widget-card-column" className={cn('flex flex-col gap-2', alignItems)}>
            {iconEl}
            {content}
          </div>
        )
    }
  }

  return (
    <div
      className={cn(
        widgetCardVariants({
          size: resolvedSize,
          shape,
          theme,
          density,
          align,
          clickable: Boolean(onClick),
          hasChildren,
        }),
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      data-slot="widget-card"
      data-size={dataAttr(resolveWidgetCardSize(size) ?? 'square')}
      data-shape={dataAttr(shape)}
      data-widget-theme={dataAttr(theme)}
      data-variant={dataAttr(density)}
      data-align={dataAttr(align)}
      data-has-children={dataAttr(hasChildren)}
      {...props}
    >
      {title && (
        <div data-slot="widget-card-title" className={widgetCardTitleVariants({ theme })}>
          {title}
        </div>
      )}
      <div
        data-slot="widget-card-content"
        className={cn(
          'flex min-h-0 grow flex-col justify-center',
          hasChildren &&
            'justify-stretch p-0 [&>*]:size-full [&>*]:rounded-[inherit] [&>*:first-child]:grow',
        )}
      >
        {renderOwnContent()}
        {children}
      </div>
      {subtitle && (
        <div data-slot="widget-card-subtitle" className={widgetCardSubtitleVariants({ theme })}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

WidgetCard.displayName = 'WidgetCard'

/* ────────────────────────────────────────────────────────────
   Unified Card dispatcher
   ──────────────────────────────────────────────────────────── */

export function Card(props: CardProps) {
  if (props.mode === 'widget') {
    const { mode: _mode, ...rest } = props
    return <WidgetCard {...(rest as WidgetCardProps)} />
  }
  const { mode: _mode, ...rest } = props
  return <ContentCard {...(rest as ContentCardProps)} />
}

Card.displayName = 'Card'

export { ContentCard, contentCardVariants, widgetCardVariants }
export default Card
