import { MeterSize, MeterZone, meterValueVariants, meterVariants } from "./meter-variants.mjs";
import * as React$1 from "react";

//#region src/Meter/Meter.d.ts
interface MeterProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 当前值。必填。 */
  value: number;
  /** 下限，默认 0。 */
  min?: number;
  /** 上限，默认 100。 */
  max?: number;
  /** 临界下界。低于它进入 low 区。 */
  low?: number;
  /** 临界上界。高于它进入 high 区。 */
  high?: number;
  /** 期望值所在区为 good 区，决定状态色映射。 */
  optimum?: number;
  /** 读数行末端的说明文字（不是无障碍名称）。 */
  label?: string;
  /** 是否显示数值。默认 true。 */
  showValue?: boolean;
  size?: MeterSize;
}
declare function Meter({
  className,
  value,
  min,
  max,
  low,
  high,
  optimum,
  label,
  showValue,
  size,
  ...props
}: MeterProps): React$1.JSX.Element;
declare namespace Meter {
  var displayName: string;
}
//#endregion
export { Meter, MeterProps };
//# sourceMappingURL=Meter.d.mts.map