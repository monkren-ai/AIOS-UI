import '../../styles/widget-pill.css'

interface WidgetPillProps {
  theme?: 'light' | 'dark' | 'accent' | 'error'
  children?: React.ReactNode
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
  'aria-label'?: string
  className?: string
  style?: React.CSSProperties
}

const WidgetPill: React.FC<WidgetPillProps> = ({
  theme = 'dark',
  children,
  icon,
  label,
  onClick,
  'aria-label': ariaLabel,
  className,
  style
}) => {
  const classNames = [
    'nothing-widget-pill',
    `nothing-widget-pill--${theme}`,
    className
  ].filter(Boolean).join(' ')

  const handleKeyDown = onClick ? (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  } : undefined

  return (
    <div
      className={classNames}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      {(icon || children) && (
        <div className="nothing-widget-pill__icon">
          {icon || children}
        </div>
      )}
      {label && (
        <div className="nothing-widget-pill__label">
          {label}
        </div>
      )}
    </div>
  )
}

export default WidgetPill

