import { dateNavArrowVariants, dateNavLabelVariants, dateNavVariants } from "./date-nav-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/DateNav/DateNav.d.ts
type DateNavProps = React$1.ComponentPropsWithRef<'div'> & {
  /** 显示文本. 不传时使用 currentDate (默认当前月). */label?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  grotesk?: boolean;
  disabled?: boolean;
  onPrev?: () => void;
  onNext?: () => void; /** 受控/非受控日期. 默认 new Date(). */
  initialDate?: Date; /** 当前显示的日期 (受控模式). 不传则使用内部 state. */
  currentDate?: Date; /** 日期变化回调 (非受控模式) */
  onDateChange?: (date: Date) => void;
} & VariantProps<typeof dateNavVariants>;
declare function DateNav({
  className,
  label,
  prevDisabled,
  nextDisabled,
  grotesk,
  disabled,
  onPrev,
  onNext,
  initialDate,
  currentDate: currentDateProp,
  onDateChange,
  ref,
  ...props
}: DateNavProps): React$1.JSX.Element;
declare namespace DateNav {
  var displayName: string;
}
//#endregion
export { DateNav, DateNavProps };
//# sourceMappingURL=DateNav.d.mts.map