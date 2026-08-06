import { segmentVariants, segmentedHoverSliderVariants, segmentedSliderVariants, segmentedVariants } from "./segmented-control-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/SegmentedControl/SegmentedControl.d.ts
interface SegmentedControlProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'onChange'>, VariantProps<typeof segmentedVariants> {
  segments: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  /** 启用 proximity hover 预览效果 */
  proximity?: boolean;
}
declare function SegmentedControl({
  className,
  segments,
  activeIndex: controlledIndex,
  variant,
  disabled,
  proximity,
  onChange,
  ref,
  ...props
}: SegmentedControlProps): React$1.JSX.Element;
declare namespace SegmentedControl {
  var displayName: string;
}
//#endregion
export { SegmentedControl, SegmentedControlProps };
//# sourceMappingURL=SegmentedControl.d.mts.map