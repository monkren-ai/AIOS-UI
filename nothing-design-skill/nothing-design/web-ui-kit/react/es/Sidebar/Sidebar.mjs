import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Sidebar.css";
//#region src/Sidebar/Sidebar.tsx
const sidebarVariants = cva("nothing-sidebar", {
	variants: { collapsed: {
		true: "nothing-sidebar--collapsed",
		false: ""
	} },
	defaultVariants: { collapsed: false }
});
const sidebarItemVariants = cva("nothing-sidebar__item", {
	variants: { active: {
		true: "nothing-sidebar__item--active",
		false: ""
	} },
	defaultVariants: { active: false }
});
const Sidebar = React.forwardRef(({ className, items, collapsed: controlledCollapsed, onCollapsedChange, header, footer, ...props }, ref) => {
	const [internalCollapsed, setInternalCollapsed] = React.useState(false);
	const isCollapsed = controlledCollapsed !== void 0 ? controlledCollapsed : internalCollapsed;
	const handleToggle = React.useCallback(() => {
		const next = !isCollapsed;
		if (controlledCollapsed === void 0) setInternalCollapsed(next);
		onCollapsedChange?.(next);
	}, [
		isCollapsed,
		controlledCollapsed,
		onCollapsedChange
	]);
	return /* @__PURE__ */ jsxs("aside", {
		ref,
		className: cn(sidebarVariants({ collapsed: isCollapsed }), className),
		role: "navigation",
		"aria-label": "Sidebar navigation",
		"data-state": dataAttr(isCollapsed ? "collapsed" : "expanded"),
		...props,
		children: [
			header && /* @__PURE__ */ jsx("div", {
				className: "nothing-sidebar__header",
				children: header
			}),
			/* @__PURE__ */ jsx("button", {
				className: "nothing-sidebar__toggle",
				onClick: handleToggle,
				"aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
				children: isCollapsed ? "→" : "←"
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "nothing-sidebar__list",
				children: items.map((item, index) => /* @__PURE__ */ jsx("li", {
					className: cn(sidebarItemVariants({ active: !!item.active })),
					"data-state": dataAttr(item.active ? "active" : "inactive"),
					children: /* @__PURE__ */ jsxs("a", {
						className: "nothing-sidebar__item-link",
						href: item.href ?? void 0,
						onClick: (e) => {
							e.preventDefault();
							item.onClick?.();
						},
						title: isCollapsed ? item.label : void 0,
						children: [
							item.icon && /* @__PURE__ */ jsx("span", {
								className: "nothing-sidebar__item-icon",
								children: item.icon
							}),
							!isCollapsed && /* @__PURE__ */ jsx("span", {
								className: "nothing-sidebar__item-label",
								children: item.label
							}),
							item.badge !== void 0 && !isCollapsed && /* @__PURE__ */ jsx("span", {
								className: "nothing-sidebar__item-badge",
								children: item.badge
							})
						]
					})
				}, index))
			}),
			footer && /* @__PURE__ */ jsx("div", {
				className: "nothing-sidebar__footer",
				children: footer
			})
		]
	});
});
Sidebar.displayName = "Sidebar";
//#endregion
export { Sidebar as default, sidebarItemVariants, sidebarVariants };

//# sourceMappingURL=Sidebar.mjs.map