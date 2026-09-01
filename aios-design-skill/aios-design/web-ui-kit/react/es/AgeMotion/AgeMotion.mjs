import { cn, dataAttr } from "../lib/utils.mjs";
import { ageDecadeFillVariants, ageDecadeLabelVariants, ageDecadeSegmentVariants, ageInputFieldVariants, ageInputLabelVariants, ageMotionVariants, ageSecondaryVariants, ageSectionLabelVariants, ageUnitLabelVariants, ageValueVariants, ageYearPercentVariants, ageYearSegmentVariants } from "./age-motion-variants.mjs";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
function AgeMotion({ className, birthDate: initialBirthDate, lifespan = 80, updateInterval = 1e3, yearSegments = 20, size = "md", style, ref, ...props }) {
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
		className: cn(ageMotionVariants({ size }), className),
		style,
		"data-slot": "age-motion",
		"data-size": dataAttr(size),
		"data-state": dataAttr(ageData ? "ready" : "empty"),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "age-motion-input-area",
			className: "mb-6",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative flex flex-col gap-1",
				children: [/* @__PURE__ */ jsx("label", {
					"data-slot": "age-motion-input-label",
					className: cn(ageInputLabelVariants()),
					htmlFor: "birthDateInput",
					children: "Date of Birth"
				}), /* @__PURE__ */ jsx("input", {
					"data-slot": "age-motion-input",
					className: cn(ageInputFieldVariants()),
					type: "date",
					id: "birthDateInput",
					placeholder: "YYYY-MM-DD",
					value: birthDateStr,
					onChange: (e) => setBirthDateStr(e.target.value)
				})]
			})
		}), ageData && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				"data-slot": "age-motion-display",
				className: "mb-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-2 flex items-baseline gap-4",
					children: [
						[
							"years",
							ageData.years,
							"Years"
						],
						[
							"months",
							ageData.months,
							"Months"
						],
						[
							"days",
							ageData.days,
							"Days"
						]
					].map(([unit, value, label]) => /* @__PURE__ */ jsxs("div", {
						"data-slot": "age-motion-unit",
						"data-unit": dataAttr(unit),
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ jsx("div", {
							"data-slot": "age-motion-value",
							className: cn(ageValueVariants()),
							children: value
						}), /* @__PURE__ */ jsx("div", {
							"data-slot": "age-motion-unit-label",
							className: cn(ageUnitLabelVariants()),
							children: label
						})]
					}, unit))
				}), /* @__PURE__ */ jsxs("div", {
					"data-slot": "age-motion-secondary",
					className: cn(ageSecondaryVariants()),
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
				"data-slot": "age-motion-life-progress",
				className: "mb-6",
				children: [/* @__PURE__ */ jsx("div", {
					"data-slot": "age-motion-life-progress-label",
					className: cn(ageSectionLabelVariants(), "mb-2 block"),
					children: "Life Progress"
				}), /* @__PURE__ */ jsx("div", {
					className: "mb-1 flex w-full gap-0.5",
					children: Array.from({ length: totalSegments }).map((_, i) => {
						const state = i < ageData.currentSegment ? "completed" : i === ageData.currentSegment ? "current" : "upcoming";
						return /* @__PURE__ */ jsxs("div", {
							"data-slot": "age-motion-decade",
							"data-state": dataAttr(state),
							className: cn(ageDecadeSegmentVariants({ state })),
							children: [state === "current" && /* @__PURE__ */ jsx("div", {
								"data-slot": "age-motion-decade-fill",
								className: cn(ageDecadeFillVariants()),
								style: { width: `${ageData.segmentProgress * 100}%` }
							}), /* @__PURE__ */ jsxs("span", {
								"data-slot": "age-motion-decade-label",
								className: cn(ageDecadeLabelVariants({ state })),
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
				"data-slot": "age-motion-year-progress",
				className: "mb-4",
				children: [
					/* @__PURE__ */ jsx("div", {
						"data-slot": "age-motion-year-progress-label",
						className: cn(ageSectionLabelVariants(), "mb-1 block"),
						children: "Year Progress"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex h-2 w-full gap-0.5",
						children: Array.from({ length: yearSegments }).map((_, i) => /* @__PURE__ */ jsx("div", {
							"data-slot": "age-motion-year-segment",
							"data-filled": dataAttr(i < filledYearSegments),
							className: cn(ageYearSegmentVariants({ filled: i < filledYearSegments }))
						}, i))
					}),
					/* @__PURE__ */ jsxs("div", {
						"data-slot": "age-motion-year-percent",
						className: cn(ageYearPercentVariants()),
						children: [(ageData.yearProgress * 100).toFixed(1), "%"]
					})
				]
			})
		] })]
	});
}
AgeMotion.displayName = "AgeMotion";
//#endregion
export { AgeMotion as default };

//# sourceMappingURL=AgeMotion.mjs.map