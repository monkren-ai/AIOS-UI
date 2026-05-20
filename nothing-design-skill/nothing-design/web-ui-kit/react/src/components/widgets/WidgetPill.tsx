import '../../styles/widget-pill.css'

interface WidgetPillProps {
  theme?: 'light' | 'dark' | 'accent' | 'error'
  children?: React.ReactNode
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

const WidgetPill: React.FC<WidgetPillProps> = ({
  theme = 'dark',
  children,
  icon,
  label,
  onClick,
  className,
  style
}) => {
  const classNames = [
    'nothing-widget-pill',
    `nothing-widget-pill--${theme}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames} onClick={onClick} style={style}>
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

