//#region src/Skeleton/skeleton-variants.d.ts
/**
 * Skeleton 的视觉变体。
 *
 * appica 原版是灰色实心块占位——Nothing 禁止灰色块，所以这里改造成点阵呼吸占位：
 * 容器内是一组小圆点，整体在 0.4↔0.8 透明度之间循环呼吸（keyframes 见 Skeleton.css）。
 * `variant` 只决定形状（圆角），不参与配色；颜色统一走点的 `--text-disabled`。
 */
declare const skeletonVariants: (props?: ({
  variant?: "text" | "rect" | "circle" | null | undefined;
  animate?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 单个点。
 *
 * 颜色用 `--text-disabled`，与 DotMatrix 的暗点同源；尺寸固定 3px，不随形状变化。
 * 保留 `variant` 轴为日后按形状微调点尺寸留口子，当前各形状一致。
 */
declare const skeletonDotVariants: (props?: ({
  variant?: "text" | "rect" | "circle" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type SkeletonVariant = 'text' | 'rect' | 'circle';
//#endregion
export { SkeletonVariant, skeletonDotVariants, skeletonVariants };
//# sourceMappingURL=skeleton-variants.d.mts.map