import { cn, dataAttr } from "../lib/utils.mjs";
import { surfaceVariants } from "./surfaces-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/Surfaces/Surfaces.tsx
function Surfaces({ elevation = 1, padding = "md", border = "default", radius = "md", className, children, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(surfaceVariants({
			elevation,
			padding,
			border,
			radius
		}), className),
		"data-slot": "surface",
		"data-elevation": dataAttr(elevation),
		"data-padding": dataAttr(padding),
		"data-border": dataAttr(border),
		"data-radius": dataAttr(radius),
		...props,
		children
	});
}
Surfaces.displayName = "Surfaces";
//#endregion
export { Surfaces as default };

//# sourceMappingURL=Surfaces.mjs.map