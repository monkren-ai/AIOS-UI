import { cva } from "class-variance-authority";
//#region src/PhotoCarousel/photo-carousel-variants.ts
/**
* PhotoCarousel 的视觉变体。
*
* 轮播的「前进方向」跟着书写方向走：上一张/下一张按钮在 flex 行里靠 RTL
* 自动换位，箭头本身用 `rtl:-scale-x-100` 翻面，计数器用 `text-end` 贴行尾。
*/
const photoCarouselVariants = cva(["flex w-full flex-col rounded-lg border border-border bg-surface p-8", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"], {
	variants: {
		orientation: {
			horizontal: "",
			vertical: ""
		},
		autoplay: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		orientation: "horizontal",
		autoplay: false
	}
});
/** 舞台。16:9，裁掉溢出。 */
const carouselContainerVariants = cva(["relative mb-6 aspect-video w-full overflow-hidden border border-border bg-surface-raised", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
/** 单张幻灯片。淡入淡出，非当前张保持在 DOM 里但透明。 */
const carouselSlideVariants = cva(["absolute inset-0 flex size-full flex-col items-center justify-center text-foreground", "transition-opacity duration-[350ms] ease-nothing motion-reduce:transition-none"], {
	variants: { active: {
		true: "opacity-100",
		false: "opacity-0"
	} },
	defaultVariants: { active: false }
});
/** 没有图片时的几何占位图标。 */
const carouselSlideIconVariants = cva(["mb-2 stroke-foreground-muted", "transition-[stroke] duration-[350ms] ease-nothing motion-reduce:transition-none"]);
/** 幻灯片上的文字块。 */
const carouselSlideTextVariants = cva(["mt-2 flex flex-col gap-0.5 text-center"]);
const carouselSlideTitleVariants = cva(["font-body text-subheading text-foreground", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
const carouselSlideSubtitleVariants = cva(["font-mono text-label uppercase tracking-[0.12em] text-foreground-muted"]);
/** 底部控制条。 */
const carouselControlsVariants = cva(["flex items-center justify-between gap-4"]);
const carouselNavButtonsVariants = cva(["flex gap-2"]);
/** 上一张 / 下一张。箭头在 RTL 下整体翻面。 */
const carouselNavButtonVariants = cva([
	"flex size-10 cursor-pointer items-center justify-center",
	"border border-border bg-surface-raised text-foreground",
	"transition-[background-color,border-color,color] duration-200 ease-nothing motion-reduce:transition-none",
	"hover:border-foreground-muted",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_svg]:size-5 [&_svg]:rtl:-scale-x-100",
	"[&_path]:stroke-current"
]);
const carouselIndicatorsVariants = cva(["flex gap-1"]);
/** 页码圆点。 */
const carouselIndicatorVariants = cva([
	"size-2 cursor-pointer rounded-full",
	"transition-colors duration-200 ease-nothing motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: { active: {
		true: "bg-accent",
		false: "bg-border hover:bg-foreground-muted"
	} },
	defaultVariants: { active: false }
});
/** 计数器容器。贴行尾，RTL 下自动换边。 */
const carouselInfoVariants = cva(["flex-1 text-end"]);
const carouselCounterVariants = cva(["font-mono text-caption tabular-nums text-foreground-muted", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
//#endregion
export { carouselContainerVariants, carouselControlsVariants, carouselCounterVariants, carouselIndicatorVariants, carouselIndicatorsVariants, carouselInfoVariants, carouselNavButtonVariants, carouselNavButtonsVariants, carouselSlideIconVariants, carouselSlideSubtitleVariants, carouselSlideTextVariants, carouselSlideTitleVariants, carouselSlideVariants, photoCarouselVariants };

//# sourceMappingURL=photo-carousel-variants.mjs.map