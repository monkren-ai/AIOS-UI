import { useDirection } from "../DirectionProvider/DirectionProvider.mjs";
import { cn, dataAttr } from "../lib/utils.mjs";
import { sidebarFooterVariants, sidebarHeaderVariants, sidebarItemBadgeVariants, sidebarItemIconVariants, sidebarItemLabelVariants, sidebarItemLinkVariants, sidebarItemVariants, sidebarListVariants, sidebarToggleVariants, sidebarVariants } from "./sidebar-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Sidebar/Sidebar.tsx
function Sidebar({ className, items, collapsed: controlledCollapsed, onCollapsedChange, header, footer, ...props }) {
	const [internalCollapsed, setInternalCollapsed] = React.useState(false);
	const isCollapsed = controlledCollapsed !== void 0 ? controlledCollapsed : internalCollapsed;
	const { dir } = useDirection();
	const handleToggle = React.useCallback(() => {
		const next = !isCollapsed;
		if (controlledCollapsed === void 0) setInternalCollapsed(next);
		onCollapsedChange?.(next);
	}, [
		isCollapsed,
		controlledCollapsed,
		onCollapsedChange
	]);
	const toggleGlyph = isCollapsed === (dir === "rtl") ? "←" : "→";
	return /* @__PURE__ */ jsxs("aside", {
		className: cn(sidebarVariants({ collapsed: isCollapsed }), className),
		role: "navigation",
		"aria-label": "Sidebar navigation",
		"data-slot": "sidebar",
		"data-state": dataAttr(isCollapsed ? "collapsed" : "expanded"),
		"data-collapsed": dataAttr(isCollapsed),
		...props,
		children: [
			header && /* @__PURE__ */ jsx("div", {
				"data-slot": "sidebar-header",
				className: sidebarHeaderVariants(),
				children: header
			}),
			/* @__PURE__ */ jsx("button", {
				"data-slot": "sidebar-toggle",
				className: sidebarToggleVariants(),
				onClick: handleToggle,
				"aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
				children: toggleGlyph
			}),
			/* @__PURE__ */ jsx("ul", {
				"data-slot": "sidebar-list",
				className: sidebarListVariants(),
				children: items.map((item, index) => /* @__PURE__ */ jsx("li", {
					"data-slot": "sidebar-item",
					className: sidebarItemVariants({ active: !!item.active }),
					"data-state": dataAttr(item.active ? "active" : "inactive"),
					"data-active": dataAttr(!!item.active),
					children: /* @__PURE__ */ jsxs("a", {
						"data-slot": "sidebar-item-link",
						className: sidebarItemLinkVariants({
							active: !!item.active,
							collapsed: isCollapsed
						}),
						href: item.href ?? void 0,
						onClick: (e) => {
							e.preventDefault();
							item.onClick?.();
						},
						title: isCollapsed ? item.label : void 0,
						children: [
							item.icon && /* @__PURE__ */ jsx("span", {
								"data-slot": "sidebar-item-icon",
								className: sidebarItemIconVariants(),
								children: item.icon
							}),
							!isCollapsed && /* @__PURE__ */ jsx("span", {
								"data-slot": "sidebar-item-label",
								className: sidebarItemLabelVariants(),
								children: item.label
							}),
							item.badge !== void 0 && !isCollapsed && /* @__PURE__ */ jsx("span", {
								"data-slot": "sidebar-item-badge",
								className: sidebarItemBadgeVariants(),
								children: item.badge
							})
						]
					})
				}, index))
			}),
			footer && /* @__PURE__ */ jsx("div", {
				"data-slot": "sidebar-footer",
				className: sidebarFooterVariants(),
				children: footer
			})
		]
	});
}
Sidebar.displayName = "Sidebar";
//#endregion
export { Sidebar as default };

//# sourceMappingURL=Sidebar.mjs.map