import { cva } from 'class-variance-authority'

/**
 * AspectRatio 的容器：宽度撑满，高度由 `aspect-ratio` 内联样式决定。
 */
export const aspectRatioVariants = cva(['relative w-full'])

/** 绝对定位的内容层，铺满整个比例框。 */
export const aspectRatioInnerVariants = cva(['absolute inset-0'])
