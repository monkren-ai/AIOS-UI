import { overlayMenuMotion } from "../lib/overlay-motion.mjs";
import { cva } from "class-variance-authority";
//#region src/HoverCard/hover-card-variants.ts
const hoverCardTriggerVariants = cva("inline-block");
const hoverCardPositionerVariants = cva("z-[var(--z-popover)]");
/**
* 悬浮卡本体。与 Popover 同形，但 `pointer-events-auto`——
* 鼠标可以从触发器滑进卡片里而不触发关闭。
*/
const hoverCardContentVariants = cva([
	"pointer-events-auto",
	"rounded-md border border-border-visible bg-popover p-4 text-popover-foreground",
	...overlayMenuMotion
], {
	variants: {
		visible: {
			true: "scale-100 opacity-100",
			false: ""
		},
		side: {
			top: "",
			bottom: ""
		}
	},
	defaultVariants: {
		visible: false,
		side: "bottom"
	}
});
//#endregion
export { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants };

//# sourceMappingURL=hover-card-variants.mjs.map