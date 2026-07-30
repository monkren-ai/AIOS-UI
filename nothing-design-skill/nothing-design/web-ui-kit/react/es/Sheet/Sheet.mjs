import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Dialog } from "@base-ui/react/dialog";
import "./Sheet.css";
//#region src/Sheet/Sheet.tsx
const sheetBackdropVariants = cva("nothing-sheet-backdrop", {
	variants: { visible: {
		true: "nothing-sheet-backdrop--visible",
		false: ""
	} },
	defaultVariants: { visible: false }
});
const sheetVariants = cva("nothing-sheet", {
	variants: {
		side: {
			left: "nothing-sheet--left",
			right: "nothing-sheet--right",
			top: "nothing-sheet--top",
			bottom: "nothing-sheet--bottom"
		},
		full: {
			true: "nothing-sheet--full",
			false: ""
		}
	},
	defaultVariants: {
		side: "right",
		full: false
	}
});
const Sheet = React.forwardRef(({ className, open: controlledOpen, onOpenChange, side = "right", title, full = false, sections, footer, children, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const handleOpenChange = React.useCallback((nextOpen) => {
		if (controlledOpen === void 0) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [controlledOpen, onOpenChange]);
	const isBottomSheetMode = side === "bottom" && Boolean(sections);
	return /* @__PURE__ */ jsx(Dialog.Root, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog.Portal, { children: [/* @__PURE__ */ jsx(Dialog.Backdrop, {
			className: cn(sheetBackdropVariants({ visible: isOpen })),
			"data-slot": "sheet-backdrop",
			"data-state": dataAttr(isOpen ? "open" : "closed")
		}), /* @__PURE__ */ jsxs(Dialog.Popup, {
			ref,
			className: cn(sheetVariants({
				side,
				full
			}), className),
			"data-slot": "sheet",
			"data-state": dataAttr(isOpen ? "open" : "closed"),
			"data-side": dataAttr(side),
			"aria-modal": "true",
			...props,
			children: [
				isBottomSheetMode && /* @__PURE__ */ jsx("div", {
					className: "nothing-sheet__handle",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("div", { className: "nothing-sheet__handle-bar" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "nothing-sheet__header",
					children: [title && /* @__PURE__ */ jsx("div", {
						className: "nothing-sheet__title",
						children: title
					}), /* @__PURE__ */ jsx(Dialog.Close, {
						className: isBottomSheetMode ? "nothing-sheet__dismiss" : "nothing-sheet__close",
						"aria-label": "Close",
						"data-slot": "sheet-close",
						children: isBottomSheetMode ? "Done" : "×"
					})]
				}),
				sections ? sections.map((section, index) => /* @__PURE__ */ jsxs("div", {
					className: "nothing-sheet__section",
					children: [section.title && /* @__PURE__ */ jsx("div", {
						className: "nothing-sheet__section-title",
						children: section.title
					}), section.content]
				}, index)) : /* @__PURE__ */ jsx("div", {
					className: "nothing-sheet__body",
					children
				}),
				footer && /* @__PURE__ */ jsx("div", {
					className: "nothing-sheet__footer",
					children: footer
				})
			]
		})] })
	});
});
Sheet.displayName = "Sheet";
//#endregion
export { Sheet, Sheet as default, sheetBackdropVariants, sheetVariants };

//# sourceMappingURL=Sheet.mjs.map