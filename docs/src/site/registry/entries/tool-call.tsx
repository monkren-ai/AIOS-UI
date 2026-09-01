import { ToolCallDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const toolCallDoc = createAiPrimitiveDoc({
  slug: "tool-call",
  name: "ToolCall",
  category: "agent",
  preview: () => <ToolCallDemo />,
  description: {
    zh: "呈现工具名称、参数、状态、耗时、结果与组合式详情。",
    en: "Presents tool name, arguments, status, elapsed time, result, and composable details.",
  },
  importStatement: `import { ToolCallRow } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ToolCallRow tool="read_file" status="done" args={args} result={result} />`,
  apiName: "ToolCallRow",
  props: [
    {
      name: "tool",
      type: "string",
      required: true,
      description: { zh: "工具名称。", en: "Tool name." },
    },
    {
      name: "status",
      type: `'pending' | 'running' | 'done' | 'error' | 'skipped'`,
      default: `'pending'`,
      description: { zh: "调用状态。", en: "Call status." },
    },
    {
      name: "expanded / defaultExpanded",
      type: "boolean",
      description: {
        zh: "受控或非受控详情状态。",
        en: "Controlled or uncontrolled details.",
      },
    },
  ],
  accessibility: [
    {
      zh: "运行态暴露 `aria-busy`，详情按钮同步 `aria-expanded`。",
      en: "Running exposes `aria-busy` and the detail button reflects `aria-expanded`.",
    },
  ],
});
