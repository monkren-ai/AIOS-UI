import '../styles/card.css'

// --- Content Card Props ---
interface ContentCardProps {
  mode?: 'content'
  variant?: 'default' | 'raised' | 'compact' | 'technical'
  interactive?: boolean
  disabled?: boolean
  title?: string
  action?: string
  onAction?: (e: React.MouseEvent<HTMLElement>) => void
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  footer?: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
}

// --- Widget Card Props ---
export interface WidgetCardProps {
  mode?: 'widget'
  size?: 'square' | 'wide' | 'tall' | 'auto'
  shape?: 'rounded' | 'pill' | 'circle'
  theme?: 'light' | 'dark' | 'accent'
  variant?: 'default' | 'compact'
  title?: string
  value?: string | number
  subtitle?: string
  icon?: React.ReactNode
  iconPosition?: 'top' | 'left' | 'right' | 'bottom'
  align?: 'left' | 'center' | 'right'
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

type CardProps = ContentCardProps | WidgetCardProps

// --- Content Card Renderer ---
const ContentCard: React.FC<ContentCardProps> = ({
  variant = 'default',
  interactive = false,
  disabled = false,
  title,
  action,
  onAction,
  onClick,
  footer,
  children,
  style
}) => {
  const classNames = [
    'nothing-card',
    variant !== 'default' ? `nothing-card--${variant}` : '',
    interactive ? 'nothing-card--interactive' : '',
    disabled ? 'nothing-card--disabled' : ''
  ].filter(Boolean).join(' ')

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return
    onClick?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e as unknown as React.MouseEvent<HTMLElement>)
    }
  }

  return (
    <div
      className={classNames}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      style={style}
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
      <div className="nothing-card__body">
        {children}
      </div>
      {footer && (
        <div className="nothing-card__footer">
          {footer}
        </div>
      )}
    </div>
  )
}

// --- Widget Card Renderer ---
const WidgetCardRenderer: React.FC<WidgetCardProps> = ({
  size = 'square',
  shape = 'rounded',
  theme = 'dark',
  variant = 'default',
  title,
  value,
  subtitle,
  icon,
  iconPosition = 'top',
  align = 'center',
  className,
  children,
  onClick
}) => {
  const hasChildren = Boolean(children)
  const hasOwnContent = title || value !== undefined || subtitle || icon

  const classNames = [
    'nothing-widget-card',
    `nothing-widget-card--${size}`,
    `nothing-widget-card--${shape}`,
    `nothing-widget-card--${theme}`,
    variant !== 'default' && `nothing-widget-card--${variant}`,
    `nothing-widget-card--align-${align}`,
    iconPosition !== 'top' && `nothing-widget-card--icon-${iconPosition}`,
    hasChildren && 'nothing-widget-card--has-children',
    onClick && 'nothing-widget-card--clickable',
    className
  ].filter(Boolean).join(' ')

  const renderOwnContent = () => {
    if (!hasOwnContent) return null

    const content = (
      <>
        {value !== undefined && <div className="nothing-widget-card__value">{value}</div>}
      </>
    )

    if (!icon) {
      return content
    }

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
      className={classNames}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
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

// --- Unified Card Component ---
const Card: React.FC<CardProps> = (props) => {
  if (props.mode === 'widget') {
    return <WidgetCardRenderer {...(props as WidgetCardProps)} />
  }
  return <ContentCard {...(props as ContentCardProps)} />
}

export { Card, WidgetCardRenderer as WidgetCard }
export default Card
