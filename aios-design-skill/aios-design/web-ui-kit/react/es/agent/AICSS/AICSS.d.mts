import * as React$1 from "react";
//#region src/agent/AICSS/AICSS.d.ts
type AicssLocale = 'zh' | 'en';
type AicssStatus = 'idle' | 'running' | 'done' | 'error';
interface AicssThinkingStateProps extends React$1.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  locale?: AicssLocale;
}
declare const AicssThinkingState: React$1.ForwardRefExoticComponent<AicssThinkingStateProps & React$1.RefAttributes<HTMLSpanElement>>;
interface AicssThinkingReasoningProps extends React$1.HTMLAttributes<HTMLDivElement> {
  summary?: React$1.ReactNode;
  children: React$1.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  locale?: AicssLocale;
}
declare const AicssThinkingReasoning: React$1.ForwardRefExoticComponent<AicssThinkingReasoningProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssOrbsProps extends React$1.HTMLAttributes<HTMLDivElement> {
  status?: AicssStatus;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  locale?: AicssLocale;
}
declare const AicssOrbs: React$1.ForwardRefExoticComponent<AicssOrbsProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssSearchResult {
  title: string;
  url: string;
  description?: string;
}
interface AicssWebSearchProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'results'> {
  query: string;
  results?: AicssSearchResult[];
  status?: AicssStatus;
  defaultOpen?: boolean;
  locale?: AicssLocale;
}
declare const AicssWebSearch: React$1.ForwardRefExoticComponent<AicssWebSearchProps & React$1.RefAttributes<HTMLDivElement>>;
type AicssDiffLineType = 'context' | 'add' | 'remove';
interface AicssDiffLine {
  oldLine?: number;
  newLine?: number;
  type?: AicssDiffLineType;
  content: string;
}
interface AicssFileDiffProps extends React$1.HTMLAttributes<HTMLDivElement> {
  filename: string;
  lines: AicssDiffLine[];
  locale?: AicssLocale;
}
declare const AicssFileDiff: React$1.ForwardRefExoticComponent<AicssFileDiffProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssImageGenerationProps extends React$1.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  prompt: string;
  width?: number;
  height?: number;
  progress?: number;
  status?: AicssStatus;
  locale?: AicssLocale;
}
declare const AicssImageGeneration: React$1.ForwardRefExoticComponent<AicssImageGenerationProps & React$1.RefAttributes<HTMLElement>>;
interface AicssTextResponseProps extends React$1.HTMLAttributes<HTMLDivElement> {
  children: React$1.ReactNode;
}
declare const AicssTextResponse: React$1.ForwardRefExoticComponent<AicssTextResponseProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssStreamingTextProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
  text: string;
  streaming?: boolean;
}
declare const AicssStreamingText: React$1.ForwardRefExoticComponent<AicssStreamingTextProps & React$1.RefAttributes<HTMLParagraphElement>>;
interface AicssCitation {
  id: string;
  title: string;
  url: string;
  domain?: string;
}
interface AicssInlineCitationsProps extends React$1.HTMLAttributes<HTMLDivElement> {
  children: React$1.ReactNode;
  citations: AicssCitation[];
  locale?: AicssLocale;
}
declare const AicssInlineCitations: React$1.ForwardRefExoticComponent<AicssInlineCitationsProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssCodeBlockProps extends Omit<React$1.HTMLAttributes<HTMLElement>, 'onCopy'> {
  code: string;
  filename?: string;
  language?: string;
  showLineNumbers?: boolean;
  onCopy?: (code: string) => void | Promise<void>;
  locale?: AicssLocale;
}
declare const AicssCodeBlock: React$1.ForwardRefExoticComponent<AicssCodeBlockProps & React$1.RefAttributes<HTMLElement>>;
interface AicssTaskItem {
  id: string;
  label: string;
  completed?: boolean;
}
interface AicssTaskListProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  title?: string;
  tasks: AicssTaskItem[];
  onChange?: (tasks: AicssTaskItem[]) => void;
  defaultOpen?: boolean;
  locale?: AicssLocale;
}
declare const AicssTaskList: React$1.ForwardRefExoticComponent<AicssTaskListProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssTableColumn<Row> {
  key: keyof Row | string;
  header: React$1.ReactNode;
  render?: (row: Row) => React$1.ReactNode;
  align?: 'start' | 'center' | 'end';
}
interface AicssDataTableProps<Row extends Record<string, unknown>> extends Omit<React$1.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: AicssTableColumn<Row>[];
  rows: Row[];
  rowKey?: (row: Row, index: number) => React$1.Key;
  caption?: string;
}
declare function AicssDataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  caption,
  className,
  ...props
}: AicssDataTableProps<Row>): React$1.JSX.Element;
interface AicssComparisonFeature {
  feature: React$1.ReactNode;
  values: Record<string, React$1.ReactNode | boolean | null>;
}
interface AicssComparisonTableProps extends React$1.HTMLAttributes<HTMLDivElement> {
  plans: string[];
  features: AicssComparisonFeature[];
  caption?: string;
  locale?: AicssLocale;
}
declare const AicssComparisonTable: React$1.ForwardRefExoticComponent<AicssComparisonTableProps & React$1.RefAttributes<HTMLDivElement>>;
interface AicssAgentInputProps extends Omit<React$1.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onSubmit' | 'value'> {
  value?: string;
  defaultValue?: string;
  loading?: boolean;
  model?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onAttach?: () => void;
  onCancel?: () => void;
  locale?: AicssLocale;
}
declare const AicssAgentInput: React$1.ForwardRefExoticComponent<AicssAgentInputProps & React$1.RefAttributes<HTMLTextAreaElement>>;
//#endregion
export { AicssAgentInput, AicssAgentInputProps, AicssCitation, AicssCodeBlock, AicssCodeBlockProps, AicssComparisonFeature, AicssComparisonTable, AicssComparisonTableProps, AicssDataTable, AicssDataTableProps, AicssDiffLine, AicssDiffLineType, AicssFileDiff, AicssFileDiffProps, AicssImageGeneration, AicssImageGenerationProps, AicssInlineCitations, AicssInlineCitationsProps, AicssLocale, AicssOrbs, AicssOrbsProps, AicssSearchResult, AicssStatus, AicssStreamingText, AicssStreamingTextProps, AicssTableColumn, AicssTaskItem, AicssTaskList, AicssTaskListProps, AicssTextResponse, AicssTextResponseProps, AicssThinkingReasoning, AicssThinkingReasoningProps, AicssThinkingState, AicssThinkingStateProps, AicssWebSearch, AicssWebSearchProps };
//# sourceMappingURL=AICSS.d.mts.map