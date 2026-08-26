import { codeBlockVariants } from "./code-block-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/CodeBlock/CodeBlock.d.ts
interface CodeBlockProps extends Omit<React$1.HTMLAttributes<HTMLElement>, 'children' | 'onCopy'>, VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  highlight?: boolean;
  onCopy?: (code: string) => void | Promise<void>;
  copyLabel?: string;
  copiedLabel?: string;
}
declare function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers,
  copyable,
  highlight,
  wrap,
  onCopy,
  copyLabel,
  copiedLabel,
  className,
  ref,
  ...props
}: CodeBlockProps & {
  ref?: React$1.Ref<HTMLElement>;
}): React$1.JSX.Element;
//#endregion
export { CodeBlock, CodeBlockProps };
//# sourceMappingURL=CodeBlock.d.mts.map