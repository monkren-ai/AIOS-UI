import { sidebarItemVariants, sidebarVariants } from "./sidebar-variants.mjs";
import * as React$1 from "react";

//#region src/Sidebar/Sidebar.d.ts
interface SidebarItem {
  icon?: React$1.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: string | number;
}
interface SidebarProps extends Omit<React$1.ComponentPropsWithRef<'aside'>, 'onChange' | 'children'> {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React$1.ReactNode;
  footer?: React$1.ReactNode;
}
declare function Sidebar({
  className,
  items,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  header,
  footer,
  ...props
}: SidebarProps): React$1.JSX.Element;
declare namespace Sidebar {
  var displayName: string;
}
//#endregion
export { Sidebar, SidebarItem, SidebarProps };
//# sourceMappingURL=Sidebar.d.mts.map