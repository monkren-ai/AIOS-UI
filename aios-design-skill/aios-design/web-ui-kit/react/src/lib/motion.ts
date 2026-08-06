/**
 * AIOS UI 动效令牌
 *
 * 参考 fluid-functionalism 的 spring 阶梯，映射为 motion 可用的 transition 对象。
 * 所有组件通过 useMotionComponent 消费 motion，库本身不直接依赖 motion。
 *
 * 使用原则：
 * - fast：hover、fade、opacity 微调
 * - moderate：dropdown、tabs、tooltip、小范围位移
 * - slow：modal、sheet、重要系统通知
 *
 * 退出动画必须包含 opacity，Base UI 通过 element.getAnimations() 检测并等待完成。
 */

export interface SpringToken {
  type: 'spring'
  duration: number
  bounce: number
  exit: { duration: number }
}

export const spring = {
  fast: {
    type: 'spring' as const,
    duration: 0.08,
    bounce: 0,
    exit: { duration: 0.06 },
  },
  moderate: {
    type: 'spring' as const,
    duration: 0.16,
    bounce: 0,
    exit: { duration: 0.12 },
  },
  slow: {
    type: 'spring' as const,
    duration: 0.24,
    bounce: 0.12,
    exit: { duration: 0.16 },
  },
} as const satisfies Record<string, SpringToken>

/**
 * 退出动画兜底计时器（毫秒）。
 *
 * Base UI 通常会自动等待 motion 退出动画结束，但在后台标签页或动画被节流时，
 * 需要一个安全兜底时间强制卸载 portal 内容。
 */
export function exitFallbackMs(token: SpringToken): number {
  return Math.round(token.exit.duration * 1000) + 100
}

/**
 * 创建 enter transition（用于 motion 组件的 transition prop）。
 */
export function enterTransition(token: SpringToken): Omit<SpringToken, 'exit'> {
  const { exit: _, ...rest } = token
  return rest
}

/**
 * 创建 exit transition。
 */
export function exitTransition(token: SpringToken): { duration: number } {
  return token.exit
}
