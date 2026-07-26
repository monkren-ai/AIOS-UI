import { cn, dataAttr } from "../lib/utils.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState, useScrollLock, useTabCycle } from "../ui/OverlayPortal.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
	const { isOpen, close, setOpen } = useOverlayState(controlledOpen, onClose);
	const { ref: trapRef, onKeyDown: tabCycle } = useTabCycle(isOpen);
	useScrollLock(isOpen);
	useEscapeKey(isOpen, () => {
		if (variant === "alert") handleCancel();
		else close();
	});
	const generatedId = React.useId();
	const titleId = title ? `${generatedId}-title` : void 0;
	const descriptionId = description ? `${generatedId}-description` : void 0;
	const previouslyFocused = React.useRef(null);
	React.useEffect(() => {
		if (isOpen) {
			previouslyFocused.current = document.activeElement;
			const node = trapRef.current;
			if (node) (node.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])") ?? node).focus();
		} else previouslyFocused.current?.focus();
	}, [isOpen, trapRef]);
	const setDialogRefs = React.useCallback((node) => {
		trapRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref, trapRef]);
	const handleConfirm = React.useCallback(() => {
		onConfirm?.();
		setOpen(false);
	}, [onConfirm, setOpen]);
	const handleCancel = React.useCallback(() => {
		onCancel?.();
		setOpen(false);
	}, [onCancel, setOpen]);
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) if (variant === "alert") handleCancel();
		else close();
	};
	const isAlert = variant === "alert";
	const noHeader = !title && !isAlert;
	return /* @__PURE__ */ jsx(OverlayPortal, {
		open: isOpen,
		children: /* @__PURE__ */ jsx("div", {
			className: cn(modalBackdropVariants({
				alert: isAlert,
				visible: isOpen
			})),
			onClick: handleBackdropClick,
			"aria-hidden": !isOpen ? "true" : void 0,
			"data-state": dataAttr(isOpen ? "open" : "closed"),
			"data-variant": dataAttr(variant),
			children: /* @__PURE__ */ jsxs("div", {
				ref: setDialogRefs,
				className: cn(modalVariants({
					alert: isAlert,
					destructive: isAlert && destructive,
					noHeader
				}), className),
				role: isAlert ? "alertdialog" : "dialog",
				"aria-modal": "true",
				"aria-labelledby": titleId,
				"aria-describedby": isAlert ? descriptionId : void 0,
				onKeyDown: tabCycle,
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				"data-variant": dataAttr(variant),
				...props,
				children: [
					!isAlert && /* @__PURE__ */ jsx("button", {
						className: "nothing-modal__close",
						onClick: close,
						"aria-label": "Close",
						children: "×"
					}),
					(title || isAlert && description) && /* @__PURE__ */ jsxs("div", {
						className: "nothing-modal__header",
						children: [title && /* @__PURE__ */ jsx("div", {
							className: "nothing-modal__title",
							id: titleId,
							children: title
						}), isAlert && description && /* @__PURE__ */ jsx("div", {
							className: "nothing-modal__description",
							id: descriptionId,
							children: description
						})]
					}),
					children && /* @__PURE__ */ jsx("div", {
						className: "nothing-modal__body",
						children
					}),
					isAlert ? /* @__PURE__ */ jsxs("div", {
						className: "nothing-modal__footer",
						children: [/* @__PURE__ */ jsx("button", {
							className: "nothing-modal__cancel",
							onClick: handleCancel,
							children: cancelLabel
						}), /* @__PURE__ */ jsx("button", {
							className: cn(modalConfirmVariants({ destructive })),
							onClick: handleConfirm,
							children: confirmLabel
						})]
					}) : footer ? /* @__PURE__ */ jsx("div", {
						className: "nothing-modal__footer",
						children: footer
					}) : null
				]
			})
		})
	});
});
Modal.displayName = "Modal";
//#endregion
export { Modal as default, modalBackdropVariants, modalConfirmVariants, modalVariants };

//# sourceMappingURL=Modal.mjs.map