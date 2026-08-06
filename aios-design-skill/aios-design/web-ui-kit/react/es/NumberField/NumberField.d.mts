import { NumberFieldSize, numberFieldErrorVariants, numberFieldGroupVariants, numberFieldInputVariants, numberFieldLabelVariants, numberFieldStepperVariants, numberFieldVariants } from "./number-field-variants.mjs";
import * as React$1 from "react";

//#region src/NumberField/NumberField.d.ts
interface NumberFieldProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'value' | 'defaultValue'> {
  /** 受控数值。 */
  value?: number | null;
  /** 非受控初始值。 */
  defaultValue?: number;
  /** 数值变化回调，直接给新值（可能为 `null`，表示清空）。 */
  onValueChange?: (value: number | null) => void;
  /** 最小值。 */
  min?: number;
  /** 最大值。 */
  max?: number;
  /** 步长。 */
  step?: number | 'any';
  /** 字段标签。 */
  label?: string;
  /** 错误文案，同时把边框转红。 */
  error?: string;
  /** 占位文字。 */
  placeholder?: string;
  /** 是否禁用。 */
  disabled?: boolean;
  /** 高度阶梯：36 / 44 / 52px。 */
  size?: NumberFieldSize;
}
declare function NumberField({
  className,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step,
  label,
  error,
  placeholder,
  disabled,
  size,
  ref,
  ...props
}: NumberFieldProps): React$1.JSX.Element;
declare namespace NumberField {
  var displayName: string;
}
//#endregion
export { NumberField, NumberFieldProps };
//# sourceMappingURL=NumberField.d.mts.map