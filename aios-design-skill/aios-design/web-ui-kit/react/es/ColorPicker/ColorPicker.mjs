import { cn, dataAttr } from "../lib/utils.mjs";
import Input from "../Input/Input.mjs";
import { colorPickerCustomLabelVariants, colorPickerHeaderVariants, colorPickerInputVariants, colorPickerNativeVariants, colorPickerPreviewVariants, colorPickerSwatchVariants, colorPickerSwatchesVariants, colorPickerTitleVariants, colorPickerValueVariants, colorPickerVariants, resolveColorPickerSize } from "./color-picker-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/ColorPicker/ColorPicker.tsx
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
function ColorPicker({ value: valueProp, defaultValue = defaultPresets[0], onChange, presets = defaultPresets, title = "COLOR", showInput = true, inputLabel = "HEX", customLabel = "Custom", size = "md", className, ref, ...props }) {
	const isControlled = valueProp !== void 0;
	const [internalValue, setInternalValue] = React$1.useState(defaultValue);
	const value = isControlled ? valueProp : internalValue;
	const nativeInputRef = React$1.useRef(null);
	const resolvedSize = resolveColorPickerSize(size) ?? "md";
	const handleChange = React$1.useCallback((color) => {
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
		className: cn(colorPickerVariants({ size: resolvedSize }), className),
		"data-slot": "color-picker",
		"data-size": dataAttr(resolvedSize),
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: colorPickerHeaderVariants(),
				"data-slot": "color-picker-header",
				children: [/* @__PURE__ */ jsx("span", {
					className: colorPickerTitleVariants(),
					"data-slot": "color-picker-title",
					children: title
				}), /* @__PURE__ */ jsx("span", {
					className: colorPickerValueVariants(),
					"data-slot": "color-picker-value",
					children: value.toUpperCase()
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: colorPickerSwatchesVariants(),
				"data-slot": "color-picker-swatches",
				role: "group",
				"aria-label": "Color presets",
				children: [presets.map((color) => {
					const isActive = value.toUpperCase() === color.toUpperCase();
					return /* @__PURE__ */ jsx("button", {
						type: "button",
						className: colorPickerSwatchVariants({
							size: resolvedSize,
							active: isActive
						}),
						"data-slot": "color-picker-swatch",
						"data-active": dataAttr(isActive),
						"data-color": color,
						style: {
							"--swatch-color": color,
							backgroundColor: "var(--swatch-color)"
						},
						"aria-label": `Select color ${color}`,
						"aria-pressed": isActive,
						onClick: () => handleChange(color)
					}, color);
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: colorPickerSwatchVariants({
						size: resolvedSize,
						custom: true
					}),
					"data-slot": "color-picker-swatch-custom",
					"aria-label": customLabel,
					onClick: openNativePicker,
					children: [/* @__PURE__ */ jsx("span", {
						className: colorPickerCustomLabelVariants(),
						"data-slot": "color-picker-custom-label",
						children: customLabel
					}), /* @__PURE__ */ jsx("input", {
						ref: nativeInputRef,
						type: "color",
						className: colorPickerNativeVariants(),
						"data-slot": "color-picker-native",
						value,
						onChange: (e) => handleChange(e.target.value.toUpperCase()),
						"aria-hidden": "true",
						tabIndex: -1
					})]
				})]
			}),
			showInput && /* @__PURE__ */ jsx("div", {
				className: colorPickerInputVariants(),
				"data-slot": "color-picker-input",
				children: /* @__PURE__ */ jsx(Input, {
					variant: "soft",
					size: resolvedSize,
					label: inputLabel,
					value: value.replace("#", "").toUpperCase(),
					onValueChange: handleHexChange,
					leadingIcon: /* @__PURE__ */ jsx("span", {
						className: colorPickerPreviewVariants(),
						"data-slot": "color-picker-preview",
						style: { backgroundColor: value },
						"aria-hidden": "true"
					})
				})
			})
		]
	});
}
ColorPicker.displayName = "ColorPicker";
//#endregion
export { ColorPicker as default };

//# sourceMappingURL=ColorPicker.mjs.map