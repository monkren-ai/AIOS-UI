import { cva } from "class-variance-authority";
//#region src/SunDial/sun-dial-variants.ts
/**
* SunDial 的视觉变体。
*
* 太阳沿弧线走的是「位置」而不是关键帧动画——位置由当前时间算出来，
* 只有落点变化时的补间用 transition。所以 `motion-reduce` 下关掉补间以后，
* 太阳仍然停在正确的当前位置，组件不会变空或者卡住。
*/
const sunDialVariants = cva([
	"flex w-full flex-col items-center",
	"rounded-lg border border-border bg-surface p-8",
	"transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
], {
	variants: {
		time: {
			day: "",
			night: ""
		},
		theme: {
			light: "",
			dark: ""
		}
	},
	defaultVariants: {
		time: "day",
		theme: "dark"
	}
});
/** [DAY] / [NIGHT] 状态标。 */
const sunDialStatusVariants = cva(["font-mono text-label uppercase tracking-[0.1em]", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { time: {
		day: "text-warning",
		night: "text-interactive"
	} },
	defaultVariants: { time: "day" }
});
/** 经纬度。 */
const sunDialLocationVariants = cva(["font-mono text-label uppercase tracking-[0.06em] tabular-nums text-foreground-disabled", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 白天那半段弧。 */
const sunDialArcDayVariants = cva(["fill-none stroke-foreground-display [stroke-linecap:round] [stroke-width:3]", "transition-[stroke] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 夜里那半段弧，虚线。 */
const sunDialArcNightVariants = cva(["fill-none stroke-border [stroke-dasharray:6_4] [stroke-linecap:round] [stroke-width:3]", "transition-[stroke] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 太阳标记。 */
const sunDialSunMarkerVariants = cva(["transition-[transform,opacity] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 太阳实心点。 */
const sunDialSunCoreVariants = cva(["fill-warning transition-[fill] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 太阳外圈的淡晕。是一个 20% 不透明度的实心圆，不是 blur。 */
const sunDialSunGlowVariants = cva(["fill-warning opacity-20", "transition-[fill] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 日出 / 日落时间块。 */
const sunDialTimeBlockVariants = cva(["absolute top-full mt-1 flex flex-col gap-0.5"], {
	variants: { edge: {
		sunrise: "start-0 items-start",
		sunset: "end-0 items-end"
	} },
	defaultVariants: { edge: "sunrise" }
});
/** 「SUNRISE」这类小标签。 */
const sunDialTimeLabelVariants = cva(["font-mono text-label uppercase tracking-[0.08em] text-foreground-disabled", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 日出 / 日落的具体时刻。 */
const sunDialTimeValueVariants = cva(["font-mono text-base font-bold tabular-nums text-foreground-display", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 当前时刻的大字。 */
const sunDialCurrentTimeVariants = cva(["mb-2 font-display text-display-md font-semibold tracking-[-0.02em] tabular-nums text-foreground-display", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 「还剩几小时天光」。 */
const sunDialRemainingVariants = cva(["font-mono text-sm uppercase tracking-[0.08em] tabular-nums text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
//#endregion
export { sunDialArcDayVariants, sunDialArcNightVariants, sunDialCurrentTimeVariants, sunDialLocationVariants, sunDialRemainingVariants, sunDialStatusVariants, sunDialSunCoreVariants, sunDialSunGlowVariants, sunDialSunMarkerVariants, sunDialTimeBlockVariants, sunDialTimeLabelVariants, sunDialTimeValueVariants, sunDialVariants };

//# sourceMappingURL=sun-dial-variants.mjs.map