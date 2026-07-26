import { cn } from "../lib/utils.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import "./AspectRatio.css";
//#region src/AspectRatio/AspectRatio.tsx
const AspectRatio = React.forwardRef(({ className, ratio = 16 / 9, style, children, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("nothing-aspect-ratio", className),
	style: {
		aspectRatio: `${ratio}`,
		...style
	},
	"data-ratio": ratio,
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: "nothing-aspect-ratio__inner",
		children
	})
}));
AspectRatio.displayName = "AspectRatio";
//#endregion
export { AspectRatio as default };

//# sourceMappingURL=AspectRatio.mjs.map