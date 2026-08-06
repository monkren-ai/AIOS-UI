import { tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants } from "./tooltip-variants.mjs";
import * as React$1 from "react";

//#region src/Tooltip/Tooltip.d.ts
interface TooltipProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'content'> {
  content: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React$1.ReactElement;
}
declare function Tooltip({
  className,
  content,
  side,
  delay,
  children,
  ref,
  ...props
}: TooltipProps): React$1.JSX.Element;
declare namespace Tooltip {
  var displayName: string;
}
//#endregion
export { Tooltip, TooltipProps };
//# sourceMappingURL=Tooltip.d.mts.map