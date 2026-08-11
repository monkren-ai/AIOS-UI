import { TextAnimate } from 'aios-ui-kit/text-animate'
import type { ComponentDoc } from '../types'

import TextAnimateBasic from '../../examples/text-animate/basic'
import TextAnimateModes from '../../examples/text-animate/modes'

import basicSource from '../../examples/text-animate/basic.tsx?raw'
import modesSource from '../../examples/text-animate/modes.tsx?raw'

export const textAnimateDoc: ComponentDoc = {
  slug: 'text-animate',
  name: 'TextAnimate',
  category: 'decoration',
  status: 'new',
  baseUi: '—（CSS 动画）',
  description: {
    zh: '文本逐字/逐词/逐行揭示，ease-out 无弹跳。',
    en: 'Text revealed by char, word, or line, with ease-out and no bounce.',
  },
  preview: () => (
    <TextAnimate className="font-body text-base text-foreground">
      AIOS reveals itself one dot at a time.
    </TextAnimate>
  ),
  importStatement: `import { TextAnimate } from 'aios-ui-kit/text-animate'`,
  usageSnippet: `<TextAnimate>dot by dot</TextAnimate>`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '默认 `mode="word"`，逐词揭示。每段递增 `delay`（默认 40ms），单段 `duration`（默认 300ms），缓动走 `var(--ease-aios)`——无弹跳。`once`（默认 true）只播一次。',
        en: 'Defaults to `mode="word"`, revealing word by word. Each segment is staggered by `delay` (default 40ms) over `duration` (default 300ms), eased with `var(--ease-aios)` — no bounce. `once` (default true) plays it a single time.',
      },
      code: basicSource,
      render: () => <TextAnimateBasic />,
    },
    {
      id: 'modes',
      title: { zh: '切分模式', en: 'Split modes' },
      description: {
        zh: '`mode` 决定切分粒度：`char` 逐字、`word` 逐词、`line` 按 `\n` 逐行。`as` 可换成 `div`/`span`/`p`。motion-reduce 下动画跳过，文本直接全量显示。',
        en: '`mode` sets the granularity: `char` by character, `word` by word, `line` by `\n`. `as` swaps the tag to `div`/`span`/`p`. Under motion-reduce the animation is skipped and the full text shows immediately.',
      },
      code: modesSource,
      render: () => <TextAnimateModes />,
    },
  ],
  api: [
    {
      name: 'TextAnimate',
      description: {
        zh: '渲染为 `<p>`（可经 `as` 换成 `<div>`/`<span>`）。透传所有原生属性（`aria-*`、`ref` …）。',
        en: 'Renders a `<p>` (swappable to `<div>`/`<span>` via `as`). Forwards every native prop (`aria-*`, `ref`, …).',
      },
      props: [
        {
          name: 'children',
          type: 'string',
          required: true,
          description: { zh: '待揭示的纯文本。', en: 'The text to reveal.' },
        },
        {
          name: 'mode',
          type: `'char' | 'word' | 'line'`,
          default: `'word'`,
          description: { zh: '切分粒度；`line` 按 `\n` 切。', en: 'Split granularity; `line` splits on `\n`.' },
        },
        {
          name: 'delay',
          type: 'number',
          default: '40',
          description: { zh: '每段递增延迟（ms）。', en: 'Per-segment stagger (ms).' },
        },
        {
          name: 'duration',
          type: 'number',
          default: '300',
          description: { zh: '单段动画时长（ms）。', en: 'Per-segment duration (ms).' },
        },
        {
          name: 'as',
          type: `'div' | 'span' | 'p'`,
          default: `'p'`,
          description: { zh: '渲染成的元素标签。', en: 'Tag to render.' },
        },
        {
          name: 'once',
          type: 'boolean',
          default: 'true',
          description: { zh: '只播一次；为 false 时循环。', en: 'Play once; loop when false.' },
        },
        {
          name: 'className',
          type: 'string',
          description: { zh: '追加类名，经 `tailwind-merge` 合并。', en: 'Extra classes, merged via `tailwind-merge`.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: '揭示是纯装饰——底层 DOM 是完整文本，读屏软件一次性读全，不会随动画分段播报。',
      en: 'The reveal is purely decorative — the underlying DOM holds the full text, so screen readers read it all at once rather than segment by segment.',
    },
    {
      zh: '动画带 `motion-safe:` 闸门与 `motion-reduce:` 兜底，开了减弱动效就直接全量显示。',
      en: 'The animation is gated behind `motion-safe:` with a `motion-reduce:` fallback, so reduced-motion users see the full text immediately.',
    },
  ],
}
