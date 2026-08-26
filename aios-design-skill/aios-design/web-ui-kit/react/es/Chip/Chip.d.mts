import { ChipSize } from "./chip-variants.mjs";
import * as React$1 from "react";

//#region src/Chip/Chip.d.ts
interface ChipProps extends React$1.ComponentPropsWithRef<'button'> {
  selected?: boolean;
  size?: ChipSize;
  icon?: React$1.ReactNode;
}
declare function Chip({
  selected,
  size,
  icon,
  className,
  children,
  ...props
}: ChipProps): React$1.JSX.Element;
declare namespace Chip {
  var displayName: string;
}
interface ChipGroupProps extends React$1.ComponentPropsWithRef<'div'> {}
declare function ChipGroup({
  className,
  ...props
}: ChipGroupProps): React$1.JSX.Element;
declare namespace ChipGroup {
  var displayName: string;
}
//#endregion
export { Chip, ChipGroup, ChipGroupProps, ChipProps };
//# sourceMappingURL=Chip.d.mts.map