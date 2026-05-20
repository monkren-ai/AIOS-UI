import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/sheet.css'

interface SheetSection {
  title?: string
  content: React.ReactNode
}

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
  full?: boolean
  sections?: SheetSection[]
  footer?: React.ReactNode
  children?: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({
  open: controlledOpen,
  onOpenChange,
  side = 'right',
  title,
  full = false,
  sections,
  footer,
  children
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        const firstFocusable = sheetRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      })
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (controlledOpen === undefined) {
      setInternalOpen(false)
    }
    onOpenChange?.(false)
  }

  const handleBackdropClick = () => {
    handleClose()
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
      return
    }
    if (e.key !== 'Tab' || !sheetRef.current) return
    const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [onOpenChange, controlledOpen])

  const isBottomSheetMode = side === 'bottom' && sections

  const backdropClassNames = [
    'nothing-sheet-backdrop',
    isOpen ? 'nothing-sheet-backdrop--visible' : ''
  ].filter(Boolean).join(' ')

  const sheetClassNames = [
    'nothing-sheet',
    `nothing-sheet--${side}`,
    isOpen ? `nothing-sheet--visible-${side}` : '',
    full ? 'nothing-sheet--full' : ''
  ].filter(Boolean).join(' ')

  const titleId = title ? 'nothing-sheet-title' : undefined

  return (
    <>
      <div className={backdropClassNames} onClick={handleBackdropClick} aria-hidden="true" />
      <div
        className={sheetClassNames}
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
      >
        {isBottomSheetMode && (
          <div className="nothing-sheet__handle" aria-hidden="true">
            <div className="nothing-sheet__handle-bar" />
          </div>
        )}
        <div className="nothing-sheet__header">
          {title && (
            <div className="nothing-sheet__title" id={titleId}>{title}</div>
          )}
          <button
            className={isBottomSheetMode ? 'nothing-sheet__dismiss' : 'nothing-sheet__close'}
            onClick={handleClose}
            aria-label="Close"
          >
            {isBottomSheetMode ? 'Done' : '×'}
          </button>
        </div>
        {sections ? (
          sections.map((section, index) => (
            <div key={index} className="nothing-sheet__section">
              {section.title && (
                <div className="nothing-sheet__section-title">{section.title}</div>
              )}
              {section.content}
            </div>
          ))
        ) : (
          <div className="nothing-sheet__body">
            {children}
          </div>
        )}
        {footer && (
          <div className="nothing-sheet__footer">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

export default Sheet
