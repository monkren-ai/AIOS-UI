import { taskbarVariants } from "./taskbar-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/Taskbar/Taskbar.d.ts
interface TaskbarApp {
  name: string;
  icon?: string;
  onClick?: () => void;
}
interface TaskbarProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children' | 'onClick'>, Omit<VariantProps<typeof taskbarVariants>, 'fixed'> {
  apps?: TaskbarApp[];
  showSearch?: boolean;
  showTime?: boolean;
  showBattery?: boolean;
  fixed?: boolean;
}
declare function Taskbar({
  className,
  theme,
  apps,
  showSearch,
  showTime,
  showBattery,
  fixed,
  ref,
  ...props
}: TaskbarProps): React$1.JSX.Element;
declare namespace Taskbar {
  var displayName: string;
}
//#endregion
export { Taskbar, TaskbarApp, TaskbarProps };
//# sourceMappingURL=Taskbar.d.mts.map