import { collapsibleContentInnerVariants, collapsibleContentVariants, collapsibleTriggerVariants, collapsibleVariants } from "./collapsible-variants.mjs";
import * as React$1 from "react";

//#region src/Collapsible/Collapsible.d.ts
type CollapsibleProps = Omit<React$1.ComponentPropsWithRef<'div'>, 'onToggle'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React$1.ReactNode;
  children?: React$1.ReactNode;
};
declare function Collapsible({
  className,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  trigger,
  children,
  ...props
}: CollapsibleProps): React$1.JSX.Element;
declare namespace Collapsible {
  var displayName: string;
}
//#endregion
export { Collapsible, CollapsibleProps };
//# sourceMappingURL=Collapsible.d.mts.map