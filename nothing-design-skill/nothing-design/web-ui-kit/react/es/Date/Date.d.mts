import { dateDualRingVariants, dateRectVariants, dateSerifVariants } from "./date-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Date/Date.d.ts
type DateType = 'rect' | 'dual-ring' | 'serif';
interface DateWidgetProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>, Omit<VariantProps<typeof dateRectVariants>, 'type'> {
  type?: DateType;
  updateInterval?: number;
  showPeel?: boolean;
  onPeelClick?: () => void;
}
declare function DateWidget({
  type,
  theme,
  updateInterval,
  className,
  showPeel,
  onPeelClick,
  ref,
  ...props
}: DateWidgetProps): React$1.JSX.Element;
declare namespace DateWidget {
  var displayName: string;
}
//#endregion
export { DateType, DateWidget, DateWidgetProps };
//# sourceMappingURL=Date.d.mts.map