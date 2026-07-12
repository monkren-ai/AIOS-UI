import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Command.css";
//#region src/Command/Command.tsx
const commandItemVariants = cva("nothing-command__item", {
	variants: {
		selected: {
			true: "nothing-command__item--selected",
			false: ""
		},
		disabled: {
			true: "nothing-command__item--disabled",
			false: ""
		}
	},
	defaultVariants: {
		selected: false,
		disabled: false
	}
});
const Command = React$1.forwardRef(({ className, groups, placeholder = "Type a command...", emptyMessage = "No results found.", open: controlledOpen, onOpenChange, ...props }, ref) => {
	const [internalOpen, setInternalOpen] = React$1.useState(false);
	const isOpen = controlledOpen !== void 0 ? controlledOpen : internalOpen;
	const [query, setQuery] = React$1.useState("");
	const [selectedIndex, setSelectedIndex] = React$1.useState(0);
	const containerRef = React$1.useRef(null);
	const inputRef = React$1.useRef(null);
	const listRef = React$1.useRef(null);
	const setContainerRefs = React$1.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	const filteredGroups = groups.map((g) => ({
		...g,
		items: g.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
	})).filter((g) => g.items.length > 0);
	const flatFilteredItems = filteredGroups.flatMap((g) => g.items);
	const handleClose = React$1.useCallback(() => {
		if (controlledOpen === void 0) setInternalOpen(false);
		onOpenChange?.(false);
		setQuery("");
		setSelectedIndex(0);
	}, [controlledOpen, onOpenChange]);
	useClickOutside(containerRef, () => {
		if (isOpen) handleClose();
	});
	React$1.useEffect(() => {
		if (isOpen) requestAnimationFrame(() => {
			inputRef.current?.focus();
		});
	}, [isOpen]);
	React$1.useEffect(() => {
		setSelectedIndex(0);
	}, [query]);
	const handleSelect = React$1.useCallback((item) => {
		if (item.disabled) return;
		item.onSelect?.();
		handleClose();
	}, [handleClose]);
	const handleKeyDown = React$1.useCallback((e) => {
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
		className: cn("nothing-command", className),
		role: "dialog",
		"aria-label": "Command palette",
		onKeyDown: handleKeyDown,
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("input", {
			className: "nothing-command__input",
			ref: inputRef,
			type: "text",
			value: query,
			onChange: (e) => setQuery(e.target.value),
			placeholder,
			"aria-autocomplete": "list",
			"aria-controls": "nothing-command-list"
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-command__list",
			id: "nothing-command-list",
			ref: listRef,
			role: "listbox",
			children: [filteredGroups.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "nothing-command__empty",
				children: emptyMessage
			}), filteredGroups.map((group) => /* @__PURE__ */ jsxs("div", {
				className: "nothing-command__group",
				children: [group.heading && /* @__PURE__ */ jsx("div", {
					className: "nothing-command__group-heading",
					children: group.heading
				}), group.items.map((item) => {
					itemIndex++;
					const currentIndex = itemIndex;
					const isSelected = currentIndex === selectedIndex;
					return /* @__PURE__ */ jsxs("div", {
						className: cn(commandItemVariants({
							selected: isSelected,
							disabled: !!item.disabled
						})),
						role: "option",
						"aria-selected": isSelected,
						onClick: () => handleSelect(item),
						onMouseEnter: () => setSelectedIndex(currentIndex),
						"data-state": dataAttr(isSelected ? "selected" : "idle"),
						"data-disabled": dataAttr(item.disabled),
						children: [
							item.icon && /* @__PURE__ */ jsx("span", {
								className: "nothing-command__item-icon",
								children: item.icon
							}),
							/* @__PURE__ */ jsx("span", {
								className: "nothing-command__item-label",
								children: item.label
							}),
							item.shortcut && /* @__PURE__ */ jsx("span", {
								className: "nothing-command__item-shortcut",
								children: item.shortcut
							})
						]
					}, item.id);
				})]
			}, group.heading ?? "default"))]
		})]
	});
});
Command.displayName = "Command";
//#endregion
export { commandItemVariants, Command as default };

//# sourceMappingURL=Command.mjs.map