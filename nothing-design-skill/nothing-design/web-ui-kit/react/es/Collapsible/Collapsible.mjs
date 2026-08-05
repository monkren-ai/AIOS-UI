import { cn, dataAttr } from "../lib/utils.mjs";
import { collapsibleContentInnerVariants, collapsibleContentVariants, collapsibleTriggerVariants, collapsibleVariants } from "./collapsible-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Collapsible/Collapsible.tsx
function Collapsible({ className, open: controlledOpen, defaultOpen = false, onOpenChange, trigger, children, ...props }) {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const state = isOpen ? "open" : "closed";
	const baseId = React.useId();
	const triggerId = `${baseId}-trigger`;
	const contentId = `${baseId}-content`;
	const handleToggle = React.useCallback(() => {
		const next = !isOpen;
		if (controlledOpen === void 0) setInternalOpen(next);
		onOpenChange?.(next);
	}, [
		isOpen,
		controlledOpen,
		onOpenChange
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn(collapsibleVariants({ open: isOpen }), className),
		"data-slot": "collapsible",
		"data-state": dataAttr(state),
		...props,
		children: [/* @__PURE__ */ jsx("button", {
			id: triggerId,
			className: collapsibleTriggerVariants(),
			"data-slot": "collapsible-trigger",
			"data-state": dataAttr(state),
			"aria-expanded": isOpen,
			"aria-controls": contentId,
			onClick: handleToggle,
			type: "button",
			children: trigger
		}), /* @__PURE__ */ jsx("div", {
			id: contentId,
			className: collapsibleContentVariants(),
			"data-slot": "collapsible-content",
			"data-state": dataAttr(state),
			style: isOpen ? void 0 : { visibility: "hidden" },
			inert: !isOpen,
			role: "region",
			"aria-labelledby": triggerId,
			children: /* @__PURE__ */ jsx("div", {
				className: collapsibleContentInnerVariants(),
				"data-slot": "collapsible-content-inner",
				children
			})
		})]
	});
}
Collapsible.displayName = "Collapsible";
//#endregion
export { Collapsible as default };

//# sourceMappingURL=Collapsible.mjs.map