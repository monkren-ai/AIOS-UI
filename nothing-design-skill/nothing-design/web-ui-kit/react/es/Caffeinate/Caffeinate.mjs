import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./Caffeinate.css";
//#region src/Caffeinate/Caffeinate.tsx
const caffeinateVariants = cva("nothing-caffeinate", {
	variants: {
		status: {
			low: "nothing-caffeinate--low",
			medium: "nothing-caffeinate--medium",
			high: "nothing-caffeinate--high"
		},
		disabled: {
			true: "nothing-caffeinate--disabled",
			false: ""
		}
	},
	defaultVariants: {
		status: "low",
		disabled: false
	}
});
const drinkOptions = [
	{
		type: "Espresso",
		mg: 63
	},
	{
		type: "Coffee",
		mg: 95
	},
	{
		type: "Tea",
		mg: 47
	},
	{
		type: "Energy",
		mg: 80
	}
];
const Caffeinate = React.forwardRef(({ className, updateInterval = 6e4, totalSegments = 10, maxCaffeine = 400, halfLifeMinutes = 300, thresholdMg = 50, status: statusProp, disabled = false, style, ...props }, ref) => {
	const [drinks, setDrinks] = useState([]);
	const [now, setNow] = useState(Date.now());
	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), updateInterval);
		return () => clearInterval(timer);
	}, [updateInterval]);
	const currentCaffeine = useMemo(() => {
		let total = 0;
		for (const drink of drinks) {
			const elapsedMinutes = (now - drink.time.getTime()) / 6e4;
			const remaining = drink.mg * Math.pow(.5, elapsedMinutes / halfLifeMinutes);
			total += remaining;
		}
		return Math.round(total);
	}, [
		drinks,
		now,
		halfLifeMinutes
	]);
	const timeToThreshold = useMemo(() => {
		if (currentCaffeine <= thresholdMg) return null;
		let minutes = 0;
		let level = currentCaffeine;
		while (level > thresholdMg && minutes < 1440) {
			minutes += 1;
			level = currentCaffeine * Math.pow(.5, minutes / halfLifeMinutes);
		}
		return minutes;
	}, [
		currentCaffeine,
		thresholdMg,
		halfLifeMinutes
	]);
	const caffeine = currentCaffeine;
	const percent = Math.min(caffeine / maxCaffeine * 100, 100);
	const filledSegments = Math.round(percent / 100 * totalSegments);
	const minutesToThreshold = timeToThreshold;
	const derivedStatus = statusProp ?? (caffeine >= 200 ? "high" : caffeine >= 100 ? "medium" : "low");
	const formatMinutes = (mins) => {
		if (mins < 60) return `${mins}m`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	};
	const formatTime = (date) => {
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	const handleAddDrink = (type, mg) => {
		if (disabled) return;
		setDrinks((prev) => [...prev, {
			type,
			mg,
			time: /* @__PURE__ */ new Date()
		}]);
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(caffeinateVariants({
			status: derivedStatus,
			disabled
		}), className),
		style,
		"data-state": dataAttr(derivedStatus),
		"data-disabled": dataAttr(disabled),
		"aria-disabled": disabled,
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "caffeinate-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: "caffeinate-level",
					children: caffeine
				}), /* @__PURE__ */ jsx("div", {
					className: "caffeinate-unit",
					children: "mg"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "caffeinate-decay",
				children: minutesToThreshold !== null ? `${formatMinutes(minutesToThreshold)} below ${thresholdMg}mg` : `Below ${thresholdMg}mg`
			}),
			/* @__PURE__ */ jsx("div", {
				className: "caffeinate-progress",
				children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", { className: cn("caffeinate-segment", index < filledSegments && "filled") }, index))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "caffeinate-drinks",
				children: drinkOptions.map((opt) => /* @__PURE__ */ jsxs("button", {
					className: "caffeinate-drink-btn",
					disabled,
					onClick: () => handleAddDrink(opt.type, opt.mg),
					children: [opt.type, /* @__PURE__ */ jsxs("span", {
						className: "caffeinate-drink-mg",
						children: [opt.mg, "mg"]
					})]
				}, opt.type))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "caffeinate-log",
				children: [/* @__PURE__ */ jsx("div", {
					className: "caffeinate-log-title",
					children: "Intake Log"
				}), drinks.slice(-5).reverse().map((drink, index) => /* @__PURE__ */ jsxs("div", {
					className: "caffeinate-log-item",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "caffeinate-log-info",
						children: [/* @__PURE__ */ jsx("div", {
							className: "caffeinate-log-type",
							children: drink.type
						}), /* @__PURE__ */ jsx("div", {
							className: "caffeinate-log-time",
							children: formatTime(drink.time)
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "caffeinate-log-amount",
						children: [
							"+",
							drink.mg,
							"mg"
						]
					})]
				}, index))]
			})
		]
	});
});
Caffeinate.displayName = "Caffeinate";
//#endregion
export { Caffeinate, Caffeinate as default, caffeinateVariants };

//# sourceMappingURL=Caffeinate.mjs.map