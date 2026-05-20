import '../styles/alert.css'

interface AlertProps {
  variant?: 'default' | 'destructive'
  title?: string
  children: React.ReactNode
  icon?: React.ReactNode
  style?: React.CSSProperties
}

const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  children,
  icon,
  style
}) => {
  const classNames = [
    'nothing-alert',
    variant !== 'default' ? `nothing-alert--${variant}` : ''
  ].filter(Boolean).join(' ')

  return (
    <div
      className={classNames}
      role={variant === 'destructive' ? 'alert' : 'status'}
      style={style}
    >
      {icon && (
        <div className="nothing-alert__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="nothing-alert__content">
        {title && (
          <div className="nothing-alert__title">{title}</div>
        )}
        <div className="nothing-alert__message">{children}</div>
      </div>
    </div>
  )
}

export default Alert
