import { IconSwapSize, iconSwapVariants } from "./icon-swap-variants.mjs";
import * as React$1 from "react";

//#region src/IconSwap/IconSwap.d.ts
interface IconSwapProps extends React$1.ComponentPropsWithRef<'span'> {
  /**
   * 当前可见层。数字是 children 下标；布尔值把 `false` 映射到 0、`true` 映射到 1。
   */
  active?: number | boolean;
  size?: IconSwapSize;
  children: React$1.ReactNode;
}
declare function IconSwap({
  active,
  size,
  className,
  children,
  ref,
  ...props
}: IconSwapProps): React$1.JSX.Element;
declare namespace IconSwap {
  var displayName: string;
}
//#endregion
export { IconSwap, IconSwapProps };
//# sourceMappingURL=IconSwap.d.mts.map