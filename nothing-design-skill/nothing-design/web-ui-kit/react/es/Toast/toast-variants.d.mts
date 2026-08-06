//#region src/Toast/toast-variants.d.ts
/**
 * Toast 的视觉变体。
 *
 * appica 原版是浮窗 portal + 自动消失——Nothing 禁止浮窗 toast，所以这里改造成
 * 文档流内的内联状态条：`role="status"` 横条，左侧 bracket 标记 + 消息文案，
 * 不 portal、不 fixed、不自动消失（由调用方控制挂载）。
 *
 * 配色走语义 severity：error 落到 Nothing 红（`--accent`），success/warning 用对应
 * 状态色，info 回到中性。左侧 3px 粗边是仪表盘状态条的标识。
 */
declare const toastVariants: (props?: ({
  severity?: "error" | "info" | "success" | "warning" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** 左侧 `[ LABEL ]` bracket 文案。颜色随 severity。 */
declare const toastLabelVariants: (props?: ({
  severity?: "error" | "info" | "success" | "warning" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ToastSeverity = 'info' | 'success' | 'error' | 'warning';
//#endregion
export { ToastSeverity, toastLabelVariants, toastVariants };
//# sourceMappingURL=toast-variants.d.mts.map