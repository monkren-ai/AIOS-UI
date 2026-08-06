import { cn, dataAttr } from "../lib/utils.mjs";
import { resolveSliderVariant, sliderControlVariants, sliderFillVariants, sliderHeaderVariants, sliderLabelVariants, sliderThumbVariants, sliderTrackVariants, sliderValueVariants, sliderVariants } from "./slider-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Slider } from "@base-ui/react/slider";
//#region src/Slider/Slider.tsx
function Slider$1({ className, value: controlledValue, defaultValue, onValueChange, min = 0, max = 100, step = 1, disabled, label, showValue = false, size = "md", variant, ref, ...props }) {
	const handleValueChange = React$1.useCallback((value) => {
		onValueChange?.(value);
	}, [onValueChange]);
	const resolvedVariant = resolveSliderVariant(variant) ?? "primary";
	const hasHeader = Boolean(label || showValue);
	return /* @__PURE__ */ jsxs(Slider.Root, {
		ref,
		className: cn(sliderVariants({
			size,
			variant: resolvedVariant,
			disabled: !!disabled
		}), className),
		"data-slot": "slider",
		"data-size": dataAttr(size),
		"data-variant": dataAttr(resolvedVariant),
		"data-disabled": dataAttr(disabled),
		value: controlledValue,
		defaultValue,
		min,
		max,
		step,
		disabled,
		onValueChange: handleValueChange,
		...props,
		children: [hasHeader && /* @__PURE__ */ jsxs("div", {
			className: sliderHeaderVariants(),
			"data-slot": "slider-header",
			children: [label && /* @__PURE__ */ jsx(Slider.Label, {
				className: sliderLabelVariants(),
				"data-slot": "slider-label",
				children: label
			}), showValue && /* @__PURE__ */ jsx(Slider.Value, {
				className: sliderValueVariants(),
				"data-slot": "slider-value"
			})]
		}), /* @__PURE__ */ jsxs(Slider.Control, {
			className: sliderControlVariants({ size }),
			"data-slot": "slider-control",
			children: [/* @__PURE__ */ jsx(Slider.Track, {
				className: sliderTrackVariants({ size }),
				"data-slot": "slider-track",
				children: /* @__PURE__ */ jsx(Slider.Indicator, {
					className: sliderFillVariants(),
					"data-slot": "slider-fill"
				})
			}), /* @__PURE__ */ jsx(Slider.Thumb, {
				className: sliderThumbVariants({ size }),
				"data-slot": "slider-thumb"
			})]
		})]
	});
}
Slider$1.displayName = "Slider";
//#endregion
export { Slider$1 as default };

//# sourceMappingURL=Slider.mjs.map