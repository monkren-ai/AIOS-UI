import { ButtonProps } from "../Button/Button.mjs";
import * as React$1 from "react";

//#region src/CopyButton/CopyButton.d.ts
interface CopyButtonProps extends Omit<ButtonProps, 'value' | 'onCopy'> {
  /** 要复制到剪贴板的文本。 */
  value: string;
  /** 复制成功后短暂展示的回执文案。 */
  copiedText?: string;
  /** 复制失败时展示的文案。 */
  errorText?: string;
  /** 复制结果回调，true 表示成功。 */
  onCopy?: (ok: boolean) => void;
}
/**
 * 独立复制按钮。
 *
 * 点击后用 `navigator.clipboard.writeText` 复制 `value`，成功后短暂展示
 * `[COPIED]` 回执（默认 1.5 秒）再回退原 children；失败展示 `[ERROR]`。
 * 不弹 toast——回执就长在按钮自己身上。
 */
declare function CopyButton({
  value,
  copiedText,
  errorText,
  onCopy,
  variant,
  size,
  children,
  onClick,
  disabled,
  'aria-label': ariaLabelProp,
  ref,
  ...props
}: CopyButtonProps): React$1.JSX.Element;
declare namespace CopyButton {
  var displayName: string;
}
//#endregion
export { CopyButton, CopyButtonProps };
//# sourceMappingURL=CopyButton.d.mts.map