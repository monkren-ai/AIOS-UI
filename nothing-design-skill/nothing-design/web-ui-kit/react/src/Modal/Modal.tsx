import * as React from 'react'
import { cn, dataAttr } from '@/lib/utils'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import {
  modalBackdropVariants,
  modalBodyVariants,
  modalCancelVariants,
  modalCloseVariants,
  modalConfirmVariants,
  modalDescriptionVariants,
  modalFooterVariants,
  modalHeaderVariants,
  modalTitleVariants,
  modalVariants,
} from './modal-variants'

/**
 * 刻意不继承 `VariantProps<typeof modalVariants>`：那会把 `alert` 和 `noHeader`
 * 暴露成公开 prop，可它们是从 `variant` 和 `title` 推出来的，直接传进来会被丢掉。
 * 一个「设了不报错、也不起作用」的 prop 比没有这个 prop 更糟。要直接拿这两个开关
 * 请用 `modalVariants()`。
 */
export interface ModalProps extends Omit<React.ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * 必填。Modal 自己不渲染触发器，也没有任何内部路径能把它从关闭翻成打开——
   * 开合完全由调用方掌握。类型上做成可选的话，忘了传就是「静默不渲染」，最难查。
   */
  open: boolean
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

export function Modal({
  className,
  open: isOpen,
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
  ref,
  ...props
}: ModalProps) {
  const isAlert = variant === 'alert'
  const noHeader = !title && !isAlert

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        onClose?.()
      }
    },
    [onClose],
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
        data-destructive={dataAttr(isAlert && destructive)}
        aria-modal="true"
        {...props}
      >
        {!isAlert && (
          <DialogPrimitive.Close
            className={cn(modalCloseVariants({ noHeader }))}
            aria-label="Close"
            data-slot="modal-close"
          >
            ×
          </DialogPrimitive.Close>
        )}
        {(title || (isAlert && description)) && (
          <div className={cn(modalHeaderVariants({ alert: isAlert }))} data-slot="modal-header">
            {title && (
              <DialogPrimitive.Title
                className={cn(
                  modalTitleVariants({ alert: isAlert, destructive: isAlert && destructive }),
                )}
                data-slot="modal-title"
              >
                {title}
              </DialogPrimitive.Title>
            )}
            {isAlert && description && (
              <DialogPrimitive.Description
                className={cn(modalDescriptionVariants())}
                data-slot="modal-description"
              >
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
        )}
        {children && (
          <div className={cn(modalBodyVariants())} data-slot="modal-body">
            {children}
          </div>
        )}
        {isAlert ? (
          <div className={cn(modalFooterVariants())} data-slot="modal-footer">
            <button
              className={cn(modalCancelVariants())}
              data-slot="modal-cancel"
              onClick={handleCancel}
              type="button"
            >
              {cancelLabel}
            </button>
            <button
              className={cn(modalConfirmVariants({ destructive }))}
              data-slot="modal-confirm"
              data-destructive={dataAttr(destructive)}
              onClick={handleConfirm}
              type="button"
            >
              {confirmLabel}
            </button>
          </div>
        ) : footer ? (
          <div className={cn(modalFooterVariants())} data-slot="modal-footer">
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
}

Modal.displayName = 'Modal'

export {
  modalBackdropVariants,
  modalBodyVariants,
  modalCancelVariants,
  modalCloseVariants,
  modalConfirmVariants,
  modalDescriptionVariants,
  modalFooterVariants,
  modalHeaderVariants,
  modalTitleVariants,
  modalVariants,
}
export default Modal
