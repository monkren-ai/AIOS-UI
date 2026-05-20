import '../styles/quick-toggle.css'

interface QuickToggleProps {
  variant?: 'circle' | 'pill'
  theme?: 'light' | 'dark' | 'accent'
  icon?: React.ReactNode
  label?: string
  active?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  className?: string
}

const QuickToggle: React.FC<QuickToggleProps> = ({
  variant = 'circle',
  theme = 'light',
  icon,
  label,
  active = false,
  onClick,
  className
}) => {
  const classNames = [
    'nothing-quick-toggle',
    `nothing-quick-toggle--${variant}`,
    `nothing-quick-toggle--${theme}`,
    active ? 'nothing-quick-toggle--active' : '',
    className || ''
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNames}
      onClick={onClick}
      aria-pressed={active}
      type="button"
    >
      {icon && (
        <span className="nothing-quick-toggle__icon">{icon}</span>
      )}
      {label && (
        <span className="nothing-quick-toggle__label">{label}</span>
      )}
    </button>
  )
}

export default QuickToggle
