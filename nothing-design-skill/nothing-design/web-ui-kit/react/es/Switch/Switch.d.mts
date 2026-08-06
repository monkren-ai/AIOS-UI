import { SwitchSize, switchVariants } from "./switch-variants.mjs";
import * as React$1 from "react";

//#region src/Switch/Switch.d.ts
type SwitchProps = Omit<React$1.ComponentPropsWithRef<'label'>, 'onChange'> & {
  /** 受控开关状态。不传则组件自己维护。 */checked?: boolean; /** 非受控时的初始状态。 */
  defaultChecked?: boolean;
  label?: string;
  disabled?: boolean; /** 轨道与行高阶梯。 */
  size?: SwitchSize;
  onChange?: (checked: boolean) => void;
};
declare function Switch({
  className,
  label,
  disabled,
  onChange,
  checked,
  defaultChecked,
  size,
  ref,
  ...props
}: SwitchProps): React$1.JSX.Element;
declare namespace Switch {
  var displayName: string;
}
//#endregion
export { Switch, SwitchProps };
//# sourceMappingURL=Switch.d.mts.map