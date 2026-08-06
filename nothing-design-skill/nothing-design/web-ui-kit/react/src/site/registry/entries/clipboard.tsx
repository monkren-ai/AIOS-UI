import { Clipboard } from 'aios-ui-kit/clipboard'
import type { ComponentDoc } from '../types'

import ClipboardDefault from '../../examples/clipboard/default'
import defaultSource from '../../examples/clipboard/default.tsx?raw'

export const clipboardDoc: ComponentDoc = {
  slug: 'clipboard',
  name: 'Clipboard',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '剪贴板历史，点条目即可重新复制，也能逐条删除或清空。',
    en: 'Clipboard history — click an entry to copy it again, or drop entries and clear the list.',
  },
  preview: () => <Clipboard className="w-full max-w-sm" />,
  importStatement: `import { Clipboard } from 'aios-ui-kit/clipboard'`,
  usageSnippet: `<Clipboard maxItems={5} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '历史与复制', en: 'History and copy' },
      description: {
        zh: '默认带三条演示条目。点击条目会写入系统剪贴板并短暂显示 copied 态；Delete 逐条移除，Clear 清空全部。长文本会按 `truncateLength` 截断显示。',
        en: 'Ships with three demo entries. Clicking an entry writes to the system clipboard and briefly shows a copied state; Delete removes one row, Clear wipes the list. Long text is truncated for display per `truncateLength`.',
      },
      code: defaultSource,
      render: () => <ClipboardDefault />,
    },
  ],
  api: [
    {
      name: 'Clipboard',
      props: [
        {
          name: 'maxItems',
          type: 'number',
          default: '5',
          description: { zh: '最多保留条目数。', en: 'Maximum entries kept.' },
        },
        {
          name: 'truncateLength',
          type: 'number',
          default: '40',
          description: { zh: '显示截断长度。', en: 'Display truncation length.' },
        },
        {
          name: 'copiedDuration',
          type: 'number',
          default: '2000',
          description: {
            zh: 'copied 态持续时间（毫秒）。',
            en: 'How long the copied state lasts, in ms.',
          },
        },
        {
          name: 'demoItems',
          type: '{ text: string; time: Date }[]',
          description: {
            zh: '初始条目。不传则用内置演示数据。',
            en: 'Initial entries. Built-in demo data when omitted.',
          },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '卡片内边距与行高。', en: 'Card padding and row height.' },
        },
        {
          name: 'state',
          type: `'idle' | 'copied'`,
          description: {
            zh: '受控态。不传则内部根据复制动作推导。',
            en: 'Controlled state. Derived internally from copy actions when omitted.',
          },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '每条历史是可聚焦的 `<button>`，Enter / Space 触发复制。Delete 和 Clear 也是独立按钮，带可见文字标签。',
      en: 'Each history row is a focusable `<button>`; Enter / Space copies. Delete and Clear are separate buttons with visible text labels.',
    },
  ],
}
