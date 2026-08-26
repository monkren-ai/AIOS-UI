import { cn, dataAttr } from "../lib/utils.mjs";
import { iconVariants } from "./icon-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/Icon/Icon.tsx
function Icon({ glyph: Glyph, size = "md", label, className, ...props }) {
	return /* @__PURE__ */ jsx(Glyph, {
		className: cn(iconVariants({ size }), className),
		"aria-hidden": label ? void 0 : true,
		"aria-label": label,
		role: label ? "img" : void 0,
		focusable: "false",
		"data-slot": "icon",
		"data-size": dataAttr(size),
		...props
	});
}
Icon.displayName = "Icon";
//#endregion
export { Icon };

//# sourceMappingURL=Icon.mjs.map