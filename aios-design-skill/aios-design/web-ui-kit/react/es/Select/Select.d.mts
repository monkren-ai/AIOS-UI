import { SelectSize, selectItemVariants, selectTriggerVariants, selectVariants } from "./select-variants.mjs";
import * as React$1 from "react";

//#region src/Select/Select.d.ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface SelectProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue' | 'value'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  /** 触发器高度：36 / 44 / 52px。 */
  size?: SelectSize;
  /**
   * 是否在弹出层顶部显示搜索框并过滤选项。
   * @default false
   */
  searchable?: boolean;
}
declare function Select({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  label,
  error,
  size,
  searchable,
  ref,
  ...props
}: SelectProps): React$1.JSX.Element;
declare namespace Select {
  var displayName: string;
}
//#endregion
export { Select, SelectOption, SelectProps };
//# sourceMappingURL=Select.d.mts.map