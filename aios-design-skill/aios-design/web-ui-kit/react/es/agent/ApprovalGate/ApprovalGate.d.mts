import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/agent/ApprovalGate/ApprovalGate.d.ts
type ApprovalRisk = 'low' | 'medium' | 'high';
type ApprovalState = 'pending' | 'approved' | 'denied';
declare const approvalGateVariants: (props?: ({
  risk?: "low" | "medium" | "high" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ApprovalGateProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof approvalGateVariants> {
  action: string;
  impact?: string;
  reversible?: boolean;
  risk?: ApprovalRisk;
  state?: ApprovalState;
  children?: React$1.ReactNode;
  allowLabel?: string;
  denyLabel?: string;
  onAllow?: () => void;
  onDeny?: () => void;
  approvedLabel?: string;
  deniedLabel?: string;
}
declare const ApprovalGate: React$1.ForwardRefExoticComponent<ApprovalGateProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ApprovalGate, ApprovalGateProps, ApprovalRisk, ApprovalState, approvalGateVariants };
//# sourceMappingURL=ApprovalGate.d.mts.map