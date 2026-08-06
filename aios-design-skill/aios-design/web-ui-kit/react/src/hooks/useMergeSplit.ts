import { useRef, useCallback, type RefObject } from 'react'

/**
 * MergeSplit Hook
 *
 * 用于 CheckboxGroup / RadioGroup 等连续选择项的背景合并动画。
 * 当多个相邻项被选中时，它们共享一个统一的背景层；选择变化时背景平滑分裂/合并。
 *
 * 参考 fluid-functionalism 的 use-merge-split，简化为返回每个选中项相对于合并背景层的位置信息。
 */

export interface MergeSplitState {
  /** 当前存在选中项 */
  hasSelection: boolean
  /** 合并背景层 left（相对容器 px） */
  left: number
  /** 合并背景层 top（相对容器 px） */
  top: number
  /** 合并背景层 width */
  width: number
  /** 合并背景层 height */
  height: number
}

export interface UseMergeSplitOptions {
  axis?: 'x' | 'y'
}

export interface UseMergeSplitReturn {
  /** 根据选中索引计算合并背景层状态 */
  calculateMerge: (selectedIndices: number[]) => MergeSplitState
  /** 注册子项 ref */
  registerItem: (index: number, element: HTMLElement | null) => void
}

export function useMergeSplit(
  containerRef: RefObject<HTMLElement | null>,
  options: UseMergeSplitOptions = {},
): UseMergeSplitReturn {
  // axis 保留在 API 中供调用方声明方向；当前实现按选中项包围盒计算，方向不影响结果。
  const _axis = options.axis ?? 'x'
  void _axis
  const itemElementsRef = useRef<Map<number, HTMLElement>>(new Map())

  const registerItem = useCallback((index: number, element: HTMLElement | null) => {
    if (element) {
      itemElementsRef.current.set(index, element)
    } else {
      itemElementsRef.current.delete(index)
    }
  }, [])

  const calculateMerge = useCallback(
    (selectedIndices: number[]): MergeSplitState => {
      const container = containerRef.current
      if (!container || selectedIndices.length === 0) {
        return {
          hasSelection: false,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        }
      }

      const containerRect = container.getBoundingClientRect()
      const rects = selectedIndices
        .map((idx) => itemElementsRef.current.get(idx))
        .filter(Boolean)
        .map((el) => (el as HTMLElement).getBoundingClientRect())

      if (rects.length === 0) {
        return {
          hasSelection: false,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        }
      }

      const minLeft = Math.min(...rects.map((r) => r.left))
      const maxRight = Math.max(...rects.map((r) => r.right))
      const minTop = Math.min(...rects.map((r) => r.top))
      const maxBottom = Math.max(...rects.map((r) => r.bottom))

      return {
        hasSelection: true,
        left: minLeft - containerRect.left,
        top: minTop - containerRect.top,
        width: maxRight - minLeft,
        height: maxBottom - minTop,
      }
    },
    [containerRef],
  )

  return {
    calculateMerge,
    registerItem,
  }
}
