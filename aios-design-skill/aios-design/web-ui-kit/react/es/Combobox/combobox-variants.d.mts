//#region src/Combobox/combobox-variants.d.ts
/**
 * Combobox 的视觉变体。
 *
 * 与 `Autocomplete` 共用同一套浮层 / 输入 / 列表样式：层级只靠 background + border
 * 表达，没有阴影、没有 blur、没有渐变。选中态额外加了 Select 那条 2px 左条与 ✓ 标记。
 */
declare const comboboxVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  hasError?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 字段标签。 */
declare const comboboxLabelVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 输入框外壳：边框 / 背景都在这里，Input 本体透明。 */
declare const comboboxControlVariants: (props?: ({
  variant?: "outline" | "soft" | null | undefined;
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** Input 本体：无边框、无背景。 */
declare const comboboxInputVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const comboboxPositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 浮层：与 Select / Autocomplete 同款，surface-raised 底 + border-visible 框，无阴影。 */
declare const comboboxContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const comboboxListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 选项。
 *
 * 选中态沿用 Select 的表达：左侧 2px 红条 + muted 底，`before:start-0` 在 RTL 下自动换边。
 * 高亮态垫 `accent-subtle`，焦点环走 `interactive`。
 */
declare const comboboxItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  selected?: boolean | null | undefined;
  highlighted?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 选中打勾。默认透明，选中时淡入；`ms-auto` 保证 RTL 下也贴在行尾。 */
declare const comboboxItemIndicatorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 无结果占位行。 */
declare const comboboxEmptyVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 右侧下拉箭头。 */
declare const comboboxIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 清除按钮。 */
declare const comboboxClearVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 错误文案。 */
declare const comboboxErrorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type ComboboxSize = 'sm' | 'md' | 'lg';
type ComboboxVariant = 'outline' | 'soft';
//#endregion
export { ComboboxSize, ComboboxVariant, comboboxClearVariants, comboboxContentVariants, comboboxControlVariants, comboboxEmptyVariants, comboboxErrorVariants, comboboxIconVariants, comboboxInputVariants, comboboxItemIndicatorVariants, comboboxItemVariants, comboboxLabelVariants, comboboxListVariants, comboboxPositionerVariants, comboboxVariants };
//# sourceMappingURL=combobox-variants.d.mts.map