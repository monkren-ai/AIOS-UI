import { CheckboxSize, checkboxVariants } from "./checkbox-variants.mjs";
import * as React$1 from "react";

//#region src/Checkbox/Checkbox.d.ts
type CheckboxProps = Omit<React$1.ComponentPropsWithRef<'label'>, 'onChange'> & {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  label?: string; /** 盒子与行高阶梯。 */
  size?: CheckboxSize;
  id?: string;
};
declare function Checkbox({
  className,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled,
  label,
  size,
  id,
  ref,
  ...props
}: CheckboxProps): React$1.JSX.Element;
declare namespace Checkbox {
  var displayName: string;
}
//#endregion
export { Checkbox, CheckboxProps };
//# sourceMappingURL=Checkbox.d.mts.map