//#region src/Select/select-variants.d.ts
/** 外层包裹：label / trigger / 错误文案的纵向容器。 */
declare const selectVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  disabled?: boolean | null | undefined;
  hasError?: boolean | null | undefined;
  open?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const selectLabelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 触发器。
 *
 * 文字用 `text-start`、图标靠 flex 排到末尾，RTL 下整体自动镜像。
 */
declare const selectTriggerVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  hasError?: boolean | null | undefined;
  open?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const selectValueVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const selectPlaceholderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 下拉箭头。展开时翻转 180°。 */
declare const selectTriggerIconVariants: (props?: ({
  open?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const selectPositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 浮层。
 *
 * 旧实现是 `@keyframes aios-select-enter`；这里换成 Base UI 的
 * `data-open` / `data-closed` + transition，不再需要关键帧。
 */
declare const selectContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const selectSearchVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const selectSearchInputVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const selectListVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 选项。
 *
 * 选中态左侧那条 2px 红条用 `before:start-0`（不是 `left-0`），
 * RTL 下会自己换到右侧。
 */
declare const selectItemVariants: (props?: ({
  size?: "sm" | "md" | "lg" | null | undefined;
  selected?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  highlighted?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 选中打勾。默认透明，选中时淡入；`ms-auto` 保证 RTL 下也贴在行尾。 */
declare const selectItemIndicatorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const selectErrorVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** v1 的尺寸名 → 当前尺寸名。 */
declare const LEGACY_SIZES: {
  readonly default: "md";
};
type SelectSize = 'sm' | 'md' | 'lg' | keyof typeof LEGACY_SIZES;
//#endregion
export { SelectSize, selectContentVariants, selectErrorVariants, selectItemIndicatorVariants, selectItemVariants, selectLabelVariants, selectListVariants, selectPlaceholderVariants, selectPositionerVariants, selectSearchInputVariants, selectSearchVariants, selectTriggerIconVariants, selectTriggerVariants, selectValueVariants, selectVariants };
//# sourceMappingURL=select-variants.d.mts.map