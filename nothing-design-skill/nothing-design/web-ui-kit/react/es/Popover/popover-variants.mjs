import { cva } from "class-variance-authority";
//#region src/Popover/popover-variants.ts
const popoverTriggerVariants = cva("inline-block cursor-pointer");
const popoverPositionerVariants = cva("z-[var(--z-popover)]");
/**
* 浮层本体。
*
* v1 用 `@keyframes` 做进场；v2 换成由 Base UI 的 `data-open` / `data-closed`
* 驱动的 transition——同样是 0.95 → 1 的缩放淡入，但退场也能跟着走。
*/
const popoverContentVariants = cva([
	"rounded-md border border-border-visible bg-popover p-4 text-popover-foreground",
	"transition-[opacity,transform] duration-[var(--duration-spring-moderate)] ease-spring-moderate",
	"motion-reduce:transition-none",
	"closed:scale-95 closed:opacity-0 open:scale-100 open:opacity-100"
], {
	variants: {
		visible: {
			true: "scale-100 opacity-100",
			false: ""
		},
		side: {
			top: "",
			bottom: "",
			left: "",
			right: ""
		}
	},
	defaultVariants: {
		visible: false,
		side: "bottom"
	}
});
//#endregion
export { popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants };

//# sourceMappingURL=popover-variants.mjs.map