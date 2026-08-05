import { cn, dataAttr } from "../lib/utils.mjs";
import { checkboxBoxVariants, checkboxCheckVariants, checkboxDashVariants, checkboxIndicatorVariants, checkboxLabelVariants, checkboxVariants } from "./checkbox-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Checkbox } from "@base-ui/react/checkbox";
//#region src/Checkbox/Checkbox.tsx
function Checkbox$1({ className, checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, label, size = "md", id, ref, ...props }) {
	const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
	const isControlled = controlledChecked !== void 0;
	const isChecked = isControlled ? controlledChecked : internalChecked;
	const isDisabled = !!disabled;
	const isIndeterminate = isChecked === "indeterminate";
	const handleCheckedChange = React.useCallback((nextChecked) => {
		if (!isControlled) setInternalChecked(nextChecked);
		onCheckedChange?.(nextChecked);
	}, [isControlled, onCheckedChange]);
	const state = isIndeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked";
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(checkboxVariants({
			size,
			isChecked: !!isChecked,
			indeterminate: isIndeterminate,
			disabled: isDisabled
		}), className),
		"data-slot": "checkbox",
		"data-size": dataAttr(size),
		"data-state": dataAttr(state),
		"data-disabled": dataAttr(isDisabled),
		...props,
		children: [/* @__PURE__ */ jsx(Checkbox.Root, {
			className: checkboxBoxVariants({ size }),
			"data-slot": "checkbox-box",
			checked: isIndeterminate ? false : !!isChecked,
			indeterminate: isIndeterminate,
			defaultChecked: isControlled ? void 0 : defaultChecked,
			onCheckedChange: handleCheckedChange,
			disabled: isDisabled,
			id,
			children: /* @__PURE__ */ jsxs(Checkbox.Indicator, {
				className: checkboxIndicatorVariants(),
				"data-slot": "checkbox-indicator",
				keepMounted: true,
				children: [/* @__PURE__ */ jsx("svg", {
					className: checkboxCheckVariants({ size }),
					"data-slot": "checkbox-check",
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
					className: checkboxDashVariants({ size }),
					"data-slot": "checkbox-dash",
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
			className: checkboxLabelVariants({ size }),
			"data-slot": "checkbox-label",
			children: label
		})]
	});
}
Checkbox$1.displayName = "Checkbox";
//#endregion
export { Checkbox$1 as default };

//# sourceMappingURL=Checkbox.mjs.map