import { useState, useCallback } from 'react'
import '../styles/collapsible.css'

interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
}

const Collapsible: React.FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  style
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const handleToggle = useCallback(() => {
    const next = !isOpen
    if (controlledOpen === undefined) {
      setInternalOpen(next)
    }
    onOpenChange?.(next)
  }, [isOpen, controlledOpen, onOpenChange])

  const classNames = [
    'nothing-collapsible',
    isOpen ? 'nothing-collapsible--open' : ''
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames} style={style}>
      <button
        className="nothing-collapsible__trigger"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        {trigger}
      </button>
      <div
        className="nothing-collapsible__content"
        role="region"
      >
        <div className="nothing-collapsible__content-inner">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Collapsible
