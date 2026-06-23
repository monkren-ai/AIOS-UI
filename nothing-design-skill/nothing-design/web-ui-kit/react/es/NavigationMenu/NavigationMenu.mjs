import { cn, dataAttr } from "../lib/utils.mjs";
import { useClickOutside } from "../hooks/useClickOutside.mjs";
import * as React$1 from "react";
import { useCallback, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./NavigationMenu.css";
//#region src/NavigationMenu/NavigationMenu.tsx
const navigationMenuVariants = cva("nothing-nav-menu", {
	variants: { orientation: {
		horizontal: "nothing-nav-menu--horizontal",
		vertical: "nothing-nav-menu--vertical"
	} },
	defaultVariants: { orientation: "horizontal" }
});
const NavigationMenu = React$1.forwardRef(({ className, items, orientation = "horizontal", style, ...props }, ref) => {
	const [openIndex, setOpenIndex] = useState(null);
	const [focusIndex, setFocusIndex] = useState(null);
	const containerRef = useRef(null);
	const itemRefs = useRef([]);
	useClickOutside(containerRef, () => {
		setOpenIndex(null);
	});
	const handleTriggerClick = useCallback((index) => {
		setOpenIndex((prev) => prev === index ? null : index);
	}, []);
	const handleTriggerKeyDown = useCallback((index, e) => {
		const isHorizontal = orientation === "horizontal";
		switch (e.key) {
			case "ArrowRight":
				e.preventDefault();
				if (isHorizontal) {
					const next = (index + 1) % items.length;
					itemRefs.current[next]?.querySelector(".nothing-nav-menu__link")?.focus();
				} else if (items[index].children) setOpenIndex(index);
				break;
			case "ArrowLeft":
				e.preventDefault();
				if (isHorizontal) {
					const prev = (index - 1 + items.length) % items.length;
					itemRefs.current[prev]?.querySelector(".nothing-nav-menu__link")?.focus();
				}
				break;
			case "ArrowDown":
				e.preventDefault();
				if (!isHorizontal) {
					const next = (index + 1) % items.length;
					itemRefs.current[next]?.querySelector(".nothing-nav-menu__link")?.focus();
				} else if (items[index].children) {
					setOpenIndex(index);
					setFocusIndex(0);
				}
				break;
			case "ArrowUp":
				e.preventDefault();
				if (!isHorizontal) {
					const prev = (index - 1 + items.length) % items.length;
					itemRefs.current[prev]?.querySelector(".nothing-nav-menu__link")?.focus();
				}
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
	}, [orientation, items]);
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
				itemRefs.current[itemIndex]?.querySelector(".nothing-nav-menu__link")?.focus();
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
	}, [items, focusIndex]);
	return /* @__PURE__ */ jsx("nav", {
		ref,
		className: cn(navigationMenuVariants({ orientation }), className),
		style,
		"data-orientation": dataAttr(orientation),
		...props,
		children: /* @__PURE__ */ jsx("div", {
			ref: containerRef,
			children: /* @__PURE__ */ jsx("ul", {
				className: "nothing-nav-menu__list",
				role: orientation === "horizontal" ? "menubar" : "menu",
				children: items.map((item, index) => {
					const hasChildren = item.children && item.children.length > 0;
					const isOpen = openIndex === index;
					return /* @__PURE__ */ jsxs("li", {
						className: cn("nothing-nav-menu__item", item.active && "nothing-nav-menu__item--active", hasChildren && "nothing-nav-menu__item--has-children"),
						"data-active": dataAttr(item.active),
						"data-has-children": dataAttr(hasChildren),
						"data-open": dataAttr(isOpen),
						ref: (el) => {
							itemRefs.current[index] = el;
						},
						children: [/* @__PURE__ */ jsx("a", {
							className: "nothing-nav-menu__link",
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
							children: item.label
						}), hasChildren && /* @__PURE__ */ jsx("div", {
							className: cn("nothing-nav-menu__submenu", isOpen && "nothing-nav-menu__submenu--visible"),
							role: "menu",
							onKeyDown: (e) => handleSubmenuKeyDown(index, e),
							children: item.children.map((subItem, subIndex) => /* @__PURE__ */ jsx("div", {
								className: "nothing-nav-menu__submenu-item",
								role: "none",
								children: /* @__PURE__ */ jsx("a", {
									className: "nothing-nav-menu__submenu-link",
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
});
NavigationMenu.displayName = "NavigationMenu";
//#endregion
export { NavigationMenu as default, navigationMenuVariants };

//# sourceMappingURL=NavigationMenu.mjs.map