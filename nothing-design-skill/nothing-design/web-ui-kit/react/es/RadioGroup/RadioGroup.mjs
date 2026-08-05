import { cn, dataAttr } from "../lib/utils.mjs";
import { radioGroupCircleVariants, radioGroupDotVariants, radioGroupItemVariants, radioGroupLabelVariants, radioGroupVariants } from "./radio-group-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
//#region src/RadioGroup/RadioGroup.tsx
function RadioGroup$1({ className, options, value: controlledValue, defaultValue, onValueChange, disabled, orientation = "vertical", size = "md", name, ref, ...props }) {
	const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
	const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const isDisabled = !!disabled;
	const handleValueChange = React.useCallback((nextValue) => {
		if (controlledValue === void 0) setInternalValue(nextValue);
		onValueChange?.(nextValue);
	}, [controlledValue, onValueChange]);
	return /* @__PURE__ */ jsx(RadioGroup, {
		ref,
		className: cn(radioGroupVariants({
			orientation,
			size,
			disabled: isDisabled
		}), className),
		role: "radiogroup",
		"aria-orientation": orientation,
		"data-slot": "radio-group",
		"data-orientation": dataAttr(orientation),
		"data-size": dataAttr(size),
		"data-disabled": dataAttr(isDisabled),
		value: selectedValue,
		defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
		onValueChange: handleValueChange,
		disabled: isDisabled,
		name,
		...props,
		children: options.map((option) => {
			const isItemDisabled = Boolean(option.disabled || isDisabled);
			const isChecked = option.value === selectedValue;
			return /* @__PURE__ */ jsxs("label", {
				className: radioGroupItemVariants({
					size,
					checked: isChecked,
					disabled: isItemDisabled
				}),
				"data-slot": "radio-group-item",
				"data-state": dataAttr(isChecked ? "checked" : "unchecked"),
				"data-disabled": dataAttr(isItemDisabled),
				children: [/* @__PURE__ */ jsx(Radio.Root, {
					className: radioGroupCircleVariants({ size }),
					"data-slot": "radio-group-circle",
					value: option.value,
					disabled: isItemDisabled,
					children: /* @__PURE__ */ jsx(Radio.Indicator, {
						className: radioGroupDotVariants({ size }),
						"data-slot": "radio-group-dot",
						keepMounted: true
					})
				}), /* @__PURE__ */ jsx("span", {
					className: radioGroupLabelVariants({ size }),
					"data-slot": "radio-group-label",
					children: option.label
				})]
			}, option.value);
		})
	});
}
RadioGroup$1.displayName = "RadioGroup";
//#endregion
export { RadioGroup$1 as default };

//# sourceMappingURL=RadioGroup.mjs.map