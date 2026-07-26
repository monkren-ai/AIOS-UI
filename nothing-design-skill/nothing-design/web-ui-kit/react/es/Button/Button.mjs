import { cn, dataAttr } from "../lib/utils.mjs";
import { buttonVariants } from "./button-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@base-ui/react/button";
import "./Button.css";
//#region src/Button/Button.tsx
const Button$1 = React.forwardRef(({ variant, size, fullWidth, className, loading = false, loadingText, disabled, children, ...props }, ref) => {
	const isDisabled = disabled || loading;
	return /* @__PURE__ */ jsxs(Button, {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			fullWidth,
			loading
		}), className),
		"data-slot": "button",
		"data-variant": dataAttr(variant),
		"data-size": dataAttr(size),
		"data-loading": dataAttr(loading),
		disabled: isDisabled,
		"aria-busy": loading || void 0,
		...props,
		children: [loading && /* @__PURE__ */ jsx("span", {
			className: "nothing-btn__spinner",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 16 16",
				width: "14",
				height: "14",
				children: /* @__PURE__ */ jsx("circle", {
					cx: "8",
					cy: "8",
					r: "6",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeDasharray: "28 10"
				})
			})
		}), /* @__PURE__ */ jsx("span", {
			className: "nothing-btn__content",
			"data-loading": dataAttr(loading),
			children: loading && loadingText ? loadingText : children
		})]
	});
});
Button$1.displayName = "Button";
//#endregion
export { Button$1 as default };

//# sourceMappingURL=Button.mjs.map