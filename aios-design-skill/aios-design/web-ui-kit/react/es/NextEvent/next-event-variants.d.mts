//#region src/NextEvent/next-event-variants.d.ts
/**
 * NextEvent 药丸卡的视觉变体。
 *
 * `priority` 只影响倒计时的颜色（见 `nextEventCountdownVariants`），
 * 容器本身在 v1 里就没有对应样式，这里保持不变。
 *
 * demo 数据沿用 v1 的 `::after` 角标，靠 `after:content-['SIM']` 实现。
 * 角标不能挂在 `data-[real=false]` 上——`dataAttr(false)` 根本不输出属性，
 * 选择器永远选不中，所以走 `real` 这个布尔变体。
 */
declare const nextEventVariants: (props?: ({
  theme?: "light" | "dark" | null | undefined;
  priority?: "normal" | "low" | "high" | null | undefined;
  real?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { nextEventVariants };
//# sourceMappingURL=next-event-variants.d.mts.map