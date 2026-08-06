import { Skeleton } from 'aios-ui-kit/skeleton'
import type { ComponentDoc } from '../types'

import SkeletonBasic from '../../examples/skeleton/basic'
import SkeletonVariants from '../../examples/skeleton/variants'

import basicSource from '../../examples/skeleton/basic.tsx?raw'
import variantsSource from '../../examples/skeleton/variants.tsx?raw'

export const skeletonDoc: ComponentDoc = {
  slug: 'skeleton',
  name: 'Skeleton',
  category: 'feedback',
  status: 'new',
  baseUi: '—（自实现，基于 DotMatrix）',
  description: {
    zh: '点阵呼吸占位（Nothing 改造，非灰色块），text/rect/circle 三种形状。',
    en: 'A dot-matrix breathing placeholder (AIOS adaptation, not grey blocks) in text, rect, or circle shapes.',
  },
  preview: () => <Skeleton variant="rect" className="w-full max-w-xs" />,
  importStatement: `import { Skeleton } from 'aios-ui-kit/skeleton'`,
  usageSnippet: `<Skeleton variant="rect" />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '默认是 text 形状的一行点阵，高度 1em，正好替一行文字占位。呼吸动画在 0.4↔0.8 透明度之间循环，motion-reduce 下静态停在 0.6。',
        en: 'Defaults to a single row of dots in the text shape, 1em tall — a drop-in placeholder for one line of text. The breathing animation cycles between 0.4 and 0.8 opacity, and stops at 0.6 under motion-reduce.',
      },
      code: basicSource,
      render: () => <SkeletonBasic />,
    },
    {
      id: 'variants',
      title: { zh: '形状', en: 'Shapes' },
      description: {
        zh: 'text 是一行点阵，rect 是矩形点阵（默认 4×16），circle 是圆形点阵（默认 6×6）。`rows`/`cols` 调密度，`width`/`height` 调尺寸，数字按 px 处理。',
        en: 'text is a single row of dots, rect a rectangular grid (4×16 by default), circle a round grid (6×6 by default). `rows`/`cols` tune the density; `width`/`height` tune the size, with numbers treated as px.',
      },
      code: variantsSource,
      render: () => <SkeletonVariants />,
    },
  ],
  api: [
    {
      name: 'Skeleton',
      description: {
        zh: '渲染为 `<div>`，内部是点阵网格。透传所有原生 div 属性（`aria-*`、`ref` …）。已置 `aria-hidden="true"`，纯装饰占位。',
        en: 'Renders a `<div>` containing a dot grid. Forwards every native div prop (`aria-*`, `ref`, …). Always `aria-hidden="true"` — purely decorative.',
      },
      props: [
        {
          name: 'variant',
          type: `'text' | 'rect' | 'circle'`,
          default: `'text'`,
          description: { zh: '占位形状，决定圆角与默认尺寸。', en: 'Placeholder shape; sets the corner radius and default size.' },
        },
        {
          name: 'width',
          type: 'number | string',
          default: '`\'100%\'`（text/rect）· `\'48px\'`（circle）',
          description: { zh: '容器宽度，数字按 px 处理。', en: 'Container width; numbers are treated as px.' },
        },
        {
          name: 'height',
          type: 'number | string',
          default: '`\'1em\'`（text）· `\'64px\'`（rect）· `\'48px\'`（circle）',
          description: { zh: '容器高度，数字按 px 处理。', en: 'Container height; numbers are treated as px.' },
        },
        {
          name: 'rows',
          type: 'number',
          default: '1（text）· 4（rect）· 6（circle）',
          description: { zh: '点阵行数。', en: 'Number of dot rows.' },
        },
        {
          name: 'cols',
          type: 'number',
          default: '16（text）· 16（rect）· 6（circle）',
          description: { zh: '点阵列数。', en: 'Number of dot columns.' },
        },
        {
          name: 'animate',
          type: 'boolean',
          default: 'true',
          description: { zh: '是否开启呼吸动画；motion-reduce 下始终静态。', en: 'Whether to breathe; always static under motion-reduce.' },
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
      zh: '纯装饰占位，始终 `aria-hidden="true"`，读屏软件会跳过。',
      en: 'Purely decorative — always `aria-hidden="true"`, so screen readers skip it.',
    },
    {
      zh: '呼吸动画带 `motion-safe:` 闸门，用户开了减弱动效就静态停在 0.6 透明度。',
      en: 'The breathing animation is gated behind `motion-safe:`, so it stops at 0.6 opacity when the user asks for reduced motion.',
    },
  ],
}
