import { cn, dataAttr } from "../lib/utils.mjs";
import { quickToggleIconVariants, quickToggleLabelVariants, quickToggleVariants } from "./quick-toggle-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/QuickToggle/QuickToggle.tsx
function QuickToggle({ variant = "circle", active, icon, label, className, onClick, ref, ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		ref,
		className: cn(quickToggleVariants({
			variant,
			active
		}), className),
		onClick,
		"aria-pressed": active ?? false,
		type: "button",
		"data-slot": "quick-toggle",
		"data-variant": dataAttr(variant),
		"data-state": active ? "on" : "off",
		...props,
		children: [icon && /* @__PURE__ */ jsx("span", {
			"data-slot": "quick-toggle-icon",
			className: cn(quickToggleIconVariants()),
			children: icon
		}), label && /* @__PURE__ */ jsx("span", {
			"data-slot": "quick-toggle-label",
			className: cn(quickToggleLabelVariants({ variant })),
			children: label
		})]
	});
}
QuickToggle.displayName = "QuickToggle";
//#endregion
export { QuickToggle as default };

//# sourceMappingURL=QuickToggle.mjs.map