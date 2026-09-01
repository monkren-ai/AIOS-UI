import { ApprovalGateDemo } from "../ai-doc-demos";
import { createAiPrimitiveDoc } from "../ai-doc-factory";

export const approvalGateDoc = createAiPrimitiveDoc({
  slug: "approval-gate",
  name: "ApprovalGate",
  category: "agent",
  preview: () => <ApprovalGateDemo />,
  description: {
    zh: "面向 Agent 高风险动作的审批闸门，展示影响、可逆性和结果态。",
    en: "An approval gate for risky agent actions with impact, reversibility, and result states.",
  },
  importStatement: `import { ApprovalGate } from 'aios-ui-kit/agent'`,
  usageSnippet: `<ApprovalGate action="Deploy" risk="high" onAllow={approve} onDeny={deny} />`,
  apiName: "ApprovalGate",
  props: [
    {
      name: "action",
      type: "string",
      required: true,
      description: { zh: "待批准动作。", en: "Action awaiting approval." },
    },
    {
      name: "risk",
      type: `'low' | 'medium' | 'high'`,
      default: `'medium'`,
      description: { zh: "风险级别。", en: "Risk level." },
    },
    {
      name: "state",
      type: `'pending' | 'approved' | 'denied'`,
      default: `'pending'`,
      description: { zh: "审批结果状态。", en: "Approval outcome state." },
    },
    {
      name: "onAllow / onDeny",
      type: "() => void",
      description: { zh: "批准和拒绝回调。", en: "Allow and deny callbacks." },
    },
  ],
  accessibility: [
    {
      zh: "待审批时使用 alertdialog；结果态切换为 status，并关联动作标题。",
      en: "Uses alertdialog while pending and status for outcomes, labelled by the action title.",
    },
  ],
});
