//#region src/Accordion/accordion-variants.d.ts
/**
 * Accordion 根容器。
 *
 * - `default` 一个带边框的整体，条目之间用下边框分隔
 * - `flush` 去掉外框直接贴在页面上，改用上边框分隔
 */
declare const accordionVariants: (props?: ({
  type?: "single" | "multiple" | null | undefined;
  variant?: "default" | "flush" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个可折叠条目。分隔线的方向随根容器变体切换。 */
declare const accordionItemVariants: (props?: ({
  variant?: "default" | "flush" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 包裹 trigger 的标题元素。 */
declare const accordionHeaderVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 展开按钮。`group` 让末端的三角能跟着展开态旋转。 */
declare const accordionTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 标题文字，占满剩余宽度并靠行首对齐。 */
declare const accordionTriggerTextVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 标题前置图标槽位。 */
declare const accordionLeadingIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 末端的展开三角，展开时翻转 180°。 */
declare const accordionTriggerIconVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 折叠面板。
 *
 * 高度动画依赖 Base UI 写在元素上的 `--accordion-panel-height`，
 * 进出场瞬间（`data-starting-style` / `data-ending-style`）强制回到 0 才能跑出过渡。
 */
declare const accordionPanelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 面板内容。 */
declare const accordionContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
type AccordionType = 'single' | 'multiple';
type AccordionVariant = 'default' | 'flush';
//#endregion
export { AccordionType, AccordionVariant, accordionContentVariants, accordionHeaderVariants, accordionItemVariants, accordionLeadingIconVariants, accordionPanelVariants, accordionTriggerIconVariants, accordionTriggerTextVariants, accordionTriggerVariants, accordionVariants };
//# sourceMappingURL=accordion-variants.d.mts.map