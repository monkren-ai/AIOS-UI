import { ResponseDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const responseDoc = createAiPrimitiveDoc({
  slug: "response",
  name: "Response",
  category: "chat",
  preview: () => <ResponseDemo />,
  description: {
    zh: "安全渲染 GFM Markdown、表格、链接与延迟高亮代码块。",
    en: "Safely renders GFM Markdown, tables, links, and lazily highlighted code blocks.",
  },
  importStatement: `import { Response } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<Response>{markdown}</Response>`,
  apiName: "Response",
  props: [
    {
      name: "children",
      type: "string",
      required: true,
      description: { zh: "Markdown 源文本。", en: "Markdown source." },
    },
    {
      name: "components",
      type: "Components",
      description: {
        zh: "自定义元素渲染器。",
        en: "Custom element renderers.",
      },
    },
    {
      name: "codeCopyable",
      type: "boolean",
      default: "true",
      description: {
        zh: "代码块是否可复制。",
        en: "Whether code blocks are copyable.",
      },
    },
  ],
  accessibility: [
    {
      zh: "外链自动加入安全属性；原始 HTML 不会执行。",
      en: "External links receive safe attributes and raw HTML is not executed.",
    },
  ],
});
