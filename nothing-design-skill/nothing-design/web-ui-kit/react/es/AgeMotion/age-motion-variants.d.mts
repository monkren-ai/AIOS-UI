//#region src/AgeMotion/age-motion-variants.d.ts
/**
 * AgeMotion 的视觉变体。
 *
 * 秒级跳动的是数字本身而不是 CSS 动画，只有进度条的宽度/配色用补间。
 * `motion-reduce` 关掉的是补间,读数仍然每秒刷新到正确值。
 *
 * v1 的 `size`(sm/md/lg) 和 `theme`(light/dark) 只挂了类名、没有任何 CSS,
 * 这里保持为空变体,状态改由 `data-size` / `data-widget-theme` 暴露。
 */
declare const ageMotionVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  theme?: "light" | "dark" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { ageMotionVariants };
//# sourceMappingURL=age-motion-variants.d.mts.map