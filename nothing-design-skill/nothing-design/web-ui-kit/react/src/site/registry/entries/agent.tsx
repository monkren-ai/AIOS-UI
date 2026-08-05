import { AgentOrb } from 'nothing-ui/agent'
import type { ComponentDoc } from '../types'

import AgentWorkflow from '../../examples/agent/workflow'
import workflowSource from '../../examples/agent/workflow.tsx?raw'

export const agentDoc: ComponentDoc = {
  slug: 'agent',
  name: 'Agent',
  category: 'agent',
  status: 'stable',
  description: {
    zh: 'AgentOrb、PlanCard、ThinkingSteps 等七件 Agent 流程组件的合集。',
    en: 'Seven pieces for agent workflows — AgentOrb, PlanCard, ThinkingSteps, and the rest.',
  },
  preview: () => <AgentOrb state="thinking" showLabel />,
  importStatement: `import { AgentOrb, PlanCard, ThinkingIndicator } from 'nothing-ui/agent'`,
  usageSnippet: `<AgentOrb state="thinking" showLabel />\n<PlanCard steps={steps} editable onApprove={approve} />`,
  composition: {
    zh: '`nothing-ui/agent` 导出七件组件：`AgentOrb`（状态球）、`ApprovalGate`（审批门）、`PlanCard`（计划卡片）、`ProgressTrace`（进度轨迹）、`ThinkingIndicator`（思考指示）、`ThinkingSteps`（思考步骤）、`ToolCallRow`（工具调用行）。按流程拼装，不要全部堆在一屏。',
    en: '`nothing-ui/agent` exports seven pieces: `AgentOrb` (state orb), `ApprovalGate` (approval gate), `PlanCard` (plan card), `ProgressTrace` (progress trace), `ThinkingIndicator` (thinking indicator), `ThinkingSteps` (thinking steps), and `ToolCallRow` (tool-call row). Compose them along a workflow — do not stack all seven on one screen.',
  },
  examples: [
    {
      id: 'workflow',
      title: { zh: '典型流程', en: 'Typical workflow' },
      description: {
        zh: 'AgentOrb 表达当前 agent 状态（idle / thinking / acting / paused / error），ThinkingIndicator 补一行文字动效，PlanCard 列出待执行步骤并支持审批。ApprovalGate、ProgressTrace、ThinkingSteps、ToolCallRow 分别覆盖审批、轨迹、推理链和工具调用行。',
        en: 'AgentOrb shows the agent state (idle / thinking / acting / paused / error), ThinkingIndicator adds a text animation, and PlanCard lists steps awaiting approval. ApprovalGate, ProgressTrace, ThinkingSteps, and ToolCallRow cover approval, trace, reasoning chain, and tool-call rows respectively.',
      },
      code: workflowSource,
      render: () => <AgentWorkflow />,
    },
  ],
  api: [
    {
      name: 'AgentOrb',
      props: [
        {
          name: 'state',
          type: `'idle' | 'thinking' | 'acting' | 'paused' | 'error'`,
          default: `'idle'`,
          description: { zh: 'Agent 状态。', en: 'Agent state.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '尺寸。', en: 'Size.' },
        },
        {
          name: 'showLabel',
          type: 'boolean',
          default: 'false',
          description: { zh: '是否显示状态标签。', en: 'Whether to show the state label.' },
        },
        {
          name: 'label',
          type: 'string',
          description: { zh: '自定义标签，同时用作 `aria-label`。', en: 'Custom label, also used as `aria-label`.' },
        },
      ],
    },
    {
      name: 'PlanCard',
      props: [
        {
          name: 'steps',
          type: 'PlanStep[]',
          required: true,
          description: { zh: '计划步骤列表。', en: 'Plan step list.' },
        },
        {
          name: 'editable',
          type: 'boolean',
          default: 'false',
          description: { zh: '是否显示逐步审批控件。', en: 'Whether to show per-step approval controls.' },
        },
        {
          name: 'onApprove',
          type: '() => void',
          description: { zh: '整卡批准回调。', en: 'Whole-card approve callback.' },
        },
        {
          name: 'onStepToggle',
          type: '(stepId, approved) => void',
          description: { zh: '单步切换回调。', en: 'Per-step toggle callback.' },
        },
      ],
    },
    {
      name: 'ThinkingIndicator',
      props: [
        {
          name: 'state',
          type: `'idle' | 'thinking' | 'acting' | 'paused' | 'error'`,
          default: `'thinking'`,
          description: { zh: '与 AgentOrb 同源的状态枚举。', en: 'Same state enum as AgentOrb.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'AgentOrb 带 `aria-label` 描述当前状态（如 “Agent is thinking”）。PlanCard 的审批按钮是标准 Button，键盘可达。',
      en: 'AgentOrb sets an `aria-label` for the current state (e.g. “Agent is thinking”). PlanCard approval controls are standard Buttons reachable from the keyboard.',
    },
  ],
}
