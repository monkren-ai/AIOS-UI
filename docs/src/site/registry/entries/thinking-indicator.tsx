import { ThinkingIndicatorDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const thinkingIndicatorDoc = createAiPrimitiveDoc({
  slug: "thinking-indicator",
  name: "ThinkingIndicator",
  category: "agent",
  preview: () => <ThinkingIndicatorDemo />,
  description: {
    zh: "以点阵运动和结果标记表达思考、执行、完成与错误。",
    en: "Animated dots and result marks for thinking, acting, done, and error states.",
  },
  importStatement: `import { ThinkingIndicator } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ThinkingIndicator state="thinking" label="正在思考 / Thinking" />`,
  apiName: "ThinkingIndicator",
  props: [
    {
      name: "state",
      type: `'thinking' | 'acting' | 'done' | 'error'`,
      default: `'thinking'`,
      description: { zh: "思考状态。", en: "Thinking state." },
    },
    {
      name: "size",
      type: `'sm' | 'md' | 'lg'`,
      default: `'md'`,
      description: { zh: "指示器尺寸。", en: "Indicator size." },
    },
    {
      name: "label",
      type: "string",
      description: {
        zh: "可见且可访问的状态文字。",
        en: "Visible and accessible state label.",
      },
    },
  ],
  accessibility: [
    {
      zh: "使用 status live region；运行状态暴露 busy，SVG 为装饰。",
      en: "Uses a status live region, exposes busy while active, and keeps the SVG decorative.",
    },
  ],
});
