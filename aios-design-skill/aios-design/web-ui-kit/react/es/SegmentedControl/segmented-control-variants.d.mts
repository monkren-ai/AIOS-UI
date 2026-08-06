//#region src/SegmentedControl/segmented-control-variants.d.ts
/**
 * SegmentedControl 外框。
 *
 * 选中态由一块绝对定位的 slider 表达，所以外框必须是定位上下文 + 裁切容器。
 */
declare const segmentedVariants: (props?: ({
  variant?: "pill" | "rounded" | null | undefined;
  disabled?: boolean | null | undefined;
  proximity?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 单个分段按钮。
 *
 * 选中时文字压在 `bg-foreground-display` 的 slider 上，所以用 `text-background` 反相。
 */
declare const segmentVariants: (props?: ({
  hovered?: boolean | null | undefined;
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 选中态 slider。 */
declare const segmentedSliderVariants: (props?: ({
  variant?: "pill" | "rounded" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** proximity hover 垫层，压在选中 slider 更下面一层。 */
declare const segmentedHoverSliderVariants: (props?: ({
  variant?: "pill" | "rounded" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type SegmentedControlVariant = 'pill' | 'rounded';
//#endregion
export { SegmentedControlVariant, segmentVariants, segmentedHoverSliderVariants, segmentedSliderVariants, segmentedVariants };
//# sourceMappingURL=segmented-control-variants.d.mts.map