import { Quotes } from 'aios-ui-kit/quotes'
import type { ComponentDoc } from '../types'

import QuotesDefault from '../../examples/quotes/default'
import defaultSource from '../../examples/quotes/default.tsx?raw'

export const quotesDoc: ComponentDoc = {
  slug: 'quotes',
  name: 'Quotes',
  category: 'widgets',
  status: 'stable',
  description: {
    zh: '定时轮换的名言卡片，外圈进度环标示当前在集合中的位置。',
    en: 'A quote card that rotates on a timer, with an outer ring showing where you are in the set.',
  },
  preview: () => <Quotes className="w-full max-w-sm" />,
  importStatement: `import { Quotes } from 'aios-ui-kit/quotes'`,
  usageSnippet: `<Quotes quotes={[{ text: 'Less, but better.', author: 'Dieter Rams' }]} />`,
  examples: [
    {
      id: 'default',
      title: { zh: '自动轮换', en: 'Auto-rotate' },
      description: {
        zh: '默认内置八条名言，按 `interval` 定时切换。外圈的 SVG 环是位置指示器（当前第几条 / 共几条），不是加载 spinner。传自定义 `quotes` 数组即可替换内容。',
        en: 'Eight built-in quotes rotate on `interval`. The outer SVG ring is a position indicator (which quote of how many), not a loading spinner. Pass your own `quotes` array to replace the content.',
      },
      code: defaultSource,
      render: () => <QuotesDefault />,
    },
  ],
  api: [
    {
      name: 'Quotes',
      props: [
        {
          name: 'quotes',
          type: '{ text: string; author: string }[]',
          description: {
            zh: '名言列表。不传则用内置默认集。',
            en: 'Quote list. Built-in defaults when omitted.',
          },
        },
        {
          name: 'interval',
          type: 'number',
          default: '30000',
          description: { zh: '轮换间隔（毫秒）。', en: 'Rotation interval in ms.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'dark'`,
          description: { zh: '卡片配色。', en: 'Card colour theme.' },
        },
        {
          name: 'size',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '卡片尺寸。', en: 'Card size.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '进度环带 `aria-hidden`，不参与读屏。名言正文和作者都在可见文字里，读屏可以直接念出。',
      en: 'The progress ring is `aria-hidden` and not announced. Quote text and author are visible copy that screen readers can read directly.',
    },
  ],
}
