import * as React$1 from "react";

//#region src/conversation/BranchPicker/BranchPicker.d.ts
interface BranchPickerProps extends React$1.HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
}
declare function BranchPicker({
  current,
  total,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  className,
  ref,
  ...props
}: BranchPickerProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { BranchPicker, BranchPickerProps };
//# sourceMappingURL=BranchPicker.d.mts.map