//#region src/SunDial/sun-dial-variants.d.ts
/**
 * SunDial 的视觉变体。
 *
 * 太阳沿弧线走的是「位置」而不是关键帧动画——位置由当前时间算出来，
 * 只有落点变化时的补间用 transition。所以 `motion-reduce` 下关掉补间以后，
 * 太阳仍然停在正确的当前位置，组件不会变空或者卡住。
 */
declare const sunDialVariants: (props?: ({
  time?: "day" | "night" | null | undefined;
  theme?: "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { sunDialVariants };
//# sourceMappingURL=sun-dial-variants.d.mts.map