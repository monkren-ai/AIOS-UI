//#region src/DateNav/date-nav-variants.d.ts
/** 月份翻页条。整体禁用时统一降透明度并吃掉指针事件。 */
declare const dateNavVariants: (props?: ({
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 中间的月份文案。
 *
 * `grotesk` 换成正文字体（给「看起来不那么工业」的场合），其余保持等宽大写。
 */
declare const dateNavLabelVariants: (props?: ({
  grotesk?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 左右箭头。44px 是 --touch-target-min。 */
declare const dateNavArrowVariants: (props?: ({
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { dateNavArrowVariants, dateNavLabelVariants, dateNavVariants };
//# sourceMappingURL=date-nav-variants.d.mts.map