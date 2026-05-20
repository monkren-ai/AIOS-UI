import '../styles/badge.css'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children
}) => {
  const classNames = [
    'nothing-badge',
    variant !== 'default' ? `nothing-badge--${variant}` : ''
  ].filter(Boolean).join(' ')

  return (
    <span className={classNames}>
      {children}
    </span>
  )
}

export default Badge
