import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Slider } from "@base-ui/react/slider";
import "./Slider.css";
//#region src/Slider/Slider.tsx
const sliderVariants = cva("nothing-slider", {
	variants: {
		size: {
			sm: "nothing-slider--sm",
			md: "nothing-slider--md",
			lg: "nothing-slider--lg"
		},
		variant: {
			default: "nothing-slider--default",
			minimal: "nothing-slider--minimal"
		},
		disabled: {
			true: "nothing-slider--disabled",
			false: ""
		}
	},
	defaultVariants: {
		size: "md",
		variant: "default",
		disabled: false
	}
});
const Slider$1 = React.forwardRef(({ className, value: controlledValue, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, label, showValue = false, size, variant, ...props }, ref) => {
	const handleValueChange = React.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	const hasHeader = Boolean(label || showValue);
	return /* @__PURE__ */ jsxs(Slider.Root, {
		ref,
		className: cn(sliderVariants({
			size,
			variant,
			disabled: !!disabled
		}), className),
		"data-slot": "slider",
		"data-size": dataAttr(size),
		"data-variant": dataAttr(variant),
		value: controlledValue,
		defaultValue,
		min,
		max,
		step,
		disabled,
		"data-disabled": dataAttr(disabled),
		onValueChange: handleValueChange,
		...props,
		children: [hasHeader && /* @__PURE__ */ jsxs("div", {
			className: "nothing-slider__header",
			children: [label && /* @__PURE__ */ jsx(Slider.Label, {
				className: "nothing-slider__label",
				children: label
			}), showValue && /* @__PURE__ */ jsx(Slider.Value, { className: "nothing-slider__value" })]
		}), /* @__PURE__ */ jsxs(Slider.Control, {
			className: "nothing-slider__control",
			"data-slot": "slider-control",
			children: [/* @__PURE__ */ jsx(Slider.Track, {
				className: "nothing-slider__track",
				"data-slot": "slider-track",
				children: /* @__PURE__ */ jsx(Slider.Indicator, {
					className: "nothing-slider__fill",
					"data-slot": "slider-fill"
				})
			}), /* @__PURE__ */ jsx(Slider.Thumb, {
				className: "nothing-slider__thumb",
				"data-slot": "slider-thumb"
			})]
		})]
	});
});
Slider$1.displayName = "Slider";
//#endregion
export { Slider$1 as Slider, Slider$1 as default, sliderVariants };

//# sourceMappingURL=Slider.mjs.map