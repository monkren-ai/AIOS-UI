import { cva } from "class-variance-authority";
//#region src/Pomodoro/pomodoro-variants.ts
/**
* Pomodoro 的视觉变体。
*
* phase 的配色落在子元素上（状态标、倒计时、进度格），容器本身不换色。
*/
const pomodoroVariants = cva([
	"flex w-full flex-col items-center",
	"rounded-lg border border-border bg-surface p-8",
	"transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"
], {
	variants: {
		phase: {
			work: "",
			break: ""
		},
		running: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		phase: "work",
		running: false
	}
});
/** 顶部标题。 */
const pomodoroTitleVariants = cva(["font-mono text-label uppercase tracking-widest text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 已完成的番茄数。 */
const pomodoroCountVariants = cva(["font-mono text-caption tabular-nums text-foreground-disabled", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 倒计时读数。休息段跟着状态标一起转绿。 */
const pomodoroTimerVariants = cva(["mb-4 font-display text-display-xl font-semibold leading-none tracking-[-0.02em] tabular-nums", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { phase: {
		work: "text-foreground-display",
		break: "text-success"
	} },
	defaultVariants: { phase: "work" }
});
/** [WORK] / [BREAK] 状态标。 */
const pomodoroStatusVariants = cva(["mb-6 font-mono text-sm uppercase tracking-[0.12em]", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { phase: {
		work: "text-accent",
		break: "text-success"
	} },
	defaultVariants: { phase: "work" }
});
/** 进度条的单格。只有已填充的格子跟 phase 换色。 */
const pomodoroSegmentVariants = cva(["flex-1 transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: {
		filled: {
			true: "",
			false: "bg-border"
		},
		phase: {
			work: "",
			break: ""
		}
	},
	compoundVariants: [{
		filled: true,
		phase: "work",
		class: "bg-accent"
	}, {
		filled: true,
		phase: "break",
		class: "bg-success"
	}],
	defaultVariants: {
		filled: false,
		phase: "work"
	}
});
/** Start / Reset 按钮。 */
const pomodoroButtonVariants = cva([
	"cursor-pointer border bg-transparent px-6 py-2",
	"font-mono text-caption uppercase tracking-widest text-foreground",
	"transition-[background-color,border-color,color] duration-200 ease-aios",
	"motion-reduce:transition-none",
	"hover:border-foreground-muted hover:bg-surface-raised active:border-foreground",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2"
], {
	variants: { emphasis: {
		primary: "border-border-visible bg-surface-raised hover:border-foreground",
		default: "border-border"
	} },
	defaultVariants: { emphasis: "default" }
});
//#endregion
export { pomodoroButtonVariants, pomodoroCountVariants, pomodoroSegmentVariants, pomodoroStatusVariants, pomodoroTimerVariants, pomodoroTitleVariants, pomodoroVariants };

//# sourceMappingURL=pomodoro-variants.mjs.map