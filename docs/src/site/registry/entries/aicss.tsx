import { AicssThinkingState } from 'aios-ui-kit/agent'
import type { ComponentDoc } from '../types'

import AicssApproval from '../../examples/aicss/approval'
import approvalSource from '../../examples/aicss/approval.tsx?raw'
import AicssOutputs from '../../examples/aicss/outputs'
import outputsSource from '../../examples/aicss/outputs.tsx?raw'
import AicssThinking from '../../examples/aicss/thinking'
import thinkingSource from '../../examples/aicss/thinking.tsx?raw'

export const aicssDoc: ComponentDoc = {
  slug: 'aicss',
  name: 'Aicss',
  category: 'agent',
  status: 'new',
  description: {
    zh: '对齐 AIcss 的 14 件 Agent 对话组件：思考态、工具输出、流式文本与审批卡。',
    en: 'Fourteen AIcss-aligned pieces for agent threads: thinking states, tool output, streaming text, and approval cards.',
  },
  preview: () => <AicssThinkingState />,
  importStatement: `import { AicssThinkingState, AicssApprovalCard, AicssAgentInput } from 'aios-ui-kit/agent'`,
  usageSnippet: `<AicssThinkingState />\n<AicssApprovalCard variant="command" command="pnpm test" />`,
  composition: {
    zh: '覆盖 AIcss 现行目录的 14 件，外加 `AicssWebSearch`。思考态用 `AicssThinkingState` / `AicssThinkingReasoning` / `AicssOrbs`；输出用文本、流式、引用、代码块、待办和表格；交互用 `AicssAgentInput` 与 `AicssApprovalCard`（问题 / 命令 / 计划）。授权件（File Diff、Image Generation、Inline Citations、Comparison Table）是 AIOS 适配实现，不含授权源码。',
    en: 'Covers the current 14-piece AIcss catalog, plus `AicssWebSearch`. Thinking states use `AicssThinkingState` / `AicssThinkingReasoning` / `AicssOrbs`; outputs cover prose, streaming, citations, code, todos, and tables; interaction uses `AicssAgentInput` and `AicssApprovalCard` (questions / command / plan). Licensed pieces (File Diff, Image Generation, Inline Citations, Comparison Table) are AIOS adaptations, not licensed source.',
  },
  examples: [
    {
      id: 'thinking',
      title: { zh: '思考与状态', en: 'Thinking states' },
      description: {
        zh: '`AicssThinkingState` 是一行忙碌标签。`AicssThinkingReasoning` 可展开推理正文，完成后用 `status="done"` + `durationSec` 收成「已思考 Ns」。`AicssOrbs` 用三枚圆点表示处理中。',
        en: '`AicssThinkingState` is a busy label. `AicssThinkingReasoning` expands the reasoning body, then folds into “Thought for Ns” with `status="done"` and `durationSec`. `AicssOrbs` uses three dots for in-progress work.',
      },
      code: thinkingSource,
      render: () => <AicssThinking />,
    },
    {
      id: 'outputs',
      title: { zh: '回答与结构化输出', en: 'Answers and structured output' },
      description: {
        zh: '`AicssTextResponse` 排正文，`AicssStreamingText` 带光标，`AicssCodeBlock` 带复制，`AicssTaskList` 区分 pending / in-progress / done。底部 `AicssAgentInput` 可挂模型名、附件和增强提示词。',
        en: '`AicssTextResponse` styles prose, `AicssStreamingText` adds a caret, `AicssCodeBlock` copies, and `AicssTaskList` distinguishes pending / in-progress / done. `AicssAgentInput` at the bottom can take a model name, attachments, and prompt enhancement.',
      },
      code: outputsSource,
      render: () => <AicssOutputs />,
    },
    {
      id: 'approval',
      title: { zh: '审批卡', en: 'Approval card' },
      description: {
        zh: '`AicssApprovalCard` 三种形态：最多三道澄清问题、批准一条 shell 命令、或展开短计划。高风险动作不会自动批准，必须点明确按钮。',
        en: '`AicssApprovalCard` has three shapes: up to three clarifying questions, a shell command to approve, or a short plan. High-risk actions never auto-approve — they need an explicit click.',
      },
      code: approvalSource,
      render: () => <AicssApproval />,
    },
  ],
  api: [
    {
      name: 'AicssThinkingState',
      props: [
        {
          name: 'label',
          type: 'string',
          description: { zh: '自定义忙碌文案。', en: 'Custom busy label.' },
        },
        {
          name: 'locale',
          type: `'zh' | 'en'`,
          default: `'zh'`,
          description: { zh: '中英双语。', en: 'Chinese or English copy.' },
        },
      ],
    },
    {
      name: 'AicssThinkingReasoning',
      props: [
        {
          name: 'status',
          type: `'running' | 'done'`,
          default: `'running'`,
          description: {
            zh: '思考中展开正文；完成后可显示耗时摘要。',
            en: 'Expanded while thinking; can show a duration summary when done.',
          },
        },
        {
          name: 'durationSec',
          type: 'number',
          description: {
            zh: '完成后显示「已思考 Ns」。',
            en: 'When done, shown as “Thought for Ns”.',
          },
        },
      ],
    },
    {
      name: 'AicssApprovalCard',
      props: [
        {
          name: 'variant',
          type: `'questions' | 'command' | 'plan'`,
          default: `'questions'`,
          description: {
            zh: '澄清问题、命令批准或计划批准。',
            en: 'Clarifying questions, command approval, or plan approval.',
          },
        },
        {
          name: 'questions',
          type: 'AicssApprovalQuestion[]',
          description: {
            zh: '每题含 `id`、`prompt`、`options`，另有一项自定义回答。',
            en: 'Each item needs `id`, `prompt`, and `options`, plus a custom-answer slot.',
          },
        },
        {
          name: 'command',
          type: 'string',
          description: { zh: '待运行的命令。', en: 'Command to run.' },
        },
        {
          name: 'plan',
          type: 'AicssApprovalPlanStep[]',
          description: { zh: '计划步骤。', en: 'Plan steps.' },
        },
        {
          name: 'onApprove',
          type: '(payload?) => void',
          description: {
            zh: '问题变体会带上 `answers`。',
            en: 'The questions variant passes `answers`.',
          },
        },
        {
          name: 'onReject',
          type: '() => void',
          description: { zh: '跳过或拒绝。', en: 'Skip or reject.' },
        },
      ],
    },
    {
      name: 'AicssAgentInput',
      props: [
        {
          name: 'onSubmit',
          type: '(value: string) => void',
          description: { zh: '发送当前输入。', en: 'Send the current value.' },
        },
        {
          name: 'onEnhance',
          type: '() => void',
          description: { zh: '增强提示词。', en: 'Enhance the prompt.' },
        },
        {
          name: 'enhancing',
          type: 'boolean',
          default: 'false',
          description: { zh: '增强进行中。', en: 'Prompt enhancement in progress.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '思考态带 `role="status"` 与 `aria-live="polite"`。审批卡的问题选项是 `radiogroup`，批准/跳过是标准按钮。高风险命令不会倒计时自动执行。',
      en: 'Thinking states use `role="status"` and `aria-live="polite"`. Approval-card options are a `radiogroup`; approve/skip are standard buttons. Risky commands never auto-run on a timer.',
    },
  ],
}
