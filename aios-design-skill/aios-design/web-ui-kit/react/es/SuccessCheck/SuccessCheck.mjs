import { cn, dataAttr } from "../lib/utils.mjs";
import { successCheckLabelVariants, successCheckMarkVariants, successCheckVariants } from "./success-check-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/SuccessCheck/SuccessCheck.tsx
function SuccessCheck({ active = false, size = "md", label = "[DONE]", className, ref, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		ref,
		className: cn(successCheckVariants({
			size,
			active
		}), className),
		"data-slot": "success-check",
		"data-size": dataAttr(size),
		"data-state": active ? "active" : "idle",
		role: label ? "img" : void 0,
		"aria-label": label ?? void 0,
		"aria-hidden": label ? void 0 : true,
		...props,
		children: [/* @__PURE__ */ jsx("svg", {
			className: successCheckMarkVariants({
				size,
				active
			}),
			"data-slot": "success-check-mark",
			viewBox: "0 0 24 24",
			fill: "none",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", {
				d: "M6.5 12.5l3.5 3.5 7.5-8",
				stroke: "currentColor",
				strokeWidth: "1.75",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}), label != null && /* @__PURE__ */ jsx("span", {
			className: successCheckLabelVariants({ size }),
			"data-slot": "success-check-label",
			children: label
		})]
	});
}
SuccessCheck.displayName = "SuccessCheck";
//#endregion
export { SuccessCheck as default };

//# sourceMappingURL=SuccessCheck.mjs.map