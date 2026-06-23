import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Button.css";
//#region src/Button/Button.tsx
/**
* Button 变体定义
*/
const buttonVariants = cva("nothing-btn", {
	variants: {
		variant: {
			primary: "nothing-btn--primary",
			secondary: "nothing-btn--secondary",
			ghost: "nothing-btn--ghost",
			destructive: "nothing-btn--destructive"
		},
		size: {
			default: "",
			sm: "nothing-btn--sm",
			lg: "nothing-btn--lg"
		},
		fullWidth: {
			true: "nothing-btn--full",
			false: ""
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default",
		fullWidth: false
	}
});
const Button = React$1.forwardRef(({ variant, size, fullWidth, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			fullWidth
		}), className),
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { buttonVariants, Button as default };

//# sourceMappingURL=Button.mjs.map