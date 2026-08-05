import { cn, dataAttr } from "../lib/utils.mjs";
import { inputOTPInputVariants, inputOTPSlotVariants, inputOTPVariants, resolveInputOTPSize } from "./input-otp-variants.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
//#region src/InputOTP/InputOTP.tsx
function InputOTP({ className, length = 6, value: controlledValue, onValueChange, disabled = false, error = false, size = "md", ref, ...props }) {
	const [internalValue, setInternalValue] = React.useState("");
	const value = controlledValue !== void 0 ? controlledValue : internalValue;
	const [activeSlot, setActiveSlot] = React.useState(null);
	const inputRefs = React.useRef([]);
	const containerRef = React.useRef(null);
	const resolvedSize = resolveInputOTPSize(size) ?? "md";
	const chars = value.split("").concat(Array(Math.max(0, length - value.length)).fill(""));
	const setRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
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
	/**
	* 槽位在 `dir="rtl"` 下由 flex 镜像过，方向键要跟着镜像，
	* 否则「往左」会跳到视觉上的右边。
	*/
	const getArrowStep = React.useCallback((key) => {
		const node = containerRef.current;
		const rtl = typeof window !== "undefined" && node ? window.getComputedStyle(node).direction === "rtl" : false;
		if (key === "ArrowLeft") return rtl ? 1 : -1;
		if (key === "ArrowRight") return rtl ? -1 : 1;
		return 0;
	}, []);
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
		const step = getArrowStep(e.key);
		if (step === 0) return;
		const next = index + step;
		if (next < 0 || next > length - 1) return;
		e.preventDefault();
		inputRefs.current[next]?.focus();
	}, [
		value,
		length,
		updateValue,
		getArrowStep
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
		ref: setRefs,
		className: cn(inputOTPVariants({
			size: resolvedSize,
			disabled,
			error
		}), className),
		"data-slot": "input-otp",
		"data-size": dataAttr(resolvedSize),
		"data-state": dataAttr(error ? "error" : disabled ? "disabled" : "default"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(error),
		"data-invalid": dataAttr(error),
		"aria-label": "OTP input",
		...props,
		children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx("div", {
			className: inputOTPSlotVariants({
				size: resolvedSize,
				active: activeSlot === index,
				filled: !!chars[index],
				error
			}),
			"data-slot": "input-otp-slot",
			"data-index": index,
			"data-active": dataAttr(activeSlot === index),
			"data-filled": dataAttr(!!chars[index]),
			children: /* @__PURE__ */ jsx("input", {
				ref: (el) => {
					inputRefs.current[index] = el;
				},
				className: inputOTPInputVariants({ size: resolvedSize }),
				"data-slot": "input-otp-input",
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
				"aria-invalid": error || void 0,
				"aria-label": `Digit ${index + 1} of ${length}`
			})
		}, index))
	});
}
InputOTP.displayName = "InputOTP";
//#endregion
export { InputOTP as default };

//# sourceMappingURL=InputOTP.mjs.map