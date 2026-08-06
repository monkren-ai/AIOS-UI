import { KbdSize, KbdVariant, kbdVariants } from "./kbd-variants.mjs";
import * as React$1 from "react";

//#region src/Kbd/Kbd.d.ts
interface KbdProps extends React$1.ComponentPropsWithRef<'kbd'> {
  /** 视觉样式。 */
  variant?: KbdVariant;
  /** 键帽高度与字号。 */
  size?: KbdSize;
  /**
   * 一次渲染一串键。传了 `keys` 就忽略 children，
   * 每个键各自是一个 `<kbd>`，外层 `<kbd>` 负责把它们串起来。
   */
  keys?: string[];
  /** `keys` 之间的连接符。 */
  separator?: string;
}
declare function Kbd({
  className,
  variant,
  size,
  keys,
  separator,
  children,
  ...props
}: KbdProps): React$1.JSX.Element;
declare namespace Kbd {
  var displayName: string;
}
//#endregion
export { Kbd, KbdProps };
//# sourceMappingURL=Kbd.d.mts.map