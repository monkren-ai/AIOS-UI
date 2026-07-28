import { cn, dataAttr } from "../lib/utils.mjs";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation.mjs";
import { OverlayPortal, useEscapeKey, useOverlayState } from "../ui/OverlayPortal.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./ContextMenu.css";
//#region src/ContextMenu/ContextMenu.tsx
const contextMenuContentVariants = cva("nothing-context-menu__content", {
	variants: { visible: {
		true: "nothing-context-menu__content--visible",
		false: ""
	} },
	defaultVariants: { visible: false }
});
const contextMenuItemVariants = cva("nothing-context-menu__item", {
	variants: { disabled: {
		true: "nothing-context-menu__item--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const ContextMenu = React.forwardRef(({ className, items, visible: _visible, children, ...props }, ref) => {
	const { isOpen, close, setOpen } = useOverlayState(void 0);
	const [position, setPosition] = React.useState({
		top: 0,
		left: 0
	});
	const [activeIndex, setActiveIndex] = React.useState(-1);
	const contentRef = React.useRef(null);
	const containerRef = React.useRef(null);
	const itemRefs = React.useRef([]);
	const setContainerRefs = React.useCallback((node) => {
		containerRef.current = node;
		if (typeof ref === "function") ref(node);
		else if (ref && "current" in ref) ref.current = node;
	}, [ref]);
	React.useEffect(() => {
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
	useEscapeKey(isOpen, close);
	const handleContextMenu = React.useCallback((e) => {
		e.preventDefault();
		setPosition({
			top: e.clientY,
			left: e.clientX
		});
		setOpen(true);
		setActiveIndex(-1);
	}, [setOpen]);
	const handleItemSelect = React.useCallback((index) => {
		const item = items[index];
		if (item?.disabled) return;
		item?.onClick?.();
		close();
	}, [items, close]);
	const focusableItems = items.filter((item) => !item.disabled);
	const handleKeyDown = useKeyboardNavigation({
		items: focusableItems.map((item) => {
			const idx = items.indexOf(item);
			return itemRefs.current[idx];
		}).filter(Boolean),
		orientation: "vertical",
		loop: true,
		onSelect: (focusableIndex) => {
			const actualItem = focusableItems[focusableIndex];
			if (actualItem) {
				const realIndex = items.indexOf(actualItem);
				handleItemSelect(realIndex);
			}
		}
	});
	return /* @__PURE__ */ jsxs("div", {
		ref: setContainerRefs,
		className: cn("nothing-context-menu", className),
		"data-state": dataAttr(isOpen ? "open" : "closed"),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			className: "nothing-context-menu__trigger",
			onContextMenu: handleContextMenu,
			children
		}), /* @__PURE__ */ jsx(OverlayPortal, {
			open: isOpen,
			children: /* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: cn(contextMenuContentVariants({ visible: isOpen })),
				role: "menu",
				style: {
					position: "fixed",
					top: position.top,
					left: position.left,
					zIndex: "var(--z-dropdown)"
				},
				onKeyDown: (e) => {
					if (activeIndex >= 0) {
						const focusableIndex = focusableItems.indexOf(items[activeIndex]);
						if (focusableIndex >= 0) handleKeyDown(e, focusableIndex);
					} else if (e.key === "ArrowDown") {
						e.preventDefault();
						const firstFocusable = focusableItems[0];
						if (firstFocusable) {
							const idx = items.indexOf(firstFocusable);
							setActiveIndex(idx);
							itemRefs.current[idx]?.focus();
						}
					} else if (e.key === "ArrowUp") {
						e.preventDefault();
						const lastFocusable = focusableItems[focusableItems.length - 1];
						if (lastFocusable) {
							const idx = items.indexOf(lastFocusable);
							setActiveIndex(idx);
							itemRefs.current[idx]?.focus();
						}
					}
				},
				"data-state": dataAttr(isOpen ? "open" : "closed"),
				children: items.map((item, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					ref: (node) => {
						itemRefs.current[index] = node;
					},
					className: cn(contextMenuItemVariants({ disabled: !!item.disabled })),
					role: "menuitem",
					tabIndex: item.disabled ? -1 : 0,
					"aria-disabled": item.disabled || void 0,
					onClick: () => handleItemSelect(index),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleItemSelect(index);
						}
					},
					onFocus: () => setActiveIndex(index),
					"data-disabled": dataAttr(item.disabled),
					children: [/* @__PURE__ */ jsx("span", {
						className: "nothing-context-menu__item-label",
						children: item.label
					}), item.shortcut && /* @__PURE__ */ jsx("span", {
						className: "nothing-context-menu__item-shortcut",
						children: item.shortcut
					})]
				}), item.separator && /* @__PURE__ */ jsx("div", {
					className: "nothing-context-menu__separator",
					role: "separator"
				})] }, index))
			})
		})]
	});
});
ContextMenu.displayName = "ContextMenu";
//#endregion
export { ContextMenu, ContextMenu as default, contextMenuContentVariants, contextMenuItemVariants };

//# sourceMappingURL=ContextMenu.mjs.map