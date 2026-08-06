import { OverlaySide } from "../ui/OverlayPortal.mjs";
import { dropdownMenuContentVariants, dropdownMenuItemIconVariants, dropdownMenuItemLabelVariants, dropdownMenuItemShortcutVariants, dropdownMenuItemVariants, dropdownMenuPositionerVariants, dropdownMenuSeparatorVariants, dropdownMenuTriggerVariants, dropdownMenuVariants, menubarDropdownVariants, menubarItemLabelVariants, menubarItemShortcutVariants, menubarItemVariants, menubarSeparatorVariants, menubarTriggerVariants, menubarVariants } from "./dropdown-menu-variants.mjs";
import * as React$1 from "react";

//#region src/DropdownMenu/DropdownMenu.d.ts
interface DropdownMenuItem {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
  icon?: React$1.ReactNode;
}
interface MenubarItem {
  label: string;
  items?: DropdownMenuItem[];
}
interface DropdownMenuProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  trigger?: React$1.ReactNode;
  items: DropdownMenuItem[] | MenubarItem[];
  align?: 'start' | 'center' | 'end';
  side?: OverlaySide;
  variant?: 'default' | 'menubar';
}
declare function DropdownMenu({
  variant,
  ...props
}: DropdownMenuProps): React$1.JSX.Element;
declare namespace DropdownMenu {
  var displayName: string;
}
//#endregion
export { DropdownMenu, DropdownMenuItem, DropdownMenuProps, MenubarItem };
//# sourceMappingURL=DropdownMenu.d.mts.map