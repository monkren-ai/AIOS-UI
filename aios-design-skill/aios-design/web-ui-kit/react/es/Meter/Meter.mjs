import { cn, dataAttr } from "../lib/utils.mjs";
import { meterMarkerVariants, meterSegmentVariants, meterTrackVariants, meterValueVariants, meterVariants } from "./meter-variants.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Meter } from "@base-ui/react/meter";
//#region src/Meter/Meter.tsx
/** 分段轨被切成多少格。 */
const SEGMENTS = 20;
/**
* 按 HTML `<meter>` 语义计算 zone：把区间切成 low / mid / high 三段，optimum
* 落在哪段哪段就是 good；value 离 optimum 段越远颜色越警示。
*
* - distance 0 → good（默认前景色）
* - distance 1 → warning（黄）
* - distance 2 → critical（红）
*
* 缺省时 low=min、high=max、optimum=中点，于是 value 永远落在 mid = good。
*/
function getZone(value, min, max, low, high, optimum) {
	const lowBound = low ?? min;
	const highBound = high ?? max;
	const opt = optimum ?? (min + max) / 2;
	const zoneIndexOf = (v) => {
		if (v < lowBound) return 0;
		if (v > highBound) return 2;
		return 1;
	};
	const distance = Math.abs(zoneIndexOf(value) - zoneIndexOf(opt));
	if (distance === 0) return "good";
	if (distance === 1) return "warning";
	return "critical";
}
function Meter$1({ className, value, min = 0, max = 100, low, high, optimum, label, showValue = true, size, ...props }) {
	const resolvedSize = size ?? "md";
	const span = Math.max(max - min, 0);
	const ratio = span > 0 ? Math.min(Math.max((value - min) / span, 0), 1) : 0;
	const filled = Math.round(ratio * SEGMENTS);
	const zone = getZone(value, min, max, low, high, optimum);
	const hasOwnLabel = Boolean(props["aria-label"] || props["aria-labelledby"]);
	const ariaLabel = label && !hasOwnLabel ? label : void 0;
	const markerPct = (bound) => {
		if (span <= 0) return null;
		const pct = (bound - min) / span * 100;
		if (pct <= 0 || pct >= 100) return null;
		return pct;
	};
	const lowPct = low !== void 0 ? markerPct(low) : null;
	const highPct = high !== void 0 ? markerPct(high) : null;
	return /* @__PURE__ */ jsxs(Meter.Root, {
		className: cn(meterVariants({ size: resolvedSize }), className),
		value,
		min,
		max,
		"aria-label": ariaLabel,
		"data-slot": "meter",
		"data-size": dataAttr(resolvedSize),
		"data-zone": dataAttr(zone),
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			"data-slot": "meter-track",
			className: meterTrackVariants({ size: resolvedSize }),
			children: [
				Array.from({ length: SEGMENTS }).map((_, index) => {
					const state = index < filled ? "filled" : "empty";
					return /* @__PURE__ */ jsx("div", {
						"data-slot": "meter-segment",
						"data-state": state,
						className: meterSegmentVariants({
							state,
							size: resolvedSize
						})
					}, index);
				}),
				lowPct !== null && /* @__PURE__ */ jsx("div", {
					"aria-hidden": "true",
					"data-slot": "meter-marker",
					"data-bound": "low",
					className: meterMarkerVariants(),
					style: { insetInlineStart: `${lowPct}%` }
				}),
				highPct !== null && /* @__PURE__ */ jsx("div", {
					"aria-hidden": "true",
					"data-slot": "meter-marker",
					"data-bound": "high",
					className: meterMarkerVariants(),
					style: { insetInlineStart: `${highPct}%` }
				})
			]
		}), (showValue || label) && /* @__PURE__ */ jsxs("div", {
			"data-slot": "meter-readout",
			className: "flex items-baseline justify-between",
			children: [showValue && /* @__PURE__ */ jsx("div", {
				"data-slot": "meter-value",
				className: meterValueVariants({
					size: resolvedSize,
					zone
				}),
				children: value
			}), label && /* @__PURE__ */ jsx("div", {
				"data-slot": "meter-label",
				className: "font-mono text-label uppercase tracking-wider text-foreground-muted",
				children: label
			})]
		})]
	});
}
Meter$1.displayName = "Meter";
//#endregion
export { Meter$1 as default };

//# sourceMappingURL=Meter.mjs.map