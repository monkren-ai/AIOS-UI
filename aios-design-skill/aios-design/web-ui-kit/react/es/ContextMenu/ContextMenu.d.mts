import { contextMenuContentVariants, contextMenuItemLabelVariants, contextMenuItemShortcutVariants, contextMenuItemVariants, contextMenuSeparatorVariants, contextMenuTriggerVariants, contextMenuVariants } from "./context-menu-variants.mjs";
import * as React$1 from "react";

//#region src/ContextMenu/ContextMenu.d.ts
interface ContextMenuActionItem {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  shortcut?: string;
  /**
   * @deprecated 旧写法：在这一项下面补一条线。改用独立的一项 `{ separator: true }`。
   */
  separator?: boolean;
}
/** 独立成一项的分隔线，与 `DropdownMenuItem` 的写法一致。 */
interface ContextMenuSeparatorItem {
  separator: true;
  label?: never;
  onClick?: never;
  disabled?: never;
  shortcut?: never;
}
type ContextMenuItem = ContextMenuActionItem | ContextMenuSeparatorItem;
interface ContextMenuProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  items: ContextMenuItem[];
  children: React$1.ReactElement;
}
declare function ContextMenu({
  className,
  items,
  children,
  ref,
  ...props
}: ContextMenuProps): React$1.JSX.Element;
declare namespace ContextMenu {
  var displayName: string;
}
//#endregion
export { ContextMenu, ContextMenuItem, ContextMenuProps };
//# sourceMappingURL=ContextMenu.d.mts.map