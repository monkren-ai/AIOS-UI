import { AgentOrbDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const agentOrbDoc = createAiPrimitiveDoc({
  slug: "agent-orb",
  name: "AgentOrb",
  category: "agent",
  preview: () => <AgentOrbDemo />,
  description: {
    zh: "以紧凑状态点表达 Agent 的空闲、思考、执行、暂停和错误状态。",
    en: "A compact state mark for idle, thinking, acting, paused, and error states.",
  },
  importStatement: `import { AgentOrb } from 'aios-ui-kit/agent'`,
  usageSnippet: `<AgentOrb state="thinking" showLabel />`,
  apiName: "AgentOrb",
  props: [
    {
      name: "state",
      type: `'idle' | 'thinking' | 'acting' | 'paused' | 'error'`,
      default: `'idle'`,
      description: { zh: "Agent 当前状态。", en: "Current agent state." },
    },
    {
      name: "size",
      type: `'sm' | 'md' | 'lg'`,
      default: `'md'`,
      description: { zh: "状态点尺寸。", en: "State-mark size." },
    },
    {
      name: "showLabel",
      type: "boolean",
      default: "false",
      description: { zh: "显示状态文字。", en: "Show the state label." },
    },
  ],
  accessibility: [
    {
      zh: "使用 status live region，并在执行状态暴露 busy。",
      en: "Uses a status live region and exposes busy during active work.",
    },
  ],
});
