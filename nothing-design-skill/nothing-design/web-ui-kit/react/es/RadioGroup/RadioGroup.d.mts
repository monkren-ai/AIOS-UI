import { RadioGroupSize, radioGroupVariants } from "./radio-group-variants.mjs";
import * as React$1 from "react";

//#region src/RadioGroup/RadioGroup.d.ts
type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
type RadioGroupProps = React$1.ComponentPropsWithRef<'div'> & {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  orientation?: 'horizontal' | 'vertical'; /** 圆环与行高阶梯。 */
  size?: RadioGroupSize;
};
declare function RadioGroup({
  className,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  orientation,
  size,
  name,
  ref,
  ...props
}: RadioGroupProps): React$1.JSX.Element;
declare namespace RadioGroup {
  var displayName: string;
}
//#endregion
export { RadioGroup, RadioGroupProps, RadioOption };
//# sourceMappingURL=RadioGroup.d.mts.map