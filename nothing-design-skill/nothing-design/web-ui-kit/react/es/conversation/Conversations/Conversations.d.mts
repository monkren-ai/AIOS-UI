import { conversationsVariants } from "./conversations-variants.mjs";
import * as React$1 from "react";
import { VariantProps } from "class-variance-authority";
//#region src/conversation/Conversations/Conversations.d.ts
type ConversationsSemanticType = 'root' | 'header' | 'list' | 'item' | 'itemIcon' | 'itemLabel' | 'itemMeta' | 'itemActions' | 'footer';
interface ConversationItem {
  key: string;
  icon?: React$1.ReactNode;
  label: React$1.ReactNode;
  meta?: React$1.ReactNode;
  actions?: React$1.ReactNode | ((item: ConversationItem) => React$1.ReactNode);
  disabled?: boolean;
}
interface ConversationsProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof conversationsVariants> {
  items: ConversationItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string) => void;
  header?: React$1.ReactNode;
  footer?: React$1.ReactNode;
  classNames?: Partial<Record<ConversationsSemanticType, string>>;
  styles?: Partial<Record<ConversationsSemanticType, React$1.CSSProperties>>;
}
declare const Conversations: React$1.ForwardRefExoticComponent<ConversationsProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { ConversationItem, Conversations, ConversationsProps, ConversationsSemanticType };
//# sourceMappingURL=Conversations.d.mts.map