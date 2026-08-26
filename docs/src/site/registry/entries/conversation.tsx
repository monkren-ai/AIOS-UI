import type { ComponentDoc } from '../types'

import ConversationChat from '../../examples/conversation/chat'
import chatSource from '../../examples/conversation/chat.tsx?raw'
import ConversationAIPrimitives from '../../examples/conversation/ai-primitives'
import aiPrimitivesSource from '../../examples/conversation/ai-primitives.tsx?raw'

export const conversationDoc: ComponentDoc = {
  slug: 'conversation',
  name: 'Conversation',
  category: 'agent',
  status: 'stable',
  description: {
    zh: '覆盖消息、输入、附件、分支、Markdown 回答、来源与智能滚动的对话组件。',
    en: 'Conversation components for messages, input, attachments, branches, Markdown responses, sources, and intelligent scrolling.',
  },
  preview: () => <ConversationAIPrimitives />,
  importStatement: `import { Message, Response, Attachment, Sources, Sender } from 'aios-ui-kit/conversation'`,
  usageSnippet: `<Bubble placement="start" content="Hello" />\n<Sender onSubmit={send} />`,
  composition: {
    zh: '保留 `Bubble` / `BubbleList`、`Sender`、`ThoughtChain`、`Prompts`、`Welcome`、`Conversations`，并新增组合式 `Message`、附件、消息分支、只在底部时跟随的 `ConversationViewport`、GFM `Response` 与 `Sources`。',
    en: 'The existing `Bubble` / `BubbleList`, `Sender`, `ThoughtChain`, `Prompts`, `Welcome`, and `Conversations` remain, joined by compound `Message`, attachments, message branches, bottom-aware `ConversationViewport`, GFM `Response`, and `Sources`.',
  },
  examples: [
    {
      id: 'ai-primitives',
      title: { zh: '新增对话原语', en: 'New conversation primitives' },
      description: {
        zh: '展示 Attachment、KeywordTag、Message、Response、BranchPicker、ConversationViewport 与 Sources 的完整组合。',
        en: 'A complete composition of Attachment, KeywordTag, Message, Response, BranchPicker, ConversationViewport, and Sources.',
      },
      code: aiPrimitivesSource,
      render: () => <ConversationAIPrimitives />,
    },
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
          description: {
            zh: '发送中禁用输入。',
            en: 'Disable input while sending.',
          },
        },
      ],
    },
    {
      name: 'Attachment',
      props: [
        {
          name: 'type',
          type: 'AttachmentType',
          description: {
            zh: '文件、图片、视频、链接等附件类型。',
            en: 'File, image, video, link, and other attachment types.',
          },
        },
        {
          name: 'loading / progress',
          type: 'boolean / number',
          description: {
            zh: '上传状态与 0–100 进度。',
            en: 'Upload state and progress from 0 to 100.',
          },
        },
      ],
    },
    {
      name: 'BranchPicker',
      props: [
        {
          name: 'current / total',
          type: 'number',
          required: true,
          description: { zh: '当前分支和分支总数。', en: 'Current branch and total branches.' },
        },
      ],
    },
    {
      name: 'ConversationViewport',
      props: [
        {
          name: 'autoScroll',
          type: 'boolean',
          default: 'true',
          description: {
            zh: '仅在用户停留底部时跟随新内容。',
            en: 'Follows new content only while the user remains at the bottom.',
          },
        },
      ],
    },
    {
      name: 'Message',
      props: [
        {
          name: 'role',
          type: `'assistant' | 'user' | 'system'`,
          default: `'assistant'`,
          description: { zh: '消息角色与布局方向。', en: 'Message role and layout direction.' },
        },
      ],
    },
    {
      name: 'KeywordTag',
      props: [
        {
          name: 'onRemove',
          type: '() => void',
          description: {
            zh: '显示移除操作并处理点击。',
            en: 'Shows and handles the remove action.',
          },
        },
      ],
    },
    {
      name: 'Response',
      props: [
        {
          name: 'children',
          type: 'string',
          required: true,
          description: { zh: 'GFM Markdown 源文本。', en: 'GFM Markdown source text.' },
        },
        {
          name: 'components',
          type: 'react-markdown Components',
          description: {
            zh: '覆盖 Markdown 元素渲染器。',
            en: 'Overrides Markdown element renderers.',
          },
        },
      ],
    },
    {
      name: 'Sources',
      props: [
        {
          name: 'open / defaultOpen',
          type: 'boolean',
          description: {
            zh: '受控或非受控来源展开状态。',
            en: 'Controlled or uncontrolled source disclosure.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'Sender 基于 `<textarea>`，Send / Cancel 按钮键盘可达。Bubble 本身是静态 `<div>`，消息内容应在 DOM 里保持可读文字，不要只放图标。',
      en: 'Sender is built on a `<textarea>`; Send / Cancel buttons are keyboard-reachable. Bubble is a static `<div>` — message content should remain readable text in the DOM, not icons alone.',
    },
    {
      zh: 'ConversationViewport 使用 `role=log` 和 live region；附件进度、分支边界、复制操作与外链安全属性均有明确语义。',
      en: 'ConversationViewport uses a log and live region; attachment progress, branch boundaries, copy actions, and secure external-link attributes are explicit.',
    },
  ],
}
