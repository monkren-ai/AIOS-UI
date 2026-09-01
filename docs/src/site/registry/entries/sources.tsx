import { SourcesDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const sourcesDoc = createAiPrimitiveDoc({
  slug: "sources",
  name: "Sources",
  category: "agent",
  preview: () => <SourcesDemo />,
  description: {
    zh: "可折叠的来源计数与外链引用卡片。",
    en: "Collapsible source count and external citation cards.",
  },
  importStatement: `import { Sources, Source } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<Sources><Source href={url} domain="example.com" title="Reference" /></Sources>`,
  apiName: "Sources / Source",
  props: [
    {
      name: "open / defaultOpen",
      type: "boolean",
      description: {
        zh: "受控或非受控展开状态。",
        en: "Controlled or uncontrolled disclosure.",
      },
    },
    {
      name: "count",
      type: "number",
      description: {
        zh: "覆盖自动统计的来源数量。",
        en: "Overrides the inferred source count.",
      },
    },
    {
      name: "Source.domain / title",
      type: "string / ReactNode",
      required: true,
      description: { zh: "来源域名与标题。", en: "Source domain and title." },
    },
  ],
  accessibility: [
    {
      zh: "来源卡始终使用安全新窗口属性，折叠触发器可由键盘操作。",
      en: "Source cards always use safe new-window attributes and disclosure is keyboard operable.",
    },
  ],
});
