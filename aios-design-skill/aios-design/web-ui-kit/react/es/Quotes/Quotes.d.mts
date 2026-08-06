import { QuotesSize, QuotesTheme, quotesVariants } from "./quotes-variants.mjs";
import * as React$1 from "react";

//#region src/Quotes/Quotes.d.ts
interface QuoteData {
  text: string;
  author: string;
}
interface QuotesProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  quotes?: QuoteData[];
  interval?: number;
  theme?: QuotesTheme;
  size?: QuotesSize;
}
declare function Quotes({
  className,
  theme,
  size,
  quotes,
  interval,
  ...props
}: QuotesProps): React$1.JSX.Element;
declare namespace Quotes {
  var displayName: string;
}
//#endregion
export { QuoteData, Quotes, QuotesProps };
//# sourceMappingURL=Quotes.d.mts.map