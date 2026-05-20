import '../styles/widget-card.css'

interface WidgetCardProps {
  size?: 'square' | 'wide' | 'tall' | 'auto'
  shape?: 'rounded' | 'pill' | 'circle'
  theme?: 'light' | 'dark' | 'accent'
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

const WidgetCard: React.FC<WidgetCardProps> = ({
  size = 'square',
  shape = 'rounded',
  theme = 'dark',
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

export default WidgetCard
