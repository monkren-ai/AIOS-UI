//#region src/DateField/date-field-variants.d.ts
/**
 * 日期分格输入。
 *
 * 三段（年/月/日）各自带边框，中间用「-」分隔；顺序由 locale 决定，
 * 不写任何 left/right，flex 自动排布。
 */
declare const dateFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个日期段：边框 + 居中数字，高度走 size，宽度走 kind。 */
declare const dateFieldSegmentVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  kind?: "day" | "year" | "month" | null | undefined;
  active?: boolean | null | undefined;
  filled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 铺满段的透明 input。光标隐藏，靠段边框表达聚焦。 */
declare const dateFieldInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type DateFieldSize = 'sm' | 'md' | 'lg';
//#endregion
export { DateFieldSize, dateFieldInputVariants, dateFieldSegmentVariants, dateFieldVariants };
//# sourceMappingURL=date-field-variants.d.mts.map