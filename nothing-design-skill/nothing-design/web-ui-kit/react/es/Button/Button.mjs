import { cn, dataAttr } from "../lib/utils.mjs";
import { buttonVariants, resolveButtonSize, resolveButtonVariant } from "./button-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@base-ui/react/button";
//#region src/Button/Button.tsx
function ButtonSpinner() {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 16 16",
		"data-icon": "start",
		"aria-hidden": "true",
		className: "animate-spin motion-reduce:[animation-duration:3s]",
		children: /* @__PURE__ */ jsx("circle", {
			cx: "8",
			cy: "8",
			r: "6",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeDasharray: "28 10"
		})
	});
}
function Button$1({ variant, size, fullWidth, className, loading = false, loadingText, leadingIcon, trailingIcon, active, disabled, children, ...props }) {
	return /* @__PURE__ */ jsxs(Button, {
		className: cn(buttonVariants({
			variant: resolveButtonVariant(variant),
			size: resolveButtonSize(size),
			fullWidth,
			loading
		}), className),
		"data-slot": "button",
		"data-variant": dataAttr(resolveButtonVariant(variant) ?? "primary"),
		"data-size": dataAttr(resolveButtonSize(size) ?? "md"),
		"data-loading": dataAttr(loading),
		"data-active": dataAttr(active),
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		"aria-pressed": active || void 0,
		...props,
		children: [
			loading && /* @__PURE__ */ jsx(ButtonSpinner, {}),
			!loading && leadingIcon && /* @__PURE__ */ jsx("span", {
				"data-icon": "start",
				"data-slot": "button-icon",
				"aria-hidden": "true",
				className: "inline-flex items-center",
				children: leadingIcon
			}),
			loading && loadingText ? loadingText : children,
			!loading && trailingIcon && /* @__PURE__ */ jsx("span", {
				"data-icon": "end",
				"data-slot": "button-icon",
				"aria-hidden": "true",
				className: "inline-flex items-center",
				children: trailingIcon
			})
		]
	});
}
Button$1.displayName = "Button";
//#endregion
export { Button$1 as default };

//# sourceMappingURL=Button.mjs.map