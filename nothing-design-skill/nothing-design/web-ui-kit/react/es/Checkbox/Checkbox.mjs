import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
const Checkbox = React$1.forwardRef(({ className, checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, label, id, ...props }, ref) => {
	const [internalChecked, setInternalChecked] = React$1.useState(defaultChecked);
	const isControlled = controlledChecked !== void 0;
	const isChecked = isControlled ? controlledChecked : internalChecked;
	const isDisabled = !!disabled;
	const isIndeterminate = isChecked === "indeterminate";
	const inputRef = React$1.useRef(null);
	const handleChange = React$1.useCallback(() => {
		if (isDisabled) return;
		const nextChecked = isChecked === "indeterminate" ? true : !isChecked;
		if (!isControlled) setInternalChecked(nextChecked);
		onCheckedChange?.(nextChecked);
	}, [
		isDisabled,
		isChecked,
		isControlled,
		onCheckedChange
	]);
	const handleKeyDown = React$1.useCallback((e) => {
		if (e.key === " ") {
			e.preventDefault();
			handleChange();
		}
	}, [handleChange]);
	const ariaChecked = isIndeterminate ? "mixed" : isChecked ? "true" : "false";
	const inputId = id ?? void 0;
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
		children: [
			/* @__PURE__ */ jsx("input", {
				ref: inputRef,
				className: "nothing-checkbox__input",
				type: "checkbox",
				checked: isIndeterminate ? false : !!isChecked,
				"aria-checked": ariaChecked,
				disabled: isDisabled,
				id: inputId,
				onChange: handleChange,
				onKeyDown: handleKeyDown,
				tabIndex: 0
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-checkbox__box",
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
			}),
			label && /* @__PURE__ */ jsx("span", {
				className: "nothing-checkbox__label",
				children: label
			})
		]
	});
});
Checkbox.displayName = "Checkbox";
//#endregion
export { checkboxVariants, Checkbox as default };

//# sourceMappingURL=Checkbox.mjs.map