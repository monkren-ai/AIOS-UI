import { cn, dataAttr } from "../lib/utils.mjs";
import { iconSwapLayerVariants, iconSwapVariants } from "./icon-swap-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/IconSwap/IconSwap.tsx
function resolveActive(active) {
	if (typeof active === "boolean") return active ? 1 : 0;
	return active ?? 0;
}
function IconSwap({ active = 0, size = "md", className, children, ref, ...props }) {
	const layers = React$1.Children.toArray(children);
	const activeIndex = resolveActive(active);
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn(iconSwapVariants({ size }), className),
		"data-slot": "icon-swap",
		"data-size": dataAttr(size),
		"data-active": String(activeIndex),
		...props,
		children: layers.map((layer, index) => {
			const isActive = index === activeIndex;
			return /* @__PURE__ */ jsx("span", {
				className: iconSwapLayerVariants({ active: isActive }),
				"data-slot": "icon-swap-layer",
				"data-active": dataAttr(isActive),
				"aria-hidden": isActive ? void 0 : true,
				children: layer
			}, index);
		})
	});
}
IconSwap.displayName = "IconSwap";
//#endregion
export { IconSwap as default };

//# sourceMappingURL=IconSwap.mjs.map