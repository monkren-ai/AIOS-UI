import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import { selectItemVariants, selectTriggerVariants, selectVariants } from "./select-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./Select.css";
//#region src/Select/Select.tsx
const Select = React.forwardRef(({ className, options, value: controlledValue, defaultValue, onValueChange, placeholder = "Select an option", disabled = false, hasError = false, label, error, searchable = false, ...props }, ref) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue);
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
	const containerRef = React.useRef(null);
	const searchInputRef = React.useRef(null);
	const listRef = React.useRef(null);
	const setContainerRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const selectedValue = controlledValue !== void 0 ? controlledValue : internalValue;
	const selectedOption = options.find((opt) => opt.value === selectedValue);
	const filteredOptions = searchable && searchQuery ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase())) : options;
	useClickOutside(containerRef, () => {
		setIsOpen(false);
		setSearchQuery("");
	});
	React.useEffect(() => {
		if (isOpen && searchable && searchInputRef.current) searchInputRef.current.focus();
		if (isOpen) {
			setHighlightedIndex(-1);
			setSearchQuery("");
		}
	}, [isOpen, searchable]);
	const handleToggle = () => {
		if (disabled) return;
		setIsOpen((prev) => !prev);
	};
	const handleSelect = React.useCallback((option) => {
		if (option.disabled) return;
		if (controlledValue === void 0) setInternalValue(option.value);
		onValueChange?.(option.value);
		setIsOpen(false);
		setSearchQuery("");
	}, [controlledValue, onValueChange]);
	const getEnabledIndices = React.useCallback(() => {
		return filteredOptions.map((opt, i) => !opt.disabled ? i : -1).filter((i) => i !== -1);
	}, [filteredOptions]);
	const handleKeyDown = React.useCallback((e) => {
		if (!isOpen) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				if (!disabled) setIsOpen(true);
			}
			return;
		}
		const enabledIndices = getEnabledIndices();
		switch (e.key) {
			case "ArrowDown": {
				e.preventDefault();
				const currentPos = enabledIndices.indexOf(highlightedIndex);
				setHighlightedIndex(enabledIndices[currentPos < enabledIndices.length - 1 ? currentPos + 1 : 0]);
				break;
			}
			case "ArrowUp": {
				e.preventDefault();
				const currentPos = enabledIndices.indexOf(highlightedIndex);
				setHighlightedIndex(enabledIndices[currentPos > 0 ? currentPos - 1 : enabledIndices.length - 1]);
				break;
			}
			case "Enter":
				e.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) handleSelect(filteredOptions[highlightedIndex]);
				break;
			case "Escape":
				e.preventDefault();
				setIsOpen(false);
				setSearchQuery("");
				break;
		}
	}, [
		isOpen,
		highlightedIndex,
		disabled,
		filteredOptions,
		getEnabledIndices,
		handleSelect
	]);
	React.useEffect(() => {
		if (highlightedIndex >= 0 && listRef.current) listRef.current.querySelectorAll("[role=\"option\"]")[highlightedIndex]?.scrollIntoView({ block: "nearest" });
	}, [highlightedIndex]);
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn(selectVariants({
			disabled,
			hasError: !!error || hasError,
			open: isOpen
		}), className),
		onKeyDown: handleKeyDown,
		"data-slot": "select",
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		"data-disabled": dataAttr(disabled),
		"data-error": dataAttr(!!error || hasError),
		...props,
		children: [
			label && /* @__PURE__ */ jsx("label", {
				className: "nothing-select__label",
				children: label
			}),
			/* @__PURE__ */ jsxs("button", {
				className: cn(selectTriggerVariants({ open: isOpen })),
				onClick: handleToggle,
				disabled: !!disabled,
				role: searchable ? "combobox" : "listbox",
				"aria-expanded": isOpen,
				"aria-haspopup": "listbox",
				type: "button",
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				children: [selectedOption ? /* @__PURE__ */ jsx("span", {
					className: "nothing-select__trigger-value",
					children: selectedOption.label
				}) : /* @__PURE__ */ jsx("span", {
					className: "nothing-select__trigger-placeholder",
					children: placeholder
				}), /* @__PURE__ */ jsx("span", {
					className: "nothing-select__trigger-icon",
					"aria-hidden": "true",
					children: "▾"
				})]
			}),
			isOpen && /* @__PURE__ */ jsxs("div", {
				className: "nothing-select__content",
				role: "listbox",
				"aria-label": label || "Options",
				"data-state": dataAttr("open"),
				children: [searchable && /* @__PURE__ */ jsx("div", {
					className: "nothing-select__search",
					children: /* @__PURE__ */ jsx("input", {
						ref: searchInputRef,
						type: "text",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						placeholder: "Search...",
						className: "nothing-select__search-input",
						"aria-label": "Search options"
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "nothing-select__list",
					ref: listRef,
					children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "nothing-select__item nothing-select__item--disabled",
						children: "No results found"
					}) : filteredOptions.map((option, index) => {
						const isSelected = option.value === selectedValue;
						const isHighlighted = index === highlightedIndex;
						return /* @__PURE__ */ jsx("div", {
							className: cn(selectItemVariants({
								selected: isSelected,
								disabled: !!option.disabled,
								highlighted: isHighlighted
							})),
							onClick: () => handleSelect(option),
							role: "option",
							"aria-selected": isSelected,
							"data-state": dataAttr(isSelected ? "selected" : "idle"),
							"data-highlighted": dataAttr(isHighlighted),
							"data-disabled": dataAttr(option.disabled),
							children: option.label
						}, option.value);
					})
				})]
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "nothing-select__error",
				children: error
			})
		]
	});
});
Select.displayName = "Select";
//#endregion
export { Select as default };

//# sourceMappingURL=Select.mjs.map