import '../styles/badge.css'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children: React.ReactNode
  style?: React.CSSProperties
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  style
}) => {
  const classNames = [
    'nothing-badge',
    variant !== 'default' ? `nothing-badge--${variant}` : ''
  ].filter(Boolean).join(' ')

  return (
    <span className={classNames} style={style}>
      {children}
    </span>
  )
}

export default Badge
