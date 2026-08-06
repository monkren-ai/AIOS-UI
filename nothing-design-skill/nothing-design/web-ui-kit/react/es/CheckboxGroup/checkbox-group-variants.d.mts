//#region src/CheckboxGroup/checkbox-group-variants.d.ts
/** 复选组容器。方向交给 flex，RTL 下横向排列自动镜像。 */
declare const checkboxGroupVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * 相邻选中项共享的合并背景层。
 *
 * 锚点用 `start-0`（不是 `left-0`）；组件那边会把 hook 算出来的物理坐标
 * 换算成对应书写方向的位移，RTL 下不会跑偏。
 */
declare const checkboxGroupMergeBgVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 单个选项的点击区。 */
declare const checkboxGroupItemVariants: (props?: ({
  selected?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type CheckboxGroupOrientation = 'horizontal' | 'vertical';
//#endregion
export { CheckboxGroupOrientation, checkboxGroupItemVariants, checkboxGroupMergeBgVariants, checkboxGroupVariants };
//# sourceMappingURL=checkbox-group-variants.d.mts.map