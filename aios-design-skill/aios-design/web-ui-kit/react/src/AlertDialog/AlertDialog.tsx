import * as React from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { cn, dataAttr } from '@/lib/utils'
import {
  alertDialogBackdropVariants,
  alertDialogBodyVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogPopupVariants,
  alertDialogTitleVariants,
  alertDialogViewportVariants,
} from './alert-dialog-variants'

export type AlertDialogProps = React.ComponentProps<typeof BaseAlertDialog.Root>
export const AlertDialog = BaseAlertDialog.Root

export type AlertDialogTriggerProps = React.ComponentProps<typeof BaseAlertDialog.Trigger>
export function AlertDialogTrigger({ className, ...props }: AlertDialogTriggerProps) {
  return (
    <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" className={className} {...props} />
  )
}

export interface AlertDialogContentProps extends React.ComponentProps<
  typeof BaseAlertDialog.Popup
> {
  destructive?: boolean
  backdropClassName?: string
  viewportClassName?: string
}

export function AlertDialogContent({
  className,
  children,
  destructive = false,
  backdropClassName,
  viewportClassName,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop
        className={cn(alertDialogBackdropVariants(), backdropClassName)}
        data-slot="alert-dialog-backdrop"
      />
      <BaseAlertDialog.Viewport
        className={cn(alertDialogViewportVariants(), viewportClassName)}
        data-slot="alert-dialog-viewport"
      >
        <BaseAlertDialog.Popup
          className={cn(alertDialogPopupVariants({ destructive }), className)}
          data-slot="alert-dialog"
          data-destructive={dataAttr(destructive)}
          {...props}
        >
          {children}
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  )
}

export type AlertDialogHeaderProps = React.ComponentPropsWithRef<'div'>
export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      className={cn(alertDialogHeaderVariants(), className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  )
}

export interface AlertDialogTitleProps extends React.ComponentProps<typeof BaseAlertDialog.Title> {
  destructive?: boolean
}
export function AlertDialogTitle({ className, destructive, ...props }: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      className={cn(alertDialogTitleVariants({ destructive }), className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  )
}

export type AlertDialogDescriptionProps = React.ComponentProps<typeof BaseAlertDialog.Description>
export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      className={cn(alertDialogDescriptionVariants(), className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  )
}

export type AlertDialogBodyProps = React.ComponentPropsWithRef<'div'>
export function AlertDialogBody({ className, ...props }: AlertDialogBodyProps) {
  return (
    <div
      className={cn(alertDialogBodyVariants(), className)}
      data-slot="alert-dialog-body"
      {...props}
    />
  )
}

export type AlertDialogFooterProps = React.ComponentPropsWithRef<'div'>
export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div
      className={cn(alertDialogFooterVariants(), className)}
      data-slot="alert-dialog-footer"
      {...props}
    />
  )
}

export type AlertDialogCloseProps = React.ComponentProps<typeof BaseAlertDialog.Close>
export function AlertDialogClose({ className, ...props }: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close className={className} data-slot="alert-dialog-close" {...props} />
}

export {
  alertDialogBackdropVariants,
  alertDialogBodyVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogPopupVariants,
  alertDialogTitleVariants,
  alertDialogViewportVariants,
}
