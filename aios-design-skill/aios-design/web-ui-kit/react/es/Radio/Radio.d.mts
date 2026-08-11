import { RadioSize, radioIndicatorVariants, radioVariants } from "./radio-variants.mjs";
import * as React$1 from "react";
import { Radio } from "@base-ui/react/radio";

//#region src/Radio/Radio.d.ts
interface RadioProps extends Omit<React$1.ComponentProps<typeof Radio.Root>, 'className'> {
  size?: RadioSize;
  className?: string;
}
declare function Radio$1({
  size,
  className,
  disabled,
  ...props
}: RadioProps): React$1.JSX.Element;
declare namespace Radio$1 {
  var displayName: string;
}
//#endregion
export { Radio$1 as Radio, RadioProps };
//# sourceMappingURL=Radio.d.mts.map