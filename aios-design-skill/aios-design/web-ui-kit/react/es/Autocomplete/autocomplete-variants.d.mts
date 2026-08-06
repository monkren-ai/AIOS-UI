//#region src/Autocomplete/autocomplete-variants.d.ts
/**
 * Autocomplete 的视觉变体。
 *
 * 输入类控件只保留 `outline`（默认）与 `soft`：层级靠 background + border 表达，
 * 没有阴影、没有 blur、没有渐变。浮层样式与 `Select` 对齐。
 */
declare const autocompleteVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  hasError?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 字段标签。 */
declare const autocompleteLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 输入框外壳：边框 / 背景都在这里，Input 本体透明。 */
declare const autocompleteControlVariants: (props?: ({
  variant?: "outline" | "soft" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Input 本体：无边框、无背景。 */
declare const autocompleteInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const autocompletePositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 浮层：与 Select 同款，surface-raised 底 + border-visible 框，无阴影。 */
declare const autocompleteContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const autocompleteListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 选项。高亮态垫 `accent-subtle`，焦点环走 `interactive`。 */
declare const autocompleteItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  highlighted?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 无结果占位行。 */
declare const autocompleteEmptyVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 右侧下拉箭头。 */
declare const autocompleteIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 清除按钮。 */
declare const autocompleteClearVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 错误文案。 */
declare const autocompleteErrorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type AutocompleteSize = 'sm' | 'md' | 'lg';
type AutocompleteVariant = 'outline' | 'soft';
//#endregion
export { AutocompleteSize, AutocompleteVariant, autocompleteClearVariants, autocompleteContentVariants, autocompleteControlVariants, autocompleteEmptyVariants, autocompleteErrorVariants, autocompleteIconVariants, autocompleteInputVariants, autocompleteItemVariants, autocompleteLabelVariants, autocompleteListVariants, autocompletePositionerVariants, autocompleteVariants };
//# sourceMappingURL=autocomplete-variants.d.mts.map