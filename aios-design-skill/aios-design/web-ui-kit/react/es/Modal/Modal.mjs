import { cn, dataAttr } from "../lib/utils.mjs";
import { modalBackdropVariants, modalBodyVariants, modalCancelVariants, modalCloseVariants, modalConfirmVariants, modalDescriptionVariants, modalFooterVariants, modalHeaderVariants, modalTitleVariants, modalVariants } from "./modal-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
//#region src/Modal/Modal.tsx
function Modal({ className, open: isOpen, onClose, title, footer, children, variant = "default", description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, destructive = false, ref, ...props }) {
	const isAlert = variant === "alert";
	const noHeader = !title && !isAlert;
	const handleOpenChange = React$1.useCallback((nextOpen) => {
		if (!nextOpen) onClose?.();
	}, [onClose]);
	const handleConfirm = React$1.useCallback(() => {
		onConfirm?.();
		handleOpenChange(false);
	}, [onConfirm, handleOpenChange]);
	const handleCancel = React$1.useCallback(() => {
		onCancel?.();
		handleOpenChange(false);
	}, [onCancel, handleOpenChange]);
	const popup = /* @__PURE__ */ jsxs(Dialog.Portal, { children: [/* @__PURE__ */ jsx(Dialog.Backdrop, {
		className: cn(modalBackdropVariants({
			alert: isAlert,
			visible: isOpen
		})),
		"data-slot": "modal-backdrop",
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		"data-variant": dataAttr(variant)
	}), /* @__PURE__ */ jsxs(Dialog.Popup, {
		ref,
		className: cn(modalVariants({
			alert: isAlert,
			destructive: isAlert && destructive,
			noHeader
		}), className),
		"data-slot": "modal",
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		"data-variant": dataAttr(variant),
		"data-destructive": dataAttr(isAlert && destructive),
		"aria-modal": "true",
		...props,
		children: [
			!isAlert && /* @__PURE__ */ jsx(Dialog.Close, {
				className: cn(modalCloseVariants({ noHeader })),
				"aria-label": "Close",
				"data-slot": "modal-close",
				children: "×"
			}),
			(title || isAlert && description) && /* @__PURE__ */ jsxs("div", {
				className: cn(modalHeaderVariants({ alert: isAlert })),
				"data-slot": "modal-header",
				children: [title && /* @__PURE__ */ jsx(Dialog.Title, {
					className: cn(modalTitleVariants({
						alert: isAlert,
						destructive: isAlert && destructive
					})),
					"data-slot": "modal-title",
					children: title
				}), isAlert && description && /* @__PURE__ */ jsx(Dialog.Description, {
					className: cn(modalDescriptionVariants()),
					"data-slot": "modal-description",
					children: description
				})]
			}),
			children && /* @__PURE__ */ jsx("div", {
				className: cn(modalBodyVariants()),
				"data-slot": "modal-body",
				children
			}),
			isAlert ? /* @__PURE__ */ jsxs("div", {
				className: cn(modalFooterVariants()),
				"data-slot": "modal-footer",
				children: [/* @__PURE__ */ jsx("button", {
					className: cn(modalCancelVariants()),
					"data-slot": "modal-cancel",
					onClick: handleCancel,
					type: "button",
					children: cancelLabel
				}), /* @__PURE__ */ jsx("button", {
					className: cn(modalConfirmVariants({ destructive })),
					"data-slot": "modal-confirm",
					"data-destructive": dataAttr(destructive),
					onClick: handleConfirm,
					type: "button",
					children: confirmLabel
				})]
			}) : footer ? /* @__PURE__ */ jsx("div", {
				className: cn(modalFooterVariants()),
				"data-slot": "modal-footer",
				children: footer
			}) : null
		]
	})] });
	if (isAlert) return /* @__PURE__ */ jsx(AlertDialog.Root, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: popup
	});
	return /* @__PURE__ */ jsx(Dialog.Root, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: popup
	});
}
Modal.displayName = "Modal";
//#endregion
export { Modal as default };

//# sourceMappingURL=Modal.mjs.map