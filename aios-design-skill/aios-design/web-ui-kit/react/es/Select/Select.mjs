import { cn, dataAttr } from "../lib/utils.mjs";
import { resolveSelectSize, selectContentVariants, selectErrorVariants, selectItemIndicatorVariants, selectItemVariants, selectLabelVariants, selectListVariants, selectPlaceholderVariants, selectPositionerVariants, selectSearchInputVariants, selectSearchVariants, selectTriggerIconVariants, selectTriggerVariants, selectValueVariants, selectVariants } from "./select-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Select } from "@base-ui/react/select";
//#region src/Select/Select.tsx
function Select$1({ className, options, value: controlledValue, defaultValue, onValueChange, placeholder = "Select an option", disabled = false, label, error, size = "md", searchable = false, ref, ...props }) {
	const [open, setOpen] = React$1.useState(false);
	const [searchQuery, setSearchQuery] = React$1.useState("");
	const resolvedSize = resolveSelectSize(size) ?? "md";
	const handleValueChange = React$1.useCallback((value) => {
		if (value !== null) onValueChange?.(value);
	}, [onValueChange]);
	const handleOpenChange = React$1.useCallback((nextOpen) => {
		setOpen(nextOpen);
		if (!nextOpen) setSearchQuery("");
	}, [setOpen, setSearchQuery]);
	const filteredOptions = React$1.useMemo(() => {
		if (!searchable || !searchQuery) return options;
		const query = searchQuery.toLowerCase();
		return options.filter((opt) => opt.label.toLowerCase().includes(query));
	}, [
		options,
		searchable,
		searchQuery
	]);
	const hasError = Boolean(error);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(selectVariants({
			size: resolvedSize,
			disabled,
			hasError,
			open
		}), className),
		"data-slot": "select",
		"data-size": dataAttr(resolvedSize),
		"data-state": dataAttr(open ? "open" : "closed"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
		"data-invalid": dataAttr(hasError),
		...props,
		children: [/* @__PURE__ */ jsxs(Select.Root, {
			value: controlledValue,
			defaultValue,
			onValueChange: handleValueChange,
			onOpenChange: handleOpenChange,
			open,
			disabled,
			children: [
				label && /* @__PURE__ */ jsx(Select.Label, {
					className: selectLabelVariants(),
					"data-slot": "select-label",
					children: label
				}),
				/* @__PURE__ */ jsxs(Select.Trigger, {
					className: (state) => selectTriggerVariants({
						size: resolvedSize,
						hasError,
						open: state.open
					}),
					"data-slot": "select-trigger",
					"data-size": dataAttr(resolvedSize),
					"data-invalid": dataAttr(hasError),
					"data-state": dataAttr(open ? "open" : "closed"),
					children: [/* @__PURE__ */ jsx(Select.Value, {
						className: selectValueVariants(),
						"data-slot": "select-value",
						children: (value) => {
							if (value === null) return /* @__PURE__ */ jsx("span", {
								className: selectPlaceholderVariants(),
								"data-slot": "select-placeholder",
								children: placeholder
							});
							return options.find((opt) => opt.value === value)?.label ?? value;
						}
					}), /* @__PURE__ */ jsx("span", {
						className: selectTriggerIconVariants({ open }),
						"data-slot": "select-trigger-icon",
						"aria-hidden": "true",
						children: "▾"
					})]
				}),
				/* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsx(Select.Positioner, {
					className: selectPositionerVariants(),
					"data-slot": "select-positioner",
					sideOffset: 4,
					align: "start",
					children: /* @__PURE__ */ jsxs(Select.Popup, {
						className: selectContentVariants(),
						"data-slot": "select-content",
						"data-state": dataAttr(open ? "open" : "closed"),
						children: [searchable && /* @__PURE__ */ jsx("div", {
							className: selectSearchVariants(),
							"data-slot": "select-search",
							children: /* @__PURE__ */ jsx("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "Search...",
								className: selectSearchInputVariants(),
								"data-slot": "select-search-input",
								"aria-label": "Search options",
								autoFocus: open
							})
						}), /* @__PURE__ */ jsx(Select.List, {
							className: selectListVariants(),
							"data-slot": "select-list",
							children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", {
								className: selectItemVariants({
									size: resolvedSize,
									disabled: true
								}),
								"data-slot": "select-empty",
								"data-disabled": "",
								children: "No results found"
							}) : filteredOptions.map((option) => /* @__PURE__ */ jsxs(Select.Item, {
								value: option.value,
								disabled: option.disabled,
								className: (state) => selectItemVariants({
									size: resolvedSize,
									selected: state.selected,
									disabled: state.disabled,
									highlighted: state.highlighted
								}),
								"data-slot": "select-item",
								"data-state": dataAttr(option.value === controlledValue ? "selected" : "idle"),
								"data-disabled": dataAttr(option.disabled),
								children: [/* @__PURE__ */ jsx(Select.ItemText, { children: option.label }), /* @__PURE__ */ jsx(Select.ItemIndicator, {
									keepMounted: true,
									className: selectItemIndicatorVariants(),
									"data-slot": "select-item-indicator",
									children: "✓"
								})]
							}, option.value))
						})]
					})
				}) })
			]
		}), error && /* @__PURE__ */ jsx("div", {
			className: selectErrorVariants(),
			"data-slot": "select-error",
			role: "alert",
			children: error
		})]
	});
}
Select$1.displayName = "Select";
//#endregion
export { Select$1 as default };

//# sourceMappingURL=Select.mjs.map