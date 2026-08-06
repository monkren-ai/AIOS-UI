import { LabelSize, labelVariants } from "./label-variants.mjs";
import * as React$1 from "react";

//#region src/Label/Label.d.ts
type LabelProps = Omit<React$1.ComponentPropsWithRef<'label'>, 'children'> & {
  /** 字号阶梯。 */size?: LabelSize;
  disabled?: boolean;
  required?: boolean;
  children?: React$1.ReactNode;
};
declare function Label({
  className,
  size,
  disabled,
  required,
  children,
  ref,
  ...props
}: LabelProps): React$1.JSX.Element;
declare namespace Label {
  var displayName: string;
}
//#endregion
export { Label, LabelProps };
//# sourceMappingURL=Label.d.mts.map