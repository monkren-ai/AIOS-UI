import { CheckboxSize } from "../Checkbox/checkbox-variants.mjs";
import { CheckboxGroupOrientation, checkboxGroupVariants } from "./checkbox-group-variants.mjs";
import * as React$1 from "react";

//#region src/CheckboxGroup/CheckboxGroup.d.ts
interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}
type CheckboxGroupProps = Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> & {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  orientation?: CheckboxGroupOrientation; /** 透传给每个 Checkbox 的尺寸：36 / 44 / 52px 行高。 */
  size?: CheckboxSize;
};
declare function CheckboxGroup({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  orientation,
  size,
  ref,
  ...props
}: CheckboxGroupProps): React$1.JSX.Element;
declare namespace CheckboxGroup {
  var displayName: string;
}
//#endregion
export { CheckboxGroup, CheckboxGroupOption, CheckboxGroupProps };
//# sourceMappingURL=CheckboxGroup.d.mts.map