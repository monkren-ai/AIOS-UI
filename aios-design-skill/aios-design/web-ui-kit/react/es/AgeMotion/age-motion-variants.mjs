import { cva } from "class-variance-authority";
//#region src/AgeMotion/age-motion-variants.ts
/**
* AgeMotion 的视觉变体。
*
* 秒级跳动的是数字本身而不是 CSS 动画，只有进度条的宽度/配色用补间。
* `motion-reduce` 关掉的是补间,读数仍然每秒刷新到正确值。
*
* `size`(sm/md/lg) 保持结构兼容，配色统一读取全局语义 token。
*/
const ageMotionVariants = cva([
	"flex w-full flex-col",
	"rounded-lg border border-border bg-surface p-8",
	"transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
], {
	variants: { size: {
		sm: "",
		md: "",
		lg: ""
	} },
	defaultVariants: { size: "md" }
});
/** 出生日期输入框的标签。 */
const ageInputLabelVariants = cva(["font-mono text-label uppercase tracking-[0.06em] text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 出生日期输入框。 */
const ageInputFieldVariants = cva([
	"w-full min-h-11 border-0 border-b border-solid border-border-visible bg-transparent py-2",
	"font-mono text-base tabular-nums text-foreground outline-none",
	"placeholder:text-foreground-disabled",
	"focus:border-b-foreground",
	"transition-[border-color,color] duration-200 ease-aios motion-reduce:transition-none"
]);
/** 年 / 月 / 日 的大号读数。 */
const ageValueVariants = cva(["font-display text-display-lg font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground-display", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 大号读数下的单位名。 */
const ageUnitLabelVariants = cva(["font-mono text-label uppercase tracking-[0.08em] text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 总时/分/秒那一行。 */
const ageSecondaryVariants = cva(["font-mono text-sm tracking-[0.04em] tabular-nums text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 「LIFE PROGRESS」这类分区标题。 */
const ageSectionLabelVariants = cva(["font-mono text-label uppercase tracking-[0.08em] text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 十年一格的人生进度格。 */
const ageDecadeSegmentVariants = cva(["relative flex h-6 flex-1 items-center justify-center overflow-hidden", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { state: {
		upcoming: "bg-border",
		current: "bg-border",
		completed: "bg-foreground-display"
	} },
	defaultVariants: { state: "upcoming" }
});
/** 当前十年格里的填充条,宽度由内联 style 给。 */
const ageDecadeFillVariants = cva(["absolute top-0 start-0 h-full bg-warning", "transition-[width] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 十年格上的 "0-10" 文字。 */
const ageDecadeLabelVariants = cva(["relative z-[1] font-mono text-micro uppercase tracking-[0.04em] tabular-nums", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { state: {
		upcoming: "text-foreground-disabled",
		current: "text-foreground",
		completed: "text-surface"
	} },
	defaultVariants: { state: "upcoming" }
});
/** 年度进度条里的一格。 */
const ageYearSegmentVariants = cva(["flex-1 transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { filled: {
		true: "bg-interactive",
		false: "bg-border"
	} },
	defaultVariants: { filled: false }
});
/** 年度进度百分比。 */
const ageYearPercentVariants = cva(["mt-1 font-mono text-caption tabular-nums text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
//#endregion
export { ageDecadeFillVariants, ageDecadeLabelVariants, ageDecadeSegmentVariants, ageInputFieldVariants, ageInputLabelVariants, ageMotionVariants, ageSecondaryVariants, ageSectionLabelVariants, ageUnitLabelVariants, ageValueVariants, ageYearPercentVariants, ageYearSegmentVariants };

//# sourceMappingURL=age-motion-variants.mjs.map