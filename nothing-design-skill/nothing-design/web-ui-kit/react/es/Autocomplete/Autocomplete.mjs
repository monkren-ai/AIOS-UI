import { cn, dataAttr } from "../lib/utils.mjs";
import { autocompleteClearVariants, autocompleteContentVariants, autocompleteControlVariants, autocompleteEmptyVariants, autocompleteErrorVariants, autocompleteIconVariants, autocompleteInputVariants, autocompleteItemVariants, autocompleteLabelVariants, autocompleteListVariants, autocompletePositionerVariants, autocompleteVariants } from "./autocomplete-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Autocomplete } from "@base-ui/react/autocomplete";
//#region src/Autocomplete/Autocomplete.tsx
function Autocomplete$1({ className, items, value, defaultValue, onValueChange, placeholder, label, error, disabled = false, size = "md", variant = "outline", clearable = false, icon = true, ref, ...props }) {
	const generatedId = React$1.useId();
	const inputId = props.id || generatedId;
	const errorId = `${inputId}-error`;
	const hasError = Boolean(error);
	const controlled = value !== void 0;
	const handleValueChange = React$1.useCallback((nextValue) => {
		onValueChange?.(nextValue);
	}, [onValueChange]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(autocompleteVariants({
			size,
			disabled,
			hasError
		}), className),
		"data-slot": "autocomplete",
		"data-size": dataAttr(size),
		"data-variant": dataAttr(variant),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		...props,
		children: [/* @__PURE__ */ jsxs(Autocomplete.Root, {
			items,
			value: controlled ? value : void 0,
			defaultValue: controlled ? void 0 : defaultValue,
			onValueChange: handleValueChange,
			disabled,
			children: [
				label && /* @__PURE__ */ jsx("label", {
					className: autocompleteLabelVariants({
						size,
						hasError,
						disabled
					}),
					"data-slot": "autocomplete-label",
					htmlFor: inputId,
					children: label
				}),
				/* @__PURE__ */ jsxs(Autocomplete.InputGroup, {
					className: autocompleteControlVariants({
						variant,
						size,
						hasError,
						disabled
					}),
					"data-slot": "autocomplete-control",
					"data-size": dataAttr(size),
					"data-variant": dataAttr(variant),
					"data-invalid": dataAttr(hasError),
					children: [
						/* @__PURE__ */ jsx(Autocomplete.Input, {
							id: inputId,
							className: autocompleteInputVariants({ size }),
							"data-slot": "autocomplete-input",
							placeholder,
							"aria-invalid": hasError || void 0,
							"aria-describedby": hasError ? errorId : void 0
						}),
						clearable && /* @__PURE__ */ jsx(Autocomplete.Clear, {
							className: autocompleteClearVariants(),
							"data-slot": "autocomplete-clear",
							"aria-label": "Clear",
							children: /* @__PURE__ */ jsx("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
							})
						}),
						icon && /* @__PURE__ */ jsx("span", {
							className: autocompleteIconVariants(),
							"data-slot": "autocomplete-icon",
							"aria-hidden": "true",
							children: "▾"
						})
					]
				}),
				/* @__PURE__ */ jsx(Autocomplete.Portal, { children: /* @__PURE__ */ jsx(Autocomplete.Positioner, {
					className: autocompletePositionerVariants(),
					"data-slot": "autocomplete-positioner",
					sideOffset: 4,
					align: "start",
					children: /* @__PURE__ */ jsxs(Autocomplete.Popup, {
						className: autocompleteContentVariants(),
						"data-slot": "autocomplete-content",
						children: [/* @__PURE__ */ jsx(Autocomplete.List, {
							className: autocompleteListVariants(),
							"data-slot": "autocomplete-list",
							children: (item) => /* @__PURE__ */ jsx(Autocomplete.Item, {
								value: item,
								disabled: item.disabled,
								className: (state) => autocompleteItemVariants({
									size,
									highlighted: state.highlighted,
									disabled: state.disabled
								}),
								"data-slot": "autocomplete-item",
								children: item.label
							}, item.value)
						}), /* @__PURE__ */ jsx(Autocomplete.Empty, {
							className: autocompleteEmptyVariants(),
							"data-slot": "autocomplete-empty",
							children: "No results found"
						})]
					})
				}) })
			]
		}), error && /* @__PURE__ */ jsx("div", {
			id: errorId,
			className: autocompleteErrorVariants(),
			"data-slot": "autocomplete-error",
			role: "alert",
			children: error
		})]
	});
}
Autocomplete$1.displayName = "Autocomplete";
function AutocompleteInput({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Autocomplete.Input, {
		ref,
		className: cn(autocompleteInputVariants(), className),
		"data-slot": "autocomplete-input",
		...props
	});
}
AutocompleteInput.displayName = "Autocomplete.Input";
function AutocompleteContent({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Autocomplete.Popup, {
		ref,
		className: cn(autocompleteContentVariants(), className),
		"data-slot": "autocomplete-content",
		...props
	});
}
AutocompleteContent.displayName = "Autocomplete.Content";
function AutocompleteList({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Autocomplete.List, {
		ref,
		className: cn(autocompleteListVariants(), className),
		"data-slot": "autocomplete-list",
		...props
	});
}
AutocompleteList.displayName = "Autocomplete.List";
function AutocompleteItem({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Autocomplete.Item, {
		ref,
		className: (state) => cn(autocompleteItemVariants({
			highlighted: state.highlighted,
			disabled: state.disabled
		}), className),
		"data-slot": "autocomplete-item",
		...props
	});
}
AutocompleteItem.displayName = "Autocomplete.Item";
function AutocompleteEmpty({ className, children, ref, ...props }) {
	return /* @__PURE__ */ jsx(Autocomplete.Empty, {
		ref,
		className: cn(autocompleteEmptyVariants(), className),
		"data-slot": "autocomplete-empty",
		...props,
		children: children ?? "No results found"
	});
}
AutocompleteEmpty.displayName = "Autocomplete.Empty";
Autocomplete$1.Input = AutocompleteInput;
Autocomplete$1.Content = AutocompleteContent;
Autocomplete$1.List = AutocompleteList;
Autocomplete$1.Item = AutocompleteItem;
Autocomplete$1.Empty = AutocompleteEmpty;
//#endregion
export { AutocompleteContent, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, Autocomplete$1 as default };

//# sourceMappingURL=Autocomplete.mjs.map