//#region src/Popover/popover-variants.d.ts
declare const popoverTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const popoverPositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 浮层本体。
 *
 * v1 用 `@keyframes` 做进场；v2 换成由 Base UI 的 `data-open` / `data-closed`
 * 驱动的 transition——同样是 0.95 → 1 的缩放淡入，但退场也能跟着走。
 */
declare const popoverContentVariants: (props?: ({
  visible?: boolean | null | undefined;
  side?: "top" | "bottom" | "right" | "left" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { popoverContentVariants, popoverPositionerVariants, popoverTriggerVariants };
//# sourceMappingURL=popover-variants.d.mts.map