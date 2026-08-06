//#region src/Countdown/countdown-variants.d.ts
/**
 * Countdown 的视觉变体。
 *
 * `state` 是读数配色：running 用 display 白，urgent（进入 threshold 区间）升到
 * Nothing 红，done 回到最弱一档。容器只承担布局与过渡，数字配色走 numberVariants。
 */
declare const countdownVariants: (props?: ({
  state?: "running" | "urgent" | "done" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Doto 大数字读数。urgent 升红，done 压到 muted。 */
declare const countdownNumberVariants: (props?: ({
  state?: "running" | "urgent" | "done" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type CountdownState = 'running' | 'urgent' | 'done';
//#endregion
export { CountdownState, countdownNumberVariants, countdownVariants };
//# sourceMappingURL=countdown-variants.d.mts.map