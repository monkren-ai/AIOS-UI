import { ConfirmationDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const confirmationDoc = createAiPrimitiveDoc({
  slug: "confirmation",
  name: "Confirmation",
  category: "agent",
  preview: () => <ConfirmationDemo />,
  description: {
    zh: "清晰表达动作、影响、风险、可逆性和审批结果。",
    en: "Clearly states action, impact, risk, reversibility, and approval outcome.",
  },
  importStatement: `import { Confirmation } from 'aios-ui-kit/agent'`,
  usageSnippet: `<Confirmation title={action} danger onApprove={approve} onDeny={deny} />`,
  apiName: "Confirmation",
  props: [
    {
      name: "title",
      type: "ReactNode",
      required: true,
      description: { zh: "待确认动作。", en: "Action awaiting confirmation." },
    },
    {
      name: "danger / reversible",
      type: "boolean",
      default: "false / true",
      description: {
        zh: "危险与可逆性语义。",
        en: "Danger and reversibility semantics.",
      },
    },
    {
      name: "state",
      type: `'pending' | 'approved' | 'denied'`,
      default: `'pending'`,
      description: {
        zh: "审批及结果状态。",
        en: "Approval and outcome state.",
      },
    },
  ],
  accessibility: [
    {
      zh: "等待状态使用 alertdialog 和明确标题，结果状态切换为 status。",
      en: "Pending uses alertdialog with an explicit label; outcomes switch to status.",
    },
  ],
});
