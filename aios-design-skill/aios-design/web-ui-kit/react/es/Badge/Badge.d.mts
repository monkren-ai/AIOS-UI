import { BadgeSize, BadgeVariant, badgeVariants } from "./badge-variants.mjs";
import * as React$1 from "react";

//#region src/Badge/Badge.d.ts
interface BadgeProps extends React$1.ComponentPropsWithRef<'span'> {
  /** 视觉样式。 */
  variant?: BadgeVariant;
  /** 高度与字号。 */
  size?: BadgeSize;
  /** 在文字前渲染一个呼吸的状态圆点。 */
  dot?: boolean;
}
declare function Badge({
  variant,
  size,
  dot,
  className,
  children,
  ...props
}: BadgeProps): React$1.JSX.Element;
declare namespace Badge {
  var displayName: string;
}
//#endregion
export { Badge, BadgeProps };
//# sourceMappingURL=Badge.d.mts.map