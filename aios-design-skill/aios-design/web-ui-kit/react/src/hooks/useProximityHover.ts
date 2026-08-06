import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type RefObject,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
} from 'react'

/**
 * 注册项的矩形信息。
 */
export interface ItemRect {
  top: number
  height: number
  left: number
  width: number
}

export interface UseProximityHoverOptions {
  /**
   * 最近项的计算方向。
   * - 'y'：垂直列表（默认）
   * - 'x'：水平条
   * - 'xy'：二维网格，按欧氏距离到中心点计算
   */
  axis?: 'x' | 'y' | 'xy'
}

export interface UseProximityHoverReturn {
  /** 当前 mouse 最近项的索引 */
  activeIndex: number | null
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  /** 已注册项的矩形缓存 */
  itemRects: ItemRect[]
  /** 所有项是否已测量完成 */
  isMeasured: boolean
  /** 注册子项的 ref 回调 */
  registerItem: (index: number, element: HTMLElement | null) => void
  /** 强制重新测量 */
  remeasure: () => void
  /** 事件处理器，需要绑定到容器 */
  handlers: {
    onMouseMove: (e: MouseEvent) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

/**
 * Proximity Hover Hook
 *
 * 根据鼠标位置在容器内的子项中计算“最近”项，用于实现 hover preview 效果。
 * 参考 fluid-functionalism 的 use-proximity-hover，适配为纯 JS + CSS Variables。
 */
export function useProximityHover(
  containerRef: RefObject<HTMLElement | null>,
  options: UseProximityHoverOptions = {},
): UseProximityHoverReturn {
  const { axis = 'y' } = options

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMeasured, setIsMeasured] = useState(false)
  const itemElementsRef = useRef<Map<number, HTMLElement>>(new Map())
  const itemRectsRef = useRef<ItemRect[]>([])
  const isInsideRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  const measureItems = useCallback(() => {
    const elements = Array.from(itemElementsRef.current.entries())
      .sort(([a], [b]) => a - b)
      .map(([, el]) => el)

    if (elements.length === 0) {
      itemRectsRef.current = []
      setIsMeasured(false)
      return
    }

    const container = containerRef.current
    const containerRect = container?.getBoundingClientRect()
    const containerX = containerRect?.left ?? 0
    const containerY = containerRect?.top ?? 0

    itemRectsRef.current = elements.map((el) => {
      const rect = el.getBoundingClientRect()
      return {
        top: rect.top - containerY,
        height: rect.height,
        left: rect.left - containerX,
        width: rect.width,
      }
    })

    setIsMeasured(true)
  }, [containerRef])

  const remeasure = useCallback(() => {
    setIsMeasured(false)
    // 使用 requestAnimationFrame 聚合多次无效化请求
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      measureItems()
      rafRef.current = null
    })
  }, [measureItems])

  const registerItem = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) {
        itemElementsRef.current.set(index, element)
      } else {
        itemElementsRef.current.delete(index)
      }
      remeasure()
    },
    [remeasure],
  )

  const findNearestIndex = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current
      if (!container) return null

      const containerRect = container.getBoundingClientRect()
      const x = clientX - containerRect.left
      const y = clientY - containerRect.top

      let nearest: number | null = null
      let nearestDist = Infinity

      itemRectsRef.current.forEach((rect, index) => {
        let dist = Infinity
        if (axis === 'y') {
          const centerY = rect.top + rect.height / 2
          dist = Math.abs(y - centerY)
        } else if (axis === 'x') {
          const centerX = rect.left + rect.width / 2
          dist = Math.abs(x - centerX)
        } else {
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          dist = Math.hypot(x - centerX, y - centerY)
        }

        if (dist < nearestDist) {
          nearestDist = dist
          nearest = index
        }
      })

      return nearest
    },
    [axis, containerRef],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isInsideRef.current) return
      const nextIndex = findNearestIndex(e.clientX, e.clientY)
      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    },
    [findNearestIndex],
  )

  const handleMouseEnter = useCallback(() => {
    isInsideRef.current = true
    measureItems()
  }, [measureItems])

  const handleMouseLeave = useCallback(() => {
    isInsideRef.current = false
    setActiveIndex(null)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    activeIndex,
    setActiveIndex,
    itemRects: itemRectsRef.current,
    isMeasured,
    registerItem,
    remeasure,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  }
}
