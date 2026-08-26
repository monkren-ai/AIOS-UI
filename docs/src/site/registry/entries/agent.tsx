import type { ComponentDoc } from '../types'

import AgentWorkflow from '../../examples/agent/workflow'
import workflowSource from '../../examples/agent/workflow.tsx?raw'
import AgentAIPrimitives from '../../examples/agent/ai-primitives'
import aiPrimitivesSource from '../../examples/agent/ai-primitives.tsx?raw'

export const agentDoc: ComponentDoc = {
  slug: 'agent',
  name: 'Agent',
  category: 'agent',
  status: 'stable',
  description: {
    zh: 'Agent 状态、计划、审批、子 Agent、终端与悬浮助手面板的完整流程组件。',
    en: 'A complete agent workflow set: state, plans, approvals, subagents, terminal output, and an assistant panel.',
  },
  preview: () => <AgentAIPrimitives />,
  importStatement: `import { AgentOrb, PlanCard, SubagentList, Terminal, AssistantPanel } from 'aios-ui-kit/agent'`,
  usageSnippet: `<AgentOrb state="thinking" showLabel />\n<PlanCard steps={steps} editable onApprove={approve} />`,
  composition: {
    zh: '`aios-ui-kit/agent` 在原有状态、审批、计划、轨迹、推理和工具调用之外，新增 `ActivityLabel`、`AssistantPanel`、`ContextBar`、`SubagentList` 与 `Terminal`。按实际 Agent 生命周期组合，不要把所有状态同时展示。',
    en: '`aios-ui-kit/agent` now adds `ActivityLabel`, `AssistantPanel`, `ContextBar`, `SubagentList`, and `Terminal` to the existing state, approval, plan, trace, reasoning, and tool-call pieces. Compose only the states present in the real agent lifecycle.',
  },
  examples: [
    {
      id: 'ai-primitives',
      title: { zh: '新增 Agent 原语', en: 'New agent primitives' },
      description: {
        zh: '集中展示 ActivityLabel、ContextBar、Subagent、Terminal 与 AssistantPanel。每个组件都可以独立使用，也可以组合成完整的 Agent 执行面板。',
        en: 'ActivityLabel, ContextBar, Subagent, Terminal, and AssistantPanel shown together. Each works independently or as part of a complete agent execution surface.',
      },
      code: aiPrimitivesSource,
      render: () => <AgentAIPrimitives />,
    },
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
          description: {
            zh: '是否显示状态标签。',
            en: 'Whether to show the state label.',
          },
        },
        {
          name: 'label',
          type: 'string',
          description: {
            zh: '自定义标签，同时用作 `aria-label`。',
            en: 'Custom label, also used as `aria-label`.',
          },
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
          description: {
            zh: '是否显示逐步审批控件。',
            en: 'Whether to show per-step approval controls.',
          },
        },
        {
          name: 'onApprove',
          type: '() => void',
          description: {
            zh: '整卡批准回调。',
            en: 'Whole-card approve callback.',
          },
        },
        {
          name: 'onStepToggle',
          type: '(stepId, approved) => void',
          description: {
            zh: '单步切换回调。',
            en: 'Per-step toggle callback.',
          },
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
          description: {
            zh: '与 AgentOrb 同源的状态枚举。',
            en: 'Same state enum as AgentOrb.',
          },
        },
      ],
    },
    {
      name: 'ActivityLabel',
      props: [
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: {
            zh: '切换运行中与完成文案。',
            en: 'Switches between working and done labels.',
          },
        },
        {
          name: 'activeLabel / label',
          type: 'ReactNode',
          description: { zh: '双状态自定义文案。', en: 'Custom labels for both states.' },
        },
      ],
    },
    {
      name: 'AssistantPanel',
      props: [
        {
          name: 'open / defaultOpen',
          type: 'boolean',
          description: {
            zh: '受控或非受控打开状态。',
            en: 'Controlled or uncontrolled open state.',
          },
        },
        {
          name: 'inline',
          type: 'boolean',
          default: 'false',
          description: { zh: '在父容器内定位面板。', en: 'Positions the panel inside its parent.' },
        },
        {
          name: 'onOpenChange',
          type: '(open: boolean) => void',
          description: { zh: '打开状态变化回调。', en: 'Called when the open state changes.' },
        },
      ],
    },
    {
      name: 'ContextBar',
      props: [
        {
          name: 'position',
          type: `'header' | 'footer' | 'detached'`,
          default: `'detached'`,
          description: {
            zh: '上下文条与输入框的组合位置。',
            en: 'Placement relative to the prompt input.',
          },
        },
      ],
    },
    {
      name: 'Subagent',
      props: [
        {
          name: 'status',
          type: `'running' | 'done' | 'error'`,
          default: `'running'`,
          description: { zh: '子 Agent 当前状态。', en: 'Current subagent state.' },
        },
        {
          name: 'progress',
          type: 'number',
          description: { zh: '0–100 的进度值。', en: 'Progress from 0 to 100.' },
        },
      ],
    },
    {
      name: 'Terminal',
      props: [
        {
          name: 'command',
          type: 'string',
          required: true,
          description: { zh: '显示的命令。', en: 'Command being displayed.' },
        },
        {
          name: 'running / exitCode',
          type: 'boolean / number',
          description: { zh: '运行状态与退出码。', en: 'Running state and exit code.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'AgentOrb 带 `aria-label` 描述当前状态（如 “Agent is thinking”）。PlanCard 的审批按钮是标准 Button，键盘可达。',
      en: 'AgentOrb sets an `aria-label` for the current state (e.g. “Agent is thinking”). PlanCard approval controls are standard Buttons reachable from the keyboard.',
    },
    {
      zh: 'AssistantPanel 打开时管理焦点并支持 Escape；ActivityLabel、Terminal 与 Subagent 分别暴露 status、busy 和 progress 语义。',
      en: 'AssistantPanel manages focus and Escape; ActivityLabel, Terminal, and Subagent expose status, busy, and progress semantics.',
    },
  ],
}
