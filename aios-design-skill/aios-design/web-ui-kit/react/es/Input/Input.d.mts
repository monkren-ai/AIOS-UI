import { InputSize, InputVariant, inputVariants } from "./input-variants.mjs";
import * as React$1 from "react";

//#region src/Input/Input.d.ts
interface InputHelperProps extends React$1.ComponentPropsWithRef<'div'> {
  children: React$1.ReactNode;
  variant?: 'default' | 'error';
}
declare function InputMessage({
  children,
  variant,
  className,
  ...props
}: InputHelperProps): React$1.JSX.Element;
declare namespace InputMessage {
  var displayName: string;
}
type InputProps = Omit<React$1.ComponentPropsWithRef<'input'>, 'value' | 'size'> & {
  /** 视觉样式。`underline` / `bordered` 是 v1 别名。 */variant?: InputVariant; /** 控件高度：36 / 44 / 52px。 */
  size?: InputSize;
  label?: string;
  error?: string;
  message?: string;
  value?: string; /** 非受控时的初始值。 */
  defaultValue?: string;
  /**
   * 值变化回调，直接给新值——这是本库表单件的统一形状（对齐 Select、RadioGroup
   * 等的 `onValueChange`）。想拿到原生事件对象请用 `onChange`，两者都会触发。
   */
  onValueChange?: (value: string) => void;
  leadingIcon?: React$1.ReactNode;
  trailingIcon?: React$1.ReactNode;
  clearable?: boolean;
};
declare function Input({
  variant,
  size,
  label,
  placeholder,
  value: controlledValue,
  defaultValue,
  error,
  message,
  disabled,
  id,
  onChange,
  onValueChange,
  className,
  style,
  type,
  name,
  leadingIcon,
  trailingIcon,
  clearable,
  ref,
  ...rest
}: InputProps): React$1.JSX.Element;
declare namespace Input {
  var displayName: string;
  var Message: typeof InputMessage;
}
//#endregion
export { Input, InputHelperProps, InputProps };
//# sourceMappingURL=Input.d.mts.map