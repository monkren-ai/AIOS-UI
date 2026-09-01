import * as React$1 from "react";

//#region src/agent/WebSearch/WebSearch.d.ts
type WebSearchStatus = 'running' | 'complete' | 'error';
interface WebSearchResult {
  title: React$1.ReactNode;
  url: string;
  description?: React$1.ReactNode;
  domain?: React$1.ReactNode;
}
interface WebSearchProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'results'> {
  query: React$1.ReactNode;
  results?: WebSearchResult[];
  status?: WebSearchStatus;
  label?: React$1.ReactNode;
  activeLabel?: React$1.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
declare function WebSearch({
  query,
  results,
  status,
  label,
  activeLabel,
  open,
  defaultOpen,
  onOpenChange,
  className,
  ref,
  ...props
}: WebSearchProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
//#endregion
export { WebSearch, WebSearchProps, WebSearchResult, WebSearchStatus };
//# sourceMappingURL=WebSearch.d.mts.map