import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
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
const InputMessage = ({ children, variant = "default" }) => /* @__PURE__ */ jsx("div", {
	className: cn("nothing-input__message", variant === "error" && "nothing-input__message--error"),
	"data-variant": variant,
	children
});
const Input = React.forwardRef(({ variant, label, placeholder, value: controlledValue, error, message, disabled = false, id, onChange, className, style, type = "text", autoComplete, inputMode, name, leadingIcon, trailingIcon, clearable, ...rest }, ref) => {
	const [internalValue, setInternalValue] = React.useState("");
	const generatedId = React.useId();
	const inputId = id || generatedId;
	const errorId = `${inputId}-error`;
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const hasError = Boolean(error);
	const inputRef = React.useRef(null);
	React.useImperativeHandle(ref, () => inputRef.current, []);
	const handleChange = (e) => {
		const newValue = e.target.value;
		if (controlledValue === void 0) setInternalValue(newValue);
		onChange?.(newValue);
	};
	const handleClear = React.useCallback(() => {
		if (controlledValue === void 0) setInternalValue("");
		onChange?.("");
		inputRef.current?.focus();
	}, [controlledValue, onChange]);
	const showClear = clearable && value && !disabled;
	return /* @__PURE__ */ jsxs("div", {
		className: cn(inputVariants({
			variant,
			hasError,
			disabled
		}), className),
		style,
		"data-slot": "input",
		"data-variant": dataAttr(variant),
		"data-state": hasError ? "error" : disabled ? "disabled" : "default",
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "nothing-input__label",
				htmlFor: inputId,
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-input__control",
				children: [
					leadingIcon && /* @__PURE__ */ jsx("span", {
						className: "nothing-input__icon nothing-input__icon--leading",
						"aria-hidden": "true",
						children: leadingIcon
					}),
					/* @__PURE__ */ jsx("input", {
						ref: inputRef,
						className: "nothing-input__field",
						type,
						id: inputId,
						name,
						placeholder,
						value,
						disabled,
						onChange: handleChange,
						autoComplete,
						inputMode,
						"aria-invalid": hasError || void 0,
						"aria-describedby": hasError ? errorId : void 0,
						...rest
					}),
					showClear && /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "nothing-input__clear",
						onClick: handleClear,
						"aria-label": "Clear input",
						tabIndex: -1,
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 16 16",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "1.5",
							children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
						})
					}),
					!showClear && trailingIcon && /* @__PURE__ */ jsx("span", {
						className: "nothing-input__icon nothing-input__icon--trailing",
						"aria-hidden": "true",
						children: trailingIcon
					})
				]
			}),
			hasError && /* @__PURE__ */ jsx("div", {
				id: errorId,
				className: "nothing-input__error",
				role: "alert",
				children: error
			}),
			!hasError && message && /* @__PURE__ */ jsx(InputMessage, { children: message })
		]
	});
});
Input.displayName = "Input";
Input.Message = InputMessage;
//#endregion
export { Input, Input as default, inputVariants };

//# sourceMappingURL=Input.mjs.map