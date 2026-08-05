import { cn, dataAttr } from "../lib/utils.mjs";
import { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants } from "./hover-card-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Popover } from "@base-ui/react/popover";
//#region src/HoverCard/HoverCard.tsx
function HoverCard({ className, content, side = "bottom", delay = 300, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs(Popover.Root, { children: [/* @__PURE__ */ jsx(Popover.Trigger, {
		openOnHover: true,
		delay,
		closeDelay: 0,
		"data-slot": "hover-card-trigger",
		render: (triggerProps) => {
			if (React.isValidElement(children)) return React.cloneElement(children, {
				...triggerProps,
				className: cn(hoverCardTriggerVariants(), children.props.className)
			});
			return /* @__PURE__ */ jsx("span", {
				...triggerProps,
				className: cn(hoverCardTriggerVariants()),
				"data-slot": "hover-card-trigger",
				children
			});
		}
	}), /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(Popover.Positioner, {
		className: cn(hoverCardPositionerVariants()),
		"data-slot": "hover-card-positioner",
		side,
		sideOffset: 4,
		children: /* @__PURE__ */ jsx(Popover.Popup, {
			ref,
			className: cn(hoverCardContentVariants({ side }), className),
			"data-slot": "hover-card-content",
			"data-side": dataAttr(side),
			...props,
			children: content
		})
	}) })] });
}
HoverCard.displayName = "HoverCard";
//#endregion
export { HoverCard as default };

//# sourceMappingURL=HoverCard.mjs.map