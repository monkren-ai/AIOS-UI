import { PlanDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const planDoc = createAiPrimitiveDoc({
  slug: "plan",
  name: "Plan",
  category: "agent",
  preview: () => <PlanDemo />,
  description: {
    zh: "列出 Agent 计划步骤、当前执行位置和整体进度。",
    en: "Lists agent plan steps, current execution position, and overall progress.",
  },
  importStatement: `import { Plan, PlanItem } from 'aios-ui-kit/agent'`,
  usageSnippet: `<Plan><PlanItem status="active">Implement</PlanItem></Plan>`,
  apiName: "Plan / PlanItem",
  props: [
    {
      name: "title",
      type: "ReactNode",
      default: "'计划 / Plan'",
      description: { zh: "计划标题。", en: "Plan title." },
    },
    {
      name: "PlanItem.status",
      type: `'done' | 'active' | 'pending'`,
      default: `'pending'`,
      description: { zh: "步骤状态。", en: "Step state." },
    },
    {
      name: "children",
      type: "ReactNode",
      required: true,
      description: { zh: "PlanItem 子项。", en: "PlanItem children." },
    },
  ],
  accessibility: [
    {
      zh: "运行步骤设置 `aria-current=step`，完成数量通过 progressbar 暴露。",
      en: "The active step sets `aria-current=step`; completion is exposed through a progressbar.",
    },
  ],
});
