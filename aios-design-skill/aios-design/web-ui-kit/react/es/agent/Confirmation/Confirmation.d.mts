import { ApprovalState } from "../ApprovalGate/ApprovalGate.mjs";
import * as React$1 from "react";

//#region src/agent/Confirmation/Confirmation.d.ts
interface ConfirmationProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React$1.ReactNode;
  description?: React$1.ReactNode;
  details?: React$1.ReactNode;
  state?: ApprovalState;
  danger?: boolean;
  reversible?: boolean;
  approveLabel?: string;
  denyLabel?: string;
  approvedLabel?: string;
  deniedLabel?: string;
  onApprove?: () => void;
  onDeny?: () => void;
}
declare function Confirmation({
  title,
  description,
  details,
  state,
  danger,
  reversible,
  approveLabel,
  denyLabel,
  approvedLabel,
  deniedLabel,
  onApprove,
  onDeny,
  className,
  ref,
  ...props
}: ConfirmationProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Confirmation, ConfirmationProps };
//# sourceMappingURL=Confirmation.d.mts.map