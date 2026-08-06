import { cn, dataAttr } from "../lib/utils.mjs";
import { skeletonDotVariants, skeletonVariants } from "./skeleton-variants.mjs";
import "react";
import { jsx } from "react/jsx-runtime";
import "./Skeleton.css";
//#region src/Skeleton/Skeleton.tsx
/** 各形状的默认尺寸与点阵密度。 */
const DEFAULTS = {
	text: {
		width: "100%",
		height: "1em",
		rows: 1,
		cols: 16
	},
	rect: {
		width: "100%",
		height: "64px",
		rows: 4,
		cols: 16
	},
	circle: {
		width: "48px",
		height: "48px",
		rows: 6,
		cols: 6
	}
};
function resolveSize(value, fallback) {
	if (value === void 0 || value === null) return fallback;
	if (typeof value === "number") return `${value}px`;
	return value;
}
function Skeleton({ variant = "text", width, height, rows, cols, animate = true, className, style, ...props }) {
	const defaults = DEFAULTS[variant];
	const resolvedRows = rows ?? defaults.rows;
	const resolvedCols = cols ?? defaults.cols;
	const resolvedWidth = resolveSize(width, defaults.width);
	const resolvedHeight = resolveSize(height, defaults.height);
	return /* @__PURE__ */ jsx("div", {
		className: cn(skeletonVariants({
			variant,
			animate
		}), className),
		style: {
			width: resolvedWidth,
			height: resolvedHeight,
			gridTemplateColumns: `repeat(${resolvedCols}, 1fr)`,
			gridTemplateRows: `repeat(${resolvedRows}, 1fr)`,
			placeItems: "center",
			...style
		},
		"data-slot": "skeleton",
		"data-variant": "dotmatrix",
		"data-shape": dataAttr(variant),
		"aria-hidden": "true",
		...props,
		children: Array.from({ length: resolvedRows * resolvedCols }).map((_, i) => /* @__PURE__ */ jsx("div", {
			"data-slot": "skeleton-dot",
			className: skeletonDotVariants({ variant })
		}, i))
	});
}
Skeleton.displayName = "Skeleton";
//#endregion
export { Skeleton as default };

//# sourceMappingURL=Skeleton.mjs.map