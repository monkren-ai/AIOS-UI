import { cva } from "class-variance-authority";
//#region src/Fieldset/fieldset-variants.ts
/**
* Fieldset 容器：`--border-visible` 1px 边框 + `rounded-card` 圆角。
*
* Nothing 约束卡片圆角不超过 16px，`rounded-card` 即上限。padding 走
* `p-md`，内部字段之间用 `gap-md` 拉开层级。
*/
const fieldsetVariants = cva(["flex flex-col gap-md rounded-card border border-border-visible p-md"]);
/** legend 标题：与 Input 标签同源的 mono / uppercase 排版。 */
const fieldsetLegendVariants = cva(["font-mono uppercase tracking-wider text-foreground-muted text-label", "px-2xs"]);
//#endregion
export { fieldsetLegendVariants, fieldsetVariants };

//# sourceMappingURL=fieldset-variants.mjs.map