import { CodeDiff } from "aios-ui-kit/code-diff";
import type { ComponentDoc } from "../types";
import Basic from "../../examples/code-diff/basic";
import source from "../../examples/code-diff/basic.tsx?raw";

export const codeDiffDoc: ComponentDoc = {
  slug: "code-diff",
  name: "CodeDiff",
  category: "data-display",
  status: "new",
  description: {
    zh: "单色代码差异视图，用结构和红色事件色区分新增与删除。",
    en: "A monochrome code diff that distinguishes additions and removals through structure and the red event color.",
  },
  preview: () => (
    <CodeDiff
      filename="agent.ts"
      lines={[{ type: "add", newLine: 1, content: "run()" }]}
    />
  ),
  importStatement: `import { CodeDiff } from 'aios-ui-kit/code-diff'`,
  usageSnippet: `<CodeDiff filename="agent.ts" lines={lines} />`,
  examples: [
    {
      id: "basic",
      title: { zh: "文件差异", en: "File diff" },
      code: source,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: "CodeDiff",
      props: [
        {
          name: "filename",
          type: "string",
          required: true,
          description: { zh: "文件名。", en: "Filename." },
        },
        {
          name: "lines",
          type: "CodeDiffLine[]",
          required: true,
          description: {
            zh: "上下文、新增与删除行。",
            en: "Context, added, and removed lines.",
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "摘要提供新增与删除数量的完整无障碍名称，不能只依赖颜色判断。",
      en: "The summary exposes full addition/removal counts, so meaning never depends on color alone.",
    },
  ],
};
