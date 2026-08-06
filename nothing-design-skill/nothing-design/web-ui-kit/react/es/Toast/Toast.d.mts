import { ToastSeverity, toastLabelVariants, toastVariants } from "./toast-variants.mjs";
import * as React$1 from "react";

//#region src/Toast/Toast.d.ts
interface ToastProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /** 语义严重度，决定左侧粗边与 bracket 文案的颜色。 */
  severity?: ToastSeverity;
  /** 消息文案。 */
  children: React$1.ReactNode;
  /** bracket 文案，如 `SAVED` / `ERROR`，渲染为 `[ LABEL ]`。 */
  label?: string;
  /** 关闭按钮回调；传入后才渲染关闭按钮。 */
  onDismiss?: () => void;
  /**
   * 自动触发 `onDismiss` 的毫秒数。`0`（默认）= 不自动消失，由调用方控制挂载/卸载。
   * 大于 0 时到点调用 `onDismiss`，但组件不会自己卸载——卸载与否仍由调用方决定。
   */
  duration?: number;
}
declare function Toast({
  severity,
  label,
  onDismiss,
  duration,
  className,
  children,
  ...props
}: ToastProps): React$1.JSX.Element;
declare namespace Toast {
  var displayName: string;
}
//#endregion
export { Toast, ToastProps };
//# sourceMappingURL=Toast.d.mts.map