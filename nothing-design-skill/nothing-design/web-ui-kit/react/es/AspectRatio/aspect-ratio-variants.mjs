import { cva } from "class-variance-authority";
//#region src/AspectRatio/aspect-ratio-variants.ts
/**
* AspectRatio 的容器：宽度撑满，高度由 `aspect-ratio` 内联样式决定。
*/
const aspectRatioVariants = cva(["relative w-full"]);
/** 绝对定位的内容层，铺满整个比例框。 */
const aspectRatioInnerVariants = cva(["absolute inset-0"]);
//#endregion
export { aspectRatioInnerVariants, aspectRatioVariants };

//# sourceMappingURL=aspect-ratio-variants.mjs.map