import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./InputOTP.css";
//#region src/InputOTP/InputOTP.tsx
const inputOTPVariants = cva("nothing-input-otp", {
	variants: {
		disabled: {
			true: "nothing-input-otp--disabled",
			false: ""
		},
		error: {
			true: "nothing-input-otp--error",
			false: ""
		}
	},
	defaultVariants: {
		disabled: false,
		error: false
	}
});
const inputOTPSlotVariants = cva("nothing-input-otp__slot", {
	variants: {
		active: {
			true: "nothing-input-otp__slot--active",
			false: ""
		},
		filled: {
			true: "nothing-input-otp__slot--filled",
			false: ""
		},
		error: {
			true: "nothing-input-otp__slot--error",
			false: ""
		}
	},
	defaultVariants: {
		active: false,
		filled: false,
		error: false
	}
});
const InputOTP = React.forwardRef(({ className, length = 6, value: controlledValue, onValueChange, disabled = false, error = false, ...props }, ref) => {
	const [internalValue, setInternalValue] = React.useState("");
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const [activeSlot, setActiveSlot] = React.useState(null);
	const inputRefs = React.useRef([]);
	const chars = value.split("").concat(Array(Math.max(0, length - value.length)).fill(""));
	const updateValue = React.useCallback((newValue) => {
		if (controlledValue === void 0) setInternalValue(newValue);
		onValueChange?.(newValue);
	}, [controlledValue, onValueChange]);
	const handleInput = React.useCallback((index, e) => {
		const inputChar = e.target.value.slice(-1);
		if (!/^\d$/.test(inputChar)) return;
		const newValue = value.split("");
		newValue[index] = inputChar;
		updateValue(newValue.join("").slice(0, length));
		if (index < length - 1) inputRefs.current[index + 1]?.focus();
	}, [
		value,
		length,
		updateValue
	]);
	const handleKeyDown = React.useCallback((index, e) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			if (value[index]) {
				const newValue = value.split("");
				newValue[index] = "";
				updateValue(newValue.join(""));
			} else if (index > 0) {
				const newValue = value.split("");
				newValue[index - 1] = "";
				updateValue(newValue.join(""));
				inputRefs.current[index - 1]?.focus();
			}
			return;
		}
		if (e.key === "ArrowLeft" && index > 0) {
			e.preventDefault();
			inputRefs.current[index - 1]?.focus();
			return;
		}
		if (e.key === "ArrowRight" && index < length - 1) {
			e.preventDefault();
			inputRefs.current[index + 1]?.focus();
			return;
		}
	}, [
		value,
		length,
		updateValue
	]);
	const handlePaste = React.useCallback((e) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
		updateValue(pasted);
		const focusIndex = Math.min(pasted.length, length - 1);
		inputRefs.current[focusIndex]?.focus();
	}, [length, updateValue]);
	const handleFocus = React.useCallback((index) => {
		setActiveSlot(index);
	}, []);
	const handleBlur = React.useCallback(() => {
		setActiveSlot(null);
	}, []);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(inputOTPVariants({
			disabled,
			error
		}), className),
		"data-state": dataAttr(error ? "error" : disabled ? "disabled" : "default"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(error),
		"aria-label": "OTP input",
		...props,
		children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx("div", {
			className: cn(inputOTPSlotVariants({
				active: activeSlot === index,
				filled: !!chars[index],
				error
			})),
			"data-active": dataAttr(activeSlot === index),
			"data-filled": dataAttr(!!chars[index]),
			children: /* @__PURE__ */ jsx("input", {
				ref: (el) => {
					inputRefs.current[index] = el;
				},
				className: "nothing-input-otp__input",
				type: "text",
				inputMode: "numeric",
				maxLength: 1,
				value: chars[index] || "",
				disabled: !!disabled,
				onChange: (e) => handleInput(index, e),
				onKeyDown: (e) => handleKeyDown(index, e),
				onPaste: handlePaste,
				onFocus: () => handleFocus(index),
				onBlur: handleBlur,
				"aria-label": `Digit ${index + 1} of ${length}`
			})
		}, index))
	});
});
InputOTP.displayName = "InputOTP";
//#endregion
export { InputOTP as default, inputOTPSlotVariants, inputOTPVariants };

//# sourceMappingURL=InputOTP.mjs.map