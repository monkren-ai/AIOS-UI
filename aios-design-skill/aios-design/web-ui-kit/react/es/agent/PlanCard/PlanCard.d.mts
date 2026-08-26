import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/PlanCard/PlanCard.d.ts
type PlanStepStatus = 'pending' | 'approved' | 'running' | 'rejected' | 'done';
interface PlanStep {
  id: string;
  description: string;
  tool?: string;
  status?: PlanStepStatus;
}
declare const planCardVariants: (props?: ({
  editable?: boolean | null | undefined;
  compact?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface PlanCardProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof planCardVariants> {
  title?: string;
  steps: PlanStep[];
  editable?: boolean;
  compact?: boolean;
  onApprove?: () => void;
  onEdit?: () => void;
  onStepToggle?: (stepId: string, approved: boolean) => void;
  onApproveAll?: () => void;
  onReset?: () => void;
  approveLabel?: string;
  editLabel?: string;
  approveAllLabel?: string;
  resetLabel?: string;
  approveDisabledHint?: string;
}
declare const PlanCard: React$1.ForwardRefExoticComponent<PlanCardProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { PlanCard, PlanCardProps, PlanStep, PlanStepStatus, planCardVariants };
//# sourceMappingURL=PlanCard.d.mts.map