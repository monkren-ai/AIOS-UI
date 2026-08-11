import { cn, dataAttr } from "../lib/utils.mjs";
import { dropdownMenuPositionerVariants, menubarDropdownVariants, menubarItemLabelVariants, menubarItemShortcutVariants, menubarItemVariants, menubarSeparatorVariants, menubarTriggerVariants } from "../DropdownMenu/dropdown-menu-variants.mjs";
import { menubarRootVariants } from "./menubar-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
//#region src/Menubar/Menubar.tsx
function Menubar$1({ items, orientation = "horizontal", className, ...props }) {
	return /* @__PURE__ */ jsx(Menubar, {
		className: cn(menubarRootVariants({ orientation }), className),
		"data-slot": "menubar",
		"data-orientation": dataAttr(orientation),
		orientation,
		...props,
		children: items.map((menu) => /* @__PURE__ */ jsxs(Menu.Root, { children: [/* @__PURE__ */ jsx(Menu.Trigger, {
			className: (state) => cn(menubarTriggerVariants({ active: state.open })),
			"data-slot": "menubar-trigger",
			children: menu.label
		}), /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
			className: cn(dropdownMenuPositionerVariants()),
			side: orientation === "vertical" ? "inline-end" : "bottom",
			align: "start",
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				className: cn(menubarDropdownVariants()),
				"data-slot": "menubar-content",
				children: menu.items.map((item, index) => item.separator ? /* @__PURE__ */ jsx(Menu.Separator, {
					className: cn(menubarSeparatorVariants()),
					"data-slot": "menubar-separator"
				}, `separator-${index}`) : /* @__PURE__ */ jsxs(Menu.Item, {
					className: (state) => cn(menubarItemVariants({
						disabled: state.disabled,
						highlighted: state.highlighted
					})),
					"data-slot": "menubar-item",
					"data-disabled": dataAttr(item.disabled),
					disabled: item.disabled,
					onClick: item.onClick,
					children: [/* @__PURE__ */ jsx("span", {
						className: cn(menubarItemLabelVariants()),
						children: item.label
					}), item.shortcut && /* @__PURE__ */ jsx("span", {
						className: cn(menubarItemShortcutVariants()),
						children: item.shortcut
					})]
				}, `${item.label}-${index}`))
			})
		}) })] }, menu.label))
	});
}
Menubar$1.displayName = "Menubar";
//#endregion
export { Menubar$1 as default };

//# sourceMappingURL=Menubar.mjs.map