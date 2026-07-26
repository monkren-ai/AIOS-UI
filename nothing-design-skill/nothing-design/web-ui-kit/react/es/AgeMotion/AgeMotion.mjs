import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "./AgeMotion.css";
//#region src/AgeMotion/AgeMotion.tsx
function computeAge(birthDate, now) {
	const diff = now.getTime() - birthDate.getTime();
	const totalSeconds = Math.floor(diff / 1e3);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 24);
	let years = now.getFullYear() - birthDate.getFullYear();
	let months = now.getMonth() - birthDate.getMonth();
	let days = now.getDate() - birthDate.getDate();
	if (days < 0) {
		months--;
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
	}
	if (months < 0) {
		years--;
		months += 12;
	}
	const currentAgeDecimal = years + months / 12 + days / 365;
	const currentSegment = Math.floor(currentAgeDecimal / 10);
	const segmentProgress = currentAgeDecimal % 10 / 10;
	const startOfYear = new Date(now.getFullYear(), 0, 1);
	const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
	const yearProgress = (now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime());
	return {
		years,
		months,
		days,
		totalHours,
		totalMinutes,
		totalSeconds,
		currentSegment,
		segmentProgress,
		yearProgress
	};
}
const ageMotionVariants = cva("nothing-age-motion", {
	variants: {
		size: {
			sm: "nothing-age-motion--sm",
			md: "nothing-age-motion--md",
			lg: "nothing-age-motion--lg"
		},
		theme: {
			light: "nothing-age-motion--light",
			dark: "nothing-age-motion--dark"
		}
	},
	defaultVariants: {
		size: "md",
		theme: "dark"
	}
});
const AgeMotion = React.forwardRef(({ className, birthDate: initialBirthDate, lifespan = 80, updateInterval = 1e3, yearSegments = 20, size = "md", theme = "dark", style, ...props }, ref) => {
	const [birthDateStr, setBirthDateStr] = useState(initialBirthDate ?? "");
	const [now, setNow] = useState(/* @__PURE__ */ new Date());
	const birthDate = useMemo(() => birthDateStr ? /* @__PURE__ */ new Date(birthDateStr + "T00:00:00") : null, [birthDateStr]);
	useEffect(() => {
		if (!birthDate) return;
		const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), updateInterval);
		return () => clearInterval(timer);
	}, [birthDate, updateInterval]);
	const ageData = useMemo(() => {
		if (!birthDate) return null;
		return computeAge(birthDate, now);
	}, [birthDate, now]);
	const totalSegments = lifespan / 10;
	const filledYearSegments = ageData ? Math.round(ageData.yearProgress * yearSegments) : 0;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(ageMotionVariants({
			size,
			theme
		}), className),
		style,
		"data-size": dataAttr(size),
		"data-theme": dataAttr(theme),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			className: "age-input-area",
			children: /* @__PURE__ */ jsxs("div", {
				className: "age-input",
				children: [/* @__PURE__ */ jsx("label", {
					className: "age-input__label",
					htmlFor: "birthDateInput",
					children: "Date of Birth"
				}), /* @__PURE__ */ jsx("input", {
					className: "age-input__field",
					type: "date",
					id: "birthDateInput",
					placeholder: "YYYY-MM-DD",
					value: birthDateStr,
					onChange: (e) => setBirthDateStr(e.target.value)
				})]
			})
		}), ageData && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "age-display",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "age-display__primary",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "age-display__unit",
							children: [/* @__PURE__ */ jsx("div", {
								className: "age-display__value",
								children: ageData.years
							}), /* @__PURE__ */ jsx("div", {
								className: "age-display__label",
								children: "Years"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "age-display__unit",
							children: [/* @__PURE__ */ jsx("div", {
								className: "age-display__value",
								children: ageData.months
							}), /* @__PURE__ */ jsx("div", {
								className: "age-display__label",
								children: "Months"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "age-display__unit",
							children: [/* @__PURE__ */ jsx("div", {
								className: "age-display__value",
								children: ageData.days
							}), /* @__PURE__ */ jsx("div", {
								className: "age-display__label",
								children: "Days"
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "age-display__secondary",
					children: [
						ageData.totalHours.toLocaleString(),
						"h ",
						ageData.totalMinutes.toLocaleString(),
						"m",
						" ",
						ageData.totalSeconds.toLocaleString(),
						"s"
					]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "age-progress",
				children: [/* @__PURE__ */ jsx("div", {
					className: "age-progress__label",
					children: "Life Progress"
				}), /* @__PURE__ */ jsx("div", {
					className: "age-progress__segments",
					children: Array.from({ length: totalSegments }).map((_, i) => {
						let segClass = "age-progress__segment";
						if (i < ageData.currentSegment) segClass += " completed";
						else if (i === ageData.currentSegment) segClass += " current";
						return /* @__PURE__ */ jsxs("div", {
							className: segClass,
							children: [i === ageData.currentSegment && /* @__PURE__ */ jsx("div", {
								className: "age-progress__segment-fill",
								style: { width: `${ageData.segmentProgress * 100}%` }
							}), /* @__PURE__ */ jsxs("span", {
								className: "age-progress__segment-label",
								children: [
									i * 10,
									"-",
									(i + 1) * 10
								]
							})]
						}, i);
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "age-year-progress",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "age-year-progress__label",
						children: "Year Progress"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "age-year-progress__bar",
						children: Array.from({ length: yearSegments }).map((_, i) => /* @__PURE__ */ jsx("div", { className: cn("age-year-progress__segment", i < filledYearSegments && "filled") }, i))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "age-year-progress__percent",
						children: [(ageData.yearProgress * 100).toFixed(1), "%"]
					})
				]
			})
		] })]
	});
});
AgeMotion.displayName = "AgeMotion";
//#endregion
export { ageMotionVariants, AgeMotion as default };

//# sourceMappingURL=AgeMotion.mjs.map