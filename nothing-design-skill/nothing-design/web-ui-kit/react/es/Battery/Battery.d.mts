import { batteryDeviceVariants, batteryRingVariants, batteryVariants } from "./battery-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Battery/Battery.d.ts
interface BatteryDevice {
  name: string;
  type: 'mouse' | 'keyboard' | 'earbuds' | 'phone' | 'watch';
  percent: number;
  isCharging?: boolean;
}
interface BatteryProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>, Omit<VariantProps<typeof batteryVariants>, 'level' | 'widgetMode'> {
  updateInterval?: number;
  totalSegments?: number;
  percent?: number;
  isCharging?: boolean;
  widgetMode?: 'none' | 'card' | 'ring';
  devices?: BatteryDevice[];
  onDeviceClick?: (device: BatteryDevice) => void;
}
declare function Battery({
  updateInterval,
  totalSegments,
  percent: initialPercent,
  isCharging: initialIsCharging,
  variant,
  theme,
  widgetMode,
  devices,
  onDeviceClick,
  className,
  ref,
  ...props
}: BatteryProps): React$1.JSX.Element;
declare namespace Battery {
  var displayName: string;
}
//#endregion
export { Battery, BatteryDevice, BatteryProps };
//# sourceMappingURL=Battery.d.mts.map