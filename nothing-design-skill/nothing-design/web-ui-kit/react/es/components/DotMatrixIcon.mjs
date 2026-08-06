import { cn, dataAttr } from "../lib/utils.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import "../styles/dot-matrix-icon.css";
//#region src/components/DotMatrixIcon.tsx
const MAX_DIM = 96;
/**
* Dot Matrix Icon — turns pasted <svg>...</svg> markup into a crisp dot-grid
* render. Rasterizes the SVG into a rows × cols grid and draws circular dots
* wherever the SVG alpha exceeds the threshold. Optional Random Pulse animation
* periodically highlights a percentage of dots using the active color.
*/
const DotMatrixIcon = React$1.forwardRef(({ svg, rows = 24, cols = 24, alphaThreshold = 128, dotSize = 6, gap = 2, baseColor = "var(--widget-dark-2)", activeColor = "var(--widget-primary)", backgroundColor = "transparent", radius = 0, anim = "none", activePercent = 20, speedMs = 1200, className, style, ...props }, ref) => {
	const safeRows = Math.min(Math.max(1, Math.floor(rows)), MAX_DIM);
	const safeCols = Math.min(Math.max(1, Math.floor(cols)), MAX_DIM);
	if (import.meta.env.DEV) {
		if (rows > MAX_DIM || cols > MAX_DIM) console.warn(`[DotMatrixIcon] rows/cols exceed ${MAX_DIM} and were clamped. Very high grid sizes increase render cost.`);
	}
	const [alphaMap, setAlphaMap] = React$1.useState(null);
	const [error, setError] = React$1.useState(false);
	React$1.useEffect(() => {
		if (!svg) {
			setAlphaMap(null);
			setError(false);
			return;
		}
		let cancelled = false;
		const img = new Image();
		const handleLoad = () => {
			if (cancelled) return;
			try {
				const canvas = document.createElement("canvas");
				canvas.width = safeCols;
				canvas.height = safeRows;
				const ctx = canvas.getContext("2d", { willReadFrequently: true });
				if (!ctx) {
					setError(true);
					return;
				}
				ctx.clearRect(0, 0, safeCols, safeRows);
				ctx.drawImage(img, 0, 0, safeCols, safeRows);
				const { data } = ctx.getImageData(0, 0, safeCols, safeRows);
				const map = [];
				for (let r = 0; r < safeRows; r++) {
					const row = [];
					for (let c = 0; c < safeCols; c++) {
						const idx = (r * safeCols + c) * 4 + 3;
						row.push(data[idx]);
					}
					map.push(row);
				}
				setAlphaMap(map);
				setError(false);
			} catch {
				setError(true);
			}
		};
		const handleError = () => {
			if (cancelled) return;
			setError(true);
		};
		img.onload = handleLoad;
		img.onerror = handleError;
		img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
		return () => {
			cancelled = true;
			img.onload = null;
			img.onerror = null;
		};
	}, [
		svg,
		safeRows,
		safeCols
	]);
	const onCells = React$1.useMemo(() => {
		const grid = [];
		for (let r = 0; r < safeRows; r++) {
			const row = [];
			for (let c = 0; c < safeCols; c++) {
				const a = alphaMap?.[r]?.[c] ?? 0;
				row.push(a >= alphaThreshold);
			}
			grid.push(row);
		}
		return grid;
	}, [
		alphaMap,
		safeRows,
		safeCols,
		alphaThreshold
	]);
	const onKeys = React$1.useMemo(() => {
		const keys = [];
		for (let r = 0; r < safeRows; r++) for (let c = 0; c < safeCols; c++) if (onCells[r]?.[c]) keys.push(`${r}-${c}`);
		return keys;
	}, [
		onCells,
		safeRows,
		safeCols
	]);
	const [pulsing, setPulsing] = React$1.useState(/* @__PURE__ */ new Set());
	React$1.useEffect(() => {
		if (anim !== "random" || onKeys.length === 0) {
			setPulsing(/* @__PURE__ */ new Set());
			return;
		}
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setPulsing(new Set(onKeys));
			return;
		}
		const sample = () => {
			const count = Math.max(1, Math.floor(onKeys.length * activePercent / 100));
			const next = /* @__PURE__ */ new Set();
			const pool = onKeys.slice();
			for (let i = 0; i < count && pool.length > 0; i++) {
				const j = Math.floor(Math.random() * pool.length);
				next.add(pool[j]);
				pool.splice(j, 1);
			}
			setPulsing(next);
		};
		sample();
		const id = window.setInterval(sample, Math.max(60, speedMs));
		return () => window.clearInterval(id);
	}, [
		anim,
		onKeys,
		activePercent,
		speedMs
	]);
	const total = safeRows * safeCols;
	const cells = [];
	for (let r = 0; r < safeRows; r++) for (let c = 0; c < safeCols; c++) {
		const key = `${r}-${c}`;
		const isOn = onCells[r]?.[c] ?? false;
		const isPulsing = pulsing.has(key);
		const bg = isOn ? isPulsing ? activeColor : baseColor : "transparent";
		cells.push(/* @__PURE__ */ jsx("div", {
			className: cn("nothing-dot-matrix-icon__dot", isPulsing && "nothing-dot-matrix-icon__dot--pulse"),
			style: {
				width: dotSize,
				height: dotSize,
				backgroundColor: bg
			}
		}, key));
	}
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("nothing-dot-matrix-icon", className),
		style: {
			backgroundColor,
			borderRadius: radius,
			gridTemplateColumns: `repeat(${safeCols}, ${dotSize}px)`,
			gap: `${gap}px`,
			...style
		},
		"data-anim": dataAttr(anim),
		"data-rows": safeRows,
		"data-cols": safeCols,
		"data-error": error ? "true" : void 0,
		"data-empty": total === 0 || !alphaMap && !error ? "true" : void 0,
		role: "img",
		"aria-label": props["aria-label"] ?? "Dot matrix icon",
		...props,
		children: cells
	});
});
DotMatrixIcon.displayName = "DotMatrixIcon";
//#endregion
export { DotMatrixIcon as default };

//# sourceMappingURL=DotMatrixIcon.mjs.map