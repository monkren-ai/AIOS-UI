import { AssistantModal } from "aios-ui-kit/agent";
import type { ComponentDoc } from "../types";
import Basic from "../../examples/assistant-modal/basic";
import basicSource from "../../examples/assistant-modal/basic.tsx?raw";

export const assistantModalDoc: ComponentDoc = {
  slug: "assistant-modal",
  name: "AssistantModal",
  category: "shell",
  status: "new",
  description: {
    zh: "面向 Oreo 迁移场景的语义入口，内部复用 AssistantPanel 的状态、焦点和 Escape 行为。",
    en: "A semantic migration entry backed by AssistantPanel state, focus, and Escape behavior.",
  },
  preview: () => (
    <div className="relative h-64 w-full max-w-sm">
      <AssistantModal inline />
    </div>
  ),
  importStatement: `import { AssistantModal } from 'aios-ui-kit/agent'`,
  usageSnippet: `<AssistantModal title="AI Assistant">{content}</AssistantModal>`,
  examples: [
    {
      id: "basic",
      title: { zh: "浮动助手", en: "Floating assistant" },
      code: basicSource,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: "AssistantModal",
      props: [
        {
          name: "open",
          type: "boolean",
          description: { zh: "受控打开状态。", en: "Controlled open state." },
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: {
            zh: "打开状态变化回调。",
            en: "Open-state change callback.",
          },
        },
        {
          name: "inline",
          type: "boolean",
          default: "false",
          description: {
            zh: "相对容器定位，便于嵌入预览。",
            en: "Position relative to a container for embedded previews.",
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "继承 AssistantPanel 的焦点恢复、Escape 关闭与对话框标记。",
      en: "Inherits AssistantPanel focus return, Escape dismissal, and dialog labeling.",
    },
  ],
};
