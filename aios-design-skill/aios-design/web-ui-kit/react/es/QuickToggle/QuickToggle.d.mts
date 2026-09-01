import { quickToggleVariants } from "./quick-toggle-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/QuickToggle/QuickToggle.d.ts
type QuickToggleProps = React$1.ComponentPropsWithRef<'button'> & VariantProps<typeof quickToggleVariants> & {
  icon?: React$1.ReactNode;
  label?: string;
};
declare function QuickToggle({
  variant,
  active,
  icon,
  label,
  className,
  onClick,
  ref,
  ...props
}: QuickToggleProps): React$1.JSX.Element;
declare namespace QuickToggle {
  var displayName: string;
}
//#endregion
export { QuickToggle, QuickToggleProps };
//# sourceMappingURL=QuickToggle.d.mts.map