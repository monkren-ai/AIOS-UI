import { ButtonProps } from "./Button.mjs";
import { IconButtonShape, IconButtonSize } from "./icon-button-variants.mjs";
import * as React$1 from "react";

//#region src/Button/IconButton.d.ts
interface IconButtonProps extends Omit<ButtonProps, 'aria-label' | 'children' | 'leadingIcon' | 'trailingIcon' | 'size'> {
  /** 纯图标按钮必须提供可访问名称。 */
  'aria-label': string;
  /** 按钮内的图标。 */
  icon: React$1.ReactNode;
  size?: IconButtonSize;
  shape?: IconButtonShape;
}
declare function IconButton({
  icon,
  size,
  shape,
  className,
  ...props
}: IconButtonProps): React$1.JSX.Element;
declare namespace IconButton {
  var displayName: string;
}
//#endregion
export { IconButton, IconButtonProps };
//# sourceMappingURL=IconButton.d.mts.map