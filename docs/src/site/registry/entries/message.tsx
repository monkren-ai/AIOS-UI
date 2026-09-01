import { MessageDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const messageDoc = createAiPrimitiveDoc({
  slug: "message",
  name: "Message",
  category: "chat",
  preview: () => <MessageDemo />,
  description: {
    zh: "可组合的用户、助手与系统消息，正文和操作区按需组装。",
    en: "Composable user, assistant, and system messages with optional content and actions.",
  },
  importStatement: `import { Message, MessageContent, MessageActions, MessageCopyAction } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<Message role="assistant"><MessageContent>{content}</MessageContent></Message>`,
  apiName: "Message",
  props: [
    {
      name: "role",
      type: `'assistant' | 'user' | 'system'`,
      default: `'assistant'`,
      description: {
        zh: "消息角色与排列方向。",
        en: "Message role and alignment.",
      },
    },
    {
      name: "variant",
      type: `'plain' | 'surface'`,
      default: `'plain'`,
      description: { zh: "正文表面样式。", en: "Body surface treatment." },
    },
    {
      name: "avatar",
      type: "ReactNode",
      description: { zh: "角色头像。", en: "Role avatar." },
    },
  ],
  accessibility: [
    {
      zh: "复制操作使用 live region；操作按钮具备键盘焦点。",
      en: "Copy feedback uses a live region and action buttons are keyboard focusable.",
    },
  ],
});
