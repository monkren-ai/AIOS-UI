import { InputCopySize, inputCopyVariants } from "./input-copy-variants.mjs";
import * as React$1 from "react";
//#region src/InputCopy/InputCopy.d.ts
interface InputCopyProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onChange' | 'onCopy'> {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  /** 控件高度：36 / 44 / 52px。 */
  size?: InputCopySize;
  copyLabel?: string;
  copiedLabel?: string;
  copiedDuration?: number;
  onCopy?: (value: string) => void;
  readOnly?: boolean;
}
declare function InputCopy({
  value: valueProp,
  defaultValue,
  label,
  placeholder,
  size,
  copyLabel,
  copiedLabel,
  copiedDuration,
  onCopy,
  readOnly,
  className,
  ref,
  ...props
}: InputCopyProps): React$1.JSX.Element;
declare namespace InputCopy {
  var displayName: string;
}
//#endregion
export { InputCopy, InputCopyProps };
//# sourceMappingURL=InputCopy.d.mts.map