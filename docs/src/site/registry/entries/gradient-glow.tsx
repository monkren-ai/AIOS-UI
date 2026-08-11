import { GradientGlow } from 'aios-ui-kit/gradient-glow'
import type { ComponentDoc } from '../types'

import GradientGlowBasic from '../../examples/gradient-glow/basic'
import GradientGlowIntensities from '../../examples/gradient-glow/intensities'

import basicSource from '../../examples/gradient-glow/basic.tsx?raw'
import intensitiesSource from '../../examples/gradient-glow/intensities.tsx?raw'

export const gradientGlowDoc: ComponentDoc = {
  slug: 'gradient-glow',
  name: 'GradientGlow',
  category: 'decoration',
  status: 'new',
  baseUi: '—（自实现，点阵 opacity 阶梯）',
  description: {
    zh: '点阵环境背景（AIOS 改造，非渐变光晕），opacity 中心高边缘低。',
    en: 'A dot-matrix ambient background (AIOS adaptation, not a gradient glow), with opacity fading from center to edge.',
  },
  preview: () => (
    <div className="relative flex h-32 w-full max-w-sm items-center justify-center overflow-hidden rounded-card border border-border bg-surface">
      <GradientGlow />
      <span className="relative font-mono text-label uppercase tracking-wider text-foreground-muted">
        ambient
      </span>
    </div>
  ),
  importStatement: `import { GradientGlow } from 'aios-ui-kit/gradient-glow'`,
  usageSnippet: `<GradientGlow />`,
  examples: [
    {
      id: 'basic',
      title: { zh: '基础', en: 'Basic' },
      description: {
        zh: '绝对定位的点阵背景层，需要父容器 `relative`。点是 `--text-secondary`，每个点的 opacity 按距中心的欧氏距离衰减——逐点计算，不是 CSS radial-gradient。`aria-hidden`，纯装饰。',
        en: 'An absolutely-positioned dot-matrix background layer; the parent needs `position: relative`. The dots use `--text-secondary`, and each dot’s opacity falls off with its Euclidean distance from the center — computed per dot, not via CSS radial-gradient. `aria-hidden`, purely decorative.',
      },
      code: basicSource,
      render: () => <GradientGlowBasic />,
    },
    {
      id: 'intensities',
      title: { zh: '强度', en: 'Intensities' },
      description: {
        zh: '`intensity` 决定中心点的最大 opacity：subtle 0.3、normal 0.5、strong 0.7。`cols`/`rows` 调网格密度，`dotSize` 调点直径（px）。',
        en: '`intensity` sets the maximum opacity at the center: subtle 0.3, normal 0.5, strong 0.7. `cols`/`rows` tune the grid density; `dotSize` the dot diameter in px.',
      },
      code: intensitiesSource,
      render: () => <GradientGlowIntensities />,
    },
  ],
  api: [
    {
      name: 'GradientGlow',
      description: {
        zh: '渲染为绝对定位的 `<div>`，`aria-hidden="true"`、`pointer-events-none`。透传所有原生 div 属性（`style`、`ref` …）。',
        en: 'Renders an absolutely-positioned `<div>`, `aria-hidden="true"` and `pointer-events-none`. Forwards every native div prop (`style`, `ref`, …).',
      },
      props: [
        {
          name: 'cols',
          type: 'number',
          default: '16',
          description: { zh: '点阵列数。', en: 'Number of dot columns.' },
        },
        {
          name: 'rows',
          type: 'number',
          default: '10',
          description: { zh: '点阵行数。', en: 'Number of dot rows.' },
        },
        {
          name: 'dotSize',
          type: 'number',
          default: '2',
          description: { zh: '单个点直径（px）。', en: 'Dot diameter in px.' },
        },
        {
          name: 'intensity',
          type: `'subtle' | 'normal' | 'strong'`,
          default: `'normal'`,
          description: { zh: '氛围强度，决定中心最大 opacity。', en: 'Ambient strength; sets the peak opacity at the center.' },
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
      zh: '纯装饰背景，始终 `aria-hidden="true"` 且 `pointer-events-none`，读屏软件跳过、不拦截点击。',
      en: 'Purely decorative — always `aria-hidden="true"` and `pointer-events-none`, so screen readers skip it and it never intercepts clicks.',
    },
    {
      zh: '改造后不含任何 CSS 渐变、blur 或光晕——氛围只靠点阵 opacity 阶梯营造。',
      en: 'After adaptation it contains no CSS gradients, blur, or glow — the ambience comes only from the dot opacity steps.',
    },
  ],
}
