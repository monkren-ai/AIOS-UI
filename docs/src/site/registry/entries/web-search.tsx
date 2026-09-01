import { WebSearchDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const webSearchDoc = createAiPrimitiveDoc({
  slug: "web-search",
  name: "WebSearch",
  category: "agent",
  preview: () => <WebSearchDemo />,
  description: {
    zh: "展示搜索查询、执行状态与安全外链结果。",
    en: "Displays a search query, execution state, and safe external results.",
  },
  importStatement: `import { WebSearch } from 'aios-ui-kit/agent'`,
  usageSnippet: `<WebSearch query={query} status="complete" results={results} />`,
  apiName: "WebSearch",
  props: [
    {
      name: "query",
      type: "string",
      required: true,
      description: { zh: "搜索查询。", en: "Search query." },
    },
    {
      name: "results",
      type: "WebSearchResult[]",
      default: "[]",
      description: { zh: "结果列表。", en: "Search results." },
    },
    {
      name: "status",
      type: `'running' | 'complete' | 'error'`,
      default: `'complete'`,
      description: { zh: "搜索状态。", en: "Search state." },
    },
  ],
  accessibility: [
    {
      zh: "结果使用真实链接并在新窗口安全打开；标题按钮同步展开状态。",
      en: "Results use real safely opened links and the header button reflects disclosure state.",
    },
  ],
});
