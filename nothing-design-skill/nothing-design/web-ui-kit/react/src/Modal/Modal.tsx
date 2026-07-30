import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn, dataAttr } from '@/lib/utils'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import './Modal.css'

const modalBackdropVariants = cva('nothing-modal-backdrop', {
  variants: {
    alert: { true: '', false: '' },
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
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
    const isAlert = variant === 'alert'
    const noHeader = !title && !isAlert

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(nextOpen)
        }
        if (!nextOpen) {
          onClose?.()
        }
      },
      [controlledOpen, onClose],
    )

    const handleConfirm = React.useCallback(() => {
      onConfirm?.()
      handleOpenChange(false)
    }, [onConfirm, handleOpenChange])

    const handleCancel = React.useCallback(() => {
      onCancel?.()
      handleOpenChange(false)
    }, [onCancel, handleOpenChange])

    const popup = (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(modalBackdropVariants({ alert: isAlert, visible: isOpen }))}
          data-slot="modal-backdrop"
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
          data-variant={dataAttr(variant)}
        />
        <DialogPrimitive.Popup
          ref={ref}
          className={cn(
            modalVariants({ alert: isAlert, destructive: isAlert && destructive, noHeader }),
            className,
          )}
          data-slot="modal"
          data-state={dataAttr(isOpen ? 'open' : 'closed')}
          data-variant={dataAttr(variant)}
          aria-modal="true"
          {...props}
        >
          {!isAlert && (
            <DialogPrimitive.Close
              className="nothing-modal__close"
              aria-label="Close"
              data-slot="modal-close"
            >
              ×
            </DialogPrimitive.Close>
          )}
          {(title || (isAlert && description)) && (
            <div className="nothing-modal__header" data-slot="modal-header">
              {title && (
                <DialogPrimitive.Title className="nothing-modal__title" data-slot="modal-title">
                  {title}
                </DialogPrimitive.Title>
              )}
              {isAlert && description && (
                <DialogPrimitive.Description
                  className="nothing-modal__description"
                  data-slot="modal-description"
                >
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
          )}
          {children && (
            <div className="nothing-modal__body" data-slot="modal-body">
              {children}
            </div>
          )}
          {isAlert ? (
            <div className="nothing-modal__footer" data-slot="modal-footer">
              <button className="nothing-modal__cancel" onClick={handleCancel} type="button">
                {cancelLabel}
              </button>
              <button
                className={cn(modalConfirmVariants({ destructive }))}
                onClick={handleConfirm}
                type="button"
              >
                {confirmLabel}
              </button>
            </div>
          ) : footer ? (
            <div className="nothing-modal__footer" data-slot="modal-footer">
              {footer}
            </div>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    )

    if (isAlert) {
      return (
        <AlertDialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
          {popup}
        </AlertDialogPrimitive.Root>
      )
    }

    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {popup}
      </DialogPrimitive.Root>
    )
  },
)
Modal.displayName = 'Modal'

export { modalBackdropVariants, modalVariants, modalConfirmVariants }
export default Modal
