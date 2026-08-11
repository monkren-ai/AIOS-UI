import { cva } from 'class-variance-authority'

/**
 * GradientGlow 的变体。
 *
 * 这是 appica `gradient-glow` 的 AIOS 改造版：不渲染渐变光晕，
 * 改用点阵网格 + 中心向外径向衰减的 opacity 阶梯营造氛围。
 * `intensity` 只控制中心点的最大 opacity，不引入色相。
 */
export const gradientGlowVariants = cva(
  [
    'grid h-full w-full select-none',
    'pointer-events-none',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      intensity: {
        subtle: '',
        normal: '',
        strong: '',
      },
    },
    defaultVariants: { intensity: 'normal' },
  },
)

export type GradientGlowIntensity = 'subtle' | 'normal' | 'strong'
