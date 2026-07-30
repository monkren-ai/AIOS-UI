import { cn, dataAttr } from "../lib/utils.mjs";
import { selectItemVariants, selectTriggerVariants, selectVariants } from "./select-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Select } from "@base-ui/react/select";
import "./Select.css";
//#region src/Select/Select.tsx
const Select$1 = React.forwardRef(({ className, options, value: controlledValue, defaultValue, onValueChange, placeholder = "Select an option", disabled = false, label, error, searchable = false, ...props }, ref) => {
	const [open, setOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const handleValueChange = React.useCallback((value) => {
		if (value !== null) onValueChange?.(value);
	}, [onValueChange]);
	const handleOpenChange = React.useCallback((nextOpen) => {
		setOpen(nextOpen);
		if (!nextOpen) setSearchQuery("");
	}, [setOpen, setSearchQuery]);
	const filteredOptions = React.useMemo(() => {
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
			disabled,
			hasError
		}), className),
		"data-slot": "select",
		"data-state": dataAttr(open ? "open" : "closed"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(hasError),
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
					className: "nothing-select__label",
					"data-slot": "select-label",
					children: label
				}),
				/* @__PURE__ */ jsxs(Select.Trigger, {
					className: (state) => cn(selectTriggerVariants({ open: state.open })),
					"data-slot": "select-trigger",
					"data-state": dataAttr(open ? "open" : "closed"),
					children: [/* @__PURE__ */ jsx(Select.Value, {
						className: "nothing-select__trigger-value",
						"data-slot": "select-value",
						children: (value) => {
							if (value === null) return /* @__PURE__ */ jsx("span", {
								className: "nothing-select__trigger-placeholder",
								children: placeholder
							});
							return options.find((opt) => opt.value === value)?.label ?? value;
						}
					}), /* @__PURE__ */ jsx("span", {
						className: "nothing-select__trigger-icon",
						"aria-hidden": "true",
						children: "▾"
					})]
				}),
				/* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsx(Select.Positioner, {
					className: "nothing-select__positioner",
					"data-slot": "select-positioner",
					sideOffset: 4,
					align: "start",
					children: /* @__PURE__ */ jsxs(Select.Popup, {
						className: "nothing-select__content",
						"data-slot": "select-content",
						"data-state": dataAttr(open ? "open" : "closed"),
						children: [searchable && /* @__PURE__ */ jsx("div", {
							className: "nothing-select__search",
							"data-slot": "select-search",
							children: /* @__PURE__ */ jsx("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "Search...",
								className: "nothing-select__search-input",
								"aria-label": "Search options",
								autoFocus: open
							})
						}), /* @__PURE__ */ jsx(Select.List, {
							className: "nothing-select__list",
							"data-slot": "select-list",
							children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", {
								className: "nothing-select__item nothing-select__item--disabled",
								children: "No results found"
							}) : filteredOptions.map((option) => /* @__PURE__ */ jsxs(Select.Item, {
								value: option.value,
								disabled: option.disabled,
								className: (state) => cn(selectItemVariants({
									selected: state.selected,
									disabled: state.disabled,
									highlighted: state.highlighted
								})),
								"data-slot": "select-item",
								"data-state": dataAttr(option.value === controlledValue ? "selected" : "idle"),
								"data-disabled": dataAttr(option.disabled),
								children: [/* @__PURE__ */ jsx(Select.ItemText, { children: option.label }), /* @__PURE__ */ jsx(Select.ItemIndicator, {
									keepMounted: true,
									className: "nothing-select__item-indicator",
									"data-slot": "select-item-indicator",
									children: "✓"
								})]
							}, option.value))
						})]
					})
				}) })
			]
		}), error && /* @__PURE__ */ jsx("div", {
			className: "nothing-select__error",
			children: error
		})]
	});
});
Select$1.displayName = "Select";
//#endregion
export { Select$1 as Select, Select$1 as default, selectItemVariants, selectTriggerVariants, selectVariants };

//# sourceMappingURL=Select.mjs.map