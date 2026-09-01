//#region src/Checkbox/checkbox-variants.d.ts
/**
 * Checkbox 的视觉变体。
 *
 * 勾选态是「实心反相」：盒子填 `bg-foreground-display`，勾用 `text-background`。
 * 行高走 36 / 44 / 52 的触达基线，`md` 正好等于 `--touch-target-min`。
 */
declare const checkboxVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  isChecked?: boolean | null | undefined;
  indeterminate?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 方形盒子（Base UI Checkbox.Root）。 */
declare const checkboxBoxVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 勾 / 横线的共同容器（Base UI Checkbox.Indicator，keepMounted）。 */
declare const checkboxIndicatorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 勾选标记。未勾选时靠 stroke-dashoffset 藏住，勾选时描边画出。 */
declare const checkboxCheckVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 半选横线。 */
declare const checkboxDashVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 文字标签。勾选后提亮到 text-foreground。 */
declare const checkboxLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type CheckboxSize = 'sm' | 'md' | 'lg';
//#endregion
export { CheckboxSize, checkboxBoxVariants, checkboxCheckVariants, checkboxDashVariants, checkboxIndicatorVariants, checkboxLabelVariants, checkboxVariants };
//# sourceMappingURL=checkbox-variants.d.mts.map