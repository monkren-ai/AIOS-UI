import { cva } from "class-variance-authority";
//#region src/Skeleton/skeleton-variants.ts
/**
* Skeleton 的视觉变体。
*
* appica 原版是灰色实心块占位——Nothing 禁止灰色块，所以这里改造成点阵呼吸占位：
* 容器内是一组小圆点，整体在 0.4↔0.8 透明度之间循环呼吸（keyframes 见 Skeleton.css）。
* `variant` 只决定形状（圆角），不参与配色；颜色统一走点的 `--text-disabled`。
*/
const skeletonVariants = cva(["aios-skeleton", "relative grid gap-0.5 overflow-hidden opacity-60"], {
	variants: {
		variant: {
			text: "rounded-none",
			rect: "rounded-card",
			circle: "rounded-full"
		},
		animate: {
			true: "motion-safe:animate-[aios-skeleton-breathe_1.6s_var(--ease-aios)_infinite]",
			false: ""
		}
	},
	defaultVariants: {
		variant: "text",
		animate: true
	}
});
/**
* 单个点。
*
* 颜色用 `--text-disabled`，与 DotMatrix 的暗点同源；尺寸固定 3px，不随形状变化。
* 保留 `variant` 轴为日后按形状微调点尺寸留口子，当前各形状一致。
*/
const skeletonDotVariants = cva(["aios-skeleton__dot", "size-[3px] rounded-full bg-foreground-disabled"], {
	variants: { variant: {
		text: "",
		rect: "",
		circle: ""
	} },
	defaultVariants: { variant: "text" }
});
//#endregion
export { skeletonDotVariants, skeletonVariants };

//# sourceMappingURL=skeleton-variants.mjs.map