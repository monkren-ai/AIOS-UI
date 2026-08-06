import { SpinnerSize, SpinnerVariant, spinnerSectorVariants, spinnerTextVariants, spinnerVariants } from "./spinner-variants.mjs";
import * as React$1 from "react";

//#region src/Spinner/Spinner.d.ts
interface SpinnerProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 视觉样式。 */
  variant?: SpinnerVariant;
  /** 盘面直径与内边距。 */
  size?: SpinnerSize;
  /** 扇区文案。 */
  items?: string[];
  /** 旋转时长（ms）。 */
  spinDuration?: number;
}
declare function Spinner({
  className,
  items,
  spinDuration,
  size,
  variant,
  ...props
}: SpinnerProps): React$1.JSX.Element;
declare namespace Spinner {
  var displayName: string;
}
//#endregion
export { Spinner, SpinnerProps };
//# sourceMappingURL=Spinner.d.mts.map