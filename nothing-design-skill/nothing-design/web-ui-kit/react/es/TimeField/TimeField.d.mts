import { TimeFieldSize, timeFieldSegmentVariants, timeFieldVariants } from "./time-field-variants.mjs";
import * as React$1 from "react";

//#region src/TimeField/TimeField.d.ts
interface TimeFieldProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** 时间 `HH:mm` 或 `HH:mm:ss`。传了即受控。 */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** 是否显示秒段，默认 false。 */
  showSeconds?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  size?: TimeFieldSize;
  placeholder?: string;
}
declare function TimeField({
  value: controlledValue,
  defaultValue,
  onValueChange,
  showSeconds,
  disabled,
  label,
  error,
  size,
  placeholder,
  className,
  ref,
  ...props
}: TimeFieldProps): React$1.JSX.Element;
declare namespace TimeField {
  var displayName: string;
}
//#endregion
export { TimeField, TimeFieldProps };
//# sourceMappingURL=TimeField.d.mts.map