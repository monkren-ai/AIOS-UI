import { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants } from "./hover-card-variants.mjs";
import * as React$1 from "react";

//#region src/HoverCard/HoverCard.d.ts
interface HoverCardProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'content'> {
  content: React$1.ReactNode;
  side?: 'top' | 'bottom';
  delay?: number;
  children: React$1.ReactElement;
}
declare function HoverCard({
  className,
  content,
  side,
  delay,
  children,
  ref,
  ...props
}: HoverCardProps): React$1.JSX.Element;
declare namespace HoverCard {
  var displayName: string;
}
//#endregion
export { HoverCard, HoverCardProps };
//# sourceMappingURL=HoverCard.d.mts.map