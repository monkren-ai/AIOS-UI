import { contextBarLabelVariants, contextBarVariants } from "./context-bar-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/agent/ContextBar/ContextBar.d.ts
interface ContextBarProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextBarVariants> {}
declare function ContextBar({
  position,
  className,
  ref,
  ...props
}: ContextBarProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
type ContextBarStatus = 'default' | 'progress' | 'loading' | 'waiting' | 'done' | 'queue' | 'error';
interface ContextBarLabelProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contextBarLabelVariants> {
  status?: ContextBarStatus;
  leading?: React$1.ReactNode;
  trailing?: React$1.ReactNode;
  onSteer?: () => void;
  onRemove?: () => void;
}
declare function ContextBarLabel({
  status,
  muted,
  leading,
  trailing,
  onSteer,
  onRemove,
  className,
  children,
  ref,
  ...props
}: ContextBarLabelProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
interface ContextBarTasksProps {
  summary: React$1.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React$1.ReactNode;
  className?: string;
}
declare function ContextBarTasks({
  summary,
  open,
  defaultOpen,
  onOpenChange,
  children,
  className
}: ContextBarTasksProps): React$1.JSX.Element;
//#endregion
export { ContextBar, ContextBarLabel, ContextBarLabelProps, ContextBarProps, ContextBarStatus, ContextBarTasks, ContextBarTasksProps };
//# sourceMappingURL=ContextBar.d.mts.map