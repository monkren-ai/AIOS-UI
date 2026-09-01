import * as React$1 from "react";
//#region src/agent/Reasoning/Reasoning.d.ts
type ReasoningStatus = 'running' | 'finished' | 'error';
interface ReasoningProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: ReasoningStatus;
  icon?: React$1.ReactNode;
  label?: React$1.ReactNode;
  activeLabel?: React$1.ReactNode;
  subject?: React$1.ReactNode;
  additions?: number;
  deletions?: number;
  elapsed?: React$1.ReactNode;
  actions?: React$1.ReactNode;
  container?: boolean;
  collapseOnComplete?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
declare function Reasoning({
  status,
  icon,
  label,
  activeLabel,
  subject,
  additions,
  deletions,
  elapsed,
  actions,
  container,
  collapseOnComplete,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ref,
  ...props
}: ReasoningProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
interface ReasoningGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
  stream?: boolean;
  revealed?: number;
  stepInterval?: number;
  startDelay?: number;
  onComplete?: () => void;
}
declare function ReasoningGroup({
  stream,
  revealed,
  stepInterval,
  startDelay,
  onComplete,
  className,
  children,
  ref,
  ...props
}: ReasoningGroupProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function ReasoningSubject({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLSpanElement> & {
  ref?: React$1.Ref<HTMLSpanElement>;
}): React$1.JSX.Element;
//#endregion
export { Reasoning, ReasoningGroup, ReasoningGroupProps, ReasoningProps, ReasoningStatus, ReasoningSubject };
//# sourceMappingURL=Reasoning.d.mts.map