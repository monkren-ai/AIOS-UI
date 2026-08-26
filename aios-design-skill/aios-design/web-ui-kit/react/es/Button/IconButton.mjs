import { cn, dataAttr } from "../lib/utils.mjs";
import Button from "./Button.mjs";
import { iconButtonVariants } from "./icon-button-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/Button/IconButton.tsx
function IconButton({ icon, size = "md", shape = "circle", className, ...props }) {
	return /* @__PURE__ */ jsx(Button, {
		size: `icon-${size}`,
		className: cn(iconButtonVariants({ shape }), className),
		"data-slot": "icon-button",
		"data-shape": dataAttr(shape),
		...props,
		children: /* @__PURE__ */ jsx("span", {
			"data-slot": "icon-button-icon",
			"aria-hidden": "true",
			className: "inline-flex",
			children: icon
		})
	});
}
IconButton.displayName = "IconButton";
//#endregion
export { IconButton };

//# sourceMappingURL=IconButton.mjs.map