import * as React$1 from "react";

//#region src/agent/Subagent/Subagent.d.ts
type SubagentStatus = 'running' | 'done' | 'error';
interface SubagentProps extends React$1.HTMLAttributes<HTMLDivElement> {
  name: React$1.ReactNode;
  meta?: React$1.ReactNode;
  status?: SubagentStatus;
  progress?: number;
  error?: React$1.ReactNode;
}
declare function Subagent({
  name,
  meta,
  status,
  progress,
  error,
  className,
  ref,
  ...props
}: SubagentProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function SubagentList({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Subagent, SubagentList, SubagentProps, SubagentStatus };
//# sourceMappingURL=Subagent.d.mts.map