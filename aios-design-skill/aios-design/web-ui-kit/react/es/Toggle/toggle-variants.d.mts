//#region src/Toggle/toggle-variants.d.ts
/**
 * Toggle 的视觉变体。
 *
 * 按下态用 `data-pressed` 表达，对应 theme.css 的 `pressed:` 变体。
 * `soft` 是垫一层 surface 的默认形态，`outline` 用于连成一排的分段控制。
 */
declare const toggleVariants: (props?: ({
  variant?: "soft" | "outline" | "ghost" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * ToggleGroup 的容器。
 *
 * `outline` 让子项连成一排：圆角只留在首尾，相邻项用 `-ms-px` 合并边框，
 * 逻辑属性保证 RTL 下自动镜像。
 */
declare const toggleGroupVariants: (props?: ({
  variant?: "soft" | "outline" | "ghost" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** v1 的变体名 → 当前变体名。保留是为了不让既有调用点一次性全炸。 */
declare const LEGACY_VARIANTS: {
  readonly default: "soft";
};
type ToggleVariant = 'soft' | 'outline' | 'ghost' | keyof typeof LEGACY_VARIANTS;
type ToggleSize = 'sm' | 'md' | 'lg';
declare function resolveToggleVariant(variant: ToggleVariant | null | undefined): string | undefined;
//#endregion
export { ToggleSize, ToggleVariant, resolveToggleVariant, toggleGroupVariants, toggleVariants };
//# sourceMappingURL=toggle-variants.d.mts.map