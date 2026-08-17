//#region src/Tooltip/tooltip-variants.d.ts
declare const tooltipTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const tooltipPositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 气泡本体 + `::after` 画的小三角。
 *
 * 三角用逻辑方向的 border 工具类（`border-s-*` / `border-e-*`），
 * 所以 side=left/right 在 RTL 下会自动镜像；居中则靠 `inset-*-0 + m*-auto`，
 * 避开 `left-1/2 + -translate-x-1/2` 那种需要手动镜像的写法。
 */
declare const tooltipPopupVariants: (props?: ({
  visible?: boolean | null | undefined;
  side?: "top" | "bottom" | "right" | "left" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { tooltipPopupVariants, tooltipPositionerVariants, tooltipTriggerVariants };
//# sourceMappingURL=tooltip-variants.d.mts.map