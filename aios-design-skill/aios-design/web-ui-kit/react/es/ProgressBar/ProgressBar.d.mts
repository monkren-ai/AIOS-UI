import { ProgressBarSize, ProgressBarVariant, ProgressStatus, progressBarVariants, progressValueVariants } from "./progress-bar-variants.mjs";
import * as React$1 from "react";
//#region src/ProgressBar/ProgressBar.d.ts
interface ProgressBarProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  value: number;
  total?: number;
  /** 轨道被切成几段。 */
  segments?: number;
  /** 结构：分段轨（默认）或没有读数的细轨。 */
  variant?: ProgressBarVariant;
  /** 轨道高度。 */
  size?: ProgressBarSize;
  indeterminate?: boolean;
  label?: string;
  unit?: string;
  status?: ProgressStatus;
  showReadout?: boolean;
  disabled?: boolean;
}
declare function ProgressBar({
  className,
  value,
  total,
  segments,
  size,
  variant,
  indeterminate,
  label,
  unit,
  status,
  showReadout,
  disabled,
  ...props
}: ProgressBarProps): React$1.JSX.Element;
declare namespace ProgressBar {
  var displayName: string;
}
//#endregion
export { ProgressBar, ProgressBarProps };
//# sourceMappingURL=ProgressBar.d.mts.map