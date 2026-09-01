import * as React$1 from "react";

//#region src/agent/Plan/Plan.d.ts
type PlanProgressStatus = 'done' | 'active' | 'pending';
interface PlanItemProps extends React$1.HTMLAttributes<HTMLLIElement> {
  status?: PlanProgressStatus;
}
declare function PlanItem({
  status,
  className,
  children,
  ref,
  ...props
}: PlanItemProps & {
  ref?: React$1.Ref<HTMLLIElement>;
}): React$1.JSX.Element;
interface PlanProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React$1.ReactNode;
}
declare function Plan({
  title,
  className,
  children,
  ref,
  ...props
}: PlanProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Plan, PlanItem, PlanItemProps, PlanProgressStatus, PlanProps };
//# sourceMappingURL=Plan.d.mts.map