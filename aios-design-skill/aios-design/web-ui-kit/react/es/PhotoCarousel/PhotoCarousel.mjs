import { useReducedMotion } from "../ReducedMotionProvider/ReducedMotionProvider.mjs";
import { cn, dataAttr } from "../lib/utils.mjs";
import { carouselContainerVariants, carouselControlsVariants, carouselCounterVariants, carouselIndicatorVariants, carouselIndicatorsVariants, carouselInfoVariants, carouselNavButtonVariants, carouselNavButtonsVariants, carouselSlideIconVariants, carouselSlideSubtitleVariants, carouselSlideTextVariants, carouselSlideTitleVariants, carouselSlideVariants, photoCarouselVariants } from "./photo-carousel-variants.mjs";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/PhotoCarousel/PhotoCarousel.tsx
const defaultSlides = [
	{
		title: "Solar Flare",
		subtitle: "Chromosphere · H-alpha",
		pattern: 0
	},
	{
		title: "Verdant",
		subtitle: "Coastal pine · 04:21",
		pattern: 1
	},
	{
		title: "Glacial",
		subtitle: "Polar · -12°C",
		pattern: 2
	},
	{
		title: "Ember",
		subtitle: "Magma flow",
		pattern: 3
	}
];
function PhotoCarousel({ className, autoPlay = true, autoPlayInterval = 4e3, slides = defaultSlides, orientation = "horizontal", autoplay: autoplayProp, style, ...props }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const reducedMotion = useReducedMotion();
	const autoplay = autoplayProp ?? autoPlay;
	const autoplayActive = autoplay && !reducedMotion;
	const hasImages = slides.some((s) => !!s.image);
	useEffect(() => {
		if (!autoplayActive) return;
		const timer = setInterval(() => {
			if (typeof document !== "undefined" && document.hidden) return;
			setCurrentIndex((prev) => (prev + 1) % slides.length);
		}, autoPlayInterval);
		return () => clearInterval(timer);
	}, [
		autoplayActive,
		autoPlayInterval,
		slides.length
	]);
	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
	};
	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % slides.length);
	};
	const handleGoToSlide = (index) => {
		setCurrentIndex(index);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(photoCarouselVariants({
			orientation,
			autoplay
		}), className),
		style,
		"data-slot": "photo-carousel",
		"data-orientation": dataAttr(orientation),
		"data-autoplay": dataAttr(autoplay),
		"data-autoplay-active": dataAttr(autoplayActive),
		"data-index": dataAttr(currentIndex),
		"data-real": dataAttr(hasImages),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "photo-carousel-track",
			className: carouselContainerVariants(),
			children: slides.map((slide, index) => /* @__PURE__ */ jsxs("div", {
				"data-slot": "photo-carousel-slide",
				className: carouselSlideVariants({ active: index === currentIndex }),
				"data-active": dataAttr(index === currentIndex),
				style: slide.image ? {
					backgroundImage: `url(${slide.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center"
				} : { background: slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient },
				children: [slide.image ? null : /* @__PURE__ */ jsxs("svg", {
					"data-slot": "photo-carousel-slide-icon",
					className: carouselSlideIconVariants(),
					viewBox: "0 0 24 24",
					fill: "none",
					width: "48",
					height: "48",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ jsx("rect", {
							x: "3",
							y: "3",
							width: "18",
							height: "18",
							rx: "2",
							strokeWidth: "2",
							stroke: "currentColor"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "8.5",
							cy: "8.5",
							r: "1.5",
							strokeWidth: "2",
							stroke: "currentColor"
						}),
						/* @__PURE__ */ jsx("path", {
							d: "M21 15l-5-5L5 21",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							stroke: "currentColor"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					"data-slot": "photo-carousel-slide-text",
					className: carouselSlideTextVariants(),
					children: [/* @__PURE__ */ jsx("div", {
						"data-slot": "photo-carousel-slide-title",
						className: carouselSlideTitleVariants(),
						children: slide.title
					}), slide.subtitle && /* @__PURE__ */ jsx("div", {
						"data-slot": "photo-carousel-slide-subtitle",
						className: carouselSlideSubtitleVariants(),
						children: slide.subtitle
					})]
				})]
			}, index))
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "photo-carousel-controls",
			className: carouselControlsVariants(),
			children: [
				/* @__PURE__ */ jsxs("div", {
					"data-slot": "photo-carousel-nav",
					className: carouselNavButtonsVariants(),
					children: [/* @__PURE__ */ jsx("button", {
						"data-slot": "photo-carousel-prev",
						className: carouselNavButtonVariants(),
						onClick: handlePrev,
						"aria-label": "Previous slide",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M15 18l-6-6 6-6",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}), /* @__PURE__ */ jsx("button", {
						"data-slot": "photo-carousel-next",
						className: carouselNavButtonVariants(),
						onClick: handleNext,
						"aria-label": "Next slide",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M9 18l6-6-6-6",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					"data-slot": "photo-carousel-indicators",
					className: carouselIndicatorsVariants(),
					children: slides.map((_, index) => /* @__PURE__ */ jsx("button", {
						"data-slot": "photo-carousel-indicator",
						className: carouselIndicatorVariants({ active: index === currentIndex }),
						"data-active": dataAttr(index === currentIndex),
						onClick: () => handleGoToSlide(index),
						"aria-label": `Go to slide ${index + 1}`,
						"aria-current": index === currentIndex
					}, index))
				}),
				/* @__PURE__ */ jsx("div", {
					"data-slot": "photo-carousel-info",
					className: carouselInfoVariants(),
					children: /* @__PURE__ */ jsxs("div", {
						"data-slot": "photo-carousel-counter",
						className: carouselCounterVariants(),
						children: [
							String(currentIndex + 1).padStart(2, "0"),
							" / ",
							String(slides.length).padStart(2, "0")
						]
					})
				})
			]
		})]
	});
}
PhotoCarousel.displayName = "PhotoCarousel";
//#endregion
export { PhotoCarousel as default };

//# sourceMappingURL=PhotoCarousel.mjs.map