import { navigationMenuCaretVariants, navigationMenuItemVariants, navigationMenuLinkVariants, navigationMenuListVariants, navigationMenuSubmenuItemVariants, navigationMenuSubmenuLinkVariants, navigationMenuSubmenuVariants, navigationMenuVariants } from "./navigation-menu-variants.mjs";
import * as React$1 from "react";

//#region src/NavigationMenu/NavigationMenu.d.ts
interface NavMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavMenuItem[];
  active?: boolean;
}
type NavigationMenuOrientation = 'horizontal' | 'vertical';
interface NavigationMenuProps extends Omit<React$1.ComponentPropsWithRef<'nav'>, 'children'> {
  items: NavMenuItem[];
  orientation?: NavigationMenuOrientation;
}
declare function NavigationMenu({
  className,
  items,
  orientation,
  style,
  ...props
}: NavigationMenuProps): React$1.JSX.Element;
declare namespace NavigationMenu {
  var displayName: string;
}
//#endregion
export { NavMenuItem, NavigationMenu, NavigationMenuOrientation, NavigationMenuProps };
//# sourceMappingURL=NavigationMenu.d.mts.map