import { cn, dataAttr } from "../lib/utils.mjs";
import { useProximityHover } from "../hooks/useProximityHover.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Tag.css";
//#region src/Tag/Tag.tsx
const tagVariants = cva("nothing-tag", {
	variants: {
		variant: {
			pill: "",
			technical: "nothing-tag--technical"
		},
		active: {
			true: "nothing-tag--active",
			false: ""
		},
		disabled: {
			true: "nothing-tag--disabled",
			false: ""
		}
	},
	defaultVariants: {
		variant: "pill",
		active: false,
		disabled: false
	}
});
const Tag = React.forwardRef(({ className, variant = "pill", active = false, removable = false, disabled = false, children, onClick, onRemove, ...props }, ref) => {
	const isDisabled = !!disabled;
	const handleClick = () => {
		if (isDisabled) return;
		onClick?.();
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};
	const handleRemove = (e) => {
		e.stopPropagation();
		if (isDisabled) return;
		onRemove?.();
	};
	const handleRemoveKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
			if (isDisabled) return;
			onRemove?.();
		}
	};
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(tagVariants({
			variant,
			active,
			disabled: isDisabled
		}), className),
		"data-slot": "tag",
		"data-variant": dataAttr(variant),
		"data-active": dataAttr(active),
		"data-disabled": dataAttr(isDisabled),
		role: "button",
		tabIndex: isDisabled ? -1 : 0,
		onClick: handleClick,
		onKeyDown: handleKeyDown,
		...props,
		children: [children, removable && /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "nothing-tag__remove",
			onClick: handleRemove,
			onKeyDown: handleRemoveKeyDown,
			tabIndex: isDisabled ? -1 : 0,
			"aria-label": "Remove",
			children: "×"
		})]
	});
});
Tag.displayName = "Tag";
const Tags = React.forwardRef(({ className, children, proximity = false, ...props }, ref) => {
	const containerRef = React.useRef(null);
	const axis = typeof proximity === "string" ? proximity : "xy";
	const enabled = !!proximity;
	const { activeIndex, registerItem, handlers } = useProximityHover(containerRef, { axis });
	const mergedRef = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const items = React.Children.toArray(children).filter(React.isValidElement);
	return /* @__PURE__ */ jsx("div", {
		ref: mergedRef,
		className: cn("nothing-tags", enabled && "nothing-tags--proximity", className),
		...enabled ? handlers : {},
		...props,
		children: items.map((child, index) => React.cloneElement(child, {
			ref: (node) => registerItem(index, node),
			"data-proximity-active": activeIndex === index,
			"data-index": index
		}))
	});
});
Tags.displayName = "Tags";
//#endregion
export { Tag, Tag as default, Tags, tagVariants };

//# sourceMappingURL=Tag.mjs.map