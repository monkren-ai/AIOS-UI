import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import "./RadioGroup.css";
//#region src/RadioGroup/RadioGroup.tsx
const radioGroupVariants = cva("nothing-radio-group", {
	variants: {
		orientation: {
			horizontal: "nothing-radio-group--horizontal",
			vertical: "nothing-radio-group--vertical"
		},
		disabled: {
			true: "nothing-radio-group--disabled",
			false: ""
		}
	},
	defaultVariants: {
		orientation: "vertical",
		disabled: false
	}
});
const RadioGroup$1 = React.forwardRef(({ className, options, value: controlledValue, defaultValue, onValueChange, disabled, orientation = "vertical", name, ...props }, ref) => {
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
			disabled: isDisabled
		}), className),
		role: "radiogroup",
		"aria-orientation": orientation,
		"data-slot": "radio-group",
		"data-disabled": dataAttr(isDisabled),
		value: selectedValue,
		defaultValue: controlledValue !== void 0 ? void 0 : defaultValue,
		onValueChange: handleValueChange,
		disabled: isDisabled,
		name,
		...props,
		children: options.map((option) => {
			const isItemDisabled = option.disabled || isDisabled;
			return /* @__PURE__ */ jsxs("label", {
				className: cn("nothing-radio-group__item", option.value === selectedValue && "nothing-radio-group__item--checked", isItemDisabled && "nothing-radio-group__item--disabled"),
				children: [/* @__PURE__ */ jsx(Radio.Root, {
					className: "nothing-radio-group__circle",
					value: option.value,
					disabled: isItemDisabled,
					children: /* @__PURE__ */ jsx(Radio.Indicator, {
						className: "nothing-radio-group__dot",
						keepMounted: true
					})
				}), /* @__PURE__ */ jsx("span", {
					className: "nothing-radio-group__label",
					children: option.label
				})]
			}, option.value);
		})
	});
});
RadioGroup$1.displayName = "RadioGroup";
//#endregion
export { RadioGroup$1 as RadioGroup, RadioGroup$1 as default, radioGroupVariants };

//# sourceMappingURL=RadioGroup.mjs.map