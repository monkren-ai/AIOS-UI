import { NavigationVariant, navItemVariants, navigationVariants } from "./navigation-variants.mjs";
import * as React$1 from "react";

//#region src/Navigation/Navigation.d.ts
interface NavItem {
  label: string;
  icon?: React$1.ReactNode;
  /** Slug used for URL hash sync. Defaults to label.toLowerCase(). */
  slug?: string;
}
interface NavigationProps extends Omit<React$1.ComponentPropsWithRef<'nav'>, 'onChange' | 'children'> {
  items: NavItem[];
  activeIndex?: number;
  variant?: NavigationVariant;
  showBack?: boolean;
  onBack?: () => void;
  onChange?: (index: number) => void;
  /** 与 URL hash 双向同步. 默认 true. */
  syncWithUrl?: boolean;
  /** 当 syncWithUrl=true 时,hash 改变时是否自动滚动到锚点 */
  scrollIntoView?: boolean;
}
declare function Navigation({
  className,
  items,
  activeIndex: controlledIndex,
  variant,
  showBack,
  onBack,
  onChange,
  syncWithUrl,
  scrollIntoView,
  ref,
  ...props
}: NavigationProps): React$1.JSX.Element;
declare namespace Navigation {
  var displayName: string;
}
//#endregion
export { NavItem, Navigation, NavigationProps };
//# sourceMappingURL=Navigation.d.mts.map