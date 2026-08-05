import { cva } from "class-variance-authority";
//#region src/WalkieTalkie/walkie-talkie-variants.ts
/**
* WalkieTalkie 的视觉变体。
*
* `status` 描述的是对讲机自身的状态机（待机 / 发射中 / 已发送），
* 不参与 §3 的强调层级词表。
*/
const walkieTalkieVariants = cva(["flex w-full select-none flex-col items-center rounded-lg border border-border bg-surface p-8", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"], {
	variants: { status: {
		ready: "",
		transmitting: "",
		sent: ""
	} },
	defaultVariants: { status: "ready" }
});
/** 频道选择行。 */
const walkieChannelVariants = cva(["mb-6 flex w-full items-center justify-center gap-2"]);
const walkieChannelLabelVariants = cva(["font-mono text-label uppercase tracking-[0.1em] text-foreground-muted", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
const walkieChannelNumberVariants = cva(["font-mono text-base font-bold tabular-nums text-foreground-display", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
/** 频道加减按钮。 */
const walkieChannelButtonVariants = cva([
	"flex size-7 cursor-pointer items-center justify-center",
	"border border-border bg-transparent text-foreground",
	"transition-[background-color,border-color,color] duration-200 ease-nothing motion-reduce:transition-none",
	"hover:border-foreground-muted active:bg-surface-raised",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_svg]:size-3.5",
	"[&_polyline]:fill-none [&_polyline]:stroke-current [&_polyline]:stroke-2",
	"[&_polyline]:[stroke-linecap:round] [&_polyline]:[stroke-linejoin:round]"
]);
/** PTT 按钮与它外面三圈扩散环的定位容器。 */
const walkiePttAreaVariants = cva(["relative mb-6 flex items-center justify-center"]);
/** Push-to-talk 按钮。 */
const walkiePttVariants = cva([
	"relative z-2 flex size-20 cursor-pointer items-center justify-center rounded-full",
	"border-2 border-border-visible bg-surface-raised text-foreground",
	"transition-[background-color,border-color,color,transform] duration-200 ease-nothing",
	"motion-reduce:transition-none",
	"hover:border-foreground-muted",
	"active:scale-95 active:border-accent active:bg-accent motion-reduce:active:scale-100",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_svg]:size-7 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-2",
	"[&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]"
], {
	variants: { active: {
		true: "scale-95 border-accent bg-accent text-foreground-display motion-reduce:scale-100",
		false: ""
	} },
	defaultVariants: { active: false }
});
/**
* 发射时向外扩散的三圈涟漪。
*
* 用 `inset-0 + m-auto` 居中而不是 `left-1/2 + translate(-50%)`：
* 一来不写物理属性，二来 keyframes 里的 `transform` 只剩缩放，
* 不会跟居中用的位移打架。
*/
const walkiePulseVariants = cva(["pointer-events-none absolute inset-0 z-1 m-auto size-20 rounded-full border-2 border-accent opacity-0"], {
	variants: {
		transmitting: {
			true: "motion-safe:animate-[walkie-pulse-anim_1.2s_ease-out_infinite] motion-reduce:animate-none",
			false: ""
		},
		index: {
			0: "",
			1: "[animation-delay:0.4s]",
			2: "[animation-delay:0.8s]"
		}
	},
	defaultVariants: {
		transmitting: false,
		index: 0
	}
});
/** 状态读数。 */
const walkieStatusVariants = cva(["mb-6 font-mono text-sm uppercase tracking-[0.1em]", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"], {
	variants: { status: {
		ready: "text-foreground-muted",
		transmitting: "text-accent",
		sent: "text-success"
	} },
	defaultVariants: { status: "ready" }
});
/** 音量条容器。 */
const walkieVolumeVariants = cva(["mb-2 flex h-8 items-end gap-0.5"]);
/** 单根音量条。 */
const walkieVolumeSegmentVariants = cva(["w-2 transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"], {
	variants: { filled: {
		true: "bg-foreground-display",
		false: "bg-border"
	} },
	defaultVariants: { filled: false }
});
const walkieVolumeLabelVariants = cva(["font-mono text-label uppercase tracking-widest text-foreground-disabled", "transition-colors duration-[350ms] ease-nothing motion-reduce:transition-none"]);
//#endregion
export { walkieChannelButtonVariants, walkieChannelLabelVariants, walkieChannelNumberVariants, walkieChannelVariants, walkiePttAreaVariants, walkiePttVariants, walkiePulseVariants, walkieStatusVariants, walkieTalkieVariants, walkieVolumeLabelVariants, walkieVolumeSegmentVariants, walkieVolumeVariants };

//# sourceMappingURL=walkie-talkie-variants.mjs.map