import { cn, dataAttr } from "../lib/utils.mjs";
import { caffeinateDecayVariants, caffeinateDrinkButtonVariants, caffeinateDrinkMgVariants, caffeinateLevelVariants, caffeinateLogItemVariants, caffeinateLogTitleVariants, caffeinateSegmentVariants, caffeinateUnitVariants, caffeinateVariants } from "./caffeinate-variants.mjs";
import { useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/Caffeinate/Caffeinate.tsx
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
function Caffeinate({ className, updateInterval = 6e4, totalSegments = 10, maxCaffeine = 400, halfLifeMinutes = 300, thresholdMg = 50, status: statusProp, disabled = false, style, ref, ...props }) {
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
		"data-slot": "caffeinate",
		"data-state": dataAttr(derivedStatus),
		"data-disabled": dataAttr(disabled),
		"aria-disabled": disabled,
		...props,
		children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "caffeinate-header",
				className: "mb-4 flex w-full items-baseline justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "caffeinate-level",
					className: cn(caffeinateLevelVariants({ status: derivedStatus })),
					children: caffeine
				}), /* @__PURE__ */ jsx("div", {
					"data-slot": "caffeinate-unit",
					className: cn(caffeinateUnitVariants()),
					children: "mg"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "caffeinate-decay",
				className: cn(caffeinateDecayVariants()),
				children: minutesToThreshold !== null ? `${formatMinutes(minutesToThreshold)} below ${thresholdMg}mg` : `Below ${thresholdMg}mg`
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "caffeinate-progress",
				className: "mb-6 flex h-4 w-full gap-0.5",
				children: Array.from({ length: totalSegments }).map((_, index) => /* @__PURE__ */ jsx("div", {
					"data-slot": "caffeinate-segment",
					"data-filled": dataAttr(index < filledSegments),
					className: cn(caffeinateSegmentVariants({
						filled: index < filledSegments,
						status: derivedStatus
					}))
				}, index))
			}),
			/* @__PURE__ */ jsx("div", {
				"data-slot": "caffeinate-drinks",
				className: "mb-6 flex flex-wrap gap-2",
				children: drinkOptions.map((opt) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					"data-slot": "caffeinate-drink-button",
					className: cn(caffeinateDrinkButtonVariants()),
					disabled,
					onClick: () => handleAddDrink(opt.type, opt.mg),
					children: [opt.type, /* @__PURE__ */ jsxs("span", {
						"data-slot": "caffeinate-drink-mg",
						className: cn(caffeinateDrinkMgVariants()),
						children: [opt.mg, "mg"]
					})]
				}, opt.type))
			}),
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "caffeinate-log",
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "caffeinate-log-title",
					className: cn(caffeinateLogTitleVariants()),
					children: "Intake Log"
				}), drinks.slice(-5).reverse().map((drink, index) => /* @__PURE__ */ jsxs("div", {
					"data-slot": "caffeinate-log-item",
					className: cn(caffeinateLogItemVariants()),
					children: [/* @__PURE__ */ jsxs("div", {
						"data-slot": "caffeinate-log-info",
						className: "flex flex-col gap-0.5",
						children: [/* @__PURE__ */ jsx("div", {
							"data-slot": "caffeinate-log-type",
							className: "font-body text-sm text-foreground transition-colors duration-[350ms] ease-aios motion-reduce:transition-none",
							children: drink.type
						}), /* @__PURE__ */ jsx("div", {
							"data-slot": "caffeinate-log-time",
							className: "font-mono text-caption tabular-nums text-foreground-disabled transition-colors duration-[350ms] ease-aios motion-reduce:transition-none",
							children: formatTime(drink.time)
						})]
					}), /* @__PURE__ */ jsxs("div", {
						"data-slot": "caffeinate-log-amount",
						className: "font-mono text-sm tabular-nums text-foreground-muted transition-colors duration-[350ms] ease-aios motion-reduce:transition-none",
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
}
Caffeinate.displayName = "Caffeinate";
//#endregion
export { Caffeinate as default };

//# sourceMappingURL=Caffeinate.mjs.map