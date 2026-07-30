/**
 * Nothing UI 字重过渡工具
 *
 * fluid-functionalism 使用 Inter variable font 并通过 font-variation-settings 动画字重。
 * Nothing UI 的默认字体是 Space Grotesk / Space Mono / Doto，其中部分字体支持可变字重。
 * 因此提供两套方案：
 * 1. 可变字体优先：使用 font-variation-settings 动画（最平滑）。
 * 2. 降级：使用 font-weight transition（兼容所有字体）。
 */

export interface FontWeightSettings {
  normal: string
  medium: string
  semibold: string
  bold: string
}

/**
 * font-variation-settings 值，适用于支持可变字重的字体。
 */
export const fontVariationWeights: FontWeightSettings = {
  normal: "'wght' 400",
  medium: "'wght' 500",
  semibold: "'wght' 600",
  bold: "'wght' 700",
}

/**
 * 标准 font-weight 值，作为降级方案。
 */
export const fontWeightValues: FontWeightSettings = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

/**
 * 组件 CSS 中建议使用 `.nothing-font-weight-transition` 类：
 *
 * ```css
 * .nothing-font-weight-transition {
 *   transition: font-weight var(--duration-micro) var(--easing),
 *               font-variation-settings var(--duration-micro) var(--easing);
 * }
 * ```
 *
 * 这样当父元素 hover 时子元素的字重会平滑过渡。
 */
export const FONT_WEIGHT_TRANSITION_CSS = `
.nothing-font-weight-transition {
  transition:
    font-weight var(--duration-micro) var(--easing),
    font-variation-settings var(--duration-micro) var(--easing);
}
`
