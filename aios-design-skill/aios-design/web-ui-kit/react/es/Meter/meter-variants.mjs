import { cva } from "class-variance-authority";
//#region src/Meter/meter-variants.ts
/**
* Meter 的视觉变体。
*
* 量规与 ProgressBar 的关键区别：进度条是「过程」，meter 是「状态」。所以
* meter 的分段轨保持中性（填充 = foreground，空 = border），状态色只落在
* 数值本身上——`--warning` / `--accent` 不会染整条背景。
*/
const meterVariants = cva(["flex flex-col gap-2"], {
	variants: { size: {
		sm: "",
		md: "",
		lg: ""
	} },
	defaultVariants: { size: "md" }
});
/** 分段轨。高度跟着 size 走。 */
const meterTrackVariants = cva(["relative flex w-full overflow-hidden gap-0.5"], {
	variants: { size: {
		sm: "h-1.5",
		md: "h-2.5",
		lg: "h-5"
	} },
	defaultVariants: { size: "md" }
});
/** 单个刻度块。首尾两段带外圆角，填充态中性，不参与状态色。 */
const meterSegmentVariants = cva([
	"flex-1 rounded-none",
	"first:rounded-s-2xs last:rounded-e-2xs",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none"
], {
	variants: {
		state: {
			empty: "bg-border light:bg-border-visible",
			filled: "bg-foreground-display"
		},
		size: {
			sm: "min-w-0.5",
			md: "min-w-1",
			lg: "min-w-2"
		}
	},
	defaultVariants: {
		state: "empty",
		size: "md"
	}
});
/** 数值本身按 zone 变色：good 用默认前景色，warning 黄，critical 红。 */
const meterValueVariants = cva(["font-mono tabular-nums"], {
	variants: {
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base"
		},
		zone: {
			good: "text-foreground",
			warning: "text-warning",
			critical: "text-accent"
		}
	},
	defaultVariants: {
		size: "md",
		zone: "good"
	}
});
/** 临界值竖标：从轨顶到轨底的 1px 细线，标出 low / high 的位置。 */
const meterMarkerVariants = cva(["absolute inset-y-0 w-px bg-border-visible"]);
//#endregion
export { meterMarkerVariants, meterSegmentVariants, meterTrackVariants, meterValueVariants, meterVariants };

//# sourceMappingURL=meter-variants.mjs.map