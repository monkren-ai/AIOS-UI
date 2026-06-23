import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import {
  OverlayPortal,
  useEscapeKey,
  useOverlayState,
  useScrollLock,
  useTabCycle,
} from '@/ui/OverlayPortal'
import './Modal.css'

const modalBackdropVariants = cva('nothing-modal-backdrop', {
  variants: {
    alert: { true: 'nothing-modal-backdrop--blur', false: '' },
    visible: { true: 'nothing-modal-backdrop--visible', false: '' },
  },
  defaultVariants: { alert: false, visible: false },
})

const modalVariants = cva('nothing-modal', {
  variants: {
    alert: { true: 'nothing-modal--alert', false: '' },
    destructive: { true: 'nothing-modal--destructive', false: '' },
    noHeader: { true: 'nothing-modal--no-header', false: '' },
  },
  defaultVariants: { alert: false, destructive: false, noHeader: false },
})

const modalConfirmVariants = cva('nothing-modal__confirm', {
  variants: {
    destructive: { true: 'nothing-modal__confirm--destructive', false: '' },
  },
  defaultVariants: { destructive: false },
})

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof modalVariants> {
  open?: boolean
  onClose?: () => void
  title?: string
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

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open: controlledOpen,
      onClose,
      title,
      footer,
      children,
      variant = 'default',
      description,
      confirmLabel = 'Confirm',
      cancelLabel = 'Cancel',
      onConfirm,
      onCancel,
      destructive = false,
      ...props
    },
    ref
  ) => {
    const { isOpen, close, setOpen } = useOverlayState(controlledOpen, onClose)
    const { ref: trapRef, onKeyDown: tabCycle } = useTabCycle<HTMLDivElement>(isOpen)
    useScrollLock(isOpen)
    useEscapeKey(isOpen, () => {
      if (variant === 'alert') {
        handleCancel()
      } else {
        close()
      }
    })

    const setDialogRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        trapRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref && 'current' in ref) {
          ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }
      },
      [ref, trapRef]
    )

    const handleConfirm = React.useCallback(() => {
      onConfirm?.()
      setOpen(false)
    }, [onConfirm, setOpen])

    const handleCancel = React.useCallback(() => {
      onCancel?.()
      setOpen(false)
    }, [onCancel, setOpen])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        if (variant === 'alert') {
          handleCancel()
        } else {
          close()
        }
      }
    }

    const isAlert = variant === 'alert'
    const noHeader = !title && !isAlert

    const titleId = title ? 'nothing-modal-title' : undefined
    const descriptionId = description ? 'nothing-modal-description' : undefined

    return (
      <OverlayPortal open={isOpen}>
        <div
          className={cn(modalBackdropVariants({ alert: isAlert, visible: isOpen }))}
          onClick={handleBackdropClick}
          aria-hidden={!isOpen ? 'true' : undefined}
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
          data-variant={dataAttr(variant)}
        >
          <div
            ref={setDialogRefs}
            className={cn(
              modalVariants({ alert: isAlert, destructive: isAlert && destructive, noHeader }),
              className
            )}
            role={isAlert ? 'alertdialog' : 'dialog'}
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={isAlert ? descriptionId : undefined}
            onKeyDown={tabCycle}
            data-state={dataAttr(isOpen ? 'open' : 'closed')}
            data-variant={dataAttr(variant)}
            {...props}
          >
            {!isAlert && (
              <button className="nothing-modal__close" onClick={close} aria-label="Close">
                ×
              </button>
            )}
            {(title || (isAlert && description)) && (
              <div className="nothing-modal__header">
                {title && (
                  <div className="nothing-modal__title" id={titleId}>
                    {title}
                  </div>
                )}
                {isAlert && description && (
                  <div className="nothing-modal__description" id={descriptionId}>
                    {description}
                  </div>
                )}
              </div>
            )}
            {children && <div className="nothing-modal__body">{children}</div>}
            {isAlert ? (
              <div className="nothing-modal__footer">
                <button className="nothing-modal__cancel" onClick={handleCancel}>
                  {cancelLabel}
                </button>
                <button
                  className={cn(modalConfirmVariants({ destructive }))}
                  onClick={handleConfirm}
                >
                  {confirmLabel}
                </button>
              </div>
            ) : footer ? (
              <div className="nothing-modal__footer">{footer}</div>
            ) : null}
          </div>
        </div>
      </OverlayPortal>
    )
  }
)
Modal.displayName = 'Modal'

export { modalBackdropVariants, modalVariants, modalConfirmVariants }
export default Modal
