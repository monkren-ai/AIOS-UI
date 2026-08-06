import { ToolbarOrientation, ToolbarSize, toolbarButtonVariants, toolbarGroupVariants, toolbarLinkVariants, toolbarSeparatorVariants, toolbarVariants } from "./toolbar-variants.mjs";
import * as React$1 from "react";
import { Toolbar } from "@base-ui/react/toolbar";

//#region src/Toolbar/Toolbar.d.ts
interface ToolbarProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'> {
  /** 排布方向。 */
  orientation?: ToolbarOrientation;
  /**
   * 工具条的可达名称（`aria-label`）。工具条必须有一个可达名称，否则读屏软件无法标识。
   */
  label?: string;
  /** 子项高度阶梯，会下发给 `Toolbar.Button`。 */
  size?: ToolbarSize;
  /** 禁用整个工具条。 */
  disabled?: boolean;
  children: React$1.ReactNode;
}
declare function Toolbar$1({
  className,
  orientation,
  label,
  size,
  disabled,
  children,
  ref,
  ...props
}: ToolbarProps): React$1.JSX.Element;
declare namespace Toolbar$1 {
  var displayName: string;
  var Group: typeof ToolbarGroup;
  var Button: typeof ToolbarButton;
  var Separator: typeof ToolbarSeparator;
  var Link: typeof ToolbarLink;
}
interface ToolbarButtonProps extends Omit<React$1.ComponentPropsWithRef<typeof Toolbar.Button>, 'size'> {
  /** 高度阶梯，缺省时取 `Toolbar` 上的 `size`。 */
  size?: ToolbarSize;
  /** 按下态，映射到 `aria-pressed`，用于工具栏开关。 */
  pressed?: boolean;
}
declare function ToolbarButton({
  className,
  size,
  pressed,
  disabled,
  ref,
  ...props
}: ToolbarButtonProps): React$1.JSX.Element;
declare namespace ToolbarButton {
  var displayName: string;
}
type ToolbarSeparatorProps = React$1.ComponentPropsWithRef<typeof Toolbar.Separator>;
declare function ToolbarSeparator({
  className,
  ref,
  ...props
}: ToolbarSeparatorProps): React$1.JSX.Element;
declare namespace ToolbarSeparator {
  var displayName: string;
}
type ToolbarGroupProps = React$1.ComponentPropsWithRef<typeof Toolbar.Group>;
declare function ToolbarGroup({
  className,
  ref,
  ...props
}: ToolbarGroupProps): React$1.JSX.Element;
declare namespace ToolbarGroup {
  var displayName: string;
}
type ToolbarLinkProps = React$1.ComponentPropsWithRef<typeof Toolbar.Link>;
declare function ToolbarLink({
  className,
  ref,
  ...props
}: ToolbarLinkProps): React$1.JSX.Element;
declare namespace ToolbarLink {
  var displayName: string;
}
//#endregion
export { Toolbar$1 as Toolbar, ToolbarButton, ToolbarButtonProps, ToolbarGroup, ToolbarGroupProps, ToolbarLink, ToolbarLinkProps, ToolbarProps, ToolbarSeparator, ToolbarSeparatorProps };
//# sourceMappingURL=Toolbar.d.mts.map