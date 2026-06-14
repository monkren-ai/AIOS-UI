import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '../lib/utils'
import '../styles/card.css'

/* ────────────────────────────────────────────────────────────
   ContentCard variants
   ──────────────────────────────────────────────────────────── */
const contentCardVariants = cva('nothing-card', {
  variants: {
    variant: {
      default: '',
      raised: 'nothing-card--raised',
      compact: 'nothing-card--compact',
      technical: 'nothing-card--technical',
    },
    interactive: { true: 'nothing-card--interactive', false: '' },
    disabled: { true: 'nothing-card--disabled', false: '' },
  },
  defaultVariants: {
    variant: 'default',
    interactive: false,
    disabled: false,
  },
})

/* ────────────────────────────────────────────────────────────
   WidgetCard variants
   ──────────────────────────────────────────────────────────── */
const widgetCardVariants = cva('nothing-widget-card', {
  variants: {
    size: {
      square: 'nothing-widget-card--square',
      wide: 'nothing-widget-card--wide',
      tall: 'nothing-widget-card--tall',
      auto: 'nothing-widget-card--auto',
    },
    shape: {
      rounded: 'nothing-widget-card--rounded',
      pill: 'nothing-widget-card--pill',
      circle: 'nothing-widget-card--circle',
    },
    theme: {
      light: 'nothing-widget-card--light',
      dark: 'nothing-widget-card--dark',
      accent: 'nothing-widget-card--accent',
    },
    variant: {
      default: '',
      compact: 'nothing-widget-card--compact',
    },
    align: {
      left: 'nothing-widget-card--align-left',
      center: 'nothing-widget-card--align-center',
      right: 'nothing-widget-card--align-right',
    },
    iconPosition: {
      top: 'nothing-widget-card--icon-top',
      left: 'nothing-widget-card--icon-left',
      right: 'nothing-widget-card--icon-right',
      bottom: 'nothing-widget-card--icon-bottom',
    },
  },
  defaultVariants: {
    size: 'square',
    shape: 'rounded',
    theme: 'dark',
    variant: 'default',
    align: 'center',
    iconPosition: 'top',
  },
})

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */
type ContentCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof contentCardVariants> & {
    title?: string
    action?: string
    onAction?: (e: React.MouseEvent<HTMLElement>) => void
    footer?: React.ReactNode
  }

export type WidgetCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof widgetCardVariants> & {
    title?: string
    value?: string | number
    subtitle?: string
    icon?: React.ReactNode
    onClick?: () => void
  }

type CardProps =
  | (ContentCardProps & { mode?: 'content' })
  | (WidgetCardProps & { mode: 'widget' })

/* ────────────────────────────────────────────────────────────
   ContentCard renderer
   ──────────────────────────────────────────────────────────── */
const ContentCard: React.FC<ContentCardProps> = ({
  variant,
  interactive,
  disabled,
  title,
  action,
  onAction,
  onClick,
  footer,
  children,
  className,
  style,
  ...props
}) => {
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
      className={cn(contentCardVariants({ variant, interactive, disabled }), className)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      style={style}
      data-variant={dataAttr(variant)}
      data-state={dataAttr(disabled ? 'disabled' : interactive ? 'interactive' : 'default')}
      {...props}
    >
      {(title || action) && (
        <div className="nothing-card__header">
          {title && <div className="nothing-card__title">{title}</div>}
          {action && (
            <button className="nothing-card__action" onClick={onAction}>
              {action}
            </button>
          )}
        </div>
      )}
      <div className="nothing-card__body">{children}</div>
      {footer && <div className="nothing-card__footer">{footer}</div>}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   WidgetCard renderer
   ──────────────────────────────────────────────────────────── */
const WidgetCardRenderer: React.FC<WidgetCardProps> = ({
  size,
  shape,
  theme,
  variant,
  title,
  value,
  subtitle,
  icon,
  iconPosition,
  align,
  className,
  children,
  onClick,
  ...props
}) => {
  const hasChildren = Boolean(children)
  const hasOwnContent = title || value !== undefined || subtitle || icon

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const renderOwnContent = () => {
    if (!hasOwnContent) return null
    const content = (
      <>{value !== undefined && <div className="nothing-widget-card__value">{value}</div>}</>
    )
    if (!icon) return content
    switch (iconPosition) {
      case 'left':
        return (
          <div className="nothing-widget-card__row">
            <div className="nothing-widget-card__icon">{icon}</div>
            <div className="nothing-widget-card__text-content">{content}</div>
          </div>
        )
      case 'right':
        return (
          <div className="nothing-widget-card__row">
            <div className="nothing-widget-card__text-content">{content}</div>
            <div className="nothing-widget-card__icon">{icon}</div>
          </div>
        )
      case 'bottom':
        return (
          <div className="nothing-widget-card__column">
            {content}
            <div className="nothing-widget-card__icon">{icon}</div>
          </div>
        )
      case 'top':
      default:
        return (
          <div className="nothing-widget-card__column">
            <div className="nothing-widget-card__icon">{icon}</div>
            {content}
          </div>
        )
    }
  }

  return (
    <div
      className={cn(
        widgetCardVariants({ size, shape, theme, variant, align, iconPosition }),
        hasChildren && 'nothing-widget-card--has-children',
        onClick && 'nothing-widget-card--clickable',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      data-size={dataAttr(size)}
      data-shape={dataAttr(shape)}
      data-theme={dataAttr(theme)}
      data-variant={dataAttr(variant)}
      {...props}
    >
      {title && <div className="nothing-widget-card__title">{title}</div>}
      <div className="nothing-widget-card__content">
        {renderOwnContent()}
        {children}
      </div>
      {subtitle && <div className="nothing-widget-card__subtitle">{subtitle}</div>}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Unified Card dispatcher
   ──────────────────────────────────────────────────────────── */
const Card: React.FC<CardProps> = (props) => {
  if (props.mode === 'widget') {
    const { mode: _mode, ...rest } = props
    return <WidgetCardRenderer {...(rest as WidgetCardProps)} />
  }
  const { mode: _mode, ...rest } = props
  return <ContentCard {...(rest as ContentCardProps)} />
}

export { Card, WidgetCardRenderer as WidgetCard, contentCardVariants, widgetCardVariants }
export default Card
