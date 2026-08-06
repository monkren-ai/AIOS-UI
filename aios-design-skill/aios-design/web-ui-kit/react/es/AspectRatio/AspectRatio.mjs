import { cn } from "../lib/utils.mjs";
import { aspectRatioInnerVariants, aspectRatioVariants } from "./aspect-ratio-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/AspectRatio/AspectRatio.tsx
function AspectRatio({ className, ratio = 16 / 9, style, children, ref, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(aspectRatioVariants(), className),
		style: {
			aspectRatio: `${ratio}`,
			...style
		},
		"data-slot": "aspect-ratio",
		"data-ratio": ratio,
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: aspectRatioInnerVariants(),
			"data-slot": "aspect-ratio-inner",
			children
		})
	});
}
AspectRatio.displayName = "AspectRatio";
//#endregion
export { AspectRatio as default };

//# sourceMappingURL=AspectRatio.mjs.map