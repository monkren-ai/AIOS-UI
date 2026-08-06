//#region src/Label/label-variants.d.ts
/**
 * Label 的视觉变体。
 *
 * 控件标签统一走 font-mono + 大写 + 宽字距，颜色停在 text-foreground-muted。
 */
declare const labelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 标签文字本体。 */
declare const labelTextVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 必填星号。唯一允许的红色出现点。 */
declare const labelRequiredVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type LabelSize = 'sm' | 'md' | 'lg';
//#endregion
export { LabelSize, labelRequiredVariants, labelTextVariants, labelVariants };
//# sourceMappingURL=label-variants.d.mts.map