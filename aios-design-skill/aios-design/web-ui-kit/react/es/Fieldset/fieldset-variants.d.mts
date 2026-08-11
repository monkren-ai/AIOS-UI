//#region src/Fieldset/fieldset-variants.d.ts
/**
 * Fieldset 容器：`--border-visible` 1px 边框 + `rounded-card` 圆角。
 *
 * AIOS 约束卡片圆角不超过 16px，`rounded-card` 即上限。padding 走
 * `p-md`，内部字段之间用 `gap-md` 拉开层级。
 */
declare const fieldsetVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** legend 标题：与 Input 标签同源的 mono / uppercase 排版。 */
declare const fieldsetLegendVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { fieldsetLegendVariants, fieldsetVariants };
//# sourceMappingURL=fieldset-variants.d.mts.map