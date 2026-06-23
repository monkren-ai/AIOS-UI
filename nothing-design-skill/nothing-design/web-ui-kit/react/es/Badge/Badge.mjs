import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Badge.css";
//#region src/Badge/Badge.tsx
const badgeVariants = cva("nothing-badge", {
	variants: { variant: {
		default: "",
		secondary: "nothing-badge--secondary",
		destructive: "nothing-badge--destructive",
		outline: "nothing-badge--outline"
	} },
	defaultVariants: { variant: "default" }
});
const Badge = React$1.forwardRef(({ variant, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn(badgeVariants({ variant }), className),
		"data-variant": dataAttr(variant),
		...props
	});
});
Badge.displayName = "Badge";
//#endregion
export { badgeVariants, Badge as default };

//# sourceMappingURL=Badge.mjs.map