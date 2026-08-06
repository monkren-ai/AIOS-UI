import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import { navigationMenuCaretVariants, navigationMenuItemVariants, navigationMenuLinkVariants, navigationMenuListVariants, navigationMenuSubmenuItemVariants, navigationMenuSubmenuLinkVariants, navigationMenuSubmenuVariants, navigationMenuVariants } from "./navigation-menu-variants.mjs";
import { useCallback, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/NavigationMenu/NavigationMenu.tsx
const LINK_SELECTOR = "[data-slot=\"navigation-menu-link\"]";
/** 方向键在 RTL 下要整体翻面，否则「右」会走向列表的开头。 */
function isRtlElement(element) {
	return getComputedStyle(element).direction === "rtl";
}
function NavigationMenu({ className, items, orientation = "horizontal", style, ...props }) {
	const [openIndex, setOpenIndex] = useState(null);
	const [focusIndex, setFocusIndex] = useState(null);
	const containerRef = useRef(null);
	const itemRefs = useRef([]);
	useClickOutside(containerRef, () => {
		setOpenIndex(null);
	});
	const focusItem = useCallback((index) => {
		itemRefs.current[index]?.querySelector(LINK_SELECTOR)?.focus();
	}, []);
	const handleTriggerClick = useCallback((index) => {
		setOpenIndex((prev) => prev === index ? null : index);
	}, []);
	const handleTriggerKeyDown = useCallback((index, e) => {
		const isHorizontal = orientation === "horizontal";
		const rtl = isRtlElement(e.currentTarget);
		const forwardKey = rtl ? "ArrowLeft" : "ArrowRight";
		const backwardKey = rtl ? "ArrowRight" : "ArrowLeft";
		const step = (delta) => {
			focusItem((index + delta + items.length) % items.length);
		};
		switch (e.key) {
			case forwardKey:
				e.preventDefault();
				if (isHorizontal) step(1);
				else if (items[index].children) setOpenIndex(index);
				break;
			case backwardKey:
				e.preventDefault();
				if (isHorizontal) step(-1);
				break;
			case "ArrowDown":
				e.preventDefault();
				if (!isHorizontal) step(1);
				else if (items[index].children) {
					setOpenIndex(index);
					setFocusIndex(0);
				}
				break;
			case "ArrowUp":
				e.preventDefault();
				if (!isHorizontal) step(-1);
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (items[index].children) setOpenIndex((prev) => prev === index ? null : index);
				else items[index].onClick?.();
				break;
			case "Escape":
				e.preventDefault();
				setOpenIndex(null);
				break;
		}
	}, [
		orientation,
		items,
		focusItem
	]);
	const handleSubmenuKeyDown = useCallback((itemIndex, e) => {
		const subItems = items[itemIndex].children ?? [];
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setFocusIndex((prev) => prev !== null ? Math.min(prev + 1, subItems.length - 1) : 0);
				break;
			case "ArrowUp":
				e.preventDefault();
				setFocusIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : 0);
				break;
			case "Escape":
				e.preventDefault();
				setOpenIndex(null);
				focusItem(itemIndex);
				break;
			case "Enter":
			case " ":
				e.preventDefault();
				if (focusIndex !== null) {
					subItems[focusIndex]?.onClick?.();
					setOpenIndex(null);
				}
				break;
		}
	}, [
		items,
		focusIndex,
		focusItem
	]);
	return /* @__PURE__ */ jsx("nav", {
		className: cn(navigationMenuVariants({ orientation }), className),
		style,
		"data-slot": "navigation-menu",
		"data-orientation": dataAttr(orientation),
		...props,
		children: /* @__PURE__ */ jsx("div", {
			ref: containerRef,
			children: /* @__PURE__ */ jsx("ul", {
				className: navigationMenuListVariants({ orientation }),
				"data-slot": "navigation-menu-list",
				role: orientation === "horizontal" ? "menubar" : "menu",
				children: items.map((item, index) => {
					const hasChildren = item.children && item.children.length > 0;
					const isOpen = openIndex === index;
					return /* @__PURE__ */ jsxs("li", {
						className: navigationMenuItemVariants(),
						"data-slot": "navigation-menu-item",
						"data-active": dataAttr(item.active),
						"data-has-children": dataAttr(hasChildren),
						"data-open": dataAttr(isOpen),
						ref: (el) => {
							itemRefs.current[index] = el;
						},
						children: [/* @__PURE__ */ jsxs("a", {
							className: navigationMenuLinkVariants({ active: item.active }),
							"data-slot": "navigation-menu-link",
							href: item.href ?? void 0,
							role: "menuitem",
							"aria-expanded": hasChildren ? isOpen : void 0,
							"aria-haspopup": hasChildren ? "menu" : void 0,
							onClick: (e) => {
								e.preventDefault();
								if (hasChildren) handleTriggerClick(index);
								else item.onClick?.();
							},
							onKeyDown: (e) => handleTriggerKeyDown(index, e),
							children: [item.label, hasChildren && /* @__PURE__ */ jsx("span", {
								className: navigationMenuCaretVariants(),
								"data-slot": "navigation-menu-caret",
								"aria-hidden": "true"
							})]
						}), hasChildren && /* @__PURE__ */ jsx("div", {
							className: navigationMenuSubmenuVariants({ orientation }),
							"data-slot": "navigation-menu-submenu",
							"data-open": dataAttr(isOpen),
							role: "menu",
							onKeyDown: (e) => handleSubmenuKeyDown(index, e),
							children: item.children.map((subItem, subIndex) => /* @__PURE__ */ jsx("div", {
								className: navigationMenuSubmenuItemVariants(),
								"data-slot": "navigation-menu-submenu-item",
								role: "none",
								children: /* @__PURE__ */ jsx("a", {
									className: navigationMenuSubmenuLinkVariants(),
									"data-slot": "navigation-menu-submenu-link",
									href: subItem.href ?? void 0,
									role: "menuitem",
									tabIndex: isOpen ? focusIndex === subIndex ? 0 : -1 : -1,
									onClick: (e) => {
										e.preventDefault();
										subItem.onClick?.();
										setOpenIndex(null);
									},
									ref: (el) => {
										if (isOpen && focusIndex === subIndex) el?.focus();
									},
									children: subItem.label
								})
							}, subIndex))
						})]
					}, index);
				})
			})
		})
	});
}
NavigationMenu.displayName = "NavigationMenu";
//#endregion
export { NavigationMenu as default };

//# sourceMappingURL=NavigationMenu.mjs.map