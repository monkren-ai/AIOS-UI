import { cn, dataAttr } from "../lib/utils.mjs";
import { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants } from "./hover-card-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Popover } from "@base-ui/react/popover";
//#region src/HoverCard/HoverCard.tsx
function HoverCard({ className, content, side = "bottom", delay = 300, children, ref, ...props }) {
	const childIsNativeButton = React$1.isValidElement(children) && (children.type === "button" || typeof children.type === "string" && children.type.toLowerCase() === "button");
	return /* @__PURE__ */ jsxs(Popover.Root, { children: [/* @__PURE__ */ jsx(Popover.Trigger, {
		openOnHover: true,
		delay,
		closeDelay: 0,
		nativeButton: childIsNativeButton,
		"data-slot": "hover-card-trigger",
		render: (triggerProps) => {
			if (React$1.isValidElement(children)) return React$1.cloneElement(children, {
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