import { cva } from "class-variance-authority";
//#region src/MusicPlayer/music-player-variants.ts
/**
* MusicPlayer 的视觉变体。
*
* 三个版型差别很大，所以 `variant` 在这里描述的是版型而不是 §3 的强调层级：
* - `default` 是一张完整的播放器卡片（走语义令牌，跟随 [data-theme]）；
* - `compact` 是桌面小组件的窄条（走 widget 色板，不跟随主题）；
* - `mini` 直接复用 widget-card 那套既有类，样式不在本文件里。
*/
const musicPlayerVariants = cva([], {
	variants: {
		variant: {
			default: ["flex w-full flex-col rounded-lg border border-border bg-surface p-8", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"].join(" "),
			compact: ["flex w-full flex-col gap-3 rounded-lg border-0 bg-[var(--widget-bg)] p-4", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"].join(" "),
			mini: ""
		},
		recording: {
			true: "",
			false: ""
		}
	},
	defaultVariants: {
		variant: "default",
		recording: false
	}
});
/** 专辑封面占位。 */
const playerAlbumArtVariants = cva([
	"mb-6 flex aspect-square w-full items-center justify-center border border-border bg-surface-raised",
	"transition-colors duration-[350ms] ease-aios motion-reduce:transition-none",
	"[&_svg]:h-2/5 [&_svg]:w-2/5 [&_svg]:opacity-50",
	"[&_circle]:fill-none [&_circle]:stroke-foreground-muted"
]);
const playerInfoVariants = cva(["mb-6"]);
const playerTitleVariants = cva(["mb-1 font-body text-heading font-bold tracking-[-0.02em] text-foreground-display", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
const playerArtistVariants = cva(["font-mono text-sm uppercase tracking-widest text-foreground-muted", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
const playerRecordingIndicatorVariants = cva(["mt-1 inline-flex items-center"]);
const playerProgressVariants = cva(["mb-6"]);
const playerProgressBarVariants = cva(["mb-2 flex h-2 w-full gap-0.5"]);
/** 进度条的单个刻度。 */
const playerProgressSegmentVariants = cva(["flex-1 transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"], {
	variants: { filled: {
		true: "bg-accent",
		false: "bg-border"
	} },
	defaultVariants: { filled: false }
});
/** 当前时间 / 总时长。 */
const playerTimeVariants = cva(["flex justify-between font-mono text-caption tabular-nums text-foreground-disabled", "transition-colors duration-[350ms] ease-aios motion-reduce:transition-none"]);
const playerControlsVariants = cva(["flex items-center justify-center gap-4"]);
/** 播放控制按钮。`primary` 是中间那颗更大的播放/暂停键。 */
const playerButtonVariants = cva([
	"flex cursor-pointer items-center justify-center rounded-md",
	"border bg-transparent text-foreground",
	"transition-[background-color,border-color,color] duration-200 ease-aios motion-reduce:transition-none",
	"outline-none focus-visible:outline-2 focus-visible:outline-interactive focus-visible:outline-offset-2",
	"[&_path]:fill-none [&_path]:stroke-current"
], {
	variants: { primary: {
		true: "size-14 border-border-visible bg-surface-raised hover:border-foreground [&_svg]:size-6",
		false: "size-10 border-border hover:border-foreground-muted [&_svg]:size-5"
	} },
	defaultVariants: { primary: false }
});
const playerCompactTopVariants = cva(["flex w-full items-start justify-between"]);
const playerCompactAlbumVariants = cva([
	"flex size-16 min-h-16 min-w-16 items-center justify-center overflow-hidden rounded-sm",
	"bg-[var(--widget-dark-2)]",
	"[&_svg]:size-8 [&_path]:fill-none [&_path]:stroke-[var(--widget-white)]"
]);
const playerCompactSourceVariants = cva(["flex size-6 min-h-6 min-w-6 items-center justify-center [&_svg]:size-full"]);
const playerCompactInfoVariants = cva(["flex w-full items-center gap-1"]);
const playerCompactInfoTextVariants = cva(["overflow-hidden text-ellipsis whitespace-nowrap", "font-body text-sm font-normal leading-normal text-[var(--widget-dark-4)]"]);
const playerCompactProgressVariants = cva(["h-0.5 w-full overflow-hidden rounded-[1px] bg-[var(--widget-dark-3)]"]);
const playerCompactProgressFillVariants = cva(["h-full rounded-[1px] bg-[var(--widget-white)]", "transition-[width] duration-[350ms] ease-aios motion-reduce:transition-none"]);
/** 录制指示点。闪烁的 keyframes 留在 MusicPlayer.css 里。 */
const blinkingSeparatorVariants = cva(["inline-block size-1.5 min-h-1.5 min-w-1.5 shrink-0 rounded-full bg-[var(--widget-primary)]"], {
	variants: { active: {
		true: "motion-safe:animate-[aios-blink_1s_ease-in-out_infinite] motion-reduce:animate-none",
		false: ""
	} },
	defaultVariants: { active: false }
});
//#endregion
export { blinkingSeparatorVariants, musicPlayerVariants, playerAlbumArtVariants, playerArtistVariants, playerButtonVariants, playerCompactAlbumVariants, playerCompactInfoTextVariants, playerCompactInfoVariants, playerCompactProgressFillVariants, playerCompactProgressVariants, playerCompactSourceVariants, playerCompactTopVariants, playerControlsVariants, playerInfoVariants, playerProgressBarVariants, playerProgressSegmentVariants, playerProgressVariants, playerRecordingIndicatorVariants, playerTimeVariants, playerTitleVariants };

//# sourceMappingURL=music-player-variants.mjs.map