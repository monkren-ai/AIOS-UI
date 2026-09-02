//#region src/QuickToggle/quick-toggle-variants.d.ts
/**
 * QuickToggle 的视觉变体。
 *
 * v1 里 `active` 只挂了 `--active` 类名、没有对应 CSS，所以它不改变外观，
 * 只通过 `aria-pressed` / `data-state` 暴露。这里保持一致。
 */
declare const quickToggleVariants: (props?: ({
  variant?: "circle" | "pill" | null | undefined;
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { quickToggleVariants };
//# sourceMappingURL=quick-toggle-variants.d.mts.map