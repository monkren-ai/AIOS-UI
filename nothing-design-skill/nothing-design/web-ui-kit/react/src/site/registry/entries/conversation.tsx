import { Bubble } from 'nothing-ui/conversation'
import type { ComponentDoc } from '../types'

import ConversationChat from '../../examples/conversation/chat'
import chatSource from '../../examples/conversation/chat.tsx?raw'

export const conversationDoc: ComponentDoc = {
  slug: 'conversation',
  name: 'Conversation',
  category: 'agent',
  status: 'stable',
  description: {
    zh: 'Bubble、Sender、Prompts 等六件对话式界面组件的合集。',
    en: 'Six pieces for conversational interfaces — Bubble, Sender, Prompts, and the rest.',
  },
  preview: () => (
    <Bubble placement="start" variant="outlined" content="How can I help you today?" />
  ),
  importStatement: `import { Bubble, BubbleList, Sender } from 'nothing-ui/conversation'`,
  usageSnippet: `<Bubble placement="start" content="Hello" />\n<Sender onSubmit={send} />`,
  composition: {
    zh: '`nothing-ui/conversation` 导出六件：`Sender`（输入框）、`Bubble` / `BubbleList`（消息气泡）、`ThoughtChain`（思考链）、`Prompts`（快捷提示）、`Welcome`（欢迎屏）、`Conversations`（会话列表）。典型布局是 BubbleList + Sender，侧边挂 Conversations。',
    en: '`nothing-ui/conversation` exports six pieces: `Sender` (input), `Bubble` / `BubbleList` (message bubbles), `ThoughtChain` (thought chain), `Prompts` (quick prompts), `Welcome` (welcome screen), and `Conversations` (session list). The usual layout is BubbleList + Sender, with Conversations on the side.',
  },
  examples: [
    {
      id: 'chat',
      title: { zh: '聊天布局', en: 'Chat layout' },
      description: {
        zh: 'BubbleList 渲染消息流，每条用 Bubble 区分 user（end / filled）和 assistant（start / outlined）。Sender 负责输入，Enter 提交（默认 `submitType="enter"`）。还支持 typing 动画、loading 态和 header/footer 插槽。',
        en: 'BubbleList renders the message stream; each row uses Bubble to distinguish user (end / filled) from assistant (start / outlined). Sender handles input with Enter to send (default `submitType="enter"`). Also supports typing animation, loading state, and header/footer slots.',
      },
      code: chatSource,
      render: () => <ConversationChat />,
    },
  ],
  api: [
    {
      name: 'Bubble',
      props: [
        {
          name: 'content',
          type: 'ReactNode',
          description: { zh: '气泡正文。', en: 'Bubble body.' },
        },
        {
          name: 'placement',
          type: `'start' | 'end'`,
          default: `'start'`,
          description: {
            zh: '对齐侧：start 是 assistant，end 是 user。',
            en: 'Alignment: start for assistant, end for user.',
          },
        },
        {
          name: 'variant',
          type: `'filled' | 'outlined' | 'borderless'`,
          default: `'filled'`,
          description: { zh: '视觉样式。', en: 'Visual style.' },
        },
        {
          name: 'typing',
          type: 'boolean | { step?: number; interval?: number }',
          description: {
            zh: '打字机效果（仅 string content）。',
            en: 'Typewriter effect (string content only).',
          },
        },
        {
          name: 'loading',
          type: 'boolean',
          description: { zh: '加载占位。', en: 'Loading placeholder.' },
        },
      ],
    },
    {
      name: 'BubbleList',
      props: [
        {
          name: 'items',
          type: 'BubbleItemType[]',
          required: true,
          description: {
            zh: '消息列表，每条带 `key`、`role`、`content`。',
            en: 'Message list; each item has `key`, `role`, and `content`.',
          },
        },
        {
          name: 'role',
          type: 'RoleType',
          description: {
            zh: '按 role 映射 placement / variant 等 Bubble 默认 props。',
            en: 'Maps each role to default Bubble props such as placement and variant.',
          },
        },
        {
          name: 'autoScroll',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '新消息时滚到底部。',
            en: 'Scroll to bottom when new messages arrive.',
          },
        },
      ],
    },
    {
      name: 'Sender',
      props: [
        {
          name: 'value',
          type: 'string',
          description: { zh: '受控输入值。', en: 'Controlled input value.' },
        },
        {
          name: 'onChange',
          type: '(value, event?) => void',
          description: { zh: '输入变化。', en: 'Input change.' },
        },
        {
          name: 'onSubmit',
          type: '(value) => void',
          description: { zh: '提交消息。', en: 'Submit message.' },
        },
        {
          name: 'submitType',
          type: `'enter' | 'shiftEnter'`,
          default: `'enter'`,
          description: {
            zh: 'Enter 提交还是 Shift+Enter 提交。',
            en: 'Whether Enter or Shift+Enter submits.',
          },
        },
        {
          name: 'loading',
          type: 'boolean',
          description: { zh: '发送中禁用输入。', en: 'Disable input while sending.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Sender 基于 `<textarea>`，Send / Cancel 按钮键盘可达。Bubble 本身是静态 `<div>`，消息内容应在 DOM 里保持可读文字，不要只放图标。',
      en: 'Sender is built on a `<textarea>`; Send / Cancel buttons are keyboard-reachable. Bubble is a static `<div>` — message content should remain readable text in the DOM, not icons alone.',
    },
  ],
}
