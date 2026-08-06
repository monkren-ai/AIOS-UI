import { DatePickerSize, datePickerVariants } from "./date-picker-variants.mjs";
import * as React$1 from "react";

//#region src/DatePicker/DatePicker.d.ts
interface DatePickerProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  size?: DatePickerSize;
  /** 触发器显示格式：zh=`YYYY-MM-DD`，en=`MM/DD/YYYY`。 */
  locale?: 'zh' | 'en';
}
declare function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder,
  label,
  error,
  disabled,
  size,
  locale,
  className,
  ref,
  ...props
}: DatePickerProps): React$1.JSX.Element;
declare namespace DatePicker {
  var displayName: string;
}
//#endregion
export { DatePicker, DatePickerProps };
//# sourceMappingURL=DatePicker.d.mts.map