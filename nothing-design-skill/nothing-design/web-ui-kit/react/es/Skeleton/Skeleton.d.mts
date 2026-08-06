import { SkeletonVariant, skeletonDotVariants, skeletonVariants } from "./skeleton-variants.mjs";
import * as React$1 from "react";
//#region src/Skeleton/Skeleton.d.ts
interface SkeletonProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 占位形状。text 是一行点阵，rect 是矩形点阵，circle 是圆形点阵。 */
  variant?: SkeletonVariant;
  /** 容器宽度，数字按 px 处理。 */
  width?: number | string;
  /** 容器高度，数字按 px 处理。 */
  height?: number | string;
  /** 点阵行数。 */
  rows?: number;
  /** 点阵列数。 */
  cols?: number;
  /** 是否开启呼吸动画；motion-reduce 下始终静态停在 0.6 透明度。 */
  animate?: boolean;
}
declare function Skeleton({
  variant,
  width,
  height,
  rows,
  cols,
  animate,
  className,
  style,
  ...props
}: SkeletonProps): React$1.JSX.Element;
declare namespace Skeleton {
  var displayName: string;
}
//#endregion
export { Skeleton, SkeletonProps };
//# sourceMappingURL=Skeleton.d.mts.map