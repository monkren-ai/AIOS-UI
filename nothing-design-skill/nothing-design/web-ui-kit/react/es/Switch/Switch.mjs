import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Switch } from "@base-ui/react/switch";
import "./Switch.css";
//#region src/Switch/Switch.tsx
const switchVariants = cva("nothing-switch", {
	variants: {
		checked: {
			true: "nothing-switch--on",
			false: ""
		},
		disabled: {
			true: "nothing-switch--disabled",
			false: ""
		}
	},
	defaultVariants: {
		checked: false,
		disabled: false
	}
});
const Switch$1 = React.forwardRef(({ className, on: controlledOn, label, disabled, onChange, checked, ...props }, ref) => {
	const [internalOn, setInternalOn] = React.useState(false);
	const isOn = controlledOn !== void 0 ? controlledOn : checked ?? internalOn;
	const isDisabled = !!disabled;
	const handleCheckedChange = (newValue) => {
		if (controlledOn === void 0) setInternalOn(newValue);
		onChange?.(newValue);
	};
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(switchVariants({
			checked: isOn,
			disabled: isDisabled
		}), className),
		"data-slot": "switch",
		"data-state": dataAttr(isOn ? "on" : "off"),
		"data-disabled": dataAttr(isDisabled),
		...props,
		children: [/* @__PURE__ */ jsx(Switch.Root, {
			className: "nothing-switch__track",
			checked: isOn,
			onCheckedChange: handleCheckedChange,
			disabled: isDisabled,
			children: /* @__PURE__ */ jsx(Switch.Thumb, { className: "nothing-switch__thumb" })
		}), label && /* @__PURE__ */ jsx("span", {
			className: "nothing-switch__label",
			children: label
		})]
	});
});
Switch$1.displayName = "Switch";
//#endregion
export { Switch$1 as Switch, Switch$1 as default, switchVariants };

//# sourceMappingURL=Switch.mjs.map