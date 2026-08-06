//#region src/DotMatrix/dot-matrix-variants.d.ts
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
 * 保留的 BEM 类名（`nothing-dot-matrix`、`nothing-dot-matrix--glyph`、
 * `nothing-dot-matrix__dot{,--active,--dim}`）不再自带样式，只作为
 * `src/styles/glyph.css` 的选择器钩子——Glyph 靠它们改写点的配色。
 */
declare const dotMatrixVariants: (props?: ({
  dotSize?: "sm" | "md" | "lg" | null | undefined;
  theme?: "light" | "dark" | null | undefined;
  pattern?: "grid" | "custom" | "glyph" | "pulse" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 一行点。行内间距 sm 是 1px，md/lg 是 3px。 */
declare const dotMatrixRowVariants: (props?: ({
  dotSize?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个点。 */
declare const dotVariants: (props?: ({
  dotSize?: "sm" | "md" | "lg" | null | undefined;
  theme?: "light" | "dark" | null | undefined;
  pattern?: "grid" | "custom" | "glyph" | "pulse" | null | undefined;
  state?: "active" | "idle" | "dim" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DotMatrixSize = 'sm' | 'md' | 'lg';
type DotMatrixTheme = 'light' | 'dark';
type DotMatrixPattern = 'grid' | 'glyph' | 'pulse' | 'custom';
type DotState = 'idle' | 'active' | 'dim';
//#endregion
export { DotMatrixPattern, DotMatrixSize, DotMatrixTheme, DotState, dotMatrixRowVariants, dotMatrixVariants, dotVariants };
//# sourceMappingURL=dot-matrix-variants.d.mts.map