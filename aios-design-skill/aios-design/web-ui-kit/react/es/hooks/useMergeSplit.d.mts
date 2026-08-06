import { RefObject } from "react";

//#region src/hooks/useMergeSplit.d.ts
/**
 * MergeSplit Hook
 *
 * 用于 CheckboxGroup / RadioGroup 等连续选择项的背景合并动画。
 * 当多个相邻项被选中时，它们共享一个统一的背景层；选择变化时背景平滑分裂/合并。
 *
 * 参考 fluid-functionalism 的 use-merge-split，简化为返回每个选中项相对于合并背景层的位置信息。
 */
interface MergeSplitState {
  /** 当前存在选中项 */
  hasSelection: boolean;
  /** 合并背景层 left（相对容器 px） */
  left: number;
  /** 合并背景层 top（相对容器 px） */
  top: number;
  /** 合并背景层 width */
  width: number;
  /** 合并背景层 height */
  height: number;
}
interface UseMergeSplitOptions {
  axis?: 'x' | 'y';
}
interface UseMergeSplitReturn {
  /** 根据选中索引计算合并背景层状态 */
  calculateMerge: (selectedIndices: number[]) => MergeSplitState;
  /** 注册子项 ref */
  registerItem: (index: number, element: HTMLElement | null) => void;
}
declare function useMergeSplit(containerRef: RefObject<HTMLElement | null>, options?: UseMergeSplitOptions): UseMergeSplitReturn;
//#endregion
export { MergeSplitState, UseMergeSplitOptions, UseMergeSplitReturn, useMergeSplit };
//# sourceMappingURL=useMergeSplit.d.mts.map