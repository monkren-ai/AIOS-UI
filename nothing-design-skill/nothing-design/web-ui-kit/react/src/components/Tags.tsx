import '../styles/tags.css'

interface TagProps {
  variant?: 'pill' | 'technical'
  active?: boolean
  removable?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  onRemove?: () => void
  style?: React.CSSProperties
}

const Tag: React.FC<TagProps> = ({
  variant = 'pill',
  active = false,
  removable = false,
  disabled = false,
  children,
  onClick,
  onRemove,
  style
}) => {
  const classNames = [
    'nothing-tag',
    variant === 'technical' ? 'nothing-tag--technical' : '',
    active ? 'nothing-tag--active' : '',
    disabled ? 'nothing-tag--disabled' : ''
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    onRemove?.()
  }

  const handleRemoveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      if (disabled) return
      onRemove?.()
    }
  }

  return (
    <span
      className={classNames}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
    >
      {children}
      {removable && (
        <button
          className="nothing-tag__remove"
          onClick={handleRemove}
          onKeyDown={handleRemoveKeyDown}
          tabIndex={disabled ? -1 : 0}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  )
}

interface TagsProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const Tags: React.FC<TagsProps> = ({ children, style }) => {
  return (
    <div className="nothing-tags" style={style}>
      {children}
    </div>
  )
}

export { Tag, Tags }
export default Tag
