import '../styles/buttons.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  children,
  onClick
}) => {
  const classNames = [
    'nothing-btn',
    `nothing-btn--${variant}`,
    size !== 'default' ? `nothing-btn--${size}` : '',
    fullWidth ? 'nothing-btn--full' : ''
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
