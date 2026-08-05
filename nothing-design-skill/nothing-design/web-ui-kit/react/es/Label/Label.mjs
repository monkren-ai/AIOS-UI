import { cn, dataAttr } from "../lib/utils.mjs";
import { labelRequiredVariants, labelTextVariants, labelVariants } from "./label-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Label/Label.tsx
function Label({ className, size = "md", disabled, required, children, ref, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		ref,
		className: cn(labelVariants({
			size,
			disabled: !!disabled
		}), className),
		"data-slot": "label",
		"data-size": dataAttr(size),
		"data-disabled": dataAttr(disabled),
		"data-required": dataAttr(required),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: labelTextVariants(),
			"data-slot": "label-text",
			children
		}), required && /* @__PURE__ */ jsx("span", {
			className: labelRequiredVariants(),
			"data-slot": "label-required",
			"aria-hidden": "true",
			children: "*"
		})]
	});
}
Label.displayName = "Label";
//#endregion
export { Label as default };

//# sourceMappingURL=Label.mjs.map