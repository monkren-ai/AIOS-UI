import { cn } from "../lib/utils.mjs";
import "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/Sparkline/Sparkline.tsx
/**
* 迷你趋势线：1.5px 描边、无填充、currentColor；极值用透明度区分。
*
* 纯 SVG，无 Base UI。viewBox 横向拉伸以填满宽度（`preserveAspectRatio="none"`），
* 描边走 `vectorEffect="non-scaling-stroke"` 保持恒定 1.5px。
*/
function Sparkline({ data, width = "100%", height = 32, strokeWidth = 1.5, showExtremes = false, showValues = false, className, ref, ...props }) {
	const internalW = typeof width === "number" ? width : 100;
	const pad = Math.max(strokeWidth, 2);
	const n = data.length;
	const hasLine = n >= 2;
	let min = 0;
	let max = 0;
	let minIdx = 0;
	let maxIdx = 0;
	if (n > 0) {
		min = max = data[0];
		data.forEach((v, i) => {
			if (v < min) {
				min = v;
				minIdx = i;
			}
			if (v > max) {
				max = v;
				maxIdx = i;
			}
		});
	}
	const range = max - min || 1;
	const xAt = (i) => hasLine ? i / (n - 1) * internalW : internalW / 2;
	const yAt = (v) => height - pad - (v - min) / range * (height - pad * 2);
	const points = data.map((v, i) => `${xAt(i)},${yAt(v)}`).join(" ");
	return /* @__PURE__ */ jsxs("svg", {
		ref,
		width,
		height,
		viewBox: `0 0 ${internalW} ${height}`,
		preserveAspectRatio: "none",
		className: cn("text-foreground", className),
		"data-slot": "sparkline",
		role: "img",
		"aria-label": "Sparkline / 趋势线",
		...props,
		children: [
			hasLine && /* @__PURE__ */ jsx("polyline", {
				points,
				fill: "none",
				stroke: "currentColor",
				strokeWidth,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				vectorEffect: "non-scaling-stroke"
			}),
			!hasLine && n === 1 && /* @__PURE__ */ jsx("circle", {
				cx: internalW / 2,
				cy: height / 2,
				r: strokeWidth,
				fill: "currentColor"
			}),
			showExtremes && n > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("circle", {
				cx: xAt(maxIdx),
				cy: yAt(data[maxIdx]),
				r: strokeWidth * 1.5,
				fill: "currentColor",
				opacity: 1
			}), /* @__PURE__ */ jsx("circle", {
				cx: xAt(minIdx),
				cy: yAt(data[minIdx]),
				r: strokeWidth * 1.5,
				fill: "currentColor",
				opacity: .6
			})] }),
			showValues && n > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("text", {
				x: 2,
				y: Math.max(yAt(data[0]) - 3, 10),
				fontSize: 10,
				textAnchor: "start",
				className: "font-mono",
				fill: "currentColor",
				children: String(data[0])
			}), /* @__PURE__ */ jsx("text", {
				x: internalW - 2,
				y: Math.max(yAt(data[n - 1]) - 3, 10),
				fontSize: 10,
				textAnchor: "end",
				className: "font-mono",
				fill: "currentColor",
				children: String(data[n - 1])
			})] })
		]
	});
}
Sparkline.displayName = "Sparkline";
//#endregion
export { Sparkline as default };

//# sourceMappingURL=Sparkline.mjs.map