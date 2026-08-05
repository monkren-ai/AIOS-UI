import { cn, dataAttr } from "../lib/utils.mjs";
import { dotMatrixRowVariants, dotMatrixVariants, dotVariants } from "../DotMatrix/dot-matrix-variants.mjs";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import "../DotMatrix/DotMatrix.css";
//#region src/components/StaticDotMatrix.tsx
/**
* 点阵渲染原语。
*
* 主题走 `data-dot-theme` 而不是 `data-theme`：后者是 theme.css 里 `dark:` /
* `light:` 变体的选择器，挂在这里会把整棵子树的主题令牌一起翻掉。
*/
function StaticDotMatrix({ className, rows, cols, dotSize = "md", theme = "light", pattern = "grid", activeDots = [], dimDots = [], style, ...props }) {
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
					state,
					className: cn(dotVariants({
						dotSize,
						theme,
						pattern,
						state
					}))
				});
			}
			result.push(row);
		}
		return result;
	}, [
		rows,
		cols,
		activeSet,
		dimSet,
		dotSize,
		theme,
		pattern
	]);
	return /* @__PURE__ */ jsx("div", {
		className: cn(dotMatrixVariants({
			dotSize,
			theme,
			pattern
		}), className),
		style,
		"data-slot": "dot-matrix",
		"data-state": dataAttr(pattern),
		"data-pattern": dataAttr(pattern),
		"data-dot-size": dataAttr(dotSize),
		"data-dot-theme": dataAttr(theme),
		...props,
		children: grid.map((row, r) => /* @__PURE__ */ jsx("div", {
			"data-slot": "dot-matrix-row",
			className: dotMatrixRowVariants({ dotSize }),
			children: row.map((dot) => /* @__PURE__ */ jsx("div", {
				"data-slot": "dot-matrix-dot",
				"data-dot-state": dataAttr(dot.state),
				className: dot.className
			}, dot.key))
		}, r))
	});
}
StaticDotMatrix.displayName = "StaticDotMatrix";
//#endregion
export { StaticDotMatrix as default };

//# sourceMappingURL=StaticDotMatrix.mjs.map