import { cn } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Popover } from "@base-ui/react/popover";
import "./HoverCard.css";
//#region src/HoverCard/HoverCard.tsx
const hoverCardContentVariants = cva("nothing-hover-card__content", {
	variants: {
		visible: {
			true: "nothing-hover-card__content--visible",
			false: ""
		},
		side: {
			top: "nothing-hover-card__content--top",
			bottom: "nothing-hover-card__content--bottom"
		}
	},
	defaultVariants: {
		visible: false,
		side: "bottom"
	}
});
const HoverCard = React.forwardRef(({ className, content, side = "bottom", delay = 300, visible: _visible, children, ...props }, ref) => {
	return /* @__PURE__ */ jsxs(Popover.Root, { children: [/* @__PURE__ */ jsx(Popover.Trigger, {
		openOnHover: true,
		delay,
		closeDelay: 0,
		"data-slot": "hover-card-trigger",
		render: (triggerProps) => {
			if (React.isValidElement(children)) return React.cloneElement(children, {
				...triggerProps,
				className: cn("nothing-hover-card__trigger", children.props.className)
			});
			return /* @__PURE__ */ jsx("span", {
				...triggerProps,
				className: "nothing-hover-card__trigger",
				"data-slot": "hover-card-trigger",
				children
			});
		}
	}), /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Positioner, {
		className: "nothing-hover-card__positioner",
		"data-slot": "hover-card-positioner",
		side,
		sideOffset: 4,
		children: /* @__PURE__ */ jsx(Popover.Popup, {
			ref,
			className: cn(hoverCardContentVariants({ side }), className),
			"data-slot": "hover-card-content",
			"data-side": side,
			...props,
			children: content
		})
	}) })] });
});
HoverCard.displayName = "HoverCard";
//#endregion
export { HoverCard, HoverCard as default, hoverCardContentVariants };

//# sourceMappingURL=HoverCard.mjs.map