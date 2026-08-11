import { menubarRootVariants } from "./menubar-variants.mjs";
import * as React$1 from "react";
import { Menubar } from "@base-ui/react/menubar";

//#region src/Menubar/Menubar.d.ts
interface MenubarAction {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
}
interface MenubarMenu {
  label: string;
  items: MenubarAction[];
}
interface MenubarProps extends Omit<React$1.ComponentProps<typeof Menubar>, 'children'> {
  items: MenubarMenu[];
  orientation?: 'horizontal' | 'vertical';
}
declare function Menubar$1({
  items,
  orientation,
  className,
  ...props
}: MenubarProps): React$1.JSX.Element;
declare namespace Menubar$1 {
  var displayName: string;
}
//#endregion
export { Menubar$1 as Menubar, MenubarAction, MenubarMenu, MenubarProps };
//# sourceMappingURL=Menubar.d.mts.map