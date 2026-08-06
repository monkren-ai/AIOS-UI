import { InputOTPSize, inputOTPSlotVariants, inputOTPVariants } from "./input-otp-variants.mjs";
import * as React$1 from "react";

//#region src/InputOTP/InputOTP.d.ts
type InputOTPProps = Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> & {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean; /** 槽位高度：36 / 44 / 52px。 */
  size?: InputOTPSize;
};
declare function InputOTP({
  className,
  length,
  value: controlledValue,
  onValueChange,
  disabled,
  error,
  size,
  ref,
  ...props
}: InputOTPProps): React$1.JSX.Element;
declare namespace InputOTP {
  var displayName: string;
}
//#endregion
export { InputOTP, InputOTPProps };
//# sourceMappingURL=InputOTP.d.mts.map