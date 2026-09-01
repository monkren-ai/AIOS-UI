import { NumberTickerSize, numberTickerVariants } from "./number-ticker-variants.mjs";
import * as React$1 from "react";

//#region src/NumberTicker/NumberTicker.d.ts
interface NumberTickerProps extends Omit<React$1.ComponentPropsWithRef<'span'>, 'children' | 'prefix'> {
  /** 要展示的数字。变化时按位交错滑入，无 blur。 */
  value: number | string;
  prefix?: React$1.ReactNode;
  suffix?: React$1.ReactNode;
  size?: NumberTickerSize;
}
declare function NumberTicker({
  value,
  prefix,
  suffix,
  size,
  className,
  ref,
  ...props
}: NumberTickerProps): React$1.JSX.Element;
declare namespace NumberTicker {
  var displayName: string;
}
//#endregion
export { NumberTicker, NumberTickerProps };
//# sourceMappingURL=NumberTicker.d.mts.map