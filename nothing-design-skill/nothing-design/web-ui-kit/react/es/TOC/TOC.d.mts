import { tocItemVariants, tocVariants } from "./toc-variants.mjs";
import * as React$1 from "react";

//#region src/TOC/TOC.d.ts
interface TocItem {
  /** 目标节点的 id（不含 `#`）。 */
  id: string;
  /** 显示文字。 */
  label: string;
  /** 层级，控制缩进。默认 1。 */
  level?: number;
}
interface TOCProps extends React$1.ComponentPropsWithRef<'nav'> {
  items: TocItem[];
  /**
   * 受控的当前节 id。传入即进入受控模式，组件不再自行追踪；
   * 不传则用 IntersectionObserver 自动追踪。
   */
  activeId?: string;
  /** 当前节变化时回调（无论受控与否）。 */
  onActiveChange?: (id: string) => void;
  /**
   * 滚动容器。默认 `window`。传一个具体元素时，IntersectionObserver
   * 以它为 root，点击也滚它里面的目标。
   */
  container?: HTMLElement | null;
}
declare function TOC({
  className,
  items,
  activeId,
  onActiveChange,
  container,
  ...props
}: TOCProps): React$1.JSX.Element;
declare namespace TOC {
  var displayName: string;
}
//#endregion
export { TOC, TOCProps, TocItem };
//# sourceMappingURL=TOC.d.mts.map