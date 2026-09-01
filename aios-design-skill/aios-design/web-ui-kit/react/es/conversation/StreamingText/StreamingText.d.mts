import * as React$1 from "react";
//#region src/conversation/StreamingText/StreamingText.d.ts
type StreamingTextVariant = 'plain' | 'fade' | 'tail';
interface StreamingTextProps extends Omit<React$1.HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: string;
  variant?: StreamingTextVariant;
  /** Shows a visual caret and busy state while more text is expected. */
  streaming?: boolean;
}
declare function StreamingText({
  children: text,
  variant,
  streaming,
  className,
  ref,
  ...props
}: StreamingTextProps & {
  ref?: React$1.Ref<HTMLSpanElement>;
}): React$1.JSX.Element;
//#endregion
export { StreamingText, StreamingTextProps, StreamingTextVariant };
//# sourceMappingURL=StreamingText.d.mts.map