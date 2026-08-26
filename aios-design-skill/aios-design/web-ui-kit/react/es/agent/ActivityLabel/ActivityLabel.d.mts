import { activityLabelVariants } from "./activity-label-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/agent/ActivityLabel/ActivityLabel.d.ts
interface ActivityLabelProps extends React$1.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof activityLabelVariants> {
  active?: boolean;
  activeLabel?: React$1.ReactNode;
  label?: React$1.ReactNode;
}
declare function ActivityLabel({
  active,
  activeLabel,
  label,
  status,
  className,
  ref,
  ...props
}: ActivityLabelProps & {
  ref?: React$1.Ref<HTMLSpanElement>;
}): React$1.JSX.Element;
//#endregion
export { ActivityLabel, ActivityLabelProps };
//# sourceMappingURL=ActivityLabel.d.mts.map