import { SurfaceBorder, SurfaceElevation, SurfacePadding, SurfaceRadius, surfaceVariants } from "./surfaces-variants.mjs";
import * as React$1 from "react";

//#region src/Surfaces/Surfaces.d.ts
interface SurfacesProps extends React$1.ComponentPropsWithRef<'div'> {
  /** 层级。数值越大背景/边框越靠前，靠 background + border 表达，不用阴影。 */
  elevation?: SurfaceElevation;
  padding?: SurfacePadding;
  border?: SurfaceBorder;
  radius?: SurfaceRadius;
}
declare function Surfaces({
  elevation,
  padding,
  border,
  radius,
  className,
  children,
  ...props
}: SurfacesProps): React$1.JSX.Element;
declare namespace Surfaces {
  var displayName: string;
}
//#endregion
export { Surfaces, SurfacesProps };
//# sourceMappingURL=Surfaces.d.mts.map