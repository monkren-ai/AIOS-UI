//#region src/lib/overlay-motion.ts
/** 缩放类浮层在减弱动效下回到 identity；显隐仍靠 opacity。 */
const OVERLAY_REDUCED_MOTION = "motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100";
/** Base UI 的 `data-side` 是物理方向，origin 与弹出边相对。 */
const OVERLAY_ORIGIN_AWARE = [
	"origin-top",
	"data-[side=top]:origin-bottom",
	"data-[side=bottom]:origin-top",
	"data-[side=left]:origin-right",
	"data-[side=right]:origin-left"
];
function overlayDuration(step) {
	return [`duration-[var(--duration-spring-${step}-exit)] ease-spring-${step}`, `open:duration-[var(--duration-spring-${step})]`];
}
function overlayTiming(step) {
	return ["transition-[opacity,transform]", ...overlayDuration(step)];
}
/** Dropdown / Select / Combobox / Popover / HoverCard */
const overlayMenuMotion = [
	...overlayTiming("moderate"),
	OVERLAY_REDUCED_MOTION,
	...OVERLAY_ORIGIN_AWARE,
	"closed:scale-[var(--scale-overlay-menu)] closed:opacity-0",
	"open:scale-100 open:opacity-100"
];
/** 右键菜单：同样的缩放，没有锚点 origin。 */
const overlayContextMotion = [
	...overlayTiming("moderate"),
	OVERLAY_REDUCED_MOTION,
	"closed:scale-[var(--scale-overlay-menu)] closed:opacity-0",
	"open:scale-100 open:opacity-100"
];
/** Tooltip */
const overlayTooltipMotion = [
	...overlayTiming("fast"),
	OVERLAY_REDUCED_MOTION,
	...OVERLAY_ORIGIN_AWARE,
	"closed:scale-[var(--scale-overlay-tooltip)] closed:opacity-0",
	"open:scale-100 open:opacity-100"
];
/** Modal / AlertDialog：关闭态写在默认类上，打开靠 `open:` 覆写。 */
const overlayModalMotion = [
	...overlayTiming("slow"),
	OVERLAY_REDUCED_MOTION,
	"translate-y-[var(--distance-micro)] scale-[var(--scale-overlay-modal)] opacity-0",
	"open:translate-y-0 open:scale-100 open:opacity-100"
];
/** Sheet：方向位移由 side 变体负责，这里只补时长、透明度和减弱动效。 */
const overlaySheetTiming = [
	"transition-[transform,opacity]",
	...overlayDuration("slow"),
	"motion-reduce:transition-none",
	"opacity-0 open:opacity-100"
];
//#endregion
export { OVERLAY_ORIGIN_AWARE, OVERLAY_REDUCED_MOTION, overlayContextMotion, overlayDuration, overlayMenuMotion, overlayModalMotion, overlaySheetTiming, overlayTiming, overlayTooltipMotion };

//# sourceMappingURL=overlay-motion.mjs.map