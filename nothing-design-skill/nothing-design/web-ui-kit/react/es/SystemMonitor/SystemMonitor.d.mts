import { monitorItemVariants, monitorSegmentVariants, systemMonitorVariants } from "./system-monitor-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/SystemMonitor/SystemMonitor.d.ts
interface SystemMonitorProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, VariantProps<typeof systemMonitorVariants> {
  updateInterval?: number;
  totalSegments?: number;
  cpuPercent?: number;
  ramPercent?: number;
  storagePercent?: number;
  ramTotal?: number;
  storageTotal?: number;
  netConnected?: boolean;
  netSpeed?: number;
  batteryPercent?: number;
  batteryCharging?: boolean;
}
declare function SystemMonitor({
  className,
  variant,
  size,
  updateInterval,
  totalSegments,
  cpuPercent: initialCpuPercent,
  ramPercent: initialRamPercent,
  storagePercent: initialStoragePercent,
  ramTotal,
  storageTotal,
  netConnected: initialNetConnected,
  netSpeed: initialNetSpeed,
  batteryPercent: initialBatteryPercent,
  batteryCharging: initialBatteryCharging,
  ref,
  ...props
}: SystemMonitorProps): React$1.JSX.Element;
declare namespace SystemMonitor {
  var displayName: string;
}
//#endregion
export { SystemMonitor, SystemMonitorProps };
//# sourceMappingURL=SystemMonitor.d.mts.map