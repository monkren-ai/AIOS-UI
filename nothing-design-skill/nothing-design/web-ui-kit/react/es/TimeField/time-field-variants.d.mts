//#region src/TimeField/time-field-variants.d.ts
/**
 * 时间分格输入。
 *
 * 时/分/秒三段（秒可选），中间用「:」分隔。
 */
declare const timeFieldVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个时间段。 */
declare const timeFieldSegmentVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  kind?: "hour" | "minute" | "second" | null | undefined;
  active?: boolean | null | undefined;
  filled?: boolean | null | undefined;
  error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 铺满段的透明 input。 */
declare const timeFieldInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type TimeFieldSize = 'sm' | 'md' | 'lg';
//#endregion
export { TimeFieldSize, timeFieldInputVariants, timeFieldSegmentVariants, timeFieldVariants };
//# sourceMappingURL=time-field-variants.d.mts.map