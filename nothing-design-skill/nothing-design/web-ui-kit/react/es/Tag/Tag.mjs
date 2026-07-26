import { cn, dataAttr } from "../lib/utils.mjs";
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
const Tags = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("nothing-tags", className),
	...props,
	children
}));
Tags.displayName = "Tags";
//#endregion
export { Tags, Tag as default, tagVariants };

//# sourceMappingURL=Tag.mjs.map