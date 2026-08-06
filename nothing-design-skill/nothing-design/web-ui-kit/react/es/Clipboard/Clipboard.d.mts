import { ClipboardSize, clipboardVariants } from "./clipboard-variants.mjs";
import * as React$1 from "react";

//#region src/Clipboard/Clipboard.d.ts
interface ClipboardItem {
  text: string;
  time: Date;
}
type ClipboardState = 'idle' | 'copied';
interface ClipboardProps extends Omit<React$1.ComponentPropsWithRef<'div'>, 'children'> {
  maxItems?: number;
  truncateLength?: number;
  copiedDuration?: number;
  demoItems?: ClipboardItem[];
  /** 卡片内边距与条目高度：36 / 44 / 52px。 */
  size?: ClipboardSize;
  state?: ClipboardState;
}
declare function Clipboard({
  className,
  maxItems,
  truncateLength,
  copiedDuration,
  demoItems,
  size,
  state: stateProp,
  style,
  ref,
  ...props
}: ClipboardProps): React$1.JSX.Element;
declare namespace Clipboard {
  var displayName: string;
}
//#endregion
export { Clipboard, ClipboardProps, ClipboardState };
//# sourceMappingURL=Clipboard.d.mts.map