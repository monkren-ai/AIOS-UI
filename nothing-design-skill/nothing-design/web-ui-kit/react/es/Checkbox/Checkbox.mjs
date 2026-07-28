import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Checkbox } from "@base-ui/react/checkbox";
import "./Checkbox.css";
//#region src/Checkbox/Checkbox.tsx
const checkboxVariants = cva("nothing-checkbox", {
	variants: {
		isChecked: {
			true: "nothing-checkbox--checked",
			false: ""
		},
		indeterminate: {
			true: "nothing-checkbox--indeterminate",
			false: ""
		},
		disabled: {
			true: "nothing-checkbox--disabled",
			false: ""
		}
	},
	defaultVariants: {
		isChecked: false,
		indeterminate: false,
		disabled: false
	}
});
const Checkbox$1 = React.forwardRef(({ className, checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, label, id, ...props }, ref) => {
	const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
	const isControlled = controlledChecked !== void 0;
	const isChecked = isControlled ? controlledChecked : internalChecked;
	const isDisabled = !!disabled;
	const isIndeterminate = isChecked === "indeterminate";
	const handleCheckedChange = React.useCallback((nextChecked) => {
		const nextValue = nextChecked;
		if (!isControlled) setInternalChecked(nextValue);
		onCheckedChange?.(nextValue);
	}, [isControlled, onCheckedChange]);
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(checkboxVariants({
			isChecked: !!isChecked,
			indeterminate: isIndeterminate,
			disabled: isDisabled
		}), className),
		"data-state": dataAttr(isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked"),
		"data-disabled": dataAttr(isDisabled),
		...props,
		children: [/* @__PURE__ */ jsx(Checkbox.Root, {
			className: "nothing-checkbox__box",
			checked: isIndeterminate ? false : !!isChecked,
			indeterminate: isIndeterminate,
			defaultChecked: isControlled ? void 0 : defaultChecked,
			onCheckedChange: handleCheckedChange,
			disabled: isDisabled,
			id,
			children: /* @__PURE__ */ jsxs(Checkbox.Indicator, {
				className: "nothing-checkbox__indicator",
				keepMounted: true,
				children: [/* @__PURE__ */ jsx("svg", {
					className: "nothing-checkbox__check",
					viewBox: "0 0 14 14",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M3 7L6 10L11 4",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), /* @__PURE__ */ jsx("svg", {
					className: "nothing-checkbox__dash",
					viewBox: "0 0 14 14",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M3 7H11",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round"
					})
				})]
			})
		}), label && /* @__PURE__ */ jsx("span", {
			className: "nothing-checkbox__label",
			children: label
		})]
	});
});
Checkbox$1.displayName = "Checkbox";
//#endregion
export { Checkbox$1 as Checkbox, Checkbox$1 as default, checkboxVariants };

//# sourceMappingURL=Checkbox.mjs.map