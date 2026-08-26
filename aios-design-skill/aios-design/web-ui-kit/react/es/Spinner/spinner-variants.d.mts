//#region src/Spinner/spinner-variants.d.ts
/**
 * Spinner（转盘）的视觉变体。
 *
 * 这是「随机决策转盘」而不是 loading 圈：扇区交替填 text-display / surface-raised，
 * 指针与命中扇区用单点红标记，全程没有阴影与渐变。
 */
declare const spinnerVariants: (props?: ({
  variant?: "soft" | "outline" | "destructive" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 转盘容器。尺寸决定盘面直径。 */
declare const spinnerWheelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 顶部指针。用 border 拼出的三角形，左右两侧走逻辑属性。 */
declare const spinnerPointerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 盘面 SVG。3.5s 的减速旋转，motion-reduce 下直接瞬移。 */
declare const spinnerSvgVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 扇区。 */
declare const spinnerSectorVariants: (props?: ({
  isEven?: boolean | null | undefined;
  selected?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 扇区文字。 */
declare const spinnerTextVariants: (props?: ({
  isEven?: boolean | null | undefined;
  selected?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。 */
declare const LEGACY_VARIANTS: {
  readonly default: "soft";
  readonly accent: "destructive";
};
type SpinnerVariant = 'soft' | 'outline' | 'destructive' | keyof typeof LEGACY_VARIANTS;
type SpinnerSize = 'sm' | 'md' | 'lg';
//#endregion
export { SpinnerSize, SpinnerVariant, spinnerPointerVariants, spinnerSectorVariants, spinnerSvgVariants, spinnerTextVariants, spinnerVariants, spinnerWheelVariants };
//# sourceMappingURL=spinner-variants.d.mts.map