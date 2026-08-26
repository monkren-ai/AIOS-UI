import * as React$1 from "react";

//#region src/agent/Terminal/Terminal.d.ts
interface TerminalProps extends React$1.HTMLAttributes<HTMLDivElement> {
  command: string;
  running?: boolean;
  exitCode?: number;
  runningLabel?: string;
}
declare function Terminal({
  command,
  running,
  exitCode,
  runningLabel,
  className,
  children,
  ref,
  ...props
}: TerminalProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function TerminalLine({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { Terminal, TerminalLine, TerminalProps };
//# sourceMappingURL=Terminal.d.mts.map