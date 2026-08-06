import { BreadcrumbSize, breadcrumbVariants } from "./breadcrumb-variants.mjs";
import * as React$1 from "react";

//#region src/Breadcrumb/Breadcrumb.d.ts
type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};
type BreadcrumbProps = React$1.ComponentPropsWithRef<'nav'> & {
  items: BreadcrumbItem[]; /** 字号。 */
  size?: BreadcrumbSize; /** 层级之间的分隔符。 */
  separator?: string;
};
declare function Breadcrumb({
  className,
  items,
  size,
  separator,
  ...props
}: BreadcrumbProps): React$1.JSX.Element;
declare namespace Breadcrumb {
  var displayName: string;
}
//#endregion
export { Breadcrumb, BreadcrumbItem, BreadcrumbProps };
//# sourceMappingURL=Breadcrumb.d.mts.map