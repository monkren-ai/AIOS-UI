//#region src/Collapsible/collapsible-variants.d.ts
/** Collapsible 外框。 */
declare const collapsibleVariants: (props?: ({
  open?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 展开按钮。展开态由自身的 `data-state` 驱动 `open:` 变体。 */
declare const collapsibleTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 折叠区域。
 *
 * 沿用旧实现的 max-height 过渡：展开上限 500px，外框又是 overflow-hidden，
 * 所以超过 500px 的内容会被直接裁掉且没有滚动条——需要更长内容请改用 Accordion。
 * visibility 一并参与过渡，收起时它才会等动画走完再生效。
 */
declare const collapsibleContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/** 折叠区域的内容排版。 */
declare const collapsibleContentInnerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
//#endregion
export { collapsibleContentInnerVariants, collapsibleContentVariants, collapsibleTriggerVariants, collapsibleVariants };
//# sourceMappingURL=collapsible-variants.d.mts.map