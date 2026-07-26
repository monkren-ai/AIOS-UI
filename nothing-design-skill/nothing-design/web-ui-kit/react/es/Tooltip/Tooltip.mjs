import { cn, dataAttr } from "../lib/utils.mjs";
import { useFloating } from "../hooks/useFloating.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
const Tooltip = React.forwardRef(({ className, content, side = "top", delay = 300, children, ...props }, ref) => {
	const [visible, setVisible] = React.useState(false);
	const timeoutRef = React.useRef(null);
	const triggerRef = React.useRef(null);
	const internalPopupRef = React.useRef(null);
	const tooltipId = React.useId();
	const { style, update } = useFloating(side);
	const setRefs = React.useCallback((node) => {
		internalPopupRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const FOCUSABLE_TAGS = /* @__PURE__ */ new Set([
		"A",
		"BUTTON",
		"INPUT",
		"SELECT",
		"TEXTAREA"
	]);
	const childIsFocusable = (() => {
		if (!React.isValidElement(children)) return false;
		const type = children.type;
		const tagName = typeof type === "string" ? type.toUpperCase() : type?.displayName || "";
		if (FOCUSABLE_TAGS.has(tagName)) return true;
		return children.props?.tabIndex !== void 0;
	})();
	const triggerEl = React.isValidElement(children) ? React.cloneElement(children, childIsFocusable && visible ? { "aria-describedby": tooltipId } : {}) : children;
	const show = React.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setVisible(true);
		}, delay);
	}, [delay]);
	const hide = React.useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setVisible(false);
	}, []);
	React.useEffect(() => {
		if (visible && triggerRef.current && internalPopupRef.current) update(triggerRef.current, internalPopupRef.current);
	}, [visible, update]);
	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	const handleKeyDown = React.useCallback((e) => {
		if (e.key === "Escape") hide();
	}, [hide]);
	return /* @__PURE__ */ jsxs("div", {
		className: "nothing-tooltip",
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "nothing-tooltip__trigger",
			ref: triggerRef,
			onMouseEnter: show,
			onMouseLeave: hide,
			onFocus: show,
			onBlur: hide,
			onKeyDown: handleKeyDown,
			"aria-describedby": !childIsFocusable && visible ? tooltipId : void 0,
			tabIndex: childIsFocusable ? void 0 : 0,
			children: triggerEl
		}), /* @__PURE__ */ jsx("div", {
			ref: setRefs,
			className: cn(tooltipPopupVariants({
				visible,
				side
			}), className),
			role: "tooltip",
			id: tooltipId,
			style,
			"data-state": dataAttr(visible ? "visible" : "hidden"),
			"data-side": dataAttr(side),
			children: content
		})]
	});
});
Tooltip.displayName = "Tooltip";
//#endregion
export { Tooltip as default, tooltipPopupVariants };

//# sourceMappingURL=Tooltip.mjs.map