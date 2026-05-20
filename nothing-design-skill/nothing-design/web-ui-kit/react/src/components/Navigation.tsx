import { useState } from 'react'
import '../styles/navigation.css'

interface NavItem {
  label: string
  icon?: React.ReactNode
}

interface NavigationProps {
  items: NavItem[]
  activeIndex?: number
  variant?: 'default' | 'bracket' | 'pipe'
  showBack?: boolean
  onBack?: () => void
  onChange?: (index: number) => void
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  activeIndex: controlledIndex,
  variant = 'default',
  showBack = false,
  onBack,
  onChange
}) => {
  const [internalIndex, setInternalIndex] = useState(0)
  const activeIdx = controlledIndex !== undefined ? controlledIndex : internalIndex

  const handleSelect = (index: number) => {
    if (controlledIndex === undefined) {
      setInternalIndex(index)
    }
    onChange?.(index)
  }

  const classNames = [
    'nothing-nav',
    variant !== 'default' ? `nothing-nav--${variant}` : ''
  ].filter(Boolean).join(' ')

  return (
    <nav className={classNames}>
      {showBack && (
        <button className="nothing-nav__back" onClick={onBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {items.map((item, index) => (
        <span key={index} className="nothing-nav__item-wrapper">
          {index > 0 && variant === 'pipe' && (
            <span className="nothing-nav__separator">|</span>
          )}
          <button
            className={[
              'nothing-nav__item',
              index === activeIdx ? 'nothing-nav__item--active' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => handleSelect(index)}
          >
            {item.icon}
            {item.label}
          </button>
        </span>
      ))}
    </nav>
  )
}

export default Navigation
