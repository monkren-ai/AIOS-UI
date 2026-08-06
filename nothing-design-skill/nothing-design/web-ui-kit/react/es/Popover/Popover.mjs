import { cn, dataAttr } from "../lib/utils.mjs";
import { popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants } from "./popover-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Popover } from "@base-ui/react/popover";
//#region src/Popover/Popover.tsx
function Popover$1({ className, content, side = "bottom", open: controlledOpen, onOpenChange, children, ref, ...props }) {
	const [internalOpen, setInternalOpen] = React$1.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const handleOpenChange = React$1.useCallback((nextOpen) => {
		if (controlledOpen === void 0) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [controlledOpen, onOpenChange]);
	const childIsNativeButton = React$1.isValidElement(children) && (children.type === "button" || typeof children.type === "string" && children.type.toLowerCase() === "button");
	return /* @__PURE__ */ jsxs(Popover.Root, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ jsx(Popover.Trigger, {
			nativeButton: childIsNativeButton,
			"data-slot": "popover-trigger",
			render: (triggerProps) => {
				if (React$1.isValidElement(children)) return React$1.cloneElement(children, {
					...triggerProps,
					className: cn(popoverTriggerVariants(), children.props.className)
				});
				return /* @__PURE__ */ jsx("span", {
					...triggerProps,
					className: cn(popoverTriggerVariants()),
					"data-slot": "popover-trigger",
					children
				});
			}
		}), /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Positioner, {
			className: cn(popoverPositionerVariants()),
			"data-slot": "popover-positioner",
			side,
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Popover.Popup, {
				ref,
				className: cn(popoverContentVariants({ side }), className),
				"data-slot": "popover-content",
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				"data-side": dataAttr(side),
				...props,
				children: content
			})
		}) })]
	});
}
Popover$1.displayName = "Popover";
//#endregion
export { Popover$1 as default };

//# sourceMappingURL=Popover.mjs.map