import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./PhotoCarousel.css";
//#region src/PhotoCarousel/PhotoCarousel.tsx
const photoCarouselVariants = cva("nothing-photo-carousel", {
	variants: {
		orientation: {
			horizontal: "nothing-photo-carousel--horizontal",
			vertical: "nothing-photo-carousel--vertical"
		},
		autoplay: {
			true: "nothing-photo-carousel--autoplay",
			false: ""
		}
	},
	defaultVariants: {
		orientation: "horizontal",
		autoplay: false
	}
});
const defaultSlides = [
	{
		title: "Solar Flare",
		subtitle: "Chromosphere · H-alpha",
		gradient: "linear-gradient(135deg, #ff5b1f 0%, #ffb627 100%)"
	},
	{
		title: "Verdant",
		subtitle: "Coastal pine · 04:21",
		gradient: "linear-gradient(135deg, #0a3d2c 0%, #1ec27e 100%)"
	},
	{
		title: "Glacial",
		subtitle: "Polar · -12°C",
		gradient: "linear-gradient(135deg, #0a1d3a 0%, #4a8bff 100%)"
	},
	{
		title: "Ember",
		subtitle: "Magma flow",
		gradient: "linear-gradient(135deg, #6a0e2a 0%, #ff3066 100%)"
	}
];
const PhotoCarousel = React$1.forwardRef(({ className, autoPlay = true, autoPlayInterval = 4e3, slides = defaultSlides, orientation = "horizontal", autoplay: autoplayProp, style, ...props }, ref) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const autoplay = autoplayProp ?? autoPlay;
	const hasImages = slides.some((s) => !!s.image);
	useEffect(() => {
		if (!autoplay) return;
		const timer = setInterval(() => {
			if (typeof document !== "undefined" && document.hidden) return;
			setCurrentIndex((prev) => (prev + 1) % slides.length);
		}, autoPlayInterval);
		return () => clearInterval(timer);
	}, [
		autoplay,
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
		ref,
		className: cn(photoCarouselVariants({
			orientation,
			autoplay
		}), className),
		style,
		"data-orientation": dataAttr(orientation),
		"data-autoplay": dataAttr(autoplay),
		"data-index": dataAttr(currentIndex),
		"data-real": dataAttr(hasImages),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			className: "carousel-container",
			children: slides.map((slide, index) => /* @__PURE__ */ jsxs("div", {
				className: cn("carousel-slide", index === currentIndex && "active"),
				"data-active": dataAttr(index === currentIndex),
				style: slide.image ? {
					backgroundImage: `url(${slide.image})`,
					backgroundSize: "cover",
					backgroundPosition: "center"
				} : { background: slide.gradient ?? defaultSlides[index % defaultSlides.length].gradient },
				children: [slide.image ? null : /* @__PURE__ */ jsxs("svg", {
					className: "carousel-slide-icon",
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
					className: "carousel-slide-text",
					children: [/* @__PURE__ */ jsx("div", {
						className: "carousel-slide-title",
						children: slide.title
					}), slide.subtitle && /* @__PURE__ */ jsx("div", {
						className: "carousel-slide-subtitle",
						children: slide.subtitle
					})]
				})]
			}, index))
		}), /* @__PURE__ */ jsxs("div", {
			className: "carousel-controls",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "carousel-nav-buttons",
					children: [/* @__PURE__ */ jsx("button", {
						className: "carousel-nav-btn",
						onClick: handlePrev,
						"aria-label": "Previous slide",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							children: /* @__PURE__ */ jsx("path", {
								className: "carousel-nav-icon",
								d: "M15 18l-6-6 6-6",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}), /* @__PURE__ */ jsx("button", {
						className: "carousel-nav-btn",
						onClick: handleNext,
						"aria-label": "Next slide",
						children: /* @__PURE__ */ jsx("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							children: /* @__PURE__ */ jsx("path", {
								className: "carousel-nav-icon",
								d: "M9 18l6-6-6-6",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "carousel-indicators",
					children: slides.map((_, index) => /* @__PURE__ */ jsx("button", {
						className: cn("carousel-indicator", index === currentIndex && "active"),
						onClick: () => handleGoToSlide(index),
						"aria-label": `Go to slide ${index + 1}`,
						"aria-current": index === currentIndex
					}, index))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "carousel-info",
					children: /* @__PURE__ */ jsxs("div", {
						className: "carousel-counter",
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
});
PhotoCarousel.displayName = "PhotoCarousel";
//#endregion
export { PhotoCarousel as default, photoCarouselVariants };

//# sourceMappingURL=PhotoCarousel.mjs.map