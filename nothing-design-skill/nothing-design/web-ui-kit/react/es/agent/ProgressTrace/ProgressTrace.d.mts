import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/ProgressTrace/ProgressTrace.d.ts
type TraceStepStatus = 'pending' | 'active' | 'done' | 'error' | 'skipped';
interface TraceStep {
  id: string;
  label: string;
  description?: string;
  status?: TraceStepStatus;
  timestamp?: string;
}
declare const progressTraceVariants: (props?: ({
  collapsed?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ProgressTraceProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof progressTraceVariants> {
  steps: TraceStep[];
  defaultCollapsed?: boolean;
  title?: string;
  expandLabel?: string;
  collapseLabel?: string;
}
declare const ProgressTrace: React$1.ForwardRefExoticComponent<ProgressTraceProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ProgressTrace, ProgressTraceProps, TraceStep, TraceStepStatus, progressTraceVariants };
//# sourceMappingURL=ProgressTrace.d.mts.map