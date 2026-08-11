import { alertDialogBackdropVariants, alertDialogBodyVariants, alertDialogDescriptionVariants, alertDialogFooterVariants, alertDialogHeaderVariants, alertDialogPopupVariants, alertDialogTitleVariants, alertDialogViewportVariants } from "./alert-dialog-variants.mjs";
import * as React$1 from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";

//#region src/AlertDialog/AlertDialog.d.ts
type AlertDialogProps = React$1.ComponentProps<typeof AlertDialog.Root>;
declare const AlertDialog$1: typeof AlertDialog.Root;
type AlertDialogTriggerProps = React$1.ComponentProps<typeof AlertDialog.Trigger>;
declare function AlertDialogTrigger({
  className,
  ...props
}: AlertDialogTriggerProps): React$1.JSX.Element;
interface AlertDialogContentProps extends React$1.ComponentProps<typeof AlertDialog.Popup> {
  destructive?: boolean;
  backdropClassName?: string;
  viewportClassName?: string;
}
declare function AlertDialogContent({
  className,
  children,
  destructive,
  backdropClassName,
  viewportClassName,
  ...props
}: AlertDialogContentProps): React$1.JSX.Element;
type AlertDialogHeaderProps = React$1.ComponentPropsWithRef<'div'>;
declare function AlertDialogHeader({
  className,
  ...props
}: AlertDialogHeaderProps): React$1.JSX.Element;
interface AlertDialogTitleProps extends React$1.ComponentProps<typeof AlertDialog.Title> {
  destructive?: boolean;
}
declare function AlertDialogTitle({
  className,
  destructive,
  ...props
}: AlertDialogTitleProps): React$1.JSX.Element;
type AlertDialogDescriptionProps = React$1.ComponentProps<typeof AlertDialog.Description>;
declare function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps): React$1.JSX.Element;
type AlertDialogBodyProps = React$1.ComponentPropsWithRef<'div'>;
declare function AlertDialogBody({
  className,
  ...props
}: AlertDialogBodyProps): React$1.JSX.Element;
type AlertDialogFooterProps = React$1.ComponentPropsWithRef<'div'>;
declare function AlertDialogFooter({
  className,
  ...props
}: AlertDialogFooterProps): React$1.JSX.Element;
type AlertDialogCloseProps = React$1.ComponentProps<typeof AlertDialog.Close>;
declare function AlertDialogClose({
  className,
  ...props
}: AlertDialogCloseProps): React$1.JSX.Element;
//#endregion
export { AlertDialog$1 as AlertDialog, AlertDialogBody, AlertDialogBodyProps, AlertDialogClose, AlertDialogCloseProps, AlertDialogContent, AlertDialogContentProps, AlertDialogDescription, AlertDialogDescriptionProps, AlertDialogFooter, AlertDialogFooterProps, AlertDialogHeader, AlertDialogHeaderProps, AlertDialogProps, AlertDialogTitle, AlertDialogTitleProps, AlertDialogTrigger, AlertDialogTriggerProps };
//# sourceMappingURL=AlertDialog.d.mts.map