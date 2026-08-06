import { scrollAreaScrollbarVariants, scrollAreaThumbVariants, scrollAreaVariants, scrollAreaViewportVariants } from "./scroll-area-variants.mjs";
import * as React$1 from "react";

//#region src/ScrollArea/ScrollArea.d.ts
type ScrollAreaProps = React$1.ComponentPropsWithRef<'div'> & {
  height?: string;
  children?: React$1.ReactNode;
  /**
   * 透传给真正滚动的视口。
   *
   * 根元素上的属性落在不滚动的外框，够不到视口，所以 `aria-label`、`onScroll`、
   * 视口自己的 `ref` 都得从这里进。视口默认 `tabIndex={0}`，
   * 给了 `aria-label` / `aria-labelledby` 才会补上 `role="region"`——
   * 无名的 region 在读屏里等于不存在。
   */
  viewportProps?: React$1.ComponentPropsWithRef<'div'>;
};
declare function ScrollArea({
  className,
  height,
  style,
  children,
  viewportProps,
  ...props
}: ScrollAreaProps): React$1.JSX.Element;
declare namespace ScrollArea {
  var displayName: string;
}
//#endregion
export { ScrollArea, ScrollAreaProps };
//# sourceMappingURL=ScrollArea.d.mts.map