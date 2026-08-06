//#region src/Pomodoro/pomodoro-variants.d.ts
/**
 * Pomodoro 的视觉变体。
 *
 * phase 的配色落在子元素上（状态标、倒计时、进度格），容器本身不换色。
 */
declare const pomodoroVariants: (props?: ({
  phase?: "work" | "break" | null | undefined;
  running?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { pomodoroVariants };
//# sourceMappingURL=pomodoro-variants.d.mts.map