import { cva } from "class-variance-authority";
//#region src/DotMatrix/dot-matrix-variants.ts
/**
* DotMatrix 的视觉变体。
*
* 点阵是 Nothing 视觉识别的承重墙，所以这里逐条对齐 v1 CSS 的层叠结果，
* 而不是「差不多就行」：
*
* - 点的底色先由 `theme` 给（light 用 `--widget-dark-bg`，dark 用 `--widget-white`），
*   再由 `pattern` 覆盖——v1 里 pattern 规则写在 theme 之后，同为 (0,2,0) 特异性，
*   所以 grid / glyph 会赢。这里靠 `cn()` 的 tailwind-merge 复现同样的先后关系。
* - `dim` 的透明度层层收窄：基础 0.2 → theme 0.3 → grid 0.1 / glyph 0.15。
*   compoundVariants 排在最后输出，顺序即优先级。
*
* 保留的 BEM 类名（`aios-dot-matrix`、`aios-dot-matrix--glyph`、
* `aios-dot-matrix__dot{,--active,--dim}`）不再自带样式，只作为
* `src/styles/glyph.css` 的选择器钩子——Glyph 靠它们改写点的配色。
*/
const dotMatrixVariants = cva(["aios-dot-matrix", "inline-flex flex-col items-center gap-px"], {
	variants: {
		dotSize: {
			sm: "",
			md: "",
			lg: ""
		},
		theme: {
			light: "",
			dark: ""
		},
		pattern: {
			grid: "",
			glyph: "aios-dot-matrix--glyph",
			pulse: "",
			custom: ""
		}
	},
	defaultVariants: {
		dotSize: "md",
		theme: "light",
		pattern: "grid"
	}
});
/** 一行点。行内间距 sm 是 1px，md/lg 是 3px。 */
const dotMatrixRowVariants = cva(["flex items-center"], {
	variants: { dotSize: {
		sm: "gap-px",
		md: "gap-[3px]",
		lg: "gap-[3px]"
	} },
	defaultVariants: { dotSize: "md" }
});
/** 单个点。 */
const dotVariants = cva([
	"aios-dot-matrix__dot",
	"rounded-full",
	"transition-[opacity,background-color] duration-[350ms] ease-aios",
	"motion-reduce:transition-none"
], {
	variants: {
		dotSize: {
			sm: "size-[var(--widget-dot-sm)]",
			md: "size-[var(--widget-dot-md)]",
			lg: "size-[var(--widget-dot-lg)]"
		},
		theme: {
			light: "bg-[var(--widget-dark-bg)]",
			dark: "bg-[var(--widget-white)]"
		},
		pattern: {
			grid: "bg-[var(--widget-dark-2)] opacity-40",
			glyph: "bg-[var(--widget-dark-2)]",
			pulse: "",
			custom: ""
		},
		state: {
			idle: "",
			active: "aios-dot-matrix__dot--active",
			dim: "aios-dot-matrix__dot--dim opacity-20"
		}
	},
	compoundVariants: [
		{
			state: "active",
			class: "bg-[var(--widget-primary)] opacity-100"
		},
		{
			state: "dim",
			theme: "light",
			class: "bg-[var(--widget-dark-2)] opacity-30"
		},
		{
			state: "dim",
			theme: "dark",
			class: "bg-[var(--widget-dark-2)] opacity-30"
		},
		{
			state: "dim",
			pattern: "glyph",
			class: "opacity-15"
		},
		{
			state: "dim",
			pattern: "grid",
			class: "opacity-10"
		},
		{
			state: "active",
			pattern: "pulse",
			class: "motion-safe:animate-[aios-dot-pulse_1.4s_ease-in-out_infinite] motion-reduce:animate-none"
		}
	],
	defaultVariants: {
		dotSize: "md",
		theme: "light",
		pattern: "grid",
		state: "idle"
	}
});
//#endregion
export { dotMatrixRowVariants, dotMatrixVariants, dotVariants };

//# sourceMappingURL=dot-matrix-variants.mjs.map