import { cn, dataAttr } from "../lib/utils.mjs";
import { OverlayPortal, useOverlayState } from "../ui/OverlayPortal.mjs";
import { useFloating } from "../hooks/useFloating.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
	const { isOpen, setOpen } = useOverlayState(void 0);
	const triggerRef = React.useRef(null);
	const contentRef = React.useRef(null);
	const timeoutRef = React.useRef(null);
	const hoverCardId = React.useId();
	const { style, update } = useFloating(side);
	const setContainerRefs = React.useCallback((node) => {
		contentRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const show = React.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setOpen(true);
		}, delay);
	}, [delay, setOpen]);
	const hide = React.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setOpen(false);
	}, [setOpen]);
	React.useEffect(() => {
		if (isOpen && triggerRef.current && contentRef.current) update(triggerRef.current, contentRef.current);
	}, [isOpen, update]);
	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("nothing-hover-card", className),
		"data-state": dataAttr(isOpen ? "visible" : "hidden"),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "nothing-hover-card__trigger",
			ref: triggerRef,
			onMouseEnter: show,
			onMouseLeave: hide,
			onFocus: show,
			onBlur: hide,
			"aria-describedby": hoverCardId,
			children
		}), /* @__PURE__ */ jsx(OverlayPortal, {
			open: isOpen,
			children: /* @__PURE__ */ jsx("div", {
				ref: setContainerRefs,
				className: cn(hoverCardContentVariants({
					visible: isOpen,
					side
				})),
				id: hoverCardId,
				style,
				onMouseEnter: show,
				onMouseLeave: hide,
				"data-state": dataAttr(isOpen ? "visible" : "hidden"),
				"data-side": dataAttr(side),
				children: content
			})
		})]
	});
});
HoverCard.displayName = "HoverCard";
//#endregion
export { HoverCard, HoverCard as default, hoverCardContentVariants };

//# sourceMappingURL=HoverCard.mjs.map