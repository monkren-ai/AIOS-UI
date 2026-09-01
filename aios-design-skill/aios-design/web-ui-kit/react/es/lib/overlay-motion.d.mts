//#region src/lib/overlay-motion.d.ts
/**
 * 浮层进出场的共享 Tailwind 配方。
 *
 * 进慢出快：默认（关闭态）用 `*-exit` 时长，`open:` 用正档时长。
 * CSS 过渡取的是目标态的 duration，所以打开走慢档、关闭走快档。
 *
 * 只动 opacity / transform。Sheet 靠屏幕外位移隐藏，不能套
 * `motion-reduce:translate-none`，否则关着也会露出来。
 */
type OverlaySpringStep = 'fast' | 'moderate' | 'slow';
/** 缩放类浮层在减弱动效下回到 identity；显隐仍靠 opacity。 */
declare const OVERLAY_REDUCED_MOTION = "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100";
/** Base UI 的 `data-side` 是物理方向，origin 与弹出边相对。 */
declare const OVERLAY_ORIGIN_AWARE: readonly ["origin-top", "data-[side=top]:origin-bottom", "data-[side=bottom]:origin-top", "data-[side=left]:origin-right", "data-[side=right]:origin-left"];
declare function overlayDuration(step: OverlaySpringStep): string[];
declare function overlayTiming(step: OverlaySpringStep): string[];
/** Dropdown / Select / Combobox / Popover / HoverCard */
declare const overlayMenuMotion: readonly [...string[], "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100", "origin-top", "data-[side=top]:origin-bottom", "data-[side=bottom]:origin-top", "data-[side=left]:origin-right", "data-[side=right]:origin-left", "closed:scale-[var(--scale-overlay-menu)] closed:opacity-0", "open:scale-100 open:opacity-100"];
/** 右键菜单：同样的缩放，没有锚点 origin。 */
declare const overlayContextMotion: readonly [...string[], "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100", "closed:scale-[var(--scale-overlay-menu)] closed:opacity-0", "open:scale-100 open:opacity-100"];
/** Tooltip */
declare const overlayTooltipMotion: readonly [...string[], "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100", "origin-top", "data-[side=top]:origin-bottom", "data-[side=bottom]:origin-top", "data-[side=left]:origin-right", "data-[side=right]:origin-left", "closed:scale-[var(--scale-overlay-tooltip)] closed:opacity-0", "open:scale-100 open:opacity-100"];
/** Modal / AlertDialog：关闭态写在默认类上，打开靠 `open:` 覆写。 */
declare const overlayModalMotion: readonly [...string[], "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100", "translate-y-[var(--distance-micro)] scale-[var(--scale-overlay-modal)] opacity-0", "open:translate-y-0 open:scale-100 open:opacity-100"];
/** Sheet：方向位移由 side 变体负责，这里只补时长、透明度和减弱动效。 */
declare const overlaySheetTiming: readonly ["transition-[transform,opacity]", ...string[], "motion-reduce:transition-none", "opacity-0 open:opacity-100"];
//#endregion
export { OVERLAY_ORIGIN_AWARE, OVERLAY_REDUCED_MOTION, OverlaySpringStep, overlayContextMotion, overlayDuration, overlayMenuMotion, overlayModalMotion, overlaySheetTiming, overlayTiming, overlayTooltipMotion };
//# sourceMappingURL=overlay-motion.d.mts.map