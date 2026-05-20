import '../styles/cards.css'

interface CardProps {
  variant?: 'default' | 'raised' | 'compact' | 'technical'
  interactive?: boolean
  disabled?: boolean
  title?: string
  action?: string
  onAction?: (e: React.MouseEvent<HTMLElement>) => void
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  footer?: React.ReactNode
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  disabled = false,
  title,
  action,
  onAction,
  onClick,
  footer,
  children
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

export default Card
