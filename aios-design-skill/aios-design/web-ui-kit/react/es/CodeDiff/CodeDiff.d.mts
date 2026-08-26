import * as React$1 from "react";

//#region src/CodeDiff/CodeDiff.d.ts
type CodeDiffLineType = 'context' | 'add' | 'remove';
interface CodeDiffLine {
  oldLine?: number;
  newLine?: number;
  type?: CodeDiffLineType;
  content: string;
}
interface CodeDiffProps extends React$1.HTMLAttributes<HTMLElement> {
  filename: string;
  lines: CodeDiffLine[];
  summaryLabel?: string;
}
declare function CodeDiff({
  filename,
  lines,
  summaryLabel,
  className,
  ref,
  ...props
}: CodeDiffProps & {
  ref?: React$1.Ref<HTMLElement>;
}): React$1.JSX.Element;
//#endregion
export { CodeDiff, CodeDiffLine, CodeDiffLineType, CodeDiffProps };
//# sourceMappingURL=CodeDiff.d.mts.map