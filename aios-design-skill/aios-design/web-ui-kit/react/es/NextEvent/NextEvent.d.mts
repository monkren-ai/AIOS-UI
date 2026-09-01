import { nextEventVariants } from "./next-event-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/NextEvent/NextEvent.d.ts
interface EventData {
  title: string;
  /** Unix timestamp (ms) */
  date: number;
  month?: string;
}
interface NextEventProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'>, Omit<VariantProps<typeof nextEventVariants>, 'priority' | 'real'> {
  /** 单个事件 (向后兼容). 优先于 events. */
  event?: EventData;
  /** 事件数组,自动选择最近一个未到期的 */
  events?: EventData[];
  priority?: 'low' | 'normal' | 'high';
}
declare function NextEvent({
  className,
  priority: priorityProp,
  event,
  events,
  ref,
  ...props
}: NextEventProps): React$1.JSX.Element;
declare namespace NextEvent {
  var displayName: string;
}
//#endregion
export { EventData, NextEvent, NextEventProps };
//# sourceMappingURL=NextEvent.d.mts.map