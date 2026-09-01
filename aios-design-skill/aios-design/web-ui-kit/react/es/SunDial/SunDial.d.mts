import { sunDialVariants } from "./sun-dial-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/SunDial/SunDial.d.ts
type SunDialTime = 'day' | 'night';
interface SunDialProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof sunDialVariants>, 'time'> {
  latitude?: number;
  longitude?: number;
  updateInterval?: number;
  time?: SunDialTime;
}
declare function SunDial({
  className,
  latitude: propLat,
  longitude: propLng,
  updateInterval,
  time: timeProp,
  style,
  ref,
  ...props
}: SunDialProps): React$1.JSX.Element;
declare namespace SunDial {
  var displayName: string;
}
//#endregion
export { SunDial, SunDialProps, SunDialTime };
//# sourceMappingURL=SunDial.d.mts.map