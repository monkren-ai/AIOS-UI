import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Alert.css";
//#region src/Alert/Alert.tsx
const alertVariants = cva("nothing-alert", {
	variants: { variant: {
		default: "",
		destructive: "nothing-alert--destructive"
	} },
	defaultVariants: { variant: "default" }
});
const Alert = React.forwardRef(({ variant, title, icon, className, children, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(alertVariants({ variant }), className),
		role: variant === "destructive" ? "alert" : "status",
		"data-variant": dataAttr(variant),
		...props,
		children: [icon && /* @__PURE__ */ jsx("div", {
			className: "nothing-alert__icon",
			"aria-hidden": "true",
			children: icon
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-alert__content",
			children: [title && /* @__PURE__ */ jsx("div", {
				className: "nothing-alert__title",
				children: title
			}), /* @__PURE__ */ jsx("div", {
				className: "nothing-alert__message",
				children
			})]
		})]
	});
});
Alert.displayName = "Alert";
//#endregion
export { alertVariants, Alert as default };

//# sourceMappingURL=Alert.mjs.map