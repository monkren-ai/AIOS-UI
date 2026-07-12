import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState } from "../ui/OverlayPortal.mjs";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation.mjs";
import { useFloating } from "../hooks/useFloating.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./DropdownMenu.css";
//#region src/DropdownMenu/DropdownMenu.tsx
const dropdownMenuContentVariants = cva("nothing-dropdown-menu__content", {
	variants: {
		visible: {
			true: "nothing-dropdown-menu__content--visible",
			false: ""
		},
		align: {
			start: "nothing-dropdown-menu__content--start",
			center: "nothing-dropdown-menu__content--center",
			end: "nothing-dropdown-menu__content--end"
		}
	},
	defaultVariants: {
		visible: false,
		align: "start"
	}
});
const dropdownMenuItemVariants = cva("nothing-dropdown-menu__item", {
	variants: { disabled: {
		true: "nothing-dropdown-menu__item--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const menubarTriggerVariants = cva("nothing-dropdown-menu__menubar-trigger", {
	variants: { active: {
		true: "nothing-dropdown-menu__menubar-trigger--active",
		false: ""
	} },
	defaultVariants: { active: false }
});
const menubarDropdownVariants = cva("nothing-dropdown-menu__menubar-dropdown", {
	variants: { visible: {
		true: "nothing-dropdown-menu__menubar-dropdown--visible",
		false: ""
	} },
	defaultVariants: { visible: false }
});
const menubarItemVariants = cva("nothing-dropdown-menu__menubar-item", {
	variants: { disabled: {
		true: "nothing-dropdown-menu__menubar-item--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const MenubarVariant = ({ items }) => {
	const [activeIndex, setActiveIndex] = React$1.useState(null);
	const [focusItemIndex, setFocusItemIndex] = React$1.useState(0);
	const containerRef = React$1.useRef(null);
	const triggerRefs = React$1.useRef([]);
	useClickOutside(containerRef, () => {
		setActiveIndex(null);
	});
	const handleTriggerClick = React$1.useCallback((index) => {
		setActiveIndex((prev) => prev === index ? null : index);
		setFocusItemIndex(0);
	}, []);
	const handleTriggerKeyDown = React$1.useCallback((index, e) => {
		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				setActiveIndex((prev) => {
					const next = (index + 1) % items.length;
					triggerRefs.current[next]?.focus();
					return prev !== null ? next : null;
				});
				break;
			case "ArrowLeft":
				e.preventDefault();
				setActiveIndex((prev) => {
					const prevIdx = (index - 1 + items.length) % items.length;
					triggerRefs.current[prevIdx]?.focus();
					return prev !== null ? prevIdx : null;
				});
				break;
			case "ArrowDown":
				e.preventDefault();
				if (items[index].items) {
					setActiveIndex(index);
					setFocusItemIndex(0);
				}
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				handleTriggerClick(index);
				break;
			case "Escape":
				e.preventDefault();
				setActiveIndex(null);
				break;
		}
	}, [items, handleTriggerClick]);
	const handleDropdownKeyDown = React$1.useCallback((triggerIndex, e) => {
		const dropdownItems = items[triggerIndex].items?.filter((i) => !i.separator) ?? [];
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setFocusItemIndex((prev) => Math.min(prev + 1, dropdownItems.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				setFocusItemIndex((prev) => Math.max(prev - 1, 0));
				break;
			case "ArrowRight":
				e.preventDefault();
				setActiveIndex((prev) => {
					if (prev === null) return null;
					const next = (prev + 1) % items.length;
					triggerRefs.current[next]?.focus();
					setFocusItemIndex(0);
					return next;
				});
				break;
			case "ArrowLeft":
				e.preventDefault();
				setActiveIndex((prev) => {
					if (prev === null) return null;
					const prevIdx = (prev - 1 + items.length) % items.length;
					triggerRefs.current[prevIdx]?.focus();
					setFocusItemIndex(0);
					return prevIdx;
				});
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (dropdownItems[focusItemIndex]) {
					dropdownItems[focusItemIndex].onClick?.();
					setActiveIndex(null);
				}
				break;
			case "Escape":
				e.preventDefault();
				setActiveIndex(null);
				triggerRefs.current[triggerIndex]?.focus();
				break;
		}
	}, [items, focusItemIndex]);
	return /* @__PURE__ */ jsx("div", {
		className: "nothing-dropdown-menu--menubar",
		ref: containerRef,
		role: "menubar",
		children: items.map((item, index) => {
			const isOpen = activeIndex === index;
			let visibleItemIndex = -1;
			return /* @__PURE__ */ jsxs("div", {
				style: { position: "relative" },
				children: [/* @__PURE__ */ jsx("button", {
					ref: (el) => {
						triggerRefs.current[index] = el;
					},
					className: cn(menubarTriggerVariants({ active: isOpen })),
					role: "menuitem",
					"aria-expanded": isOpen,
					"aria-haspopup": item.items ? "menu" : void 0,
					onClick: () => handleTriggerClick(index),
					onKeyDown: (e) => handleTriggerKeyDown(index, e),
					"data-state": dataAttr(isOpen ? "open" : "closed"),
					children: item.label
				}), item.items && /* @__PURE__ */ jsx("div", {
					className: cn(menubarDropdownVariants({ visible: isOpen })),
					role: "menu",
					onKeyDown: (e) => handleDropdownKeyDown(index, e),
					"data-state": dataAttr(isOpen ? "open" : "closed"),
					children: item.items.map((dropdownItem, di) => {
						if (dropdownItem.separator) return /* @__PURE__ */ jsx("div", {
							className: "nothing-dropdown-menu__menubar-separator",
							role: "separator"
						}, di);
						visibleItemIndex++;
						const currentVisibleIndex = visibleItemIndex;
						const isFocused = isOpen && focusItemIndex === currentVisibleIndex;
						return /* @__PURE__ */ jsxs("div", {
							className: cn(menubarItemVariants({ disabled: !!dropdownItem.disabled })),
							role: "menuitem",
							tabIndex: isFocused ? 0 : -1,
							onClick: () => {
								if (dropdownItem.disabled) return;
								dropdownItem.onClick?.();
								setActiveIndex(null);
							},
							onMouseEnter: () => setFocusItemIndex(currentVisibleIndex),
							ref: (el) => {
								if (isFocused) el?.focus();
							},
							"data-disabled": dataAttr(dropdownItem.disabled),
							children: [/* @__PURE__ */ jsx("span", {
								className: "nothing-dropdown-menu__menubar-item-label",
								children: dropdownItem.label
							}), dropdownItem.shortcut && /* @__PURE__ */ jsx("span", {
								className: "nothing-dropdown-menu__menubar-item-shortcut",
								children: dropdownItem.shortcut
							})]
						}, di);
					})
				})]
			}, index);
		})
	});
};
const DropdownMenu = React$1.forwardRef(({ className, trigger, items, align = "start", side = "bottom", variant = "default", visible: _visible, ...props }, ref) => {
	const { isOpen, toggle, close } = useOverlayState(void 0);
	const triggerRef = React$1.useRef(null);
	const contentRef = React$1.useRef(null);
	const containerRef = React$1.useRef(null);
	const itemRefs = React$1.useRef([]);
	const { style, update } = useFloating(side);
	const setContainerRefs = React$1.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	useEscapeKey(isOpen, () => {
		close();
		triggerRef.current?.focus();
	});
	React$1.useEffect(() => {
		if (!isOpen) return;
		const handler = (event) => {
			const target = event.target;
			if (!target) return;
			if (containerRef.current?.contains(target)) return;
			if (contentRef.current?.contains(target)) return;
			close();
		};
		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [isOpen, close]);
	React$1.useEffect(() => {
		if (isOpen && triggerRef.current && contentRef.current) update(triggerRef.current, contentRef.current);
	}, [isOpen, update]);
	const handleItemSelect = React$1.useCallback((index) => {
		const item = items[index];
		if (item?.disabled) return;
		item?.onClick?.();
		close();
		triggerRef.current?.focus();
	}, [items, close]);
	const defaultItems = items;
	const focusableItems = defaultItems.filter((item) => !item.disabled);
	const handleKeyDown = useKeyboardNavigation({
		items: focusableItems.map((item) => {
			const idx = defaultItems.indexOf(item);
			return itemRefs.current[idx];
		}).filter(Boolean),
		orientation: "vertical",
		loop: true,
		onSelect: (focusableIndex) => {
			const actualItem = focusableItems[focusableIndex];
			if (actualItem) handleItemSelect(defaultItems.indexOf(actualItem));
		}
	});
	if (variant === "menubar") return /* @__PURE__ */ jsx(MenubarVariant, { items });
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn("nothing-dropdown-menu", className),
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		"data-variant": dataAttr(variant),
		...props,
		children: [/* @__PURE__ */ jsx("button", {
			ref: triggerRef,
			className: "nothing-dropdown-menu__trigger",
			onClick: toggle,
			"aria-haspopup": "menu",
			"aria-expanded": isOpen,
			"data-state": dataAttr(isOpen ? "open" : "closed"),
			children: trigger
		}), /* @__PURE__ */ jsx(OverlayPortal, {
			open: isOpen,
			children: /* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: cn(dropdownMenuContentVariants({
					visible: isOpen,
					align
				})),
				role: "menu",
				style,
				onKeyDown: (e) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();
						const firstFocusable = focusableItems[0];
						if (firstFocusable) {
							const idx = defaultItems.indexOf(firstFocusable);
							itemRefs.current[idx]?.focus();
						}
					} else if (e.key === "ArrowUp") {
						e.preventDefault();
						const lastFocusable = focusableItems[focusableItems.length - 1];
						if (lastFocusable) {
							const idx = defaultItems.indexOf(lastFocusable);
							itemRefs.current[idx]?.focus();
						}
					}
				},
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				"data-align": dataAttr(align),
				children: defaultItems.map((item, index) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					ref: (node) => {
						itemRefs.current[index] = node;
					},
					className: cn(dropdownMenuItemVariants({ disabled: !!item.disabled })),
					role: "menuitem",
					tabIndex: item.disabled ? -1 : 0,
					"aria-disabled": item.disabled || void 0,
					onClick: () => handleItemSelect(index),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleItemSelect(index);
						} else {
							const focusableIndex = focusableItems.indexOf(defaultItems[index]);
							if (focusableIndex >= 0) handleKeyDown(e, focusableIndex);
						}
					},
					"data-disabled": dataAttr(item.disabled),
					children: [
						item.icon && /* @__PURE__ */ jsx("span", {
							className: "nothing-dropdown-menu__item-icon",
							children: item.icon
						}),
						/* @__PURE__ */ jsx("span", {
							className: "nothing-dropdown-menu__item-label",
							children: item.label
						}),
						item.shortcut && /* @__PURE__ */ jsx("span", {
							className: "nothing-dropdown-menu__item-shortcut",
							children: item.shortcut
						})
					]
				}), item.separator && /* @__PURE__ */ jsx("div", {
					className: "nothing-dropdown-menu__separator",
					role: "separator"
				})] }, index))
			})
		})]
	});
});
DropdownMenu.displayName = "DropdownMenu";
//#endregion
export { DropdownMenu as default, dropdownMenuContentVariants, dropdownMenuItemVariants, menubarDropdownVariants, menubarItemVariants, menubarTriggerVariants };

//# sourceMappingURL=DropdownMenu.mjs.map