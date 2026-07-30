import { cn } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Tooltip } from "@base-ui/react/tooltip";
import "./Tooltip.css";
//#region src/Tooltip/Tooltip.tsx
const tooltipPopupVariants = cva("nothing-tooltip__popup", {
	variants: {
		visible: {
			true: "nothing-tooltip__popup--visible",
			false: ""
		},
		side: {
			top: "nothing-tooltip__popup--top",
			bottom: "nothing-tooltip__popup--bottom",
			left: "nothing-tooltip__popup--left",
			right: "nothing-tooltip__popup--right"
		}
	},
	defaultVariants: {
		visible: false,
		side: "top"
	}
});
const Tooltip$1 = React.forwardRef(({ className, content, side = "top", delay = 300, children, ...props }, ref) => {
	return /* @__PURE__ */ jsxs(Tooltip.Root, { children: [/* @__PURE__ */ jsx(Tooltip.Trigger, {
		delay,
		"data-slot": "tooltip-trigger",
		render: (triggerProps) => {
			if (React.isValidElement(children)) return React.cloneElement(children, {
				...triggerProps,
				className: cn("nothing-tooltip__trigger", children.props.className)
			});
			return /* @__PURE__ */ jsx("span", {
				...triggerProps,
				className: "nothing-tooltip__trigger",
				"data-slot": "tooltip-trigger",
				children
			});
		}
	}), /* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsx(Tooltip.Positioner, {
		className: "nothing-tooltip__positioner",
		"data-slot": "tooltip-positioner",
		side,
		sideOffset: 4,
		children: /* @__PURE__ */ jsx(Tooltip.Popup, {
			ref,
			className: cn(tooltipPopupVariants({ side }), className),
			role: "tooltip",
			"data-slot": "tooltip-popup",
			"data-side": side,
			...props,
			children: content
		})
	}) })] });
});
Tooltip$1.displayName = "Tooltip";
//#endregion
export { Tooltip$1 as Tooltip, Tooltip$1 as default, tooltipPopupVariants };

//# sourceMappingURL=Tooltip.mjs.map