import { ThinkingStepsDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const thinkingStepsDoc = createAiPrimitiveDoc({
  slug: "thinking-steps",
  name: "ThinkingSteps",
  category: "agent",
  preview: () => <ThinkingStepsDemo />,
  description: {
    zh: "显示多阶段思考链，支持受控索引、自动推进和紧凑模式。",
    en: "A multi-stage thinking sequence with controlled index, auto advance, and compact mode.",
  },
  importStatement: `import { ThinkingSteps } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ThinkingSteps steps={steps} activeIndex={1} />`,
  apiName: "ThinkingSteps",
  props: [
    {
      name: "steps",
      type: "ThinkingStep[]",
      required: true,
      description: { zh: "思考步骤。", en: "Thinking steps." },
    },
    {
      name: "activeIndex / defaultActiveIndex",
      type: "number",
      description: {
        zh: "受控或非受控当前步骤。",
        en: "Controlled or uncontrolled active step.",
      },
    },
    {
      name: "autoAdvance / interval / loop",
      type: "boolean / number / boolean",
      description: { zh: "自动推进配置。", en: "Auto-advance configuration." },
    },
    {
      name: "onStepChange",
      type: "(index: number) => void",
      description: { zh: "步骤变化回调。", en: "Step-change callback." },
    },
  ],
  accessibility: [
    {
      zh: "步骤使用有序列表，变化通过 polite live region 暴露；动效尊重 reduced motion。",
      en: "Steps use an ordered list, changes are exposed through a polite live region, and motion respects reduced motion.",
    },
  ],
});
