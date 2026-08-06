//#region src/Date/date-variants.d.ts
/**
 * DateWidget 的三种版型。
 *
 * `theme` 是 widget 自己的配色（跟全局 `[data-theme]` 无关），所以颜色直接
 * 引用 `--widget-*` 令牌，而不是语义色工具类。
 */
declare const dateSerifVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const dateRectVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const dateDualRingVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { dateDualRingVariants, dateRectVariants, dateSerifVariants };
//# sourceMappingURL=date-variants.d.mts.map