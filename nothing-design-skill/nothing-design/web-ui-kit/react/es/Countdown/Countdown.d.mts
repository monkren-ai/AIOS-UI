import { countdownNumberVariants, countdownVariants } from "./countdown-variants.mjs";
import * as React$1 from "react";

//#region src/Countdown/Countdown.d.ts
interface CountdownProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 目标时刻；number 视为毫秒时间戳，Date 取其 getTime()。 */
  target: number | Date;
  /** 到点回调，只触发一次。 */
  onComplete?: () => void;
  /** 到点后显示的文案，默认 `DONE`。 */
  onCompleteText?: string;
  /** 进入此秒数区间时读数升为红色，默认 10 秒。 */
  threshold?: number;
  /** 是否显示天数（前置 DD 段）。 */
  showDays?: boolean;
  /** 可选的小标题，渲染在读数上方。 */
  label?: string;
}
declare function Countdown({
  target,
  onComplete,
  onCompleteText,
  threshold,
  showDays,
  label,
  className,
  ...props
}: CountdownProps): React$1.JSX.Element;
declare namespace Countdown {
  var displayName: string;
}
//#endregion
export { Countdown, CountdownProps };
//# sourceMappingURL=Countdown.d.mts.map