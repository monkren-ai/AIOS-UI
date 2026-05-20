import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/modal.css'

interface ModalProps {
  open?: boolean
  title?: string
  onClose?: () => void
  footer?: React.ReactNode
  children?: React.ReactNode
  variant?: 'default' | 'alert'
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  destructive?: boolean
}

const Modal: React.FC<ModalProps> = ({
  open: controlledOpen,
  title,
  onClose,
  footer,
  children,
  variant = 'default',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false
}) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => {
        const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
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

  const handleClose = useCallback(() => {
    if (controlledOpen === undefined) {
      setInternalOpen(false)
    }
    onClose?.()
  }, [controlledOpen, onClose])

  const handleConfirm = useCallback(() => {
    onConfirm?.()
    handleClose()
  }, [onConfirm, handleClose])

  const handleCancel = useCallback(() => {
    onCancel?.()
    handleClose()
  }, [onCancel, handleClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (variant === 'alert') {
        handleCancel()
      } else {
        handleClose()
      }
    }
  }

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (variant === 'alert') {
        handleCancel()
      } else {
        handleClose()
      }
      return
    }
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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
  }, [variant, handleClose, handleCancel])

  const isAlert = variant === 'alert'

  const backdropClassNames = [
    'nothing-modal-backdrop',
    isAlert ? 'nothing-modal-backdrop--blur' : '',
    isOpen ? 'nothing-modal-backdrop--visible' : ''
  ].filter(Boolean).join(' ')

  const modalClassNames = [
    'nothing-modal',
    isAlert ? 'nothing-modal--alert' : '',
    isAlert && destructive ? 'nothing-modal--destructive' : '',
    !title && !isAlert ? 'nothing-modal--no-header' : ''
  ].filter(Boolean).join(' ')

  const confirmClassNames = [
    'nothing-modal__confirm',
    destructive ? 'nothing-modal__confirm--destructive' : ''
  ].filter(Boolean).join(' ')

  const titleId = title ? 'nothing-modal-title' : undefined
  const descriptionId = description ? 'nothing-modal-description' : undefined

  return (
    <div className={backdropClassNames} onClick={handleBackdropClick} aria-hidden={!isOpen ? 'true' : undefined}>
      <div
        className={modalClassNames}
        ref={dialogRef}
        role={isAlert ? 'alertdialog' : 'dialog'}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={isAlert ? descriptionId : undefined}
        onKeyDown={handleKeyDown}
      >
        {!isAlert && (
          <button className="nothing-modal__close" onClick={handleClose} aria-label="Close">
            ×
          </button>
        )}
        {(title || (isAlert && description)) && (
          <div className="nothing-modal__header">
            {title && (
              <div className="nothing-modal__title" id={titleId}>{title}</div>
            )}
            {isAlert && description && (
              <div className="nothing-modal__description" id={descriptionId}>{description}</div>
            )}
          </div>
        )}
        {children && (
          <div className="nothing-modal__body">
            {children}
          </div>
        )}
        {isAlert ? (
          <div className="nothing-modal__footer">
            <button className="nothing-modal__cancel" onClick={handleCancel}>
              {cancelLabel}
            </button>
            <button className={confirmClassNames} onClick={handleConfirm}>
              {confirmLabel}
            </button>
          </div>
        ) : footer ? (
          <div className="nothing-modal__footer">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Modal
