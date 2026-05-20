import React, { useRef, useEffect, useCallback, useId } from 'react'
import { useDisclosure, useFloating, useClickOutside } from '../hooks'
import '../styles/popover.css'

interface PopoverProps {
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactElement
}

const Popover: React.FC<PopoverProps> = ({
  content,
  side = 'bottom',
  open: controlledOpen,
  onOpenChange,
  children
}) => {
  const { isOpen, open, close } = useDisclosure(false)
  const isVisible = controlledOpen !== undefined ? controlledOpen : isOpen
  const triggerRef = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const popoverId = useId()
  const { style, update } = useFloating(side)

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      if (nextOpen) open()
      else close()
    }
    onOpenChange?.(nextOpen)
  }, [controlledOpen, onOpenChange, open, close])

  useClickOutside(containerRef, () => {
    if (isVisible) handleOpenChange(false)
  })

  useEffect(() => {
    if (isVisible && triggerRef.current && contentRef.current) {
      update(triggerRef.current, contentRef.current)
    }
  }, [isVisible, update])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleOpenChange(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVisible, handleOpenChange])

  const contentClassNames = [
    'nothing-popover__content',
    isVisible ? 'nothing-popover__content--visible' : '',
    `nothing-popover__content--${side}`
  ].filter(Boolean).join(' ')

  return (
    <div className="nothing-popover" ref={containerRef}>
      <span
        className="nothing-popover__trigger"
        ref={triggerRef}
        onClick={() => handleOpenChange(!isVisible)}
        aria-haspopup={true}
        aria-expanded={isVisible}
        aria-controls={popoverId}
      >
        {children}
      </span>
      <div
        ref={contentRef}
        className={contentClassNames}
        role="dialog"
        id={popoverId}
        style={style}
      >
        {content}
      </div>
    </div>
  )
}

export default Popover
