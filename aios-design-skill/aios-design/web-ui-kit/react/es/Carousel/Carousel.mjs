import { cn, dataAttr } from "../lib/utils.mjs";
import { carouselButtonVariants, carouselControlsVariants, carouselSlideVariants, carouselStatusVariants, carouselVariants, carouselViewportVariants } from "./carousel-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Carousel/Carousel.tsx
function clampIndex(index, length) {
	return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}
function Carousel({ items, value, defaultValue = 0, onValueChange, loop = false, previousLabel = "Previous slide", nextLabel = "Next slide", className, ...props }) {
	const [internalValue, setInternalValue] = React$1.useState(() => clampIndex(defaultValue, items.length));
	const activeIndex = clampIndex(value ?? internalValue, items.length);
	const controlled = value !== void 0;
	const setIndex = React$1.useCallback((nextIndex) => {
		if (items.length === 0) return;
		const resolved = loop ? (nextIndex + items.length) % items.length : clampIndex(nextIndex, items.length);
		if (!controlled) setInternalValue(resolved);
		onValueChange?.(resolved);
	}, [
		controlled,
		items.length,
		loop,
		onValueChange
	]);
	const previousDisabled = !loop && activeIndex === 0;
	const nextDisabled = !loop && activeIndex === items.length - 1;
	return /* @__PURE__ */ jsxs("section", {
		"aria-roledescription": "carousel",
		className: cn(carouselVariants(), className),
		"data-slot": "carousel",
		"data-index": dataAttr(activeIndex),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			className: cn(carouselViewportVariants()),
			"data-slot": "carousel-viewport",
			children: items.map((item, index) => /* @__PURE__ */ jsx("div", {
				"aria-label": `${index + 1} of ${items.length}`,
				"aria-roledescription": "slide",
				className: cn(carouselSlideVariants()),
				"data-slot": "carousel-slide",
				hidden: index !== activeIndex,
				role: "group",
				children: item
			}, index))
		}), items.length > 1 && /* @__PURE__ */ jsxs("div", {
			className: cn(carouselControlsVariants()),
			"data-slot": "carousel-controls",
			children: [
				/* @__PURE__ */ jsx("button", {
					"aria-label": previousLabel,
					className: cn(carouselButtonVariants()),
					"data-slot": "carousel-previous",
					disabled: previousDisabled,
					onClick: () => setIndex(activeIndex - 1),
					type: "button",
					children: "‹"
				}),
				/* @__PURE__ */ jsxs("span", {
					"aria-live": "polite",
					className: cn(carouselStatusVariants()),
					"data-slot": "carousel-status",
					children: [
						activeIndex + 1,
						" / ",
						items.length
					]
				}),
				/* @__PURE__ */ jsx("button", {
					"aria-label": nextLabel,
					className: cn(carouselButtonVariants()),
					"data-slot": "carousel-next",
					disabled: nextDisabled,
					onClick: () => setIndex(activeIndex + 1),
					type: "button",
					children: "›"
				})
			]
		})]
	});
}
Carousel.displayName = "Carousel";
//#endregion
export { Carousel as default };

//# sourceMappingURL=Carousel.mjs.map