import { cn, dataAttr } from "../lib/utils.mjs";
import { sheetBackdropVariants, sheetBodyVariants, sheetCloseVariants, sheetDismissVariants, sheetFooterVariants, sheetHandleBarVariants, sheetHandleVariants, sheetHeaderVariants, sheetSectionTitleVariants, sheetSectionVariants, sheetTitleVariants, sheetVariants } from "./sheet-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Dialog } from "@base-ui/react/dialog";
//#region src/Sheet/Sheet.tsx
function Sheet({ className, open: isOpen, onOpenChange, side = "right", title, full = false, sections, footer, children, ref, ...props }) {
	const handleOpenChange = React$1.useCallback((nextOpen) => {
		onOpenChange?.(nextOpen);
	}, [onOpenChange]);
	const isBottomSheetMode = side === "bottom" && Boolean(sections);
	const hasOwnLabel = Boolean(props["aria-label"] || props["aria-labelledby"]);
	if (import.meta.env.DEV && isOpen && !title && !hasOwnLabel) console.warn("[Sheet] 这个抽屉没有可访问名称，读屏会把它念成一个无名的“对话框”。传 `title`，或者自己给一个 `aria-label` / `aria-labelledby`。");
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
			"data-full": dataAttr(full),
			"aria-modal": "true",
			...props,
			children: [
				isBottomSheetMode && /* @__PURE__ */ jsx("div", {
					className: cn(sheetHandleVariants()),
					"data-slot": "sheet-handle",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("div", {
						className: cn(sheetHandleBarVariants()),
						"data-slot": "sheet-handle-bar"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: cn(sheetHeaderVariants()),
					"data-slot": "sheet-header",
					children: [title && /* @__PURE__ */ jsx(Dialog.Title, {
						className: cn(sheetTitleVariants()),
						"data-slot": "sheet-title",
						render: /* @__PURE__ */ jsx("div", {}),
						children: title
					}), /* @__PURE__ */ jsx(Dialog.Close, {
						className: cn(isBottomSheetMode ? sheetDismissVariants() : sheetCloseVariants()),
						"aria-label": isBottomSheetMode ? void 0 : "Close",
						"data-slot": "sheet-close",
						children: isBottomSheetMode ? "Done" : "×"
					})]
				}),
				sections ? sections.map((section, index) => /* @__PURE__ */ jsxs("div", {
					className: cn(sheetSectionVariants({ spaced: index > 0 })),
					"data-slot": "sheet-section",
					children: [section.title && /* @__PURE__ */ jsx("div", {
						className: cn(sheetSectionTitleVariants()),
						"data-slot": "sheet-section-title",
						children: section.title
					}), section.content]
				}, index)) : /* @__PURE__ */ jsx("div", {
					className: cn(sheetBodyVariants()),
					"data-slot": "sheet-body",
					children
				}),
				footer && /* @__PURE__ */ jsx("div", {
					className: cn(sheetFooterVariants()),
					"data-slot": "sheet-footer",
					children: footer
				})
			]
		})] })
	});
}
Sheet.displayName = "Sheet";
//#endregion
export { Sheet as default };

//# sourceMappingURL=Sheet.mjs.map