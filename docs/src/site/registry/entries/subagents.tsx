import { SubagentsDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const subagentsDoc = createAiPrimitiveDoc({
  slug: "subagents",
  name: "Subagents",
  category: "agent",
  preview: () => <SubagentsDemo />,
  description: {
    zh: "汇总并行子 Agent 的名称、状态、进度、元数据与错误。",
    en: "Summarizes names, states, progress, metadata, and errors for parallel subagents.",
  },
  importStatement: `import { Subagent, SubagentList } from 'aios-ui-kit/agent'`,
  usageSnippet: `<SubagentList><Subagent name="Research" status="running" progress={60} /></SubagentList>`,
  apiName: "Subagent",
  props: [
    {
      name: "name",
      type: "ReactNode",
      required: true,
      description: { zh: "子 Agent 名称。", en: "Subagent name." },
    },
    {
      name: "status",
      type: `'running' | 'done' | 'error'`,
      default: `'running'`,
      description: { zh: "当前状态。", en: "Current state." },
    },
    {
      name: "progress",
      type: "number",
      description: { zh: "0–100 的进度。", en: "Progress from 0 to 100." },
    },
  ],
  accessibility: [
    {
      zh: "每项暴露 busy 和 progressbar，错误内容使用 alert。",
      en: "Each item exposes busy and progressbar semantics; errors use alert.",
    },
  ],
});
