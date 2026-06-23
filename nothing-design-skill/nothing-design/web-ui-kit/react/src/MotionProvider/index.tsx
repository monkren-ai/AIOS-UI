'use client'

import { createContext, memo, type ReactNode, useContext } from 'react'
import * as motion from 'motion/react'

/**
 * Motion 组件类型（兼容 motion/react 和 motion/react-m）
 */
export type MotionComponentType = typeof motion

/**
 * Motion 上下文值
 */
interface MotionContextValue {
  /**
   * Motion 组件集合，用于在子组件中访问 motion.* API
   */
  motion: MotionComponentType
}

/**
 * Motion 上下文（默认使用完整版 motion/react）
 */
export const MotionContext = createContext<MotionContextValue>({
  motion,
})

/**
 * useMotionComponent hook
 *
 * 获取注入的 motion 组件集合。
 *
 * 默认返回完整版 `motion/react`；若应用使用 `LazyMotion`，
 * 应通过 `<MotionProvider motion={m}>` 注入 `motion/react-m`。
 *
 * @example
 * ```tsx
 * const { motion } = useMotionComponent()
 * return <motion.div animate={{ opacity: 1 }} />
 * ```
 */
export function useMotionComponent(): MotionComponentType {
  return useContext(MotionContext).motion
}

export interface MotionProviderProps {
  children: ReactNode
  /**
   * Motion 组件集合，默认为 `motion/react`
   */
  motion?: MotionComponentType
}

/**
 * MotionProvider
 *
 * 为子组件注入 motion 实现。
 *
 * - 默认使用 `motion/react`（完整版，体积较大）
 * - 若应用使用 `LazyMotion`，应传入 `motion/react-m`（精简版）
 *
 * @example
 * ```tsx
 * // 默认（完整版）
 * <MotionProvider>
 *   <App />
 * </MotionProvider>
 *
 * // LazyMotion（精简版）
 * <LazyMotion features={domAnimation}>
 *   <MotionProvider motion={m}>
 *     <App />
 *   </MotionProvider>
 * </LazyMotion>
 * ```
 */
export const MotionProvider = memo<MotionProviderProps>(
  ({ children, motion: motionProp }) => {
    const value: MotionContextValue = {
      motion: motionProp ?? motion,
    }
    return <MotionContext value={value}>{children}</MotionContext>
  },
)

MotionProvider.displayName = 'MotionProvider'

export default MotionProvider
