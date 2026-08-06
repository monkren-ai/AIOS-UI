//#region src/HoverCard/hover-card-variants.d.ts
declare const hoverCardTriggerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const hoverCardPositionerVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 悬浮卡本体。与 Popover 同形，但 `pointer-events-auto`——
 * 鼠标可以从触发器滑进卡片里而不触发关闭。
 */
declare const hoverCardContentVariants: (props?: ({
  visible?: boolean | null | undefined;
  side?: "top" | "bottom" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
//#endregion
export { hoverCardContentVariants, hoverCardPositionerVariants, hoverCardTriggerVariants };
//# sourceMappingURL=hover-card-variants.d.mts.map