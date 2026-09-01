import { PlanCardDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const planCardDoc = createAiPrimitiveDoc({
  slug: "plan-card",
  name: "PlanCard",
  category: "agent",
  preview: () => <PlanCardDemo />,
  description: {
    zh: "数据驱动的 Agent 计划卡，支持步骤审批、运行态和批量操作。",
    en: "A data-driven agent plan card with step approval, running state, and bulk actions.",
  },
  importStatement: `import { PlanCard } from 'aios-ui-kit/agent'`,
  usageSnippet: `<PlanCard steps={steps} editable onApprove={approve} />`,
  apiName: "PlanCard",
  props: [
    {
      name: "steps",
      type: "PlanStep[]",
      required: true,
      description: { zh: "计划步骤数据。", en: "Plan-step data." },
    },
    {
      name: "editable",
      type: "boolean",
      default: "false",
      description: { zh: "启用逐步审批。", en: "Enable per-step approval." },
    },
    {
      name: "compact",
      type: "boolean",
      default: "false",
      description: { zh: "紧凑密度。", en: "Compact density." },
    },
    {
      name: "onStepToggle / onApprove",
      type: "(id, approved) => void / () => void",
      description: {
        zh: "步骤和整卡审批回调。",
        en: "Step and whole-plan approval callbacks.",
      },
    },
  ],
  accessibility: [
    {
      zh: "运行步骤使用 aria-current=step；审批控件具有 pressed 状态和明确名称。",
      en: "The running step uses aria-current=step; approval controls expose pressed state and clear names.",
    },
  ],
});
