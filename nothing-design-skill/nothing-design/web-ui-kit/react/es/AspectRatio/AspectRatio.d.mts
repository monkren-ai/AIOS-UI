import * as React$1 from "react";

//#region src/AspectRatio/AspectRatio.d.ts
type AspectRatioProps = React$1.ComponentPropsWithRef<'div'> & {
  ratio?: number;
  children?: React$1.ReactNode;
};
declare function AspectRatio({
  className,
  ratio,
  style,
  children,
  ref,
  ...props
}: AspectRatioProps): React$1.JSX.Element;
declare namespace AspectRatio {
  var displayName: string;
}
//#endregion
export { AspectRatio, AspectRatioProps };
//# sourceMappingURL=AspectRatio.d.mts.map