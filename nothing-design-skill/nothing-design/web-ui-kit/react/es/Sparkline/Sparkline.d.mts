import * as React$1 from "react";

//#region src/Sparkline/Sparkline.d.ts
interface SparklineProps extends Omit<React$1.ComponentPropsWithRef<'svg'>, 'children'> {
  /** 趋势数据点。 */
  data: number[];
  /** SVG 宽度，默认撑满父容器。 */
  width?: number | string;
  /** SVG 高度，默认 32。 */
  height?: number;
  /** 描边宽度，默认 1.5。 */
  strokeWidth?: number;
  /** 标出最高 / 最低点，用透明度区分而非色相。 */
  showExtremes?: boolean;
  /** 显示首末数值，Space Mono。 */
  showValues?: boolean;
}
/**
 * 迷你趋势线：1.5px 描边、无填充、currentColor；极值用透明度区分。
 *
 * 纯 SVG，无 Base UI。viewBox 横向拉伸以填满宽度（`preserveAspectRatio="none"`），
 * 描边走 `vectorEffect="non-scaling-stroke"` 保持恒定 1.5px。
 */
declare function Sparkline({
  data,
  width,
  height,
  strokeWidth,
  showExtremes,
  showValues,
  className,
  ref,
  ...props
}: SparklineProps): React$1.JSX.Element;
declare namespace Sparkline {
  var displayName: string;
}
//#endregion
export { Sparkline, SparklineProps };
//# sourceMappingURL=Sparkline.d.mts.map