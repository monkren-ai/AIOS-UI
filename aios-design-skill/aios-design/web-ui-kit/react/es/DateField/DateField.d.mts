import { DateFieldSize, dateFieldSegmentVariants, dateFieldVariants } from "./date-field-variants.mjs";
import * as React$1 from "react";

//#region src/DateField/DateField.d.ts
interface DateFieldProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** ISO 日期 YYYY-MM-DD。传了即受控。 */
  value?: string;
  /** 非受控初始值。 */
  defaultValue?: string;
  /** 任意段变化后调用，参数是拼接后的字符串。 */
  onValueChange?: (value: string) => void;
  /** 段顺序：zh=年月日（默认），en=月日年。 */
  locale?: 'zh' | 'en';
  disabled?: boolean;
  label?: string;
  /** 错误文案；有值时段边框转红并播报。 */
  error?: string;
  size?: DateFieldSize;
  /** 各段输入框的占位提示，覆盖默认的 YYYY/MM/DD。 */
  placeholder?: string;
}
declare function DateField({
  value: controlledValue,
  defaultValue,
  onValueChange,
  locale,
  disabled,
  label,
  error,
  size,
  placeholder,
  className,
  ref,
  ...props
}: DateFieldProps): React$1.JSX.Element;
declare namespace DateField {
  var displayName: string;
}
//#endregion
export { DateField, DateFieldProps };
//# sourceMappingURL=DateField.d.mts.map