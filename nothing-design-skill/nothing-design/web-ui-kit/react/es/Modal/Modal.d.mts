import { modalBackdropVariants, modalBodyVariants, modalCancelVariants, modalCloseVariants, modalConfirmVariants, modalDescriptionVariants, modalFooterVariants, modalHeaderVariants, modalTitleVariants, modalVariants } from "./modal-variants.mjs";
import * as React$1 from "react";

//#region src/Modal/Modal.d.ts
/**
 * 刻意不继承 `VariantProps<typeof modalVariants>`：那会把 `alert` 和 `noHeader`
 * 暴露成公开 prop，可它们是从 `variant` 和 `title` 推出来的，直接传进来会被丢掉。
 * 一个「设了不报错、也不起作用」的 prop 比没有这个 prop 更糟。要直接拿这两个开关
 * 请用 `modalVariants()`。
 */
interface ModalProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * 必填。Modal 自己不渲染触发器，也没有任何内部路径能把它从关闭翻成打开——
   * 开合完全由调用方掌握。类型上做成可选的话，忘了传就是「静默不渲染」，最难查。
   */
  open: boolean;
  onClose?: () => void;
  title?: string;
  footer?: React$1.ReactNode;
  children?: React$1.ReactNode;
  variant?: 'default' | 'alert';
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}
declare function Modal({
  className,
  open: isOpen,
  onClose,
  title,
  footer,
  children,
  variant,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  destructive,
  ref,
  ...props
}: ModalProps): React$1.JSX.Element;
declare namespace Modal {
  var displayName: string;
}
//#endregion
export { Modal, ModalProps };
//# sourceMappingURL=Modal.d.mts.map