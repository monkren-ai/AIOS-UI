import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";

//#region src/hooks/useProximityHover.d.ts
/**
 * 注册项的矩形信息。
 */
interface ItemRect {
  top: number;
  height: number;
  left: number;
  width: number;
}
interface UseProximityHoverOptions {
  /**
   * 最近项的计算方向。
   * - 'y'：垂直列表（默认）
   * - 'x'：水平条
   * - 'xy'：二维网格，按欧氏距离到中心点计算
   */
  axis?: 'x' | 'y' | 'xy';
}
interface UseProximityHoverReturn {
  /** 当前 mouse 最近项的索引 */
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  /** 已注册项的矩形缓存 */
  itemRects: ItemRect[];
  /** 所有项是否已测量完成 */
  isMeasured: boolean;
  /** 注册子项的 ref 回调 */
  registerItem: (index: number, element: HTMLElement | null) => void;
  /** 强制重新测量 */
  remeasure: () => void;
  /** 事件处理器，需要绑定到容器 */
  handlers: {
    onMouseMove: (e: MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}
/**
 * Proximity Hover Hook
 *
 * 根据鼠标位置在容器内的子项中计算“最近”项，用于实现 hover preview 效果。
 * 参考 fluid-functionalism 的 use-proximity-hover，适配为纯 JS + CSS Variables。
 */
declare function useProximityHover(containerRef: RefObject<HTMLElement | null>, options?: UseProximityHoverOptions): UseProximityHoverReturn;
//#endregion
export { ItemRect, UseProximityHoverOptions, UseProximityHoverReturn, useProximityHover };
//# sourceMappingURL=useProximityHover.d.mts.map