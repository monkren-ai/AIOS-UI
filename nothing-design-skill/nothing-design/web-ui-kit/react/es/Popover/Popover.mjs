import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Popover } from "@base-ui/react/popover";
import "./Popover.css";
//#region src/Popover/Popover.tsx
const popoverContentVariants = cva("nothing-popover__content", {
	variants: {
		visible: {
			true: "nothing-popover__content--visible",
			false: ""
		},
		side: {
			top: "nothing-popover__content--top",
			bottom: "nothing-popover__content--bottom",
			left: "nothing-popover__content--left",
			right: "nothing-popover__content--right"
		}
	},
	defaultVariants: {
		visible: false,
		side: "bottom"
	}
});
const Popover$1 = React.forwardRef(({ className, content, side = "bottom", open: controlledOpen, onOpenChange, visible: _visible, children, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const handleOpenChange = React.useCallback((nextOpen) => {
		if (controlledOpen === void 0) setInternalOpen(nextOpen);
		onOpenChange?.(nextOpen);
	}, [controlledOpen, onOpenChange]);
	return /* @__PURE__ */ jsxs(Popover.Root, {
		open: isOpen,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ jsx(Popover.Trigger, {
			"data-slot": "popover-trigger",
			render: (triggerProps) => {
				if (React.isValidElement(children)) return React.cloneElement(children, {
					...triggerProps,
					className: cn("nothing-popover__trigger", children.props.className)
				});
				return /* @__PURE__ */ jsx("span", {
					...triggerProps,
					className: "nothing-popover__trigger",
					"data-slot": "popover-trigger",
					children
				});
			}
		}), /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Positioner, {
			className: "nothing-popover__positioner",
			"data-slot": "popover-positioner",
			side,
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Popover.Popup, {
				ref,
				className: cn(popoverContentVariants({
					visible: isOpen,
					side
				}), className),
				"data-slot": "popover-content",
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				"data-side": dataAttr(side),
				...props,
				children: content
			})
		}) })]
	});
});
Popover$1.displayName = "Popover";
//#endregion
export { Popover$1 as Popover, Popover$1 as default, popoverContentVariants };

//# sourceMappingURL=Popover.mjs.map