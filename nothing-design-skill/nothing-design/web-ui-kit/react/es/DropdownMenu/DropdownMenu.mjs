import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
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
	variants: {
		disabled: {
			true: "nothing-dropdown-menu__item--disabled",
			false: ""
		},
		highlighted: {
			true: "nothing-dropdown-menu__item--highlighted",
			false: ""
		}
	},
	defaultVariants: {
		disabled: false,
		highlighted: false
	}
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
	variants: {
		disabled: {
			true: "nothing-dropdown-menu__menubar-item--disabled",
			false: ""
		},
		highlighted: {
			true: "nothing-dropdown-menu__menubar-item--highlighted",
			false: ""
		}
	},
	defaultVariants: {
		disabled: false,
		highlighted: false
	}
});
const DefaultDropdownMenu = React.forwardRef(({ className, trigger, items, align = "start", side = "bottom", ...props }, ref) => {
	const defaultItems = items;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("nothing-dropdown-menu", className),
		"data-slot": "dropdown-menu",
		"data-variant": "default",
		...props,
		children: /* @__PURE__ */ jsxs(Menu.Root, { children: [/* @__PURE__ */ jsx(Menu.Trigger, {
			className: "nothing-dropdown-menu__trigger",
			"data-slot": "dropdown-menu-trigger",
			children: trigger
		}), /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
			className: "nothing-dropdown-menu__positioner",
			"data-slot": "dropdown-menu-positioner",
			side,
			align,
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				className: cn(dropdownMenuContentVariants({ align })),
				"data-slot": "dropdown-menu-content",
				children: defaultItems.map((item, index) => item.separator ? /* @__PURE__ */ jsx(Menu.Separator, {
					className: "nothing-dropdown-menu__separator",
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
				}, `item-${index}`))
			})
		}) })] })
	});
});
DefaultDropdownMenu.displayName = "DefaultDropdownMenu";
const MenubarVariant = React.forwardRef(({ className, items, ...props }, ref) => {
	const menubarItems = items;
	return /* @__PURE__ */ jsx(Menubar, {
		ref,
		className: cn("nothing-dropdown-menu--menubar", className),
		"data-slot": "dropdown-menu",
		"data-variant": "menubar",
		orientation: "horizontal",
		...props,
		children: menubarItems.map((item, index) => /* @__PURE__ */ jsxs(Menu.Root, { children: [/* @__PURE__ */ jsx(Menu.Trigger, {
			className: (state) => cn(menubarTriggerVariants({ active: state.open })),
			"data-slot": "dropdown-menu-menubar-trigger",
			children: item.label
		}), /* @__PURE__ */ jsx(Menu.Portal, { children: /* @__PURE__ */ jsx(Menu.Positioner, {
			className: "nothing-dropdown-menu__positioner",
			"data-slot": "dropdown-menu-positioner",
			side: "bottom",
			align: "start",
			sideOffset: 4,
			children: /* @__PURE__ */ jsx(Menu.Popup, {
				className: cn(menubarDropdownVariants()),
				"data-slot": "dropdown-menu-menubar-content",
				children: item.items?.map((sub, subIndex) => sub.separator ? /* @__PURE__ */ jsx(Menu.Separator, {
					className: "nothing-dropdown-menu__menubar-separator",
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
						className: "nothing-dropdown-menu__menubar-item-label",
						children: sub.label
					}), sub.shortcut && /* @__PURE__ */ jsx("span", {
						className: "nothing-dropdown-menu__menubar-item-shortcut",
						children: sub.shortcut
					})]
				}, `item-${subIndex}`))
			})
		}) })] }, index))
	});
});
MenubarVariant.displayName = "MenubarVariant";
const DropdownMenu = React.forwardRef(({ variant = "default", ...props }, ref) => {
	if (variant === "menubar") return /* @__PURE__ */ jsx(MenubarVariant, {
		ref,
		...props,
		variant: "menubar"
	});
	return /* @__PURE__ */ jsx(DefaultDropdownMenu, {
		ref,
		...props,
		variant: "default"
	});
});
DropdownMenu.displayName = "DropdownMenu";
//#endregion
export { DropdownMenu, DropdownMenu as default, dropdownMenuContentVariants, dropdownMenuItemVariants, menubarDropdownVariants, menubarItemVariants, menubarTriggerVariants };

//# sourceMappingURL=DropdownMenu.mjs.map