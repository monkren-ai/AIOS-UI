import { TextareaSize, TextareaVariant, textareaVariants } from "./textarea-variants.mjs";
import * as React$1 from "react";

//#region src/Textarea/Textarea.d.ts
type TextareaProps = Omit<React$1.ComponentPropsWithRef<'textarea'>, 'value' | 'defaultValue' | 'children' | 'size'> & {
  value?: string;
  defaultValue?: string;
  /**
   * 值变化回调，直接给新值——这是本库表单件的统一形状（对齐 Select、RadioGroup
   * 等的 `onValueChange`）。想拿到原生事件对象请用 `onChange`，两者都会触发。
   */
  onValueChange?: (value: string) => void; /** 视觉样式。`underline` / `bordered` 是 v1 别名。 */
  variant?: TextareaVariant; /** 最小高度阶梯。 */
  size?: TextareaSize;
  label?: string;
  error?: string;
  message?: string;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number; /** 挂到最外层 wrapper 上的 style。 */
  style?: React$1.CSSProperties;
};
declare function Textarea({
  className,
  style,
  value: controlledValue,
  defaultValue,
  onChange,
  onValueChange,
  placeholder,
  label,
  error,
  message,
  disabled,
  autoResize,
  minRows,
  maxRows,
  variant,
  size,
  id,
  onFocus,
  onBlur,
  ref,
  ...textareaProps
}: TextareaProps): React$1.JSX.Element;
declare namespace Textarea {
  var displayName: string;
}
//#endregion
export { Textarea, TextareaProps };
//# sourceMappingURL=Textarea.d.mts.map