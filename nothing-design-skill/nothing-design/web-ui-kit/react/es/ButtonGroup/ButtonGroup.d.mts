import { ButtonSize } from "../Button/button-variants.mjs";
import { buttonGroupVariants } from "./button-group-variants.mjs";
import * as React$1 from "react";

//#region src/ButtonGroup/ButtonGroup.d.ts
interface ButtonGroupProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 排列方向。 */
  orientation?: 'horizontal' | 'vertical';
  /** 透传给每个 Button 子项；子项自带的 size 优先。 */
  size?: ButtonSize;
  children: React$1.ReactNode;
  /** 相邻按钮之间插入的分隔节点。 */
  separator?: React$1.ReactNode;
}
/**
 * 按钮组。
 *
 * 不重新实现 Button，只包裹 children。`size` 会透传给 `Button` 子项
 * （子项自带 size 时优先）。相邻按钮共享边框，横竖两种排列。
 */
declare function ButtonGroup({
  orientation,
  size,
  children,
  separator,
  className,
  ref,
  ...props
}: ButtonGroupProps): React$1.JSX.Element;
declare namespace ButtonGroup {
  var displayName: string;
}
//#endregion
export { ButtonGroup, ButtonGroupProps };
//# sourceMappingURL=ButtonGroup.d.mts.map