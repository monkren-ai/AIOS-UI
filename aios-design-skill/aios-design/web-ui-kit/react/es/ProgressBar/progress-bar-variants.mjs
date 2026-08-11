import { cva } from "class-variance-authority";
//#region src/ProgressBar/progress-bar-variants.ts
/**
* ProgressBar 的视觉变体。
*
* AIOS 的进度条是「分段刻度」而不是连续条：轨道被切成 N 段，填满的用
* text-display 色，空的用 border 色。`slim` 是没有读数的 4px 细轨。
*
* 注：`variant` 这里描述的是结构（分段 / 细轨）而非 §3 的强调词表——
* 进度条不参与 primary / secondary 那套语义层级。
*/
const progressBarVariants = cva(["flex flex-col gap-2"], {
	variants: {
		variant: {
			segmented: "",
			slim: ""
		},
		size: {
			sm: "",
			md: "",
			lg: ""
		},
		disabled: {
			true: "opacity-40",
			false: ""
		}
	},
	defaultVariants: {
		variant: "segmented",
		size: "md",
		disabled: false
	}
});
/** 轨道。高度跟着 size 走，indeterminate 时自己就是底色。 */
const progressTrackVariants = cva(["relative flex w-full overflow-hidden"], {
	variants: {
		variant: {
			segmented: "gap-0.5",
			slim: "gap-px"
		},
		size: {
			sm: "h-[5px]",
			md: "h-2.5",
			lg: "h-5"
		},
		indeterminate: {
			true: "rounded-2xs bg-border light:bg-border-visible",
			false: ""
		}
	},
	compoundVariants: [{
		variant: "slim",
		class: "h-1"
	}],
	defaultVariants: {
		variant: "segmented",
		size: "md",
		indeterminate: false
	}
});
/** 单个刻度块。首尾两段带外圆角。 */
const progressSegmentVariants = cva([
	"flex-1 rounded-none",
	"first:rounded-s-2xs last:rounded-e-2xs",
	"transition-colors duration-200 ease-aios motion-reduce:transition-none"
], {
	variants: {
		state: {
			empty: "bg-border light:bg-border-visible",
			filled: "bg-foreground-display",
			good: "bg-success",
			warning: "bg-warning",
			overlimit: "bg-accent",
			error: "bg-error"
		},
		size: {
			sm: "min-w-0.5",
			md: "min-w-1",
			lg: "min-w-2"
		},
		variant: {
			segmented: "",
			slim: "min-w-px"
		}
	},
	defaultVariants: {
		state: "empty",
		size: "md",
		variant: "segmented"
	}
});
/**
* 不定量进度的游标。
*
* 动效走 `motion-safe:`；`motion-reduce:` 下换成整条轨道的呼吸，不再横向平移。
*
* keyframes 里的 `translateX` 是物理方向，逻辑属性管不到，而 `-scale-x-100`
* 这类工具类又会被 animation 自己的 `transform` 覆盖掉，所以 RTL 单独挂一条
* 反向 keyframes，保证游标始终从行首扫向行尾。
*/
const progressIndeterminateVariants = cva([
	"absolute inset-y-0 start-0 w-2/5 rounded-2xs bg-foreground-display",
	"motion-safe:animate-[aios-progress-indeterminate_1.5s_linear_infinite]",
	"motion-safe:rtl:animate-[aios-progress-indeterminate-rtl_1.5s_linear_infinite]",
	"motion-reduce:w-full motion-reduce:animate-[aios-progress-indeterminate-pulse_1.5s_ease-in-out_infinite]"
]);
/** 读数行的数值。 */
const progressValueVariants = cva(["font-mono text-base tabular-nums"], {
	variants: { status: {
		default: "text-foreground",
		good: "text-success",
		warning: "text-warning",
		overlimit: "text-accent",
		error: "text-error"
	} },
	defaultVariants: { status: "default" }
});
/** v1 的尺寸名 → 当前尺寸名。 */
const LEGACY_SIZES = {
	hero: "lg",
	standard: "md",
	compact: "sm"
};
/** v1 的变体名 → 当前变体名。 */
const LEGACY_VARIANTS = { default: "segmented" };
function resolveProgressBarSize(size) {
	if (!size) return void 0;
	return LEGACY_SIZES[size] ?? size;
}
function resolveProgressBarVariant(variant) {
	if (!variant) return void 0;
	return LEGACY_VARIANTS[variant] ?? variant;
}
//#endregion
export { progressBarVariants, progressIndeterminateVariants, progressSegmentVariants, progressTrackVariants, progressValueVariants, resolveProgressBarSize, resolveProgressBarVariant };

//# sourceMappingURL=progress-bar-variants.mjs.map