import { DotMatrixPattern, DotMatrixSize, DotMatrixTheme, dotMatrixRowVariants, dotMatrixVariants, dotVariants } from "../DotMatrix/dot-matrix-variants.mjs";
import * as React$1 from "react";
//#region src/components/StaticDotMatrix.d.ts
interface StaticDotMatrixProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  rows: number;
  cols: number;
  dotSize?: DotMatrixSize;
  theme?: DotMatrixTheme;
  pattern?: DotMatrixPattern;
  activeDots?: [number, number][];
  dimDots?: [number, number][];
}
/**
 * 点阵渲染原语。
 *
 * 主题走 `data-dot-theme` 而不是 `data-theme`：后者是 theme.css 里 `dark:` /
 * `light:` 变体的选择器，挂在这里会把整棵子树的主题令牌一起翻掉。
 */
declare function StaticDotMatrix({
  className,
  rows,
  cols,
  dotSize,
  theme,
  pattern,
  activeDots,
  dimDots,
  style,
  ...props
}: StaticDotMatrixProps): React$1.JSX.Element;
declare namespace StaticDotMatrix {
  var displayName: string;
}
//#endregion
export { StaticDotMatrix, StaticDotMatrixProps };
//# sourceMappingURL=StaticDotMatrix.d.mts.map