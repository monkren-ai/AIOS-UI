import { caffeinateVariants } from "./caffeinate-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Caffeinate/Caffeinate.d.ts
type CaffeinateStatus = 'low' | 'medium' | 'high';
interface CaffeinateProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof caffeinateVariants>, 'status' | 'disabled'> {
  updateInterval?: number;
  totalSegments?: number;
  maxCaffeine?: number;
  halfLifeMinutes?: number;
  thresholdMg?: number;
  status?: CaffeinateStatus;
  disabled?: boolean;
}
declare function Caffeinate({
  className,
  updateInterval,
  totalSegments,
  maxCaffeine,
  halfLifeMinutes,
  thresholdMg,
  status: statusProp,
  disabled,
  style,
  ref,
  ...props
}: CaffeinateProps): React$1.JSX.Element;
declare namespace Caffeinate {
  var displayName: string;
}
//#endregion
export { Caffeinate, CaffeinateProps, CaffeinateStatus };
//# sourceMappingURL=Caffeinate.d.mts.map