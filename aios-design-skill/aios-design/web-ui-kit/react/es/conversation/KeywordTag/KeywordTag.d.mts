import { keywordTagVariants } from "./keyword-tag-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/conversation/KeywordTag/KeywordTag.d.ts
interface KeywordTagProps extends React$1.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof keywordTagVariants> {
  icon?: React$1.ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
}
declare function KeywordTag({
  kind,
  icon,
  onRemove,
  removeLabel,
  className,
  children,
  ref,
  ...props
}: KeywordTagProps & {
  ref?: React$1.Ref<HTMLSpanElement>;
}): React$1.JSX.Element;
//#endregion
export { KeywordTag, KeywordTagProps };
//# sourceMappingURL=KeywordTag.d.mts.map