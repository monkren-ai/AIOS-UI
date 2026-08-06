//#region src/ButtonGroup/button-group-variants.d.ts
/**
 * ButtonGroup 的容器变体。
 *
 * 思路和 `toggleGroupVariants` 的 outline 一致：通过 `[data-slot=button]`
 * 子选择器把相邻按钮的圆角收掉、只在首尾留圆角，并用负 margin 合并
 * 1px 边框——逻辑属性 `-ms-px` / `-mt-px` 保证 RTL 自动镜像。
 * hover / focus 时把按钮抬到顶层（z-10），避免被邻居盖住边框与焦点环。
 */
declare const buttonGroupVariants: (props?: ({
  orientation?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { buttonGroupVariants };
//# sourceMappingURL=button-group-variants.d.mts.map