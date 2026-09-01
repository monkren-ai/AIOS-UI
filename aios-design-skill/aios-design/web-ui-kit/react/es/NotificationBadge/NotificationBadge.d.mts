import { notificationBadgeVariants } from "./notification-badge-variants.mjs";
import * as React$1 from "react";

//#region src/NotificationBadge/NotificationBadge.d.ts
interface NotificationBadgeProps extends React$1.ComponentPropsWithRef<'span'> {
  /** 计数。`0` / `undefined` 时不渲染标记，除非同时开了 `dot`。 */
  count?: number;
  /** 只显示圆点，不显示数字。 */
  dot?: boolean;
  /** 超过该值显示 `{max}+`。 */
  max?: number;
  children: React$1.ReactNode;
}
declare function NotificationBadge({
  count,
  dot,
  max,
  children,
  className,
  ref,
  ...props
}: NotificationBadgeProps): React$1.JSX.Element;
declare namespace NotificationBadge {
  var displayName: string;
}
//#endregion
export { NotificationBadge, NotificationBadgeProps };
//# sourceMappingURL=NotificationBadge.d.mts.map