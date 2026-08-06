import { GradientGlowIntensity, gradientGlowVariants } from "./gradient-glow-variants.mjs";
import * as React$1 from "react";

//#region src/GradientGlow/GradientGlow.d.ts
interface GradientGlowProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 点阵列数。 */
  cols?: number;
  /** 点阵行数。 */
  rows?: number;
  /** 单个点的直径（px）。 */
  dotSize?: number;
  /** 氛围强度，决定中心点的最大 opacity。 */
  intensity?: GradientGlowIntensity;
}
declare function GradientGlow({
  cols,
  rows,
  dotSize,
  intensity,
  className,
  style,
  ...props
}: GradientGlowProps): React$1.JSX.Element;
declare namespace GradientGlow {
  var displayName: string;
}
//#endregion
export { GradientGlow, GradientGlowProps };
//# sourceMappingURL=GradientGlow.d.mts.map