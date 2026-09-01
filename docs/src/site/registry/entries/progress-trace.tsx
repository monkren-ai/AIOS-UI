import { ProgressTraceDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const progressTraceDoc = createAiPrimitiveDoc({
  slug: "progress-trace",
  name: "ProgressTrace",
  category: "agent",
  preview: () => <ProgressTraceDemo />,
  description: {
    zh: "按时间顺序展示 Agent 执行轨迹，并支持折叠长流程。",
    en: "A chronological agent execution trace with disclosure for long workflows.",
  },
  importStatement: `import { ProgressTrace } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ProgressTrace title="TRACE" steps={steps} />`,
  apiName: "ProgressTrace",
  props: [
    {
      name: "steps",
      type: "TraceStep[]",
      required: true,
      description: { zh: "轨迹步骤。", en: "Trace steps." },
    },
    {
      name: "defaultCollapsed",
      type: "boolean",
      default: "false",
      description: { zh: "默认折叠。", en: "Initially collapsed." },
    },
    {
      name: "title",
      type: "string",
      default: `'TRACE'`,
      description: { zh: "轨迹标题。", en: "Trace title." },
    },
  ],
  accessibility: [
    {
      zh: "折叠按钮暴露 aria-expanded；状态变化通过 polite live region 播报。",
      en: "The disclosure exposes aria-expanded and changes are announced through a polite live region.",
    },
  ],
});
