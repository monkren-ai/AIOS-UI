import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
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
const Switch = React$1.forwardRef(({ className, on: controlledOn, label, disabled, onChange, checked, ...props }, ref) => {
	const [internalOn, setInternalOn] = React$1.useState(false);
	const isOn = controlledOn !== void 0 ? controlledOn : checked ?? internalOn;
	const isDisabled = !!disabled;
	const handleToggle = () => {
		if (isDisabled) return;
		const newValue = !isOn;
		if (controlledOn === void 0) setInternalOn(newValue);
		onChange?.(newValue);
	};
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(switchVariants({
			checked: isOn,
			disabled: isDisabled
		}), className),
		"data-state": dataAttr(isOn ? "on" : "off"),
		"data-disabled": dataAttr(isDisabled),
		...props,
		children: [
			/* @__PURE__ */ jsx("input", {
				className: "nothing-switch__input",
				type: "checkbox",
				checked: isOn,
				disabled: isDisabled,
				onChange: handleToggle,
				tabIndex: 0
			}),
			/* @__PURE__ */ jsx("div", {
				className: "nothing-switch__track",
				children: /* @__PURE__ */ jsx("div", { className: "nothing-switch__thumb" })
			}),
			label && /* @__PURE__ */ jsx("span", {
				className: "nothing-switch__label",
				children: label
			})
		]
	});
});
Switch.displayName = "Switch";
//#endregion
export { Switch as default, switchVariants };

//# sourceMappingURL=Switch.mjs.map