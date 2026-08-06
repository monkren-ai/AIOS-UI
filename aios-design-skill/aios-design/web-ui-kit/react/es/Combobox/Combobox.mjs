import { cn, dataAttr } from "../lib/utils.mjs";
import { comboboxClearVariants, comboboxContentVariants, comboboxControlVariants, comboboxEmptyVariants, comboboxErrorVariants, comboboxIconVariants, comboboxInputVariants, comboboxItemIndicatorVariants, comboboxItemVariants, comboboxLabelVariants, comboboxListVariants, comboboxPositionerVariants, comboboxVariants } from "./combobox-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Combobox } from "@base-ui/react/combobox";
//#region src/Combobox/Combobox.tsx
function Combobox$1({ className, items, value, defaultValue, onValueChange, onInputValueChange, placeholder, label, error, disabled = false, size = "md", variant = "outline", clearable = false, freeInput = false, ref, ...props }) {
	const generatedId = React$1.useId();
	const inputId = props.id || generatedId;
	const errorId = `${inputId}-error`;
	const hasError = Boolean(error);
	const selectedObject = React$1.useMemo(() => {
		if (freeInput || value === void 0) return void 0;
		return items.find((item) => item.value === value) ?? null;
	}, [
		items,
		value,
		freeInput
	]);
	const defaultSelectedObject = React$1.useMemo(() => {
		if (freeInput || defaultValue === void 0) return void 0;
		return items.find((item) => item.value === defaultValue) ?? null;
	}, [
		items,
		defaultValue,
		freeInput
	]);
	const handleValueChange = React$1.useCallback((nextValue) => {
		if (freeInput) return;
		if (nextValue && typeof nextValue === "object" && "value" in nextValue) onValueChange?.(nextValue.value);
		else if (nextValue === null) onValueChange?.("");
	}, [freeInput, onValueChange]);
	const handleInputValueChange = React$1.useCallback((nextInputValue) => {
		onInputValueChange?.(nextInputValue);
		if (freeInput) onValueChange?.(nextInputValue);
	}, [
		freeInput,
		onInputValueChange,
		onValueChange
	]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(comboboxVariants({
			size,
			disabled,
			hasError
		}), className),
		"data-slot": "combobox",
		"data-size": dataAttr(size),
		"data-variant": dataAttr(variant),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		...props,
		children: [/* @__PURE__ */ jsxs(Combobox.Root, {
			items,
			disabled,
			value: !freeInput ? selectedObject ?? void 0 : void 0,
			defaultValue: !freeInput ? defaultSelectedObject ?? void 0 : void 0,
			onValueChange: handleValueChange,
			inputValue: freeInput ? value : void 0,
			defaultInputValue: freeInput ? defaultValue : void 0,
			onInputValueChange: handleInputValueChange,
			children: [
				label && /* @__PURE__ */ jsx("label", {
					className: comboboxLabelVariants({
						size,
						hasError,
						disabled
					}),
					"data-slot": "combobox-label",
					htmlFor: inputId,
					children: label
				}),
				/* @__PURE__ */ jsxs(Combobox.InputGroup, {
					className: comboboxControlVariants({
						variant,
						size,
						hasError,
						disabled
					}),
					"data-slot": "combobox-control",
					"data-size": dataAttr(size),
					"data-variant": dataAttr(variant),
					"data-invalid": dataAttr(hasError),
					children: [
						/* @__PURE__ */ jsx(Combobox.Input, {
							id: inputId,
							className: comboboxInputVariants({ size }),
							"data-slot": "combobox-input",
							placeholder,
							"aria-invalid": hasError || void 0,
							"aria-describedby": hasError ? errorId : void 0
						}),
						clearable && /* @__PURE__ */ jsx(Combobox.Clear, {
							className: comboboxClearVariants(),
							"data-slot": "combobox-clear",
							"aria-label": "Clear",
							children: /* @__PURE__ */ jsx("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8" })
							})
						}),
						/* @__PURE__ */ jsx("span", {
							className: comboboxIconVariants(),
							"data-slot": "combobox-icon",
							"aria-hidden": "true",
							children: "▾"
						})
					]
				}),
				/* @__PURE__ */ jsx(Combobox.Portal, { children: /* @__PURE__ */ jsx(Combobox.Positioner, {
					className: comboboxPositionerVariants(),
					"data-slot": "combobox-positioner",
					sideOffset: 4,
					align: "start",
					children: /* @__PURE__ */ jsxs(Combobox.Popup, {
						className: comboboxContentVariants(),
						"data-slot": "combobox-content",
						children: [/* @__PURE__ */ jsx(Combobox.List, {
							className: comboboxListVariants(),
							"data-slot": "combobox-list",
							children: (item) => /* @__PURE__ */ jsxs(Combobox.Item, {
								value: item,
								disabled: item.disabled,
								className: (state) => comboboxItemVariants({
									size,
									selected: state.selected,
									highlighted: state.highlighted,
									disabled: state.disabled
								}),
								"data-slot": "combobox-item",
								children: [/* @__PURE__ */ jsx("span", {
									className: "min-w-0 flex-1 truncate",
									children: item.label
								}), /* @__PURE__ */ jsx(Combobox.ItemIndicator, {
									keepMounted: true,
									className: comboboxItemIndicatorVariants(),
									"data-slot": "combobox-item-indicator",
									children: "✓"
								})]
							}, item.value)
						}), /* @__PURE__ */ jsx(Combobox.Empty, {
							className: comboboxEmptyVariants(),
							"data-slot": "combobox-empty",
							children: "No results found"
						})]
					})
				}) })
			]
		}), error && /* @__PURE__ */ jsx("div", {
			id: errorId,
			className: comboboxErrorVariants(),
			"data-slot": "combobox-error",
			role: "alert",
			children: error
		})]
	});
}
Combobox$1.displayName = "Combobox";
function ComboboxInput({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Input, {
		ref,
		className: cn(comboboxInputVariants(), className),
		"data-slot": "combobox-input",
		...props
	});
}
ComboboxInput.displayName = "Combobox.Input";
function ComboboxContent({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Popup, {
		ref,
		className: cn(comboboxContentVariants(), className),
		"data-slot": "combobox-content",
		...props
	});
}
ComboboxContent.displayName = "Combobox.Content";
function ComboboxList({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.List, {
		ref,
		className: cn(comboboxListVariants(), className),
		"data-slot": "combobox-list",
		...props
	});
}
ComboboxList.displayName = "Combobox.List";
function ComboboxItem({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Item, {
		ref,
		className: (state) => cn(comboboxItemVariants({
			selected: state.selected,
			highlighted: state.highlighted,
			disabled: state.disabled
		}), className),
		"data-slot": "combobox-item",
		...props
	});
}
ComboboxItem.displayName = "Combobox.Item";
function ComboboxItemIndicator({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.ItemIndicator, {
		ref,
		className: cn(comboboxItemIndicatorVariants(), className),
		"data-slot": "combobox-item-indicator",
		...props
	});
}
ComboboxItemIndicator.displayName = "Combobox.ItemIndicator";
function ComboboxEmpty({ className, children, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Empty, {
		ref,
		className: cn(comboboxEmptyVariants(), className),
		"data-slot": "combobox-empty",
		...props,
		children: children ?? "No results found"
	});
}
ComboboxEmpty.displayName = "Combobox.Empty";
function ComboboxGroup({ className, ref, ...props }) {
	return /* @__PURE__ */ jsx(Combobox.Group, {
		ref,
		className: cn("py-1", className),
		"data-slot": "combobox-group",
		...props
	});
}
ComboboxGroup.displayName = "Combobox.Group";
Combobox$1.Input = ComboboxInput;
Combobox$1.Content = ComboboxContent;
Combobox$1.List = ComboboxList;
Combobox$1.Item = ComboboxItem;
Combobox$1.ItemIndicator = ComboboxItemIndicator;
Combobox$1.Empty = ComboboxEmpty;
Combobox$1.Group = ComboboxGroup;
//#endregion
export { ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, Combobox$1 as default };

//# sourceMappingURL=Combobox.mjs.map