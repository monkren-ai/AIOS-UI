import { cn, dataAttr } from "../lib/utils.mjs";
import { badgeDotVariants, badgeVariants, resolveBadgeVariant } from "./badge-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Badge/Badge.tsx
function Badge({ variant, size = "md", dot = false, className, children, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		className: cn(badgeVariants({
			variant: resolveBadgeVariant(variant),
			size,
			dot
		}), className),
		"data-slot": "badge",
		"data-variant": dataAttr(resolveBadgeVariant(variant) ?? "primary"),
		"data-size": dataAttr(size),
		"data-dot": dataAttr(dot),
		...props,
		children: [dot && /* @__PURE__ */ jsx("span", {
			"data-slot": "badge-dot",
			"aria-hidden": "true",
			className: badgeDotVariants({ size })
		}), children]
	});
}
Badge.displayName = "Badge";
//#endregion
export { Badge as default };

//# sourceMappingURL=Badge.mjs.map