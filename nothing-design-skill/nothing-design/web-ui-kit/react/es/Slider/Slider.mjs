import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Slider.css";
//#region src/Slider/Slider.tsx
const sliderVariants = cva("nothing-slider", {
	variants: { disabled: {
		true: "nothing-slider--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const Slider = React$1.forwardRef(({ className, value: controlledValue, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, label, showValue = false, ...props }, ref) => {
	const [internalValue, setInternalValue] = React$1.useState(defaultValue ?? min);
	const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const trackRef = React$1.useRef(null);
	const isDragging = React$1.useRef(false);
	const isDisabled = !!disabled;
	const clampValue = React$1.useCallback((val) => {
		const stepped = Math.round(Math.max(min, Math.min(max, val)) / step) * step;
		const precision = String(step).includes(".") ? String(step).split(".")[1].length : 0;
		return Number(stepped.toFixed(precision));
	}, [
		min,
		max,
		step
	]);
	const updateValue = React$1.useCallback((clientX) => {
		const track = trackRef.current;
		if (!track) return;
		const rect = track.getBoundingClientRect();
		const newValue = clampValue(min + Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * (max - min));
		if (controlledValue === void 0) setInternalValue(newValue);
		onValueChange?.(newValue);
	}, [
		min,
		max,
		controlledValue,
		onValueChange,
		clampValue
	]);
	const handlePointerDown = React$1.useCallback((e) => {
		if (isDisabled) return;
		isDragging.current = true;
		e.currentTarget.setPointerCapture(e.pointerId);
		updateValue(e.clientX);
	}, [isDisabled, updateValue]);
	const handlePointerMove = React$1.useCallback((e) => {
		if (!isDragging.current || isDisabled) return;
		updateValue(e.clientX);
	}, [isDisabled, updateValue]);
	const handlePointerUp = React$1.useCallback(() => {
		isDragging.current = false;
	}, []);
	const handleKeyDown = React$1.useCallback((e) => {
		if (isDisabled) return;
		let newValue = currentValue;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowUp":
				e.preventDefault();
				newValue = clampValue(currentValue + step);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				e.preventDefault();
				newValue = clampValue(currentValue - step);
				break;
			case "Home":
				e.preventDefault();
				newValue = min;
				break;
			case "End":
				e.preventDefault();
				newValue = max;
				break;
			default: return;
		}
		if (controlledValue === void 0) setInternalValue(newValue);
		onValueChange?.(newValue);
	}, [
		isDisabled,
		currentValue,
		step,
		min,
		max,
		controlledValue,
		onValueChange,
		clampValue
	]);
	const percentage = (currentValue - min) / (max - min) * 100;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(sliderVariants({ disabled: isDisabled }), className),
		"data-disabled": dataAttr(isDisabled),
		"data-value": currentValue,
		...props,
		children: [(label || showValue) && /* @__PURE__ */ jsxs("div", {
			className: "nothing-slider__header",
			children: [label && /* @__PURE__ */ jsx("span", {
				className: "nothing-slider__label",
				children: label
			}), showValue && /* @__PURE__ */ jsx("span", {
				className: "nothing-slider__value",
				children: currentValue
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-slider__track",
			ref: trackRef,
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			children: [/* @__PURE__ */ jsx("div", {
				className: "nothing-slider__fill",
				style: { width: `${percentage}%` }
			}), /* @__PURE__ */ jsx("div", {
				className: "nothing-slider__thumb",
				style: { left: `${percentage}%` },
				role: "slider",
				tabIndex: isDisabled ? -1 : 0,
				"aria-valuemin": min,
				"aria-valuemax": max,
				"aria-valuenow": currentValue,
				"aria-label": label,
				onKeyDown: handleKeyDown
			})]
		})]
	});
});
Slider.displayName = "Slider";
//#endregion
export { Slider as default, sliderVariants };

//# sourceMappingURL=Slider.mjs.map