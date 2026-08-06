import { calendarVariants, dayVariants } from "./calendar-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Calendar/Calendar.d.ts
type CalendarProps = React$1.ComponentPropsWithRef<'div'> & {
  type?: 'compact' | 'full';
  initialDate?: Date;
} & VariantProps<typeof calendarVariants>;
declare function Calendar({
  className,
  type,
  initialDate,
  ref,
  ...props
}: CalendarProps): React$1.JSX.Element;
declare namespace Calendar {
  var displayName: string;
}
//#endregion
export { Calendar, CalendarProps };
//# sourceMappingURL=Calendar.d.mts.map