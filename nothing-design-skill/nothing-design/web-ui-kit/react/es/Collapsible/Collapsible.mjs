import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Collapsible.css";
//#region src/Collapsible/Collapsible.tsx
const collapsibleVariants = cva("nothing-collapsible", {
	variants: { open: {
		true: "nothing-collapsible--open",
		false: ""
	} },
	defaultVariants: { open: false }
});
const Collapsible = React.forwardRef(({ className, open: controlledOpen, defaultOpen = false, onOpenChange, trigger, children, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
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
		ref,
		className: cn(collapsibleVariants({ open: isOpen }), className),
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("button", {
			className: "nothing-collapsible__trigger",
			"aria-expanded": isOpen,
			onClick: handleToggle,
			type: "button",
			children: trigger
		}), /* @__PURE__ */ jsx("div", {
			className: "nothing-collapsible__content",
			role: "region",
			children: /* @__PURE__ */ jsx("div", {
				className: "nothing-collapsible__content-inner",
				children
			})
		})]
	});
});
Collapsible.displayName = "Collapsible";
//#endregion
export { collapsibleVariants, Collapsible as default };

//# sourceMappingURL=Collapsible.mjs.map