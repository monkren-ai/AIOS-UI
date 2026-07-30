import { cn, dataAttr } from "../lib/utils.mjs";
import { Input } from "../Input/Input.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ColorPicker.css";
//#region src/ColorPicker/ColorPicker.tsx
const colorPickerVariants = cva("nothing-color-picker", {
	variants: { size: {
		sm: "nothing-color-picker--sm",
		md: "nothing-color-picker--md",
		lg: "nothing-color-picker--lg"
	} },
	defaultVariants: { size: "md" }
});
const defaultPresets = [
	"#000000",
	"#FFFFFF",
	"#D71921",
	"#5B9BF6",
	"#4A9E5C",
	"#D4A843",
	"#999999",
	"#E8E8E8"
];
const isValidHex = (value) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
const ColorPicker = React.forwardRef(({ value: valueProp, defaultValue = defaultPresets[0], onChange, presets = defaultPresets, title = "COLOR", showInput = true, inputLabel = "HEX", customLabel = "Custom", size = "md", className, ...props }, ref) => {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const nativeInputRef = React.useRef(null);
	const handleChange = React.useCallback((color) => {
		if (!isControlled) setInternalValue(color);
		onChange?.(color);
	}, [isControlled, onChange]);
	const handleHexChange = (hex) => {
		const normalized = hex.startsWith("#") ? hex : `#${hex}`;
		if (isValidHex(normalized)) handleChange(normalized.toUpperCase());
	};
	const openNativePicker = () => {
		nativeInputRef.current?.click();
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(colorPickerVariants({ size }), className),
		"data-slot": "color-picker",
		"data-size": dataAttr(size),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-color-picker__header",
				children: [/* @__PURE__ */ jsx("span", {
					className: "nothing-color-picker__title",
					children: title
				}), /* @__PURE__ */ jsx("span", {
					className: "nothing-color-picker__value",
					children: value.toUpperCase()
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "nothing-color-picker__swatches",
				role: "group",
				"aria-label": "Color presets",
				children: [presets.map((color) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: cn("nothing-color-picker__swatch", value.toUpperCase() === color.toUpperCase() && "nothing-color-picker__swatch--active"),
					style: { "--swatch-color": color },
					"aria-label": `Select color ${color}`,
					"aria-pressed": value.toUpperCase() === color.toUpperCase(),
					onClick: () => handleChange(color)
				}, color)), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "nothing-color-picker__swatch nothing-color-picker__swatch--custom",
					"aria-label": customLabel,
					onClick: openNativePicker,
					children: [/* @__PURE__ */ jsx("span", {
						className: "nothing-color-picker__custom-label",
						children: customLabel
					}), /* @__PURE__ */ jsx("input", {
						ref: nativeInputRef,
						type: "color",
						className: "nothing-color-picker__native",
						value,
						onChange: (e) => handleChange(e.target.value.toUpperCase()),
						"aria-hidden": "true",
						tabIndex: -1
					})]
				})]
			}),
			showInput && /* @__PURE__ */ jsx("div", {
				className: "nothing-color-picker__input",
				children: /* @__PURE__ */ jsx(Input, {
					variant: "bordered",
					label: inputLabel,
					value: value.replace("#", "").toUpperCase(),
					onChange: handleHexChange,
					leadingIcon: /* @__PURE__ */ jsx("span", {
						className: "nothing-color-picker__preview",
						style: { backgroundColor: value },
						"aria-hidden": "true"
					})
				})
			})
		]
	});
});
ColorPicker.displayName = "ColorPicker";
//#endregion
export { ColorPicker, ColorPicker as default, colorPickerVariants };

//# sourceMappingURL=ColorPicker.mjs.map