import { cn, dataAttr } from "../lib/utils.mjs";
import { quickToggleIconVariants, quickToggleLabelVariants, quickToggleVariants } from "./quick-toggle-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/QuickToggle/QuickToggle.tsx
function QuickToggle({ variant = "circle", theme = "light", active, icon, label, className, onClick, ref, ...props }) {
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
		"data-slot": "quick-toggle",
		"data-variant": dataAttr(variant),
		"data-widget-theme": dataAttr(theme),
		"data-state": active ? "on" : "off",
		...props,
		children: [icon && /* @__PURE__ */ jsx("span", {
			"data-slot": "quick-toggle-icon",
			className: cn(quickToggleIconVariants({ theme })),
			children: icon
		}), label && /* @__PURE__ */ jsx("span", {
			"data-slot": "quick-toggle-label",
			className: cn(quickToggleLabelVariants({
				variant,
				theme
			})),
			children: label
		})]
	});
}
QuickToggle.displayName = "QuickToggle";
//#endregion
export { QuickToggle as default };

//# sourceMappingURL=QuickToggle.mjs.map