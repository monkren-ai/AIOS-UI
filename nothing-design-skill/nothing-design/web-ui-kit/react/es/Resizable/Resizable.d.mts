import { ResizableDirection, resizableVariants } from "./resizable-variants.mjs";
import * as React$1 from "react";

//#region src/Resizable/Resizable.d.ts
type ResizableProps = React$1.ComponentPropsWithRef<'div'> & {
  direction?: ResizableDirection;
  initialSizes?: number[];
  minSizes?: number[];
  maxSizes?: number[];
  children?: React$1.ReactNode;
};
declare function Resizable({
  className,
  direction,
  initialSizes,
  minSizes,
  maxSizes,
  children,
  ref,
  ...props
}: ResizableProps): React$1.JSX.Element;
declare namespace Resizable {
  var displayName: string;
}
//#endregion
export { Resizable, ResizableProps };
//# sourceMappingURL=Resizable.d.mts.map