import { OverlaySide } from "../ui/OverlayPortal.mjs";
import { popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants } from "./popover-variants.mjs";
import * as React$1 from "react";

//#region src/Popover/Popover.d.ts
interface PopoverProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'content'> {
  content: React$1.ReactNode;
  side?: OverlaySide;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React$1.ReactElement;
}
declare function Popover({
  className,
  content,
  side,
  open: controlledOpen,
  onOpenChange,
  children,
  ref,
  ...props
}: PopoverProps): React$1.JSX.Element;
declare namespace Popover {
  var displayName: string;
}
//#endregion
export { Popover, PopoverProps };
//# sourceMappingURL=Popover.d.mts.map