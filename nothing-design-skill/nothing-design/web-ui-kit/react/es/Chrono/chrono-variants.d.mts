//#region src/Chrono/chrono-variants.d.ts
/**
 * Chrono（秒表）的视觉变体。
 *
 * v1 的 `size` 只是挂了个类名、没有对应样式；这里给 sm/lg 补上内边距梯度，
 * `md` 保持与 v1 完全一致（32px 内边距）。
 */
declare const chronoVariants: (props?: ({
  state?: "running" | "idle" | "paused" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { chronoVariants };
//# sourceMappingURL=chrono-variants.d.mts.map