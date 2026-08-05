import { cn, dataAttr } from "../lib/utils.mjs";
import { kbdVariants } from "./kbd-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Kbd/Kbd.tsx
function Kbd({ className, variant, size = "md", keys, separator = "+", children, ...props }) {
	const dataProps = {
		"data-slot": "kbd",
		"data-variant": dataAttr(variant ?? "soft"),
		"data-size": dataAttr(size)
	};
	if (keys?.length) return /* @__PURE__ */ jsx("kbd", {
		className: cn("inline-flex shrink-0 items-center gap-1 font-mono", className),
		...dataProps,
		...props,
		children: keys.map((key, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [index > 0 && /* @__PURE__ */ jsx("span", {
			"data-slot": "kbd-separator",
			"aria-hidden": "true",
			className: "text-foreground-subtle",
			children: separator
		}), /* @__PURE__ */ jsx("kbd", {
			"data-slot": "kbd-key",
			"data-size": dataAttr(size),
			className: kbdVariants({
				variant,
				size
			}),
			children: key
		})] }, `${key}-${index}`))
	});
	return /* @__PURE__ */ jsx("kbd", {
		className: cn(kbdVariants({
			variant,
			size
		}), className),
		...dataProps,
		...props,
		children
	});
}
Kbd.displayName = "Kbd";
//#endregion
export { Kbd as default };

//# sourceMappingURL=Kbd.mjs.map