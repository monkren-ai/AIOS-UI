import { cn, dataAttr } from "../lib/utils.mjs";
import { separatorLabelVariants, separatorLineVariants, separatorVariants } from "./separator-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Separator/Separator.tsx
function Separator({ className, orientation = "horizontal", size = "md", decorative = false, labeled, label, ...props }) {
	const isLabeled = labeled ?? Boolean(label);
	const ariaProps = decorative ? { "aria-hidden": true } : label ? {} : {
		role: "separator",
		"aria-orientation": orientation
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(separatorVariants({
			orientation,
			size
		}), className),
		"data-slot": "separator",
		"data-orientation": dataAttr(orientation),
		"data-size": dataAttr(size),
		"data-labeled": dataAttr(isLabeled),
		...ariaProps,
		...props,
		children: [
			/* @__PURE__ */ jsx("div", {
				"data-slot": "separator-line",
				className: separatorLineVariants({ orientation })
			}),
			label && /* @__PURE__ */ jsx("span", {
				"data-slot": "separator-label",
				className: separatorLabelVariants({
					orientation,
					size
				}),
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "separator-line",
				className: separatorLineVariants({ orientation })
			})
		]
	});
}
Separator.displayName = "Separator";
//#endregion
export { Separator as default };

//# sourceMappingURL=Separator.mjs.map