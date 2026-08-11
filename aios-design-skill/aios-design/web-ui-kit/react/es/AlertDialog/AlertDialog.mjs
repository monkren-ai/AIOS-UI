import { cn, dataAttr } from "../lib/utils.mjs";
import { alertDialogBackdropVariants, alertDialogBodyVariants, alertDialogDescriptionVariants, alertDialogFooterVariants, alertDialogHeaderVariants, alertDialogPopupVariants, alertDialogTitleVariants, alertDialogViewportVariants } from "./alert-dialog-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertDialog } from "@base-ui/react/alert-dialog";
//#region src/AlertDialog/AlertDialog.tsx
const AlertDialog$1 = AlertDialog.Root;
function AlertDialogTrigger({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Trigger, {
		"data-slot": "alert-dialog-trigger",
		className,
		...props
	});
}
function AlertDialogContent({ className, children, destructive = false, backdropClassName, viewportClassName, ...props }) {
	return /* @__PURE__ */ jsxs(AlertDialog.Portal, { children: [/* @__PURE__ */ jsx(AlertDialog.Backdrop, {
		className: cn(alertDialogBackdropVariants(), backdropClassName),
		"data-slot": "alert-dialog-backdrop"
	}), /* @__PURE__ */ jsx(AlertDialog.Viewport, {
		className: cn(alertDialogViewportVariants(), viewportClassName),
		"data-slot": "alert-dialog-viewport",
		children: /* @__PURE__ */ jsx(AlertDialog.Popup, {
			className: cn(alertDialogPopupVariants({ destructive }), className),
			"data-slot": "alert-dialog",
			"data-destructive": dataAttr(destructive),
			...props,
			children
		})
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(alertDialogHeaderVariants(), className),
		"data-slot": "alert-dialog-header",
		...props
	});
}
function AlertDialogTitle({ className, destructive, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Title, {
		className: cn(alertDialogTitleVariants({ destructive }), className),
		"data-slot": "alert-dialog-title",
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Description, {
		className: cn(alertDialogDescriptionVariants(), className),
		"data-slot": "alert-dialog-description",
		...props
	});
}
function AlertDialogBody({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(alertDialogBodyVariants(), className),
		"data-slot": "alert-dialog-body",
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(alertDialogFooterVariants(), className),
		"data-slot": "alert-dialog-footer",
		...props
	});
}
function AlertDialogClose({ className, ...props }) {
	return /* @__PURE__ */ jsx(AlertDialog.Close, {
		className,
		"data-slot": "alert-dialog-close",
		...props
	});
}
//#endregion
export { AlertDialog$1 as AlertDialog, AlertDialogBody, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger };

//# sourceMappingURL=AlertDialog.mjs.map