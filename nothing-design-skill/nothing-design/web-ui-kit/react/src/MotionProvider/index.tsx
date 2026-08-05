'use client'

import { createContext, memo, type ReactNode, useContext } from 'react'

/**
 * Motion 组件类型（兼容 motion/react 和 motion/react-m）
 *
 * 用户需要从 `motion/react` 或 `motion/react-m` 导入后传入 MotionProvider。
 * 库本身不直接依赖 motion 包，通过 Context 注入实现解耦。
 */
export type MotionComponentType = Record<string, unknown> & {
  div: React.FC<Record<string, unknown>>
  section: React.FC<Record<string, unknown>>
  span: React.FC<Record<string, unknown>>
  [key: string]: unknown
}

/**
 * Motion 上下文值
 */
interface MotionContextValue {
  /**
   * Motion 组件集合，用于在子组件中访问 motion.* API
   */
  motion: MotionComponentType | null
}

/**
 * Motion 上下文（默认无 motion 实现，必须通过 MotionProvider 注入）
 */
export const MotionContext = createContext<MotionContextValue>({
  motion: null,
})

/**
 * useMotionComponent hook
 *
 * 获取注入的 motion 组件集合。
 * 必须在 `<MotionProvider motion={motion}>` 内使用，否则抛出错误。
 *
 * @example
 * ```tsx
 * import { motion } from 'motion/react'
 * import { MotionProvider, useMotionComponent } from 'nothing-ui'
 *
 * // 在根组件注入
 * <MotionProvider motion={motion}>
 *   <App />
 * </MotionProvider>
 *
 * // 在子组件中使用
 * const { motion } = useMotionComponent()
 * return <motion.div animate={{ opacity: 1 }} />
 * ```
 */
export function useMotionComponent(): MotionComponentType {
  const { motion } = useContext(MotionContext)
  if (!motion) {
    throw new Error(
      'useMotionComponent: no motion implementation found. ' +
        'Wrap your app with <MotionProvider motion={motion}> or <ConfigProvider motion={motion}> ' +
        'and pass your motion import from "motion/react" or "motion/react-m".',
    )
  }
  return motion
}

export interface MotionProviderProps {
  children: ReactNode
  /**
   * Motion 组件集合，必传。
   * 从 `motion/react` 或 `motion/react-m` 导入后传入。
   *
   * @example
   * ```tsx
   * import * as motion from 'motion/react'
   * <MotionProvider motion={motion}><App /></MotionProvider>
   * ```
   */
  motion: MotionComponentType
}

/**
 * MotionProvider
 *
 * 为子组件注入 motion 实现。
 * motion 为必传 prop，由用户自行选择 `motion/react`（完整版）或 `motion/react-m`（精简版）。
 *
 * @example
 * ```tsx
 * import * as motion from 'motion/react'
 * import { MotionProvider } from 'nothing-ui'
 *
 * <MotionProvider motion={motion}>
 *   <App />
 * </MotionProvider>
 * ```
 */
export const MotionProvider = memo<MotionProviderProps>(({ children, motion }) => {
  const value: MotionContextValue = { motion }
  return <MotionContext value={value}>{children}</MotionContext>
})

MotionProvider.displayName = 'MotionProvider'

export default MotionProvider
