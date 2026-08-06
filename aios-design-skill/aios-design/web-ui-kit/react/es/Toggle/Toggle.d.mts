import { ToggleSize, ToggleVariant, toggleGroupVariants, toggleVariants } from "./toggle-variants.mjs";
import * as React$1 from "react";

//#region src/Toggle/Toggle.d.ts
interface ToggleProps extends Omit<React$1.ComponentPropsWithRef<'button'>, 'value' | 'onChange'> {
  /** 视觉样式。`default` 是 v1 别名。 */
  variant?: ToggleVariant;
  /** 高度阶梯：36 / 44 / 52px。 */
  size?: ToggleSize;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  value?: string;
}
declare function Toggle({
  className,
  pressed: controlledPressed,
  defaultPressed,
  onPressedChange,
  disabled,
  variant,
  size,
  value,
  children,
  onClick,
  ref,
  ...props
}: ToggleProps): React$1.JSX.Element;
declare namespace Toggle {
  var displayName: string;
}
interface ToggleGroupProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange' | 'defaultValue'> {
  /** 视觉样式，会覆盖子项自己的 variant。`default` 是 v1 别名。 */
  variant?: ToggleVariant;
  /** 高度阶梯，会覆盖子项自己的 size。 */
  size?: ToggleSize;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
declare function ToggleGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant,
  size,
  children,
  ref,
  ...props
}: ToggleGroupProps): React$1.JSX.Element;
declare namespace ToggleGroup {
  var displayName: string;
}
//#endregion
export { Toggle, ToggleGroup, ToggleGroupProps, ToggleProps };
//# sourceMappingURL=Toggle.d.mts.map