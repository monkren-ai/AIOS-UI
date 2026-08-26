import { CodeBlock } from "aios-ui-kit/code-block";
import type { ComponentDoc } from "../types";
import Basic from "../../examples/code-block/basic";
import source from "../../examples/code-block/basic.tsx?raw";

export const codeBlockDoc: ComponentDoc = {
  slug: "code-block",
  name: "CodeBlock",
  category: "data-display",
  status: "new",
  description: {
    zh: "代码输出容器，支持复制、行号、换行和延迟语法高亮。",
    en: "A code output surface with copy, line numbers, wrapping, and lazy syntax highlighting.",
  },
  preview: () => <CodeBlock code="npm run test" language="bash" />,
  importStatement: `import { CodeBlock } from 'aios-ui-kit/code-block'`,
  usageSnippet: `<CodeBlock code={code} language="tsx" copyable />`,
  examples: [
    {
      id: "basic",
      title: { zh: "代码输出", en: "Code output" },
      code: source,
      render: () => <Basic />,
    },
  ],
  api: [
    {
      name: "CodeBlock",
      props: [
        {
          name: "code",
          type: "string",
          required: true,
          description: { zh: "代码文本。", en: "Code text." },
        },
        {
          name: "language",
          type: "string",
          description: {
            zh: "Shiki 语言标识；失败时回退纯文本。",
            en: "Shiki language id; failures fall back to plain text.",
          },
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          default: "false",
          description: { zh: "显示行号。", en: "Show line numbers." },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: "复制结果使用 `aria-live` 播报；未知语言仍能读取完整纯文本。",
      en: "Copy feedback is announced with `aria-live`; unknown languages retain readable plain text.",
    },
  ],
};
