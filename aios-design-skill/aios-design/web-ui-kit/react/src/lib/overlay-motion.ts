/**
 * 浮层进出场的共享 Tailwind 配方。
 *
 * 进慢出快：默认（关闭态）用 `*-exit` 时长，`open:` 用正档时长。
 * CSS 过渡取的是目标态的 duration，所以打开走慢档、关闭走快档。
 *
 * 只动 opacity / transform。Sheet 靠屏幕外位移隐藏，不能套
 * `motion-reduce:translate-none`，否则关着也会露出来。
 */

export type OverlaySpringStep = 'fast' | 'moderate' | 'slow'

/** 缩放类浮层在减弱动效下回到 identity；显隐仍靠 opacity。 */
export const OVERLAY_REDUCED_MOTION =
  'motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100'

/** Base UI 的 `data-side` 是物理方向，origin 与弹出边相对。 */
export const OVERLAY_ORIGIN_AWARE = [
  'origin-top',
  'data-[side=top]:origin-bottom',
  'data-[side=bottom]:origin-top',
  'data-[side=left]:origin-right',
  'data-[side=right]:origin-left',
] as const

export function overlayDuration(step: OverlaySpringStep): string[] {
  return [
    `duration-[var(--duration-spring-${step}-exit)] ease-spring-${step}`,
    `open:duration-[var(--duration-spring-${step})]`,
  ]
}

export function overlayTiming(step: OverlaySpringStep): string[] {
  return ['transition-[opacity,transform]', ...overlayDuration(step)]
}

/** Dropdown / Select / Combobox / Popover / HoverCard */
export const overlayMenuMotion = [
  ...overlayTiming('moderate'),
  OVERLAY_REDUCED_MOTION,
  ...OVERLAY_ORIGIN_AWARE,
  'closed:scale-[var(--scale-overlay-menu)] closed:opacity-0',
  'open:scale-100 open:opacity-100',
] as const

/** 右键菜单：同样的缩放，没有锚点 origin。 */
export const overlayContextMotion = [
  ...overlayTiming('moderate'),
  OVERLAY_REDUCED_MOTION,
  'closed:scale-[var(--scale-overlay-menu)] closed:opacity-0',
  'open:scale-100 open:opacity-100',
] as const

/** Tooltip */
export const overlayTooltipMotion = [
  ...overlayTiming('fast'),
  OVERLAY_REDUCED_MOTION,
  ...OVERLAY_ORIGIN_AWARE,
  'closed:scale-[var(--scale-overlay-tooltip)] closed:opacity-0',
  'open:scale-100 open:opacity-100',
] as const

/** Modal / AlertDialog：关闭态写在默认类上，打开靠 `open:` 覆写。 */
export const overlayModalMotion = [
  ...overlayTiming('slow'),
  OVERLAY_REDUCED_MOTION,
  'translate-y-[var(--distance-micro)] scale-[var(--scale-overlay-modal)] opacity-0',
  'open:translate-y-0 open:scale-100 open:opacity-100',
] as const

/** Sheet：方向位移由 side 变体负责，这里只补时长、透明度和减弱动效。 */
export const overlaySheetTiming = [
  'transition-[transform,opacity]',
  ...overlayDuration('slow'),
  'motion-reduce:transition-none',
  'opacity-0 open:opacity-100',
] as const
