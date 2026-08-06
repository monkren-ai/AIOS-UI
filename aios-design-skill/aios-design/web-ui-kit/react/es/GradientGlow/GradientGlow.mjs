import { cn, dataAttr } from "../lib/utils.mjs";
import { gradientGlowVariants } from "./gradient-glow-variants.mjs";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
//#region src/GradientGlow/GradientGlow.tsx
/** 各强度对应的最大 opacity——逐点衰减以此为上限。 */
const MAX_OPACITY = {
	subtle: .3,
	normal: .5,
	strong: .7
};
function GradientGlow({ cols = 16, rows = 10, dotSize = 2, intensity = "normal", className, style, ...props }) {
	const maxOpacity = MAX_OPACITY[intensity];
	const centerR = (rows - 1) / 2;
	const centerC = (cols - 1) / 2;
	const maxDist = Math.sqrt(centerR ** 2 + centerC ** 2) || 1;
	const dots = React$1.useMemo(() => {
		const result = [];
		for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
			const dist = Math.sqrt((r - centerR) ** 2 + (c - centerC) ** 2);
			const falloff = Math.max(0, 1 - dist / maxDist);
			result.push({
				key: `${r}-${c}`,
				opacity: maxOpacity * falloff
			});
		}
		return result;
	}, [
		rows,
		cols,
		centerR,
		centerC,
		maxDist,
		maxOpacity
	]);
	return /* @__PURE__ */ jsx("div", {
		className: cn(gradientGlowVariants({ intensity }), className),
		style: {
			gridTemplateColumns: `repeat(${cols}, 1fr)`,
			gridTemplateRows: `repeat(${rows}, 1fr)`,
			placeItems: "center",
			...style
		},
		"data-slot": "gradient-glow",
		"data-variant": "dotmatrix",
		"data-intensity": dataAttr(intensity),
		"aria-hidden": "true",
		...props,
		children: dots.map((dot) => /* @__PURE__ */ jsx("div", {
			"data-slot": "gradient-glow-dot",
			className: "rounded-full bg-foreground-muted",
			style: {
				width: dotSize,
				height: dotSize,
				opacity: dot.opacity
			}
		}, dot.key))
	});
}
GradientGlow.displayName = "GradientGlow";
//#endregion
export { GradientGlow as default };

//# sourceMappingURL=GradientGlow.mjs.map