import { KeywordTagDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const keywordTagDoc = createAiPrimitiveDoc({
  slug: "keyword-tag",
  name: "KeywordTag",
  category: "agent",
  preview: () => <KeywordTagDemo />,
  description: {
    zh: "用紧凑标签表达模型、服务、文件或上下文。",
    en: "Compact labels for models, services, files, and context.",
  },
  importStatement: `import { KeywordTag } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<KeywordTag kind="file" onRemove={remove}>manifest.ts</KeywordTag>`,
  apiName: "KeywordTag",
  props: [
    {
      name: "kind",
      type: `'context' | 'model' | 'service' | 'file'`,
      default: `'context'`,
      description: { zh: "标签语义类型。", en: "Semantic tag kind." },
    },
    {
      name: "icon",
      type: "ReactNode",
      description: { zh: "装饰图标。", en: "Decorative icon." },
    },
    {
      name: "onRemove",
      type: "() => void",
      description: { zh: "显示移除操作。", en: "Shows a remove action." },
    },
  ],
  accessibility: [
    {
      zh: "移除按钮使用可自定义的完整 `aria-label`。",
      en: "The remove button uses a customizable full `aria-label`.",
    },
  ],
});
