import { cn, dataAttr } from "../lib/utils.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState, useScrollLock, useTabCycle } from "../ui/OverlayPortal.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
		visible: {
			left: "nothing-sheet--visible-left",
			right: "nothing-sheet--visible-right",
			top: "nothing-sheet--visible-top",
			bottom: "nothing-sheet--visible-bottom"
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
	const { isOpen, close } = useOverlayState(controlledOpen, onOpenChange);
	const { ref: sheetRef, onKeyDown: tabCycle } = useTabCycle(isOpen);
	useScrollLock(isOpen);
	useEscapeKey(isOpen, close);
	const setSheetRefs = React.useCallback((node) => {
		sheetRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref, sheetRef]);
	const handleBackdropClick = () => {
		close();
	};
	const isBottomSheetMode = side === "bottom" && sections;
	const titleId = title ? "nothing-sheet-title" : void 0;
	return /* @__PURE__ */ jsxs(OverlayPortal, {
		open: isOpen,
		children: [/* @__PURE__ */ jsx("div", {
			className: cn(sheetBackdropVariants({ visible: isOpen })),
			onClick: handleBackdropClick,
			"aria-hidden": "true",
			"data-state": dataAttr(isOpen ? "visible" : "hidden")
		}), /* @__PURE__ */ jsxs("div", {
			ref: setSheetRefs,
			className: cn(sheetVariants({
				side,
				visible: isOpen ? side : void 0,
				full
			}), className),
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			onKeyDown: tabCycle,
			"data-state": dataAttr(isOpen ? "open" : "closed"),
			"data-side": dataAttr(side),
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
						id: titleId,
						children: title
					}), /* @__PURE__ */ jsx("button", {
						className: isBottomSheetMode ? "nothing-sheet__dismiss" : "nothing-sheet__close",
						onClick: close,
						"aria-label": "Close",
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
		})]
	});
});
Sheet.displayName = "Sheet";
//#endregion
export { Sheet as default, sheetBackdropVariants, sheetVariants };

//# sourceMappingURL=Sheet.mjs.map