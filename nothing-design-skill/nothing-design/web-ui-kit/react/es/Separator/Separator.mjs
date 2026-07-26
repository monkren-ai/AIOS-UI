import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Separator.css";
//#region src/Separator/Separator.tsx
const separatorVariants = cva("nothing-separator", {
	variants: {
		orientation: {
			horizontal: "nothing-separator--horizontal",
			vertical: "nothing-separator--vertical"
		},
		labeled: {
			true: "nothing-separator--labeled",
			false: ""
		}
	},
	defaultVariants: {
		orientation: "horizontal",
		labeled: false
	}
});
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = false, labeled, label, ...props }, ref) => {
	const isLabeled = labeled ?? Boolean(label);
	const ariaProps = decorative ? { "aria-hidden": true } : label ? {} : {
		role: "separator",
		"aria-orientation": orientation ?? "horizontal"
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(separatorVariants({
			orientation,
			labeled: isLabeled
		}), className),
		"data-orientation": dataAttr(orientation),
		"data-labeled": dataAttr(isLabeled),
		...ariaProps,
		...props,
		children: [
			/* @__PURE__ */ jsx("div", { className: "nothing-separator__line" }),
			label && /* @__PURE__ */ jsx("span", {
				className: "nothing-separator__label",
				children: label
			}),
			/* @__PURE__ */ jsx("div", { className: "nothing-separator__line" })
		]
	});
});
Separator.displayName = "Separator";
//#endregion
export { Separator as default, separatorVariants };

//# sourceMappingURL=Separator.mjs.map