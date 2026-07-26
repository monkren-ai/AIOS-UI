import { cn, dataAttr } from "../lib/utils.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import "../DotMatrix/DotMatrix.css";
//#region src/components/StaticDotMatrix.tsx
const dotMatrixVariants = cva("nothing-dot-matrix", {
	variants: {
		dotSize: {
			sm: "nothing-dot-matrix--sm",
			md: "nothing-dot-matrix--md",
			lg: "nothing-dot-matrix--lg"
		},
		theme: {
			light: "nothing-dot-matrix--light",
			dark: "nothing-dot-matrix--dark"
		},
		pattern: {
			grid: "nothing-dot-matrix--grid",
			glyph: "nothing-dot-matrix--glyph",
			pulse: "nothing-dot-matrix--pulse",
			custom: ""
		}
	},
	defaultVariants: {
		dotSize: "md",
		theme: "light",
		pattern: "grid"
	}
});
const dotVariants = cva("nothing-dot-matrix__dot", {
	variants: { state: {
		idle: "",
		active: "nothing-dot-matrix__dot--active",
		dim: "nothing-dot-matrix__dot--dim"
	} },
	defaultVariants: { state: "idle" }
});
const StaticDotMatrix = React.forwardRef(({ className, rows, cols, dotSize = "md", theme = "light", pattern = "grid", activeDots = [], dimDots = [], style, ...props }, ref) => {
	const activeSet = React.useMemo(() => {
		const set = /* @__PURE__ */ new Set();
		activeDots.forEach(([r, c]) => set.add(`${r}-${c}`));
		return set;
	}, [activeDots]);
	const dimSet = React.useMemo(() => {
		const set = /* @__PURE__ */ new Set();
		dimDots.forEach(([r, c]) => set.add(`${r}-${c}`));
		return set;
	}, [dimDots]);
	const grid = React.useMemo(() => {
		const result = [];
		for (let r = 0; r < rows; r++) {
			const row = [];
			for (let c = 0; c < cols; c++) {
				const key = `${r}-${c}`;
				let state = "idle";
				if (activeSet.has(key)) state = "active";
				else if (dimSet.has(key)) state = "dim";
				row.push({
					key,
					className: dotVariants({ state })
				});
			}
			result.push(row);
		}
		return result;
	}, [
		rows,
		cols,
		activeSet,
		dimSet
	]);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(dotMatrixVariants({
			dotSize,
			theme,
			pattern: pattern === "custom" ? "custom" : pattern
		}), className),
		style,
		"data-state": dataAttr(pattern),
		...props,
		children: grid.map((row, r) => /* @__PURE__ */ jsx("div", {
			className: "nothing-dot-matrix__row",
			children: row.map((dot) => /* @__PURE__ */ jsx("div", { className: dot.className }, dot.key))
		}, r))
	});
});
StaticDotMatrix.displayName = "StaticDotMatrix";
//#endregion
export { StaticDotMatrix as default, dotMatrixVariants, dotVariants };

//# sourceMappingURL=StaticDotMatrix.mjs.map