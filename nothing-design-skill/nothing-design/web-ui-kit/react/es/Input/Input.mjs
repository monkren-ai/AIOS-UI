import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Input.css";
//#region src/Input/Input.tsx
const inputVariants = cva("nothing-input", {
	variants: {
		variant: {
			underline: "nothing-input--underline",
			bordered: "nothing-input--bordered"
		},
		hasError: {
			true: "nothing-input--error",
			false: ""
		},
		disabled: {
			true: "nothing-input--disabled",
			false: ""
		}
	},
	defaultVariants: {
		variant: "underline",
		hasError: false,
		disabled: false
	}
});
const Input = React$1.forwardRef(({ variant, label, placeholder, value: controlledValue, error, disabled = false, id, onChange, className, style }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState("");
	const generatedId = React$1.useId();
	const inputId = id || generatedId;
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const hasError = Boolean(error);
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (controlledValue === void 0) setInternalValue(newValue);
		onChange?.(newValue);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(inputVariants({
			variant,
			hasError,
			disabled
		}), className),
		style,
		"data-variant": dataAttr(variant),
		"data-state": hasError ? "error" : disabled ? "disabled" : "default",
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "nothing-input__label",
				htmlFor: inputId,
				children: label
			}),
			/* @__PURE__ */ jsx("input", {
				ref,
				className: "nothing-input__field",
				type: "text",
				id: inputId,
				placeholder,
				value,
				disabled,
				onChange: handleChange
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				className: "nothing-input__error",
				children: error
			})
		]
	});
});
Input.displayName = "Input";
//#endregion
export { Input as default, inputVariants };

//# sourceMappingURL=Input.mjs.map