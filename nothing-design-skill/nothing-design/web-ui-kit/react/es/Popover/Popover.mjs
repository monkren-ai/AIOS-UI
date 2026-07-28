import { cn, dataAttr } from "../lib/utils.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState } from "../ui/OverlayPortal.mjs";
import { useFloating } from "../hooks/useFloating.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
const Popover = React.forwardRef(({ className, content, side = "bottom", open: controlledOpen, onOpenChange, visible: _visible, children, ...props }, ref) => {
	const { isOpen, setOpen } = useOverlayState(controlledOpen, onOpenChange);
	const triggerRef = React.useRef(null);
	const contentRef = React.useRef(null);
	const containerRef = React.useRef(null);
	const popoverId = React.useId();
	const { style, update } = useFloating(side);
	const setContainerRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	React.useEffect(() => {
		if (!isOpen) return;
		const handler = (event) => {
			const target = event.target;
			if (!target) return;
			if (containerRef.current?.contains(target)) return;
			if (contentRef.current?.contains(target)) return;
			setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [isOpen, setOpen]);
	useEscapeKey(isOpen, () => {
		setOpen(false);
		triggerRef.current?.focus();
	});
	React.useEffect(() => {
		if (isOpen && triggerRef.current && contentRef.current) update(triggerRef.current, contentRef.current);
	}, [isOpen, update]);
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn("nothing-popover", className),
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "nothing-popover__trigger",
			ref: triggerRef,
			onClick: () => setOpen(!isOpen),
			"aria-haspopup": true,
			"aria-expanded": isOpen,
			"aria-controls": popoverId,
			children
		}), /* @__PURE__ */ jsx(OverlayPortal, {
			open: isOpen,
			children: /* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: cn(popoverContentVariants({
					visible: isOpen,
					side
				})),
				role: "dialog",
				id: popoverId,
				style,
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				"data-side": dataAttr(side),
				children: content
			})
		})]
	});
});
Popover.displayName = "Popover";
//#endregion
export { Popover, Popover as default, popoverContentVariants };

//# sourceMappingURL=Popover.mjs.map