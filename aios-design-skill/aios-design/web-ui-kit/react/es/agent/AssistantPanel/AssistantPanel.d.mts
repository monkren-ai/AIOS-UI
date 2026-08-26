import * as React$1 from "react";

//#region src/agent/AssistantPanel/AssistantPanel.d.ts
interface AssistantPanelProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React$1.ReactNode;
  launcherLabel?: string;
  closeLabel?: string;
  launcher?: React$1.ReactNode;
  inline?: boolean;
  autoFocus?: boolean;
  panelClassName?: string;
}
declare function AssistantPanel({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  title,
  launcherLabel,
  closeLabel,
  launcher,
  inline,
  autoFocus,
  panelClassName,
  className,
  children,
  ref,
  ...props
}: AssistantPanelProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { AssistantPanel, AssistantPanelProps };
//# sourceMappingURL=AssistantPanel.d.mts.map