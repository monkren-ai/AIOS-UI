import { SeparatorOrientation, SeparatorSize, separatorVariants } from "./separator-variants.mjs";
import * as React$1 from "react";

//#region src/Separator/Separator.d.ts
interface SeparatorProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 走向。 */
  orientation?: SeparatorOrientation;
  /** 线两侧的留白与标签字号。 */
  size?: SeparatorSize;
  /** 纯装饰，不进无障碍树。 */
  decorative?: boolean;
  /** 中缀文案。传了就自动进入 labeled 形态。 */
  label?: string;
  /** 手动强制 labeled 形态。 */
  labeled?: boolean;
}
declare function Separator({
  className,
  orientation,
  size,
  decorative,
  labeled,
  label,
  ...props
}: SeparatorProps): React$1.JSX.Element;
declare namespace Separator {
  var displayName: string;
}
//#endregion
export { Separator, SeparatorProps };
//# sourceMappingURL=Separator.d.mts.map