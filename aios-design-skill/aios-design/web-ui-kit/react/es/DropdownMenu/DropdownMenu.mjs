import { cn, dataAttr } from "../lib/utils.mjs";
import { dropdownMenuContentVariants, dropdownMenuItemIconVariants, dropdownMenuItemLabelVariants, dropdownMenuItemShortcutVariants, dropdownMenuItemVariants, dropdownMenuPositionerVariants, dropdownMenuSeparatorVariants, dropdownMenuTriggerVariants, dropdownMenuVariants, menubarDropdownVariants, menubarItemLabelVariants, menubarItemShortcutVariants, menubarItemVariants, menubarSeparatorVariants, menubarTriggerVariants, menubarVariants } from "./dropdown-menu-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
//#region src/DropdownMenu/DropdownMenu.tsx
function DefaultDropdownMenu({ className, trigger, items, align = "start", side = "bottom", variant: _variant, ref, ...props }) {
	const defaultItems = items;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(dropdownMenuVariants(), className),
		"data-slot": "dropdown-menu",
		"data-variant": "default",
		...props,
		children: /* @__PURE__ */ jsxs(Menu.Root, { children: [/* @__PURE__ */ jsx(Menu.Trigger, {
			className: cn(dropdownMenuTriggerVariants()),
			"data-slot": "dropdown-menu-trigger",
			children: trigger
		}), /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
			className: cn(dropdownMenuPositionerVariants()),
			"data-slot": "dropdown-menu-positioner",
			side,
			align,
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				className: cn(dropdownMenuContentVariants({ align })),
				"data-slot": "dropdown-menu-content",
				"data-align": dataAttr(align),
				children: defaultItems.map((item, index) => item.separator ? /* @__PURE__ */ jsx(Menu.Separator, {
					className: cn(dropdownMenuSeparatorVariants()),
					"data-slot": "dropdown-menu-separator"
				}, `sep-${index}`) : /* @__PURE__ */ jsxs(Menu.Item, {
					disabled: item.disabled,
					onClick: item.onClick,
					className: (state) => cn(dropdownMenuItemVariants({
						disabled: state.disabled,
						highlighted: state.highlighted
					})),
					"data-slot": "dropdown-menu-item",
					"data-disabled": dataAttr(item.disabled),
					children: [
						item.icon && /* @__PURE__ */ jsx("span", {
							className: cn(dropdownMenuItemIconVariants()),
							"data-slot": "dropdown-menu-item-icon",
							children: item.icon
						}),
						/* @__PURE__ */ jsx("span", {
							className: cn(dropdownMenuItemLabelVariants()),
							"data-slot": "dropdown-menu-item-label",
							children: item.label
						}),
						item.shortcut && /* @__PURE__ */ jsx("span", {
							className: cn(dropdownMenuItemShortcutVariants()),
							"data-slot": "dropdown-menu-item-shortcut",
							children: item.shortcut
						})
					]
				}, `item-${index}`))
			})
		}) })] })
	});
}
DefaultDropdownMenu.displayName = "DefaultDropdownMenu";
function MenubarVariant({ className, items, trigger: _trigger, align: _align, side: _side, variant: _variant, ref, ...props }) {
	const menubarItems = items;
	return /* @__PURE__ */ jsx(Menubar, {
		ref,
		className: cn(menubarVariants(), className),
		"data-slot": "dropdown-menu",
		"data-variant": "menubar",
		orientation: "horizontal",
		...props,
		children: menubarItems.map((item, index) => /* @__PURE__ */ jsxs(Menu.Root, { children: [/* @__PURE__ */ jsx(Menu.Trigger, {
			className: (state) => cn(menubarTriggerVariants({ active: state.open })),
			"data-slot": "dropdown-menu-menubar-trigger",
			children: item.label
		}), /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
			className: cn(dropdownMenuPositionerVariants()),
			"data-slot": "dropdown-menu-positioner",
			side: "bottom",
			align: "start",
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				className: cn(menubarDropdownVariants()),
				"data-slot": "dropdown-menu-menubar-content",
				children: item.items?.map((sub, subIndex) => sub.separator ? /* @__PURE__ */ jsx(Menu.Separator, {
					className: cn(menubarSeparatorVariants()),
					"data-slot": "dropdown-menu-menubar-separator"
				}, `sep-${subIndex}`) : /* @__PURE__ */ jsxs(Menu.Item, {
					disabled: sub.disabled,
					onClick: sub.onClick,
					className: (state) => cn(menubarItemVariants({
						disabled: state.disabled,
						highlighted: state.highlighted
					})),
					"data-slot": "dropdown-menu-menubar-item",
					"data-disabled": dataAttr(sub.disabled),
					children: [/* @__PURE__ */ jsx("span", {
						className: cn(menubarItemLabelVariants()),
						"data-slot": "dropdown-menu-menubar-item-label",
						children: sub.label
					}), sub.shortcut && /* @__PURE__ */ jsx("span", {
						className: cn(menubarItemShortcutVariants()),
						"data-slot": "dropdown-menu-menubar-item-shortcut",
						children: sub.shortcut
					})]
				}, `item-${subIndex}`))
			})
		}) })] }, index))
	});
}
MenubarVariant.displayName = "MenubarVariant";
function DropdownMenu({ variant = "default", ...props }) {
	if (variant === "menubar") return /* @__PURE__ */ jsx(MenubarVariant, {
		...props,
		variant: "menubar"
	});
	return /* @__PURE__ */ jsx(DefaultDropdownMenu, {
		...props,
		variant: "default"
	});
}
DropdownMenu.displayName = "DropdownMenu";
//#endregion
export { DropdownMenu as default };

//# sourceMappingURL=DropdownMenu.mjs.map