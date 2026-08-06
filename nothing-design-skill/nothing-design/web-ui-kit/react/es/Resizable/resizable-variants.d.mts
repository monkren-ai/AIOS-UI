//#region src/Resizable/resizable-variants.d.ts
/** 分栏容器。`horizontal` 是行方向，因此在 RTL 下由 flex 自动镜像。 */
declare const resizableVariants: (props?: ({
  direction?: "horizontal" | "vertical" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 单个面板。尺寸由内联 `flex-basis` 百分比控制。 */
declare const resizablePanelVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
/**
 * 拖拽把手：4px 的实线，hover / 拖拽中变成 interactive 色。
 *
 * 没有任何物理方向属性——横向把手只有宽度、纵向把手只有高度，
 * 顺序完全交给 flex，`dir="rtl"` 时自动镜像。
 */
declare const resizableHandleVariants: (props?: ({
  direction?: "horizontal" | "vertical" | null | undefined;
  active?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ResizableDirection = 'horizontal' | 'vertical';
//#endregion
export { ResizableDirection, resizableHandleVariants, resizablePanelVariants, resizableVariants };
//# sourceMappingURL=resizable-variants.d.mts.map