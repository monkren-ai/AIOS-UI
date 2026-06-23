import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./QuickToggle.css";
//#region src/QuickToggle/QuickToggle.tsx
const quickToggleVariants = cva("nothing-quick-toggle", {
	variants: {
		variant: {
			circle: "nothing-quick-toggle--circle",
			pill: "nothing-quick-toggle--pill"
		},
		theme: {
			light: "nothing-quick-toggle--light",
			dark: "nothing-quick-toggle--dark",
			accent: "nothing-quick-toggle--accent"
		},
		active: {
			true: "nothing-quick-toggle--active",
			false: ""
		}
	},
	defaultVariants: {
		variant: "circle",
		theme: "light",
		active: false
	}
});
const QuickToggle = React$1.forwardRef(({ variant, theme, active, icon, label, className, onClick, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("button", {
		ref,
		className: cn(quickToggleVariants({
			variant,
			theme,
			active
		}), className),
		onClick,
		"aria-pressed": active ?? false,
		type: "button",
		"data-variant": dataAttr(variant),
		"data-theme": dataAttr(theme),
		"data-state": active ? "on" : "off",
		...props,
		children: [icon && /* @__PURE__ */ jsx("span", {
			className: "nothing-quick-toggle__icon",
			children: icon
		}), label && /* @__PURE__ */ jsx("span", {
			className: "nothing-quick-toggle__label",
			children: label
		})]
	});
});
QuickToggle.displayName = "QuickToggle";
//#endregion
export { QuickToggle as default, quickToggleVariants };

//# sourceMappingURL=QuickToggle.mjs.map