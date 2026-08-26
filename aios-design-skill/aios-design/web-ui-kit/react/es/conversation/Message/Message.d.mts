import { messageVariants } from "./message-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";

//#region src/conversation/Message/Message.d.ts
interface MessageProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof messageVariants> {
  role?: 'assistant' | 'user' | 'system';
  avatar?: React$1.ReactNode;
}
declare function Message({
  role,
  variant,
  avatar,
  className,
  children,
  ref,
  ...props
}: MessageProps & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function MessageContent({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function MessageActions({
  className,
  ref,
  ...props
}: React$1.HTMLAttributes<HTMLDivElement> & {
  ref?: React$1.Ref<HTMLDivElement>;
}): React$1.JSX.Element;
declare function MessageAction({
  className,
  ref,
  ...props
}: React$1.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React$1.Ref<HTMLButtonElement>;
}): React$1.JSX.Element;
interface MessageCopyActionProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string;
  copyLabel?: string;
  copiedLabel?: string;
}
declare function MessageCopyAction({
  text,
  copyLabel,
  copiedLabel,
  onClick,
  ...props
}: MessageCopyActionProps): React$1.JSX.Element;
//#endregion
export { Message, MessageAction, MessageActions, MessageContent, MessageCopyAction, MessageCopyActionProps, MessageProps };
//# sourceMappingURL=Message.d.mts.map