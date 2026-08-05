import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import { commandEmptyVariants, commandGroupHeadingVariants, commandGroupVariants, commandInputVariants, commandItemIconVariants, commandItemLabelVariants, commandItemShortcutVariants, commandItemVariants, commandListVariants, commandVariants, resolveCommandSize } from "./command-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Command/Command.tsx
function Command({ className, groups, placeholder = "Type a command...", emptyMessage = "No results found.", open: controlledOpen, onOpenChange, size = "md", ref, ...props }) {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const [query, setQuery] = React.useState("");
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const containerRef = React.useRef(null);
	const inputRef = React.useRef(null);
	const listRef = React.useRef(null);
	const generatedId = React.useId();
	const listId = `${generatedId}-list`;
	const resolvedSize = resolveCommandSize(size) ?? "md";
	const setContainerRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref) ref.current = node;
	}, [ref]);
	const filteredGroups = groups.map((g) => ({
		...g,
		items: g.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
	})).filter((g) => g.items.length > 0);
	const flatFilteredItems = filteredGroups.flatMap((g) => g.items);
	const handleClose = React.useCallback(() => {
		if (controlledOpen === void 0) setInternalOpen(false);
		onOpenChange?.(false);
		setQuery("");
		setSelectedIndex(0);
	}, [controlledOpen, onOpenChange]);
	useClickOutside(containerRef, () => {
		if (isOpen) handleClose();
	});
	React.useEffect(() => {
		if (isOpen) requestAnimationFrame(() => {
			inputRef.current?.focus();
		});
	}, [isOpen]);
	React.useEffect(() => {
		setSelectedIndex(0);
	}, [query]);
	const handleSelect = React.useCallback((item) => {
		if (item.disabled) return;
		item.onSelect?.();
		handleClose();
	}, [handleClose]);
	const handleKeyDown = React.useCallback((e) => {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex((prev) => Math.min(prev + 1, flatFilteredItems.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex((prev) => Math.max(prev - 1, 0));
				break;
			case "Enter": {
				e.preventDefault();
				const item = flatFilteredItems[selectedIndex];
				if (item) handleSelect(item);
				break;
			}
			case "Escape":
				e.preventDefault();
				handleClose();
				break;
		}
	}, [
		flatFilteredItems,
		selectedIndex,
		handleSelect,
		handleClose
	]);
	let itemIndex = -1;
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn(commandVariants(), className),
		role: "dialog",
		"aria-label": "Command palette",
		onKeyDown: handleKeyDown,
		"data-slot": "command",
		"data-size": dataAttr(resolvedSize),
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("input", {
			className: commandInputVariants({ size: resolvedSize }),
			"data-slot": "command-input",
			ref: inputRef,
			type: "text",
			value: query,
			onChange: (e) => setQuery(e.target.value),
			placeholder,
			"aria-autocomplete": "list",
			"aria-controls": listId,
			role: "combobox",
			"aria-expanded": isOpen,
			"aria-haspopup": "listbox",
			"aria-activedescendant": isOpen && flatFilteredItems[selectedIndex] ? `${generatedId}-item-${flatFilteredItems[selectedIndex].id}` : void 0,
			"aria-label": placeholder
		}), /* @__PURE__ */ jsxs("div", {
			className: commandListVariants(),
			"data-slot": "command-list",
			id: listId,
			ref: listRef,
			role: "listbox",
			children: [filteredGroups.length === 0 && /* @__PURE__ */ jsx("div", {
				className: commandEmptyVariants(),
				"data-slot": "command-empty",
				children: emptyMessage
			}), filteredGroups.map((group) => /* @__PURE__ */ jsxs("div", {
				className: commandGroupVariants(),
				"data-slot": "command-group",
				children: [group.heading && /* @__PURE__ */ jsx("div", {
					className: commandGroupHeadingVariants(),
					"data-slot": "command-group-heading",
					children: group.heading
				}), group.items.map((item) => {
					itemIndex++;
					const currentIndex = itemIndex;
					const isSelected = currentIndex === selectedIndex;
					return /* @__PURE__ */ jsxs("div", {
						id: `${generatedId}-item-${item.id}`,
						className: commandItemVariants({
							size: resolvedSize,
							selected: isSelected,
							disabled: !!item.disabled
						}),
						role: "option",
						"aria-selected": isSelected,
						"aria-disabled": item.disabled || void 0,
						onClick: () => handleSelect(item),
						onMouseEnter: () => setSelectedIndex(currentIndex),
						"data-slot": "command-item",
						"data-state": dataAttr(isSelected ? "selected" : "idle"),
						"data-selected": dataAttr(isSelected),
						"data-disabled": dataAttr(item.disabled),
						children: [
							item.icon && /* @__PURE__ */ jsx("span", {
								className: commandItemIconVariants(),
								"data-slot": "command-item-icon",
								children: item.icon
							}),
							/* @__PURE__ */ jsx("span", {
								className: commandItemLabelVariants(),
								"data-slot": "command-item-label",
								children: item.label
							}),
							item.shortcut && /* @__PURE__ */ jsx("span", {
								className: commandItemShortcutVariants(),
								"data-slot": "command-item-shortcut",
								children: item.shortcut
							})
						]
					}, item.id);
				})]
			}, group.heading ?? "default"))]
		})]
	});
}
Command.displayName = "Command";
//#endregion
export { Command as default };

//# sourceMappingURL=Command.mjs.map