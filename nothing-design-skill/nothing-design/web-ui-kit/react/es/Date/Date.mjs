import { cn, dataAttr } from "../lib/utils.mjs";
import { dateDualRingDayVariants, dateDualRingInnerVariants, dateDualRingOuterVariants, dateDualRingVariants, dateDualRingWeekdayVariants, dateRectDayVariants, dateRectMonthVariants, dateRectRingBgVariants, dateRectRingProgressVariants, dateRectVariants, dateRectWeekdayVariants, dateSerifDayVariants, dateSerifNumberVariants, dateSerifPeelVariants, dateSerifVariants } from "./date-variants.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Date/Date.tsx
const RING_RADIUS = 25;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const MONTHS = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
];
const WEEKDAYS = [
	"SUN",
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT"
];
function DateWidget({ type = "rect", theme = "light", updateInterval = 6e4, className, showPeel = false, onPeelClick, ref, ...props }) {
	const [now, setNow] = React$1.useState(/* @__PURE__ */ new Date());
	React$1.useEffect(() => {
		const timer = setInterval(() => {
			setNow(/* @__PURE__ */ new Date());
		}, updateInterval);
		return () => clearInterval(timer);
	}, [updateInterval]);
	const day = now.getDate();
	const month = MONTHS[now.getMonth()];
	const weekday = WEEKDAYS[now.getDay()];
	const offset = RING_CIRCUMFERENCE - (now.getHours() + now.getMinutes() / 60) / 24 * RING_CIRCUMFERENCE;
	if (type === "serif") return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dateSerifVariants({ theme }), className),
		"data-slot": "date-widget",
		"data-type": "serif",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr("serif"),
		...props,
		children: [
			/* @__PURE__ */ jsx("span", {
				"data-slot": "date-widget-weekday",
				className: cn(dateSerifDayVariants()),
				children: weekday
			}),
			/* @__PURE__ */ jsx("span", {
				"data-slot": "date-widget-day",
				className: cn(dateSerifNumberVariants()),
				children: day
			}),
			showPeel && /* @__PURE__ */ jsx("div", {
				"data-slot": "date-widget-peel",
				className: cn(dateSerifPeelVariants()),
				onClick: onPeelClick,
				role: onPeelClick ? "button" : void 0,
				tabIndex: onPeelClick ? 0 : void 0,
				onKeyDown: onPeelClick ? (e) => {
					if (e.key === "Enter" || e.key === " ") onPeelClick();
				} : void 0,
				"data-state": dataAttr("peel")
			})
		]
	});
	if (type === "rect") return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dateRectVariants({ theme }), className),
		"data-slot": "date-widget",
		"data-type": "rect",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr("rect"),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "date-widget-ring",
			className: "size-16 shrink-0",
			children: /* @__PURE__ */ jsxs("svg", {
				"data-slot": "date-widget-ring-svg",
				className: "size-full -rotate-90",
				viewBox: "0 0 64 64",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("circle", {
					"data-slot": "date-widget-ring-track",
					className: cn(dateRectRingBgVariants({ theme })),
					cx: "32",
					cy: "32",
					r: RING_RADIUS
				}), /* @__PURE__ */ jsx("circle", {
					"data-slot": "date-widget-ring-progress",
					className: cn(dateRectRingProgressVariants()),
					cx: "32",
					cy: "32",
					r: RING_RADIUS,
					style: {
						strokeDasharray: `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`,
						strokeDashoffset: offset
					}
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "date-widget-info",
			className: "flex flex-col gap-0.5",
			children: [
				/* @__PURE__ */ jsx("div", {
					"data-slot": "date-widget-day",
					className: cn(dateRectDayVariants({ theme })),
					children: day
				}),
				/* @__PURE__ */ jsx("div", {
					"data-slot": "date-widget-month",
					className: cn(dateRectMonthVariants({ theme })),
					children: month
				}),
				/* @__PURE__ */ jsx("div", {
					"data-slot": "date-widget-weekday",
					className: cn(dateRectWeekdayVariants()),
					children: weekday
				})
			]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dateDualRingVariants({ theme }), className),
		"data-slot": "date-widget",
		"data-type": "dual-ring",
		"data-widget-theme": dataAttr(theme),
		"data-state": dataAttr("dual-ring"),
		...props,
		children: [/* @__PURE__ */ jsxs("svg", {
			"data-slot": "date-widget-ring-svg",
			className: "absolute inset-0 size-full",
			viewBox: "0 0 200 200",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				"data-slot": "date-widget-ring-outer",
				className: cn(dateDualRingOuterVariants({ theme })),
				cx: "100",
				cy: "100",
				r: "95"
			}), /* @__PURE__ */ jsx("circle", {
				"data-slot": "date-widget-ring-inner",
				className: cn(dateDualRingInnerVariants({ theme })),
				cx: "100",
				cy: "100",
				r: "85"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			"data-slot": "date-widget-content",
			className: "relative z-[1] flex flex-col items-center justify-center gap-0.5",
			children: [/* @__PURE__ */ jsx("div", {
				"data-slot": "date-widget-day",
				className: cn(dateDualRingDayVariants({ theme })),
				children: day
			}), /* @__PURE__ */ jsx("div", {
				"data-slot": "date-widget-weekday",
				className: cn(dateDualRingWeekdayVariants()),
				children: weekday
			})]
		})]
	});
}
DateWidget.displayName = "DateWidget";
//#endregion
export { DateWidget as default };

//# sourceMappingURL=Date.mjs.map