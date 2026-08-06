import { cn, dataAttr } from "../lib/utils.mjs";
import { numberFieldErrorVariants, numberFieldGroupVariants, numberFieldInputVariants, numberFieldLabelVariants, numberFieldStepperVariants, numberFieldVariants } from "./number-field-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { NumberField } from "@base-ui/react/number-field";
//#region src/NumberField/NumberField.tsx
function NumberField$1({ className, value, defaultValue, onValueChange, min, max, step, label, error, placeholder, disabled = false, size = "md", ref, ...props }) {
	const resolvedSize = size;
	const hasError = Boolean(error);
	const handleValueChange = React$1.useCallback((nextValue) => {
		onValueChange?.(nextValue);
	}, [onValueChange]);
	return /* @__PURE__ */ jsxs(NumberField.Root, {
		ref,
		className: cn(numberFieldVariants({
			size: resolvedSize,
			disabled,
			hasError
		}), className),
		"data-slot": "number-field",
		"data-size": dataAttr(resolvedSize),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		value,
		defaultValue,
		onValueChange: handleValueChange,
		min,
		max,
		step,
		disabled,
		...props,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: numberFieldLabelVariants({
					size: resolvedSize,
					hasError,
					disabled
				}),
				"data-slot": "number-field-label",
				children: label
			}),
			/* @__PURE__ */ jsxs(NumberField.Group, {
				className: numberFieldGroupVariants({
					size: resolvedSize,
					hasError,
					disabled
				}),
				"data-slot": "number-field-group",
				"data-size": dataAttr(resolvedSize),
				"data-invalid": dataAttr(hasError),
				children: [
					/* @__PURE__ */ jsx(NumberField.Decrement, {
						className: numberFieldStepperVariants({ size: resolvedSize }),
						"data-slot": "number-field-decrement",
						"aria-label": "Decrement",
						children: "−"
					}),
					/* @__PURE__ */ jsx(NumberField.Input, {
						className: numberFieldInputVariants({ size: resolvedSize }),
						"data-slot": "number-field-input",
						placeholder,
						"aria-roledescription": "Number field"
					}),
					/* @__PURE__ */ jsx(NumberField.Increment, {
						className: numberFieldStepperVariants({ size: resolvedSize }),
						"data-slot": "number-field-increment",
						"aria-label": "Increment",
						children: "+"
					})
				]
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: numberFieldErrorVariants(),
				"data-slot": "number-field-error",
				role: "alert",
				children: error
			})
		]
	});
}
NumberField$1.displayName = "NumberField";
//#endregion
export { NumberField$1 as default };

//# sourceMappingURL=NumberField.mjs.map