import '../../styles/widget-icon.css'

interface WidgetIconProps {
  theme?: 'light' | 'dark' | 'accent' | 'error'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  icon?: React.ReactNode
  label?: string
  className?: string
}

const WidgetIcon: React.FC<WidgetIconProps> = ({
  theme = 'dark',
  size = 'md',
  children,
  icon,
  label,
  className
}) => {
  const classNames = [
    'nothing-widget-icon',
    `nothing-widget-icon--${theme}`,
    `nothing-widget-icon--${size}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      {(icon || children) && (
        <div className="nothing-widget-icon__icon">
          {icon || children}
        </div>
      )}
      {label && (
        <div className="nothing-widget-icon__label">
          {label}
        </div>
      )}
    </div>
  )
}

export default WidgetIcon

