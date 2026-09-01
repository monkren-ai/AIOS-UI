import { PromptBoxDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const promptBoxDoc = createAiPrimitiveDoc({
  slug: "prompt-box",
  name: "PromptBox",
  category: "agent",
  preview: () => <PromptBoxDemo />,
  description: {
    zh: "Agent 提示输入，组合附件、上下文标签、模型、语音与运行状态。",
    en: "Agent prompting with attachments, context tags, model, voice, and running state.",
  },
  importStatement: `import { PromptBox, PromptBoxModelSelect } from 'aios-ui-kit/agent'`,
  usageSnippet: `<PromptBox attachments={files} modelSelect={<PromptBoxModelSelect label="AIOS" />} onSubmit={send} />`,
  apiName: "PromptBox / PromptBoxModelSelect",
  props: [
    {
      name: "attachments / tags / modelSelect",
      type: "ReactNode",
      description: {
        zh: "输入框上方的上下文插槽。",
        en: "Context slots above the input.",
      },
    },
    {
      name: "running",
      type: "boolean",
      default: "false",
      description: {
        zh: "切换发送与停止状态。",
        en: "Switches send to stop state.",
      },
    },
    {
      name: "contextBefore / contextAfter",
      type: "ReactNode",
      description: {
        zh: "输入卡片前后的上下文条插槽。",
        en: "Context-bar slots before and after the input card.",
      },
    },
    {
      name: "voice / voiceStatus",
      type: "'wave' | 'mic' / 'idle' | 'inputting' | 'thinking'",
      description: {
        zh: "语音入口外观与生命周期。",
        en: "Voice control appearance and lifecycle.",
      },
    },
    {
      name: "inset",
      type: "boolean",
      default: "false",
      description: {
        zh: "缩进组合内容以适配紧凑侧栏。",
        en: "Insets the composition for compact sidebars.",
      },
    },
    {
      name: "onSubmit / onStop / onAttach / onMention",
      type: "(value: string) => void / () => void",
      description: { zh: "发送和停止回调。", en: "Submit and stop callbacks." },
    },
  ],
  accessibility: [
    {
      zh: "基于 textarea，支持键盘提交、输入法组合态与可访问的发送/停止按钮。",
      en: "Uses a textarea with keyboard submission, IME handling, and accessible send/stop buttons.",
    },
  ],
});
