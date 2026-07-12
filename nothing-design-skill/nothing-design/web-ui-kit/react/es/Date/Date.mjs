import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Date.css";
//#region src/Date/Date.tsx
const dateSerifVariants = cva("nothing-date--serif", {
	variants: { theme: {
		light: "nothing-date--serif-light",
		dark: "nothing-date--serif-dark"
	} },
	defaultVariants: { theme: "light" }
});
const dateRectVariants = cva("nothing-date-rect", {
	variants: { theme: {
		light: "nothing-date-rect--light",
		dark: "nothing-date-rect--dark"
	} },
	defaultVariants: { theme: "light" }
});
const dateDualRingVariants = cva("nothing-date-dual-ring", {
	variants: { theme: {
		light: "nothing-date-dual-ring--light",
		dark: "nothing-date-dual-ring--dark"
	} },
	defaultVariants: { theme: "light" }
});
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
const DateWidgetImpl = ({ type = "rect", theme = "light", updateInterval = 6e4, className, showPeel = false, onPeelClick }) => {
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
		className: cn(dateSerifVariants({ theme }), className),
		"data-state": dataAttr("serif"),
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "nothing-date__serif-day",
				children: weekday
			}),
			/* @__PURE__ */ jsx("span", {
				className: "nothing-date__serif-number",
				children: day
			}),
			showPeel && /* @__PURE__ */ jsx("div", {
				className: "nothing-date__peel",
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
		className: cn(dateRectVariants({ theme }), className),
		"data-state": dataAttr("rect"),
		children: [/* @__PURE__ */ jsx("div", {
			className: "nothing-date-rect__ring",
			children: /* @__PURE__ */ jsxs("svg", {
				className: "nothing-date-rect__ring-svg",
				viewBox: "0 0 64 64",
				children: [/* @__PURE__ */ jsx("circle", {
					className: "nothing-date-rect__ring-bg",
					cx: "32",
					cy: "32",
					r: RING_RADIUS
				}), /* @__PURE__ */ jsx("circle", {
					className: "nothing-date-rect__ring-progress",
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
			className: "nothing-date-rect__info",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "nothing-date-rect__day",
					children: day
				}),
				/* @__PURE__ */ jsx("div", {
					className: "nothing-date-rect__month",
					children: month
				}),
				/* @__PURE__ */ jsx("div", {
					className: "nothing-date-rect__weekday",
					children: weekday
				})
			]
		})]
	});
	return /* @__PURE__ */ jsxs("div", {
		className: cn(dateDualRingVariants({ theme }), className),
		"data-state": dataAttr("dual-ring"),
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "nothing-date-dual-ring__svg",
			viewBox: "0 0 200 200",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "nothing-date-dual-ring__outer",
				cx: "100",
				cy: "100",
				r: "95"
			}), /* @__PURE__ */ jsx("circle", {
				className: "nothing-date-dual-ring__inner",
				cx: "100",
				cy: "100",
				r: "85"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "nothing-date-dual-ring__content",
			children: [/* @__PURE__ */ jsx("div", {
				className: "nothing-date-dual-ring__day",
				children: day
			}), /* @__PURE__ */ jsx("div", {
				className: "nothing-date-dual-ring__weekday",
				children: weekday
			})]
		})]
	});
};
const DateWidget = React$1.forwardRef((props, ref) => {
	return /* @__PURE__ */ jsx("div", {
		ref,
		style: { display: "contents" },
		children: /* @__PURE__ */ jsx(DateWidgetImpl, { ...props })
	});
});
DateWidget.displayName = "DateWidget";
//#endregion
export { dateDualRingVariants, dateRectVariants, dateSerifVariants, DateWidget as default };

//# sourceMappingURL=Date.mjs.map