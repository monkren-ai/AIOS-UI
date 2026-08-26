import * as React$1 from "react";

//#region src/conversation/ConversationViewport/ConversationViewport.d.ts
interface ConversationViewportProps extends React$1.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
}
declare function ConversationViewport({
  autoScroll,
  className,
  children,
  ref,
  ...props
}: ConversationViewportProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function ConversationContent({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function ConversationScrollButton({
  label,
  className
}: {
  label?: string;
  className?: string;
}): React$1.JSX.Element | null;
//#endregion
export { ConversationContent, ConversationScrollButton, ConversationViewport, ConversationViewportProps };
//# sourceMappingURL=ConversationViewport.d.mts.map