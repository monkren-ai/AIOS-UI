import { overlayTooltipMotion } from "../lib/overlay-motion.mjs";
import { cva } from "class-variance-authority";
//#region src/Tooltip/tooltip-variants.ts
const tooltipTriggerVariants = cva(["inline-block cursor-help", "focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"]);
const tooltipPositionerVariants = cva("z-[var(--z-tooltip)]");
/**
* 气泡本体 + `::after` 画的小三角。
*
* 三角用逻辑方向的 border 工具类（`border-s-*` / `border-e-*`），
* 所以 side=left/right 在 RTL 下会自动镜像；居中则靠 `inset-*-0 + m*-auto`，
* 避开 `left-1/2 + -translate-x-1/2` 那种需要手动镜像的写法。
*/
const tooltipPopupVariants = cva([
	"font-mono text-caption text-foreground-display",
	"rounded-sm border border-border-visible bg-surface-raised px-3 py-1",
	"pointer-events-none whitespace-nowrap",
	...overlayTooltipMotion,
	"after:absolute after:size-0 after:content-['']"
], {
	variants: {
		visible: {
			true: "scale-100 opacity-100",
			false: ""
		},
		side: {
			top: "after:-bottom-1 after:inset-x-0 after:mx-auto after:border-x-4 after:border-t-4 after:border-x-transparent after:border-t-surface-raised",
			bottom: "after:-top-1 after:inset-x-0 after:mx-auto after:border-x-4 after:border-b-4 after:border-x-transparent after:border-b-surface-raised",
			left: "after:-end-1 after:inset-y-0 after:my-auto after:border-y-4 after:border-s-4 after:border-y-transparent after:border-s-surface-raised",
			right: "after:-start-1 after:inset-y-0 after:my-auto after:border-y-4 after:border-e-4 after:border-y-transparent after:border-e-surface-raised"
		}
	},
	defaultVariants: {
		visible: false,
		side: "top"
	}
});
//#endregion
export { tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants };

//# sourceMappingURL=tooltip-variants.mjs.map