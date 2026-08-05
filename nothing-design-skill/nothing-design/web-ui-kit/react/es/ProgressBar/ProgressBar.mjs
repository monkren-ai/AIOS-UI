import { cn, dataAttr } from "../lib/utils.mjs";
import { progressBarVariants, progressIndeterminateVariants, progressSegmentVariants, progressTrackVariants, progressValueVariants, resolveProgressBarSize, resolveProgressBarVariant } from "./progress-bar-variants.mjs";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import "./ProgressBar.css";
//#region src/ProgressBar/ProgressBar.tsx
function ProgressBar({ className, value, total = 100, segments = 20, size, variant, indeterminate = false, label, unit, status = "default", showReadout = true, disabled = false, ...props }) {
	const [animatedSegments, setAnimatedSegments] = React.useState(0);
	const hasOwnLabel = Boolean(props["aria-label"] || props["aria-labelledby"]);
	const ariaLabel = label && !hasOwnLabel ? label : void 0;
	React.useEffect(() => {
		const filled = Math.round(value / total * segments);
		const timer = setTimeout(() => setAnimatedSegments(filled), 50);
		return () => clearTimeout(timer);
	}, [
		value,
		total,
		segments
	]);
	const resolvedVariant = resolveProgressBarVariant(variant) ?? "segmented";
	const resolvedSize = resolveProgressBarSize(size) ?? "md";
	const isSlim = resolvedVariant === "slim";
	const getSegmentState = (index) => {
		if (index >= animatedSegments) return "empty";
		return status === "default" ? "filled" : status;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cn(progressBarVariants({
			variant: resolvedVariant,
			size: resolvedSize,
			disabled
		}), className),
		role: "progressbar",
		"aria-valuenow": indeterminate ? void 0 : value,
		"aria-valuemin": 0,
		"aria-valuemax": total,
		"aria-label": ariaLabel,
		"aria-valuetext": !indeterminate && unit ? `${value}${unit}` : void 0,
		"data-slot": "progress-bar",
		"data-variant": dataAttr(resolvedVariant),
		"data-size": dataAttr(resolvedSize),
		"data-status": dataAttr(status),
		"data-state": dataAttr(indeterminate ? "indeterminate" : disabled ? "disabled" : "normal"),
		...props,
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "progress-bar-track",
			className: progressTrackVariants({
				variant: resolvedVariant,
				size: resolvedSize,
				indeterminate
			}),
			children: indeterminate ? /* @__PURE__ */ jsx("div", {
				"data-slot": "progress-bar-indeterminate",
				className: progressIndeterminateVariants()
			}) : Array.from({ length: segments }).map((_, index) => /* @__PURE__ */ jsx("div", {
				"data-slot": "progress-bar-segment",
				"data-state": getSegmentState(index),
				className: progressSegmentVariants({
					state: getSegmentState(index),
					size: resolvedSize,
					variant: resolvedVariant
				})
			}, index))
		}), showReadout && !isSlim && !indeterminate && /* @__PURE__ */ jsxs("div", {
			"data-slot": "progress-bar-readout",
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				"data-slot": "progress-bar-value",
				className: progressValueVariants({ status }),
				children: [value, unit && /* @__PURE__ */ jsx("span", {
					"data-slot": "progress-bar-unit",
					className: "ms-0.5 font-mono text-label text-foreground-muted",
					children: unit
				})]
			}), label && /* @__PURE__ */ jsx("div", {
				"data-slot": "progress-bar-label",
				className: "font-mono text-label uppercase tracking-wider text-foreground-muted",
				children: label
			})]
		})]
	});
}
ProgressBar.displayName = "ProgressBar";
//#endregion
export { ProgressBar as default };

//# sourceMappingURL=ProgressBar.mjs.map