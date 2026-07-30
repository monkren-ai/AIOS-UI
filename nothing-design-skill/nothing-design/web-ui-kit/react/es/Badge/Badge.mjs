import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Badge.css";
//#region src/Badge/Badge.tsx
const badgeVariants = cva("nothing-badge", {
	variants: {
		variant: {
			default: "",
			secondary: "nothing-badge--secondary",
			destructive: "nothing-badge--destructive",
			outline: "nothing-badge--outline"
		},
		dot: {
			true: "nothing-badge--dot",
			false: ""
		}
	},
	defaultVariants: {
		variant: "default",
		dot: false
	}
});
const Badge = React.forwardRef(({ variant, dot, className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(badgeVariants({
			variant,
			dot
		}), className),
		"data-variant": dataAttr(variant),
		"data-dot": dataAttr(dot),
		...props,
		children: [dot && /* @__PURE__ */ jsx("span", {
			className: "nothing-badge__dot",
			"aria-hidden": "true"
		}), children]
	});
});
Badge.displayName = "Badge";
//#endregion
export { Badge, Badge as default, badgeVariants };

//# sourceMappingURL=Badge.mjs.map