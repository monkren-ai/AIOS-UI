import { DotMatrix } from 'aios-ui-kit/dot-matrix'
import type { ComponentDoc } from '../types'

import DotMatrixPattern from '../../examples/dot-matrix/pattern'
import patternSource from '../../examples/dot-matrix/pattern.tsx?raw'

export const dotMatrixDoc: ComponentDoc = {
  slug: 'dot-matrix',
  name: 'DotMatrix',
  category: 'decoration',
  status: 'stable',
  description: {
    zh: '点阵网格，按坐标点亮或调暗其中的单个点。',
    en: 'A grid of dots, lit or dimmed one coordinate at a time.',
  },
  preview: () => (
    <DotMatrix
      rows={4}
      cols={8}
      theme="dark"
      activeDots={[
        [1, 2],
        [1, 3],
        [2, 2],
      ]}
    />
  ),
  importStatement: `import { DotMatrix } from 'aios-ui-kit/dot-matrix'`,
  usageSnippet: `<DotMatrix rows={8} cols={16} activeDots={[[1, 2], [2, 2]]} />`,
  composition: {
    zh: '公开 API 是 `StaticDotMatrix` 的 re-export，名字叫 `DotMatrix`。坐标是 `[row, col]`，从 0 起算。',
    en: 'The public API re-exports `StaticDotMatrix` under the name `DotMatrix`. Coordinates are `[row, col]`, zero-based.',
  },
  examples: [
    {
      id: 'pattern',
      title: { zh: '坐标点亮', en: 'Coordinate lighting' },
      description: {
        zh: '`activeDots` 把指定坐标的点亮起来，`dimDots` 把指定坐标的点压暗。没出现在两个列表里的点保持默认 idle 态。`data-dot-theme` 控制点阵自己的明暗，不会翻整页主题。',
        en: '`activeDots` lights up the listed coordinates and `dimDots` dims them. Dots in neither list stay at the default idle state. `data-dot-theme` controls the matrix’s own light/dark palette without flipping the page theme.',
      },
      code: patternSource,
      render: () => <DotMatrixPattern />,
    },
  ],
  api: [
    {
      name: 'DotMatrix',
      props: [
        {
          name: 'rows',
          type: 'number',
          required: true,
          description: { zh: '行数。', en: 'Number of rows.' },
        },
        {
          name: 'cols',
          type: 'number',
          required: true,
          description: { zh: '列数。', en: 'Number of columns.' },
        },
        {
          name: 'dotSize',
          type: `'sm' | 'md' | 'lg'`,
          default: `'md'`,
          description: { zh: '单个点的尺寸。', en: 'Size of each dot.' },
        },
        {
          name: 'theme',
          type: `'light' | 'dark'`,
          default: `'light'`,
          description: {
            zh: '点阵配色，走 `data-dot-theme`，不影响页面 `data-theme`。',
            en: 'Matrix palette via `data-dot-theme`; does not affect page `data-theme`.',
          },
        },
        {
          name: 'pattern',
          type: `'grid' | 'diagonal' | 'cross' | 'ring'`,
          default: `'grid'`,
          description: { zh: '背景网格样式。', en: 'Background grid pattern.' },
        },
        {
          name: 'activeDots',
          type: '[number, number][]',
          default: '[]',
          description: { zh: '要点亮的坐标列表。', en: 'Coordinates to light up.' },
        },
        {
          name: 'dimDots',
          type: '[number, number][]',
          default: '[]',
          description: { zh: '要压暗的坐标列表。', en: 'Coordinates to dim.' },
        },
      ],
    },
  ],
  accessibility: [
    {
      zh: 'DotMatrix 是纯装饰，不带可交互语义。如果它承载信息，旁边必须有文字说明，不能单靠点的排列传达含义。',
      en: 'DotMatrix is decorative and carries no interactive semantics. If it conveys information, there must be accompanying text — meaning cannot rest on the dot pattern alone.',
    },
  ],
}
