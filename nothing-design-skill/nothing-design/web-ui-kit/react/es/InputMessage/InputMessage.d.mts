import { InputMessageSize, inputMessageVariants } from "./input-message-variants.mjs";
import * as React$1 from "react";

//#region src/InputMessage/InputMessage.d.ts
interface InputMessageProps extends Omit<React$1.ComponentPropsWithRef<'textarea'>, 'value' | 'defaultValue' | 'onChange' | 'children'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSend?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  submitOnEnter?: boolean;
  sendLabel?: string;
  countLabel?: string;
  hideCount?: boolean;
  /** 控件高度阶梯：36 / 44 / 52px。 */
  size?: InputMessageSize;
}
declare function InputMessage({
  value: valueProp,
  defaultValue,
  onChange,
  onSend,
  placeholder,
  disabled,
  minRows,
  maxRows,
  maxLength,
  submitOnEnter,
  sendLabel,
  countLabel,
  hideCount,
  size,
  className,
  onKeyDown,
  ref,
  ...textareaProps
}: InputMessageProps): React$1.JSX.Element;
declare namespace InputMessage {
  var displayName: string;
}
//#endregion
export { InputMessage, InputMessageProps };
//# sourceMappingURL=InputMessage.d.mts.map