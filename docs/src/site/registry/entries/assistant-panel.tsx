import { AssistantPanelDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const assistantPanelDoc = createAiPrimitiveDoc({
  slug: "assistant-panel",
  name: "AssistantPanel",
  category: "agent",
  preview: () => <AssistantPanelDemo />,
  description: {
    zh: "受控或非受控的助手入口与面板，支持内嵌定位、Escape 和焦点恢复。",
    en: "A controlled or uncontrolled assistant launcher and panel with inline placement, Escape, and focus return.",
  },
  importStatement: `import { AssistantPanel } from 'aios-ui-kit/agent'`,
  usageSnippet: `<AssistantPanel inline defaultOpen title="AI Assistant">{content}</AssistantPanel>`,
  apiName: "AssistantPanel",
  props: [
    {
      name: "open / defaultOpen",
      type: "boolean",
      description: {
        zh: "受控或非受控打开状态。",
        en: "Controlled or uncontrolled open state.",
      },
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: { zh: "打开状态变化回调。", en: "Open-state callback." },
    },
    {
      name: "inline",
      type: "boolean",
      default: "false",
      description: {
        zh: "相对父容器定位。",
        en: "Position relative to the parent.",
      },
    },
    {
      name: "autoFocus",
      type: "boolean",
      default: "true",
      description: {
        zh: "打开时聚焦关闭按钮。",
        en: "Focus the close button when opened.",
      },
    },
  ],
  accessibility: [
    {
      zh: "面板具有 dialog 语义；Escape 关闭后焦点返回启动按钮。",
      en: "The panel has dialog semantics; Escape closes it and restores focus to the launcher.",
    },
  ],
});
