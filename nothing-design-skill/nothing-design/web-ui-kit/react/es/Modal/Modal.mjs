import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Dialog } from "@base-ui/react/dialog";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import "./Modal.css";
//#region src/Modal/Modal.tsx
const modalBackdropVariants = cva("nothing-modal-backdrop", {
	variants: {
		alert: {
			true: "",
			false: ""
		},
		visible: {
			true: "nothing-modal-backdrop--visible",
			false: ""
		}
	},
	defaultVariants: {
		alert: false,
		visible: false
	}
});
const modalVariants = cva("nothing-modal", {
	variants: {
		alert: {
			true: "nothing-modal--alert",
			false: ""
		},
		destructive: {
			true: "nothing-modal--destructive",
			false: ""
		},
		noHeader: {
			true: "nothing-modal--no-header",
			false: ""
		}
	},
	defaultVariants: {
		alert: false,
		destructive: false,
		noHeader: false
	}
});
const modalConfirmVariants = cva("nothing-modal__confirm", {
	variants: { destructive: {
		true: "nothing-modal__confirm--destructive",
		false: ""
	} },
	defaultVariants: { destructive: false }
});
const Modal = React.forwardRef(({ className, open: controlledOpen, onClose, title, footer, children, variant = "default", description, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel, destructive = false, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const isAlert = variant === "alert";
	const noHeader = !title && !isAlert;
	const handleOpenChange = React.useCallback((nextOpen) => {
		if (controlledOpen === void 0) setInternalOpen(nextOpen);
		if (!nextOpen) onClose?.();
	}, [controlledOpen, onClose]);
	const handleConfirm = React.useCallback(() => {
		onConfirm?.();
		handleOpenChange(false);
	}, [onConfirm, handleOpenChange]);
	const handleCancel = React.useCallback(() => {
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
		"aria-modal": "true",
		...props,
		children: [
			!isAlert && /* @__PURE__ */ jsx(Dialog.Close, {
				className: "nothing-modal__close",
				"aria-label": "Close",
				"data-slot": "modal-close",
				children: "×"
			}),
			(title || isAlert && description) && /* @__PURE__ */ jsxs("div", {
				className: "nothing-modal__header",
				"data-slot": "modal-header",
				children: [title && /* @__PURE__ */ jsx(Dialog.Title, {
					className: "nothing-modal__title",
					"data-slot": "modal-title",
					children: title
				}), isAlert && description && /* @__PURE__ */ jsx(Dialog.Description, {
					className: "nothing-modal__description",
					"data-slot": "modal-description",
					children: description
				})]
			}),
			children && /* @__PURE__ */ jsx("div", {
				className: "nothing-modal__body",
				"data-slot": "modal-body",
				children
			}),
			isAlert ? /* @__PURE__ */ jsxs("div", {
				className: "nothing-modal__footer",
				"data-slot": "modal-footer",
				children: [/* @__PURE__ */ jsx("button", {
					className: "nothing-modal__cancel",
					onClick: handleCancel,
					type: "button",
					children: cancelLabel
				}), /* @__PURE__ */ jsx("button", {
					className: cn(modalConfirmVariants({ destructive })),
					onClick: handleConfirm,
					type: "button",
					children: confirmLabel
				})]
			}) : footer ? /* @__PURE__ */ jsx("div", {
				className: "nothing-modal__footer",
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
});
Modal.displayName = "Modal";
//#endregion
export { Modal, Modal as default, modalBackdropVariants, modalConfirmVariants, modalVariants };

//# sourceMappingURL=Modal.mjs.map