import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Label.css";
//#region src/Label/Label.tsx
const labelVariants = cva("nothing-label", {
	variants: { disabled: {
		true: "nothing-label--disabled",
		false: ""
	} },
	defaultVariants: { disabled: false }
});
const Label = React$1.forwardRef(({ className, disabled, required, children, ...props }, ref) => /* @__PURE__ */ jsxs("label", {
	ref,
	className: cn(labelVariants({ disabled: !!disabled }), className),
	"data-disabled": dataAttr(disabled),
	"data-required": dataAttr(required),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "nothing-label__text",
		children
	}), required && /* @__PURE__ */ jsx("span", {
		className: "nothing-label__required",
		"aria-hidden": "true",
		children: "*"
	})]
}));
Label.displayName = "Label";
//#endregion
export { Label as default, labelVariants };

//# sourceMappingURL=Label.mjs.map